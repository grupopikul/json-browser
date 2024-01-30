// NODE FUNCTIONS
// UTILITY FUNCTIONS FOR EVENTS
function getNearestNodeElement(e) {
    let target = e.target instanceof HTMLElement ? e.target : null;
    if (!target || target.classList === undefined)
        return null;
    while (!target.classList.contains("node")) {
        if (target.id === "toolbar") {
            return null;
        }
        target = target.parentNode instanceof HTMLElement ? target.parentNode : null;
        if (!target || target.classList === undefined)
            return null;
    }
    return target;
}
export function toggleVis(e) {
    const target = getNearestNodeElement(e);
    if (!target)
        return true;
    target.toggleVis();
    e.stopPropagation();
    return false;
}
export class NodeElement extends HTMLElement {
    constructor(id) {
        super();
        const description = document.createElement("table");
        const container = document.createElement("div");
        this.className = "node closed";
        this.id = id;
        this.title = "id: " + id;
        description.className = "description";
        container.className = "node-container";
        this.appendChild(description);
        this.appendChild(container);
    }
    closeNode() {
        let container = this.querySelector(".node-container");
        let description = this.querySelector(".description");
        container.style.display = "none";
        description.style.display = "none";
        this.classList.add("closed");
    }
    getContainerFromNode() {
        return this.querySelector(".node-container");
    }
    toggleVis() {
        const container = this.querySelector(".node-container");
        const description = this.querySelector(".description");
        if (this.classList.contains("closed")) {
            container.style.display = "flex";
            description.style.display = "table";
        }
        else {
            container.style.display = "none";
            description.style.display = "none";
        }
        this.classList.toggle("closed");
    }
    addNodeToContainer(container) {
        if (container.classList.contains("root")) {
            container.insertBefore(this, document.getElementById("toolbar"));
            return;
        }
        container.appendChild(this);
    }
    addPropertyToNode(key, value) {
        const description = this.querySelector('.description');
        const row = document.createElement("tr");
        const col1 = document.createElement("td");
        col1.innerHTML = key + ":";
        col1.style.textAlign = "right";
        col1.style.width = "50%";
        const col2 = document.createElement("td");
        col2.innerHTML = value;
        col2.style.textAlign = "left";
        row.appendChild(col1);
        row.appendChild(col2);
        description.appendChild(row);
    }
    addTitleToNode(title) {
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
function createNodeSingleValue(value) {
    const node = new NodeElement(value);
    node.className = "one-value";
    node.innerHTML = value;
    return node;
}
export function oneValue(value, size) {
    clearTree();
    const root = document.getElementsByClassName("root")[0];
    const newNode = createNodeSingleValue(value);
    newNode.style.fontSize = size;
    newNode.addNodeToContainer(root);
    newNode.toggleVis();
}
export function clearTree() {
    const root = document.getElementsByClassName("root")[0];
    const toolbar = document.getElementById("toolbar");
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
//# sourceMappingURL=dom.js.map