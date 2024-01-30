import { default as OOI } from "./OOI.js"; // I wonder what it's actually loading ?
const objs = []; // objects is a bad name for the whole file, which is made of objects
var currentObject = -1;
var currentNamespace = "_"; // doesn't always work on refresh
function get_obj() {
    return objs[currentObject];
}
function get_tuple(index) {
    if (index === undefined) {
        // return root
        const root = document.getElementsByClassName('root')[0];
        const rootNode = root.querySelector(".node");
        if (!rootNode)
            return null;
        return get_tuple(rootNode.id);
    }
    return get_obj().nodeIdList[index];
}
window.json_browser = new Object();
window.json_browser.objects = objs;
window.json_browser.currentIndex = currentObject;
window.json_browser.get_obj = get_obj;
window.json_browser.get_tuple = get_tuple;
// Switch needs to actually switch
// Need to deal with arrays
// Need to be able to switch between existing objects
// Does current Namespace always equal what's in the object? (set and load object)
// Need save object
// Rerender doesn't work
// Need load schemas
// TODO: organize by button! same as file!
export function populateToolbar() {
    // SELECT OBJECT STUFF
    document.getElementById("current-object").innerHTML = "None";
    currentObject = -1;
    const objectSelector = document.getElementById("select-object");
    objectSelector.addEventListener("change", loadObjectFromSelect);
    // NAMESPACE STUFF
    document.getElementById('update-namespace').addEventListener("click", updateNamespace);
    const ns_box = document.getElementById("namespace-input");
    ns_box.addEventListener('keyup', previewNamespace);
    ns_box.addEventListener('paste', previewNamespace);
    ns_box.addEventListener('input', previewNamespace);
    ns_box.addEventListener('change', previewNamespace);
    previewNamespace(null);
    currentNamespace = "_";
    document.getElementById("current-namespace").innerHTML = currentNamespace;
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', uploadPickerHandler);
    const HTML = document.documentElement;
    HTML.addEventListener('dragenter', () => document.documentElement.style.opacity = '.2');
    HTML.addEventListener('dragleave', () => document.documentElement.style.opacity = '1');
    HTML.addEventListener('drop', dropHandler);
    HTML.addEventListener('dragover', dragOverHandler);
    document.getElementById('fix-width').addEventListener("click", () => { fixWidth(true); });
    document.getElementById('unfix-width').addEventListener("click", () => { fixWidth(false); });
    // | Object: // change current object, change namespace, change current object in text and actual
    // | Schema: JSON <button id="rerender">Rerender</button>
    // | Current Namespace: <span id="current-namespace"></span> Current Object: <span id="current-object"></span>
}
////////// SELECT OBJECT STUFF
// Update select adds new object to select box
function updateSelect(name, value) {
    const box = document.getElementById("select-object");
    box.add(new Option(name, String(value), true, true));
}
// loadObjectFromFile is called once a file has been read and new OOI is created
function loadObjectFromFile(obj) {
    currentObject = objs.length;
    objs.push(obj);
    document.getElementById("current-object").innerHTML = obj.filename;
    updateSelect(obj.filename, currentObject);
    updateNamespaceFromObject(obj);
}
//loadObjectFromSelect is called if we're just switching
function loadObjectFromSelect() {
    const box = document.getElementById("select-object");
    currentObject = +box.value;
    const obj = objs[currentObject];
    document.getElementById("current-object").innerHTML = obj.filename;
    updateNamespaceFromObject(obj);
    obj.rerender();
}
//// NAME SPACE STUFF
// Sets namespace of object and indicator when button is clicked to do so (or when new object is uploaded and needs namespace)
function updateNamespace(e) {
    const input = document.getElementById("namespace-input");
    const value = "_" + input.value;
    currentNamespace = value;
    document.getElementById("current-namespace").innerHTML = value;
    if (currentObject >= 0)
        objs[currentObject].updateNamespace(value);
}
function updateNamespaceFromObject(obj) {
    currentNamespace = obj.privateNamespace;
    document.getElementById("current-namespace").innerHTML = obj.privateNamespace;
}
// Updates the preview button
function previewNamespace(e) {
    const input = document.getElementById("namespace-input");
    const value = input.value;
    const output = document.getElementById("namespace-preview");
    output.innerHTML = value;
}
// sets all columns to a fixed width, despite text (or undos if false)
function fixWidth(on) {
    const style = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
    var size = document.getElementById("fix-width-input").value;
    if (!size)
        return;
    for (var i = 0; i < style.length; i++) {
        let currentStyle = style[i];
        if (currentStyle instanceof CSSStyleRule && currentStyle.selectorText == '.description') {
            size = on ? size + 'px' : "auto";
            currentStyle.style['width'] = size;
            return;
        }
    }
}
function uploadPickerHandler(e) {
    const fileList = e.target.files;
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
        const item = e.dataTransfer.items[0];
        if (item.kind === "file") {
            const file = item.getAsFile();
            if (file)
                processFile(file);
            return;
        }
    }
    else {
        const file = e.dataTransfer.files[0]; // # Now we have a file
        if (file)
            processFile(file);
        return;
    }
}
function dragOverHandler(e) {
    e.preventDefault();
}
function processFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
        const result = e.target.result;
        if (!(typeof result === 'string'))
            return;
        // Not great but allows us to change namespace before loading
        const output = "_" + document.getElementById("namespace-preview").innerHTML;
        loadObjectFromFile(new OOI(file.name, result, output));
    });
    reader.readAsText(file);
}
//# sourceMappingURL=toolbar.js.map