"use strict";
window.onload = function () {
    var el = document.querySelector(".root");
    el.oncontextmenu = addNodeFromEvent;
    el.onclick = toggleVis;
    var fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', function (event) {
        var fileList = event.target.files;
        if (fileList && fileList.length != 0) {
            processFile(fileList[0]);
        }
        return;
    });
    updateNamespace(null);
};
// *Globals
var objs = [];
var currentObject = -1;
function loadObject(obj) {
    currentObject = objs.length;
    objs.push(obj);
}
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