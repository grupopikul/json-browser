// NODE FUNCTIONS

 // UTILITY FUNCTIONS FOR EVENTS
function getNearestNodeElement(e: Event): NodeElement | null {
    let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
    if (!target || target.classList === undefined) return null;
    while (!target.classList.contains("node")) {
        if (target.id === "toolbar") {
            return null;
        }
        target = target.parentNode instanceof HTMLElement ? target.parentNode : null;
        if (!target || target.classList === undefined) return null;
    }
    return target as NodeElement;
}

export function toggleVis(e: Event): Boolean {
    const target: NodeElement | null = getNearestNodeElement(e);
    if(!target) return true;
    target.toggleVis();
    e.stopPropagation();
    return false;
}


export class NodeElement extends HTMLElement {
    constructor(id: string) {
        super();
        const description: HTMLElement = document.createElement("table");
        const container: HTMLElement = document.createElement("div");
        this.className = "node closed";
        this.id = id;
        this.title = "id: " + id;
        description.className = "description";
        container.className = "node-container";
        this.appendChild(description);
        this.appendChild(container);
    }
    closeNode(): void {
        let container: HTMLElement = this.querySelector(".node-container")!;
        let description: HTMLElement = this.querySelector(".description")!;
        container.style.display = "none";
        description.style.display = "none";
        this.classList.add("closed");
    }

    getContainerFromNode(): HTMLElement {
        return this.querySelector(".node-container") as HTMLElement;
    }
    toggleVis():void {
        const container: HTMLElement = this.querySelector(".node-container")!;
        const description: HTMLElement = this.querySelector(".description")!;
        if (container.style.display == "none") {
            container.style.display = "flex";
            description.style.display = "table";
        } else {
            container.style.display = "none";
            description.style.display = "none";
        }
        this.classList.toggle("closed");
    }
    addNodeToContainer(container: HTMLElement): void {
        if (container.classList.contains("root")) {
            container.insertBefore(this, document.getElementById("toolbar")!);
            return;
        }
        container.appendChild(this);
    }
    addPropertyToNode(key: string, value: string) {
        const description: HTMLElement = this.querySelector('.description')!;
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

    addTitleToNode(title: string) {
        const titleEl = document.createElement("div");
        titleEl.innerHTML = title;
        titleEl.className = "title";
        this.insertBefore(titleEl, this.querySelector('.description'));
    }
}
window.customElements.define('node-element', NodeElement);

// This is a fake node:
// for the case where the json input is a single value
// number.json: 3
// string.json: "hello world"
function createNodeSingleValue(value: string) {
    const node: NodeElement = new NodeElement(value)
    node.className = "one-value";
    node.innerHTML = value;
    return node;
}

export function oneValue(value: string, size: string) {
    clearTree();
    const root: HTMLElement = document.getElementsByClassName("root")[0] as HTMLElement;
    const newNode: NodeElement = createNodeSingleValue(value);
    newNode.style.fontSize = size;
    newNode.addNodeToContainer(root);
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
