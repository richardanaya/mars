use async_std::task;
use evcxr::*;
use http_types::headers::HeaderValue;
use std::collections::HashMap;
use std::thread;
use std::time;
use tide::prelude::*;
use tide::security::{CorsMiddleware, Origin};
use tide::{Request, Response};
use uuid::Uuid;

use webbrowser;

#[derive(Default)]
struct AllResults {
    results: Vec<Option<String>>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CodeResult {
    result: Option<String>,
}

struct ExecutionCore {
    ready: bool,
    outputs: Vec<String>,
    sender: flume::Sender<(usize, std::string::String)>,
}

#[derive(Default)]
struct ContextCollection {
    context_map: HashMap<String, ExecutionCore>,
}

fn main() {
    evcxr::runtime_hook();
    task::block_on(async {
        let mut app = tide::new();

        let cors = CorsMiddleware::new()
            .allow_methods("GET, POST, OPTIONS".parse::<HeaderValue>().unwrap())
            .allow_origin(Origin::from("*"))
            .allow_credentials(false);
        app.with(cors);

        app.at("notebook/start").get(|_req: Request<()>| {
            let (tx, rx) = flume::unbounded::<(usize, String)>();
            let mut context_collection = globals::get::<ContextCollection>();
            let id_to_return = Uuid::new_v4().to_string();
            context_collection.context_map.insert(
                id_to_return.clone(),
                ExecutionCore {
                    ready: false,
                    outputs: vec![],
                    sender: tx,
                },
            );
            let id = id_to_return.clone();
            let id2 = id_to_return.clone();
            thread::spawn(move || {
                let (mut commander, outputs) = CommandContext::new().unwrap();
                let mut context_collection = globals::get::<ContextCollection>();
                let mut core = context_collection.context_map.get_mut(&id).unwrap();
                core.ready = true;
                drop(context_collection);
                thread::spawn(move || {
                    while let Ok(line) = outputs.stdout.recv() {
                        let mut context_collection = globals::get::<ContextCollection>();
                        let core = context_collection.context_map.get_mut(&id).unwrap();
                        core.outputs.push(line);
                        drop(context_collection);
                    }
                });
                for (handle, msg) in rx.iter() {
                    let execution_result = commander.execute(&msg);

                    let text = match execution_result {
                        Ok(output) => {
                            thread::sleep(time::Duration::from_millis(1500));
                            let mut context_collection = globals::get::<ContextCollection>();
                            let mut core = context_collection.context_map.get_mut(&id2).unwrap();
                            let mut t = core.outputs.join("<br/>");
                            core.outputs = vec![];
                            drop(context_collection);
                            if t.len() > 0 {
                                t.push_str("<br><hr><br>");
                            }
                            if let Some(tp) = output.get("text/plain") {
                                t.push_str(tp);
                            }
                            if let Some(duration) = output.timing {
                                t.push_str(&format!("Took {}ms", duration.as_millis()));
                                for phase in output.phases {
                                    t.push_str(&format!(
                                        "  {}: {}ms",
                                        phase.name,
                                        phase.duration.as_millis()
                                    ));
                                }
                            }
                            t
                        }
                        Err(evcxr::Error::CompilationErrors(_errors)) => {
                            "Failed to compile".to_string()
                        }
                        Err(err) => {
                            format!("{}", err)
                        }
                    };
                    let mut a = globals::get::<AllResults>();
                    a.results[handle] = Some(text);
                }
            });
            async move { Ok(json!({ "id": id_to_return })) }
        });

        app.at("notebook/:notebook_id/ready")
            .get(move |req: Request<()>| {
                let id = req.param("notebook_id").unwrap().to_string();
                let context_collection = globals::get::<ContextCollection>();
                let core = context_collection.context_map.get(&id).unwrap();
                let ready = core.ready;
                drop(context_collection);
                async move { Ok(json!({ "ready": ready })) }
            });

        app.at("notebook/:notebook_id/execute")
            .post(move |mut req: Request<()>| {
                let id = req.param("notebook_id").unwrap().to_string();
                let f = task::block_on(async { req.body_string().await.unwrap() });
                let mut a = globals::get::<AllResults>();
                let h = a.results.len();
                a.results.push(None);
                let context_collection = globals::get::<ContextCollection>();
                let core = context_collection.context_map.get(&id).unwrap();
                core.sender.send((h, f)).unwrap();
                async move { Ok(h.to_string().into()) as tide::Result }
            });

        app.at("notebook/:notebook_id/result/:n")
            .get(move |req: Request<()>| {
                let n: usize = req.param("n").unwrap().parse().unwrap();
                async move {
                    let a = globals::get::<AllResults>();
                    if n > a.results.len() {
                        return Ok(json!(null));
                    }
                    let r = a.results[n].clone();
                    Ok(json!({ "result": r }))
                }
            });

        app.at("/red_circle.svg").get(|_: Request<()>| async {
            let mut req = Response::new(200);
            req.set_body(include_str!("web/red_circle.svg"));
            req.set_content_type("image/svg+xml");
            Ok(req.into()) as tide::Result
        });

        app.at("/_snowpack/env.js").get(|_: Request<()>| async {
            let mut req = Response::new(200);
            req.set_body(include_str!("web/_snowpack/env.js"));
            req.set_content_type("application/javascript; charset=utf-8");
            Ok(req.into()) as tide::Result
        });

        app.at("/index.js").get(|_: Request<()>| async {
            let mut req = Response::new(200);
            req.set_body(include_str!("web/index.js"));
            req.set_content_type("application/javascript; charset=utf-8");
            Ok(req.into()) as tide::Result
        });

        app.at("/").get(|_: Request<()>| async {
            let mut req = Response::new(200);
            req.set_body(include_str!("web/index.html"));
            req.set_content_type("text/html; charset=utf-8");
            Ok(req.into()) as tide::Result
        });

        println!("Server started at http://127.0.0.1:8080");
        webbrowser::open("http://127.0.0.1:8080").unwrap();
        app.listen("127.0.0.1:8080").await?;
        Ok(()) as tide::Result<()>
    })
    .unwrap();
}
