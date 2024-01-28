window.onload = () => {
    const el: HTMLElement = document.querySelector(".root")!;
    el.oncontextmenu = addNodeFromEvent;
    //el.onclick = toggleVis;
};

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
function createNode() {
    const node = document.createElement("div");
    const description = document.createElement("div");
    const container = document.createElement("div");
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

function addNodeFromEvent(e: Event) {
    const target: HTMLElement | null = getNearestNodeElement(e);
    if(!target) return true;
    const newNode: HTMLElement = createNode();
    const parent: HTMLElement = target.querySelector(".node-container")!;
    setTimeout((target: HTMLElement) => {
        target.style.transition = "";
        target.style.backgroundColor = "red";
    }, 0, target);
    setTimeout((target: HTMLElement) => {
        target.style.backgroundColor = "white";
        target.style.transition="background-color 1s ease";
    }, 20, target);
    parent.appendChild(newNode);
    e.stopPropagation();
    return false;
}

function fixWidth(on: Boolean): void {
    const style: CSSRuleList = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
    var size: string | null = (document.getElementById("fixwidth") as HTMLInputElement)!.value;
    if(!size) return;
    for (var i = 0; i < style.length; i++) {
        let currentStyle:CSSRule | null = style[i];
        if(!(currentStyle instanceof CSSStyleRule)) continue;

        if (currentStyle.selectorText == '.description') {
            if(on) {
                size = size + 'px';
            } else {
                size = "auto";
            }
            currentStyle.style['width'] = size;
        }
    }
}
