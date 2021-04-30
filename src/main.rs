use async_std::task;
use http_types::headers::HeaderValue;
use tide::prelude::*;
use tide::security::{CorsMiddleware, Origin};
use tide::{Request, Response};
use webbrowser;

mod context_manager;
pub use context_manager::*;

fn main() {
    evcxr::runtime_hook();
    task::block_on(async {
        let mut app = tide::new();

        let cors = CorsMiddleware::new()
            .allow_methods("GET, POST, OPTIONS".parse::<HeaderValue>().unwrap())
            .allow_origin(Origin::from("*"))
            .allow_credentials(false);
        app.with(cors);

        app.at("notebook/start")
            .get(|_req: Request<()>| async move { Ok(json!({ "id": start_context() })) });

        app.at("notebook/:notebook_id/ready")
            .get(move |req: Request<()>| {
                let id = req.param("notebook_id").unwrap().to_string();
                async move { Ok(json!({ "ready": is_context_ready(id) })) }
            });

        app.at("notebook/:notebook_id/execute")
            .post(move |mut req: Request<()>| {
                let id = req.param("notebook_id").unwrap().to_string();
                let f = task::block_on(async { req.body_string().await.unwrap() });
                let r = execute_in_context(id, f);
                async move { Ok(r.into()) as tide::Result }
            });

        app.at("notebook/:notebook_id/result/:n")
            .get(move |req: Request<()>| {
                let notebook_id = req.param("notebook_id").unwrap().to_string();
                let n: usize = req.param("n").unwrap().parse().unwrap();
                async move {
                    let r = get_context_result(notebook_id, n);
                    match r {
                        Some(r) => Ok(json!({ "result": r })),
                        None => Ok(json!(null)),
                    }
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
