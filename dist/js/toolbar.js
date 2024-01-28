import OOI from "./OOI.js"; // I wonder what it's actually loading ?
var objs = [];
var currentObject = -1;
// Dom needs to be a class
// Could be better organized by button TODO
// TODO: what do we do when we ant to select object? Not just add object to select
// More logic for setting namespace TODO (if we change it, change all namespace in object)
// Need save object
// Need load schemas
// Rerender doesn't work
// loadObject is called once a file has been read and new OOI is created
function loadObject(obj) {
    currentObject = objs.length;
    objs.push(obj);
    updateNamespace(null, obj);
    document.getElementById("current-object").innerHTML = obj.filename;
    updateSelect(obj.filename, currentObject);
}
// Update select adds new object to select box
function updateSelect(name, value) {
    var box = document.getElementById("select-object");
    box.add(new Option(name, String(value), true, true));
}
// the main runs this to add events all toolbar buttons
export function populateToolbar() {
    var fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', uploadPickerHandler);
    var HTML = document.documentElement;
    HTML.addEventListener('dragenter', function () { return document.documentElement.style.opacity = '.2'; });
    HTML.addEventListener('dragleave', function () { return document.documentElement.style.opacity = '1'; });
    HTML.addEventListener('drop', dropHandler);
    HTML.addEventListener('dragover', dragOverHandler);
    document.getElementById('fix-width').addEventListener("click", function () { fixWidth(true); });
    document.getElementById('unfix-width').addEventListener("click", function () { fixWidth(false); });
    var ns_box = document.getElementById("namespace-input");
    ns_box.addEventListener('keyup', previewNamespace);
    ns_box.addEventListener('paste', previewNamespace);
    ns_box.addEventListener('input', previewNamespace);
    ns_box.addEventListener('change', previewNamespace);
    document.getElementById('update-namespace').addEventListener("click", function (event) { updateNamespace(event, null); });
    previewNamespace(null);
    // | Object: // change current object, change namespace, change current object in text and actual
    // | Schema: JSON <button id="rerender">Rerender</button>
    // | Current Namespace: <span id="current-namespace"></span> Current Object: <span id="current-object"></span>
}
// sets all columns to a fixed width, despite text (or undos if false)
function fixWidth(on) {
    var style = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
    var size = document.getElementById("fix-width-input").value;
    if (!size)
        return;
    for (var i = 0; i < style.length; i++) {
        var currentStyle = style[i];
        if (currentStyle instanceof CSSStyleRule && currentStyle.selectorText == '.description') {
            size = on ? size + 'px' : "auto";
            currentStyle.style['width'] = size;
            return;
        }
    }
}
// Updates the preview button
function previewNamespace(e) {
    var input = document.getElementById("namespace-input");
    var value = input.value;
    var output = document.getElementById("namespace-preview");
    output.innerHTML = value;
}
// Sets namespace of object and indicator when button is clicked to do so (or when new object is uploaded and needs namespace)
function updateNamespace(e, obj) {
    var input = document.getElementById("namespace-input");
    var value = "_" + input.value;
    if (obj !== null)
        obj.updateNamespace(value);
    document.getElementById("current-namespace").innerHTML = value;
}
function uploadPickerHandler(e) {
    var fileList = e.target.files;
    if (fileList && fileList.length != 0) {
        processFile(fileList[0]);
    }
    return;
}
function dropHandler(e) {
    if (!(e instanceof DragEvent) || !e.dataTransfer || e.dataTransfer.items.length == 0)
        return;
    e.preventDefault();
    if (e.dataTransfer.items) {
        var item = e.dataTransfer.items[0];
        if (item.kind === "file") {
            var file = item.getAsFile();
            if (file)
                processFile(file);
            return;
        }
    }
    else {
        var file = e.dataTransfer.files[0]; // # Now we have a file
        if (file)
            processFile(file);
        return;
    }
}
function dragOverHandler(e) {
    e.preventDefault();
}
function processFile(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
        var result = e.target.result;
        if (!(typeof result === 'string'))
            return;
        loadObject(new OOI(file.name, result));
    });
    reader.readAsText(file);
}
//# sourceMappingURL=toolbar.js.map