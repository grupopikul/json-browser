import * as toolbar from "./toolbar.js";
window.onload = function () {
    // Add main interface
    var el = document.querySelector(".root");
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
//# sourceMappingURL=main.js.map