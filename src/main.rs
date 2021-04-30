use async_std::task;
use evcxr::*;
use http_types::headers::HeaderValue;
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

#[derive(Default)]
struct ExecutionCore {
    ready: bool,
    outputs: Vec<String>,
}

#[derive(Default)]
struct ContextCollection {
    sender: Option<flume::Sender<(usize, std::string::String)>>,
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
            context_collection.sender = Some(tx);
            let t = thread::spawn(move || {
                let (mut commander, outputs) = CommandContext::new().unwrap();
                let mut core = globals::get::<ExecutionCore>();
                core.ready = true;
                drop(core);
                thread::spawn(move || {
                    while let Ok(line) = outputs.stdout.recv() {
                        let mut all_outputs = globals::get::<ExecutionCore>();
                        all_outputs.outputs.push(line);
                        drop(all_outputs);
                    }
                });
                for (handle, msg) in rx.iter() {
                    let execution_result = commander.execute(&msg);

                    let text = match execution_result {
                        Ok(output) => {
                            thread::sleep(time::Duration::from_millis(1500));
                            let mut all_outputs = globals::get::<ExecutionCore>();
                            let mut t = all_outputs.outputs.join("<br/>");
                            all_outputs.outputs = vec![];
                            drop(all_outputs);
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
            async move {
                Ok(json!({
                    "id": Uuid::new_v4().to_string()
                }))
            }
        });

        app.at("notebook/:notebook_id/ready")
            .get(move |_req: Request<()>| {
                let core = globals::get::<ExecutionCore>();
                let ready = core.ready;
                drop(core);
                async move { Ok(json!({ "ready": ready })) }
            });

        app.at("notebook/:notebook_id/execute")
            .post(move |mut req: Request<()>| {
                let f = task::block_on(async { req.body_string().await.unwrap() });
                let mut a = globals::get::<AllResults>();
                let h = a.results.len();
                a.results.push(None);
                let context_collection = globals::get::<ContextCollection>();
                context_collection
                    .sender
                    .as_ref()
                    .unwrap()
                    .send((h, f))
                    .unwrap();
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
