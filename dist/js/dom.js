// NODE FUNCTIONS
// TODO make this a class
function getNearestNodeElement(e) {
    var target = e.target instanceof HTMLElement ? e.target : null;
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
function closeNode(node) {
    var container = node.querySelector(".node-container");
    container.style.display = "none";
    node.classList.add("closed");
}
export function toggleVis(e) {
    var target = getNearestNodeElement(e);
    if (!target)
        return true;
    var container = target.querySelector(".node-container");
    if (container.style.display == "none") {
        container.style.display = "flex";
    }
    else {
        container.style.display = "none";
    }
    target.classList.toggle("closed");
    e.stopPropagation();
    return false;
}
export function createNode(id) {
    var node = document.createElement("div");
    var description = document.createElement("table");
    var container = document.createElement("div");
    node.className = "node";
    node.id = id;
    node.title = "id: " + id;
    description.className = "description";
    container.className = "node-container";
    node.appendChild(description);
    node.appendChild(container);
    return node;
}
function createNodeSingleValue(value) {
    var node = document.createElement("div");
    node.className = "one-value";
    node.innerHTML = value;
    return node;
}
export function getContainerFromNode(node) {
    return node.querySelector(".node-container");
}
export function addNodeToContainer(container, node) {
    if (container.classList.contains("root")) {
        container.insertBefore(node, document.getElementById("toolbar"));
        return;
    }
    container.appendChild(node);
}
export function addPropertyToNode(node, key, value) {
    var description = node.querySelector('.description');
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    col1.innerHTML = key + ":";
    col1.style.textAlign = "right";
    col1.style.width = "50%";
    var col2 = document.createElement("td");
    col2.innerHTML = value;
    col2.style.textAlign = "left";
    row.appendChild(col1);
    row.appendChild(col2);
    description.appendChild(row);
}
export function addTitleToNode(node, title) {
    var titleEl = document.createElement("div");
    titleEl.innerHTML = title;
    titleEl.className = "title";
    node.insertBefore(titleEl, node.querySelector('.description'));
}
export function oneValue(value, size) {
    clearTree();
    var root = document.getElementsByClassName("root")[0];
    var newNode = createNodeSingleValue(value);
    newNode.style.fontSize = size;
    addNodeToContainer(root, newNode);
}
export function clearTree() {
    var root = document.getElementsByClassName("root")[0];
    var toolbar = document.getElementById("toolbar");
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