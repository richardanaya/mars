use evcxr::*;
use serde::*;
use std::collections::HashMap;
use std::thread;
use std::time;
use uuid::Uuid;

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

pub fn start_context() -> String {
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
                    let t = core.outputs.join("\n");
                    core.outputs = vec![];
                    drop(context_collection);
                    /* if t.len() > 0 {
                        // TODO: improve output
                        //t.push_str("<br><hr><br>");
                    }
                    if let Some(tp) = output.get("text/plain") {
                        t.push_str(tp);
                    }*/
                    /*if let Some(duration) = output.timing {
                        t.push_str(&format!("Took {}ms", duration.as_millis()));
                        for phase in output.phases {
                            t.push_str(&format!(
                                "  {}: {}ms",
                                phase.name,
                                phase.duration.as_millis()
                            ));
                        }
                    }*/
                    tide::prelude::json!({
                        "log": if t.len()>0 { Some(t) } else { None },
                        "text":output.get("text/plain"),
                    })
                    .to_string()
                }
                Err(evcxr::Error::CompilationErrors(_errors)) => "Failed to compile".to_string(),
                Err(err) => {
                    format!("{}", err)
                }
            };
            let mut a = globals::get::<AllResults>();
            a.results[handle] = Some(text);
        }
    });
    return id_to_return;
}

pub fn is_context_ready(notebook_id: String) -> bool {
    let context_collection = globals::get::<ContextCollection>();
    let core = context_collection.context_map.get(&notebook_id).unwrap();
    let ready = core.ready;
    drop(context_collection);
    return ready;
}

pub fn execute_in_context(notebook_id: String, f: String) -> String {
    let mut a = globals::get::<AllResults>();
    let h = a.results.len();
    a.results.push(None);
    let context_collection = globals::get::<ContextCollection>();
    let core = context_collection.context_map.get(&notebook_id).unwrap();
    core.sender.send((h, f)).unwrap();
    let r = h.to_string();
    return r;
}

pub fn get_context_result(_notebook_id: String, n: usize) -> Option<String> {
    let a = globals::get::<AllResults>();
    if n > a.results.len() {
        return None;
    }
    let r = a.results[n].clone();
    return r;
}
