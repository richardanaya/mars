let currentNotebook:string|undefined = undefined;

export function getCurrentNotebookId() : string | undefined {
    return currentNotebook;
}

export function setCurrentNotebookId(id:string){
    currentNotebook = id;
}