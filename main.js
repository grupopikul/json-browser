function fixWidth(on) {
    var style = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
    size = document.getElementById("fixwidth").value;
    for (var i = 0; i < style.length; i++) {
        if (style[i].selectorText == '.description') {
            if(on) {
                size = size + 'px';
            } else {
                size = "auto";
            }
            style[i].style['width'] = size;
        }
    }
}
var i = 6;
function createNode() {
    var node = document.createElement("div");
    var description = document.createElement("div");
    var container = document.createElement("div");
    node.className = "node";
    node.id = String(i++);
    description.className = "description";
    container.className = "node-container";
    var text = "";
    for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
        text += "Lorem ipsum ";
    }
    description.innerHTML = text;
    node.appendChild(description);
    node.appendChild(container);
    return node;
}
function getNearestNodeElement(e) {
    let target = e.target;
    if (target.classList === undefined) return null;
    while (target && !target.classList.contains("node")) {
        if (target.id === "toolbar") {
            return null;
        }
        target = target.parentNode;
        if (target.classList === undefined) return null;
    }
    return target;
}
function addNode(e) {
    target = getNearestNodeElement(e);
    if (target === null) return true;
    setTimeout((target) => {
        target.style.transition = "";
        target.style.backgroundColor = "red";
    }, 0, target);
    setTimeout((target) => {
        target.style.backgroundColor = "white";
        target.style.transition="background-color 1s ease";
    }, 20, target);
    const newNode = createNode();
    const parent = target.querySelector(".node-container");
    parent.appendChild(newNode);
    event.stopPropagation();
    return false;
}
function toggleVis(e) {
    target = getNearestNodeElement(e);
    if (target === null) return true;
    let others = target.querySelector(".node-container");
    if (others.style.display == "none") {
        others.style.display = "flex";
        target.classList.remove("closed");
    } else {
        others.style.display = "none";
        target.classList.add("closed");
    }
    event.stopPropagation();
}
function closeNode(node) {
    let others = target.querySelector(".node-container");
    others.style.display = "none";
    node.classList.add("closed");
}
window.onload = () => {
    const el = document.querySelector(".root");
    el.oncontextmenu = addNode;
    el.onclick = toggleVis;
};

