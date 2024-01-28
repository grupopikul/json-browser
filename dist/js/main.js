import * as toolbar from "./toolbar.js";
import * as dom from "./dom.js";
window.onload = function () {
    // Add main interface
    var el = document.querySelector(".root");
    //el.oncontextmenu = addNodeFromEvent;
    el.onclick = dom.toggleVis;
    toolbar.populateToolbar();
};
/*
*/
//# sourceMappingURL=main.js.map