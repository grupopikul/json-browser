"use strict";
window.onload = function () {
    var el = document.querySelector(".root");
    el.oncontextmenu = addNodeFromEvent;
    //el.onclick = toggleVis;
};
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
function toggleVis(e) {
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
function createNode() {
    var node = document.createElement("div");
    var description = document.createElement("div");
    var container = document.createElement("div");
    node.className = "node";
    node.id = crypto.randomUUID();
    description.className = "description";
    container.className = "node-container";
    var text = node.id;
    description.innerHTML = text;
    node.appendChild(description);
    node.appendChild(container);
    return node;
}
function addNodeFromEvent(e) {
    var target = getNearestNodeElement(e);
    if (!target)
        return true;
    var newNode = createNode();
    var parent = target.querySelector(".node-container");
    setTimeout(function (target) {
        target.style.transition = "";
        target.style.backgroundColor = "red";
    }, 0, target);
    setTimeout(function (target) {
        target.style.backgroundColor = "white";
        target.style.transition = "background-color 1s ease";
    }, 20, target);
    parent.appendChild(newNode);
    e.stopPropagation();
    return false;
}
function fixWidth(on) {
    var style = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
    var size = document.getElementById("fixwidth").value;
    if (!size)
        return;
    for (var i = 0; i < style.length; i++) {
        var currentStyle = style[i];
        if (!(currentStyle instanceof CSSStyleRule))
            continue;
        if (currentStyle.selectorText == '.description') {
            if (on) {
                size = size + 'px';
            }
            else {
                size = "auto";
            }
            currentStyle.style['width'] = size;
        }
    }
}
//# sourceMappingURL=main.js.map