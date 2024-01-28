// NODE FUNCTIONS
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
function toggleVis(e: Event): Boolean {
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
function createNode(id: string) {
    const node = document.createElement("div");
    const description = document.createElement("div");
    const container = document.createElement("div");
    node.className = "node";
    node.id = id;
    description.className = "description";
    container.className = "node-container";
    var text = node.id;
    description.innerHTML = text;
    node.appendChild(description);
    node.appendChild(container);
    return node;
}

function createNodeSingleValue(value: string) {
    const node = document.createElement("div");
    node.className = "one-value";
    node.innerHTML = value;
    return node
}

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
}

function addNodeToContainer(container: HTMLElement, node: HTMLElement): void {
    if (container.classList.contains("root")) {
        container.insertBefore(node, document.getElementById("toolbar")!);
        return;
    }
    container.appendChild(node);
}

export function oneValue(value: string, size?: string) {
    const root: HTMLElement = document.getElementsByClassName("root")[0] as HTMLElement;
    const newNode: HTMLElement = createNodeSingleValue(value);
    if (size !== undefined) {
        newNode.style.fontSize = size;
    }
    addNodeToContainer(root, newNode);
}

export function clearTree() {
    const root: HTMLElement = document.getElementsByClassName("root")[0] as HTMLElement;
    const toolbar: HTMLElement = document.getElementById("toolbar") as HTMLElement;
    root.innerHTML = "";
    root.appendChild(toolbar);
}
