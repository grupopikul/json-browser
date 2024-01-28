import * as toolbar from "./toolbar.js";

window.onload = () => {
    // Add main interface
    const el: HTMLElement = document.querySelector(".root")!;
    //el.oncontextmenu = addNodeFromEvent;
    //el.onclick = toggleVis;
    toolbar.populateToolbar();
};

/*
    crypto.randomUUID().split('-')[0];
    if(currentObject >= 0) {
        while(possibleObjects[currentObject].idList[node.id] !== undefined) {
            node.id = crypto.randomUUID().split('-')[0];
        }
        possibleObjects[currentObject].idList[node.id] = true;
    } // TODO probably better in the class
*/
