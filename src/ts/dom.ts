// NODE FUNCTIONS


// TODO make this a class
function getNearestNodeElement(e: Event): HTMLElement | null {
    let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
    if (!target || target.classList === undefined) return null;
    while (!target.classList.contains("node")) {
        if (target.id === "toolbar") {
            return null;
        }
        target = target.parentNode instanceof HTMLElement ? target.parentNode : null;
        if (!target || target.classList === undefined) return null;
    }
    return target;
}

function closeNode(node: HTMLElement): void {
    let container: HTMLElement = node.querySelector(".node-container")!;
    container.style.display = "none";
    node.classList.add("closed");
}
export function toggleVis(e: Event): Boolean {
    const target = getNearestNodeElement(e);
    if(!target) return true;
    const container: HTMLElement = target.querySelector(".node-container")!;
    if (container.style.display == "none") {
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
    target.classList.toggle("closed");
    e.stopPropagation();
    return false;
}
export function createNode(id: string) {
    const node: HTMLElement = document.createElement("div");
    const description: HTMLElement = document.createElement("table");
    const container: HTMLElement = document.createElement("div");
    node.className = "node";
    node.id = id;
    node.title = "id: " + id;
    description.className = "description";
    container.className = "node-container";
    node.appendChild(description);
    node.appendChild(container);
    return node;
}

function createNodeSingleValue(value: string) {
    const node: HTMLElement = document.createElement("div");
    node.className = "one-value";
    node.innerHTML = value;
    return node;
}

export function getContainerFromNode(node: HTMLElement): HTMLElement {
    return node.querySelector(".node-container") as HTMLElement;
}
export function addNodeToContainer(container: HTMLElement, node: HTMLElement): void {
    if (container.classList.contains("root")) {
        container.insertBefore(node, document.getElementById("toolbar")!);
        return;
    }
    container.appendChild(node);
}
export function addPropertyToNode(node: HTMLElement, key: string, value: string) {
    const description: HTMLElement = node.querySelector('.description')!;
    const row: HTMLElement = document.createElement("tr");
    const col1: HTMLElement = document.createElement("td");
    col1.innerHTML = key + ":";
    col1.style.textAlign = "right";
    col1.style.width="50%";
    const col2: HTMLElement = document.createElement("td");
    col2.innerHTML = value;
    col2.style.textAlign = "left";
    row.appendChild(col1);
    row.appendChild(col2);
    description.appendChild(row);
}

export function addTitleToNode(node: HTMLElement, title: string) {
    const titleEl = document.createElement("div");
    titleEl.innerHTML = title;
    titleEl.className = "title";
    node.insertBefore(titleEl, node.querySelector('.description'));
}
export function oneValue(value: string, size: string) {
    clearTree();
    const root: HTMLElement = document.getElementsByClassName("root")[0] as HTMLElement;
    const newNode: HTMLElement = createNodeSingleValue(value);
    newNode.style.fontSize = size;
    addNodeToContainer(root, newNode);
}

export function clearTree() {
    const root: HTMLElement = document.getElementsByClassName("root")[0] as HTMLElement;
    const toolbar: HTMLElement = document.getElementById("toolbar") as HTMLElement;
    root.innerHTML = "";
    root.appendChild(toolbar);
}

/* Old but I like the blinky
function addNodeFromEvent(e: Event) {
    const target: HTMLElement | null = getNearestNodeElement(e);
    if(!target) return true;
    const parent: HTMLElement = target.querySelector(".node-container")!;
    setTimeout((target: HTMLElement) => {
        target.style.transition = "";
        target.style.backgroundColor = "red";
    }, 0, target);
    setTimeout((target: HTMLElement) => {
        target.style.backgroundColor = "white";
        target.style.transition="background-color 1s ease";
    }, 20, target);
    addNodeToContainer(parent, createNode("delete"));
    e.stopPropagation();
    return false;
}*/
