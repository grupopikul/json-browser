import OOI from "./OOI.js"; // I wonder what it's actually loading ?

const objs: OOI[] = [] as OOI[];
var currentObject: number = -1;

// Could be better organized by button TODO


// loadObject is called once a file has been read and new OOI is created
function loadObject(obj: OOI): void {
    currentObject = objs.length;
    objs.push(obj);
    updateNamespace(null, obj);
    document.getElementById("current-object")!.innerHTML=obj.filename;
    updateSelect(obj.filename, currentObject);
}
// TODO: what do we do when we ant to select object? Not just add object to select

// Update select adds new object to select box
function updateSelect(name: string, value: number) {
    const box = document.getElementById("select-object") as HTMLSelectElement;
    box.add(new Option(name, String(value), true, true));
}

// the main runs this to add events all toolbar buttons
export function populateToolbar(): void {
    const fileSelector: HTMLInputElement = document.getElementById('file-selector') as HTMLInputElement;
    fileSelector.addEventListener('change', uploadPickerHandler);
    const HTML = document.documentElement;
    HTML.addEventListener('dragenter', () => document.documentElement.style.opacity = '.2');
    HTML.addEventListener('dragleave', () => document.documentElement.style.opacity = '1');
    HTML.addEventListener('drop', dropHandler);
    HTML.addEventListener('dragover', dragOverHandler);
    document.getElementById('fix-width')!.addEventListener("click", () => { fixWidth(true) });
    document.getElementById('unfix-width')!.addEventListener("click", () => { fixWidth(false) });
    const ns_box = document.getElementById("namespace-input") as HTMLInputElement;
    ns_box.addEventListener('keyup', previewNamespace);
    ns_box.addEventListener('paste', previewNamespace);
    ns_box.addEventListener('input', previewNamespace);
    ns_box.addEventListener('change', previewNamespace);
    document.getElementById('update-namespace')!.addEventListener("click", (event) => { updateNamespace(event, null) });
    previewNamespace(null);
    // | Object: // change current object, change namespace, change current object in text and actual
    // | Schema: JSON <button id="rerender">Rerender</button>
    // | Current Namespace: <span id="current-namespace"></span> Current Object: <span id="current-object"></span>
}

// sets all columns to a fixed width, despite text (or undos if false)
function fixWidth(on: Boolean): void {
    const style: CSSRuleList = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
    var size: string | null = (document.getElementById("fix-width-input") as HTMLInputElement)!.value;
    if(!size) return;
    for (var i = 0; i < style.length; i++) {
        let currentStyle:CSSRule | null = style[i];
        if (currentStyle instanceof CSSStyleRule && currentStyle.selectorText == '.description') {
            size = on ? size + 'px' : "auto";
            currentStyle.style['width'] = size;
            return;
        }
    }
}

// Updates the preview button
function previewNamespace(e: Event | null): void {
    const input: HTMLInputElement = document.getElementById("namespace-input") as HTMLInputElement;
    const value: string = input.value;
    const output: HTMLElement = document.getElementById("namespace-preview")!;
    output.innerHTML = value;
}

// Sets namespace of object and indicator when button is clicked to do so (or when new object is uploaded and needs namespace)
function updateNamespace(e: Event | null, obj: OOI | null): void {
    const input: HTMLInputElement = document.getElementById("namespace-input") as HTMLInputElement;
    const value: string = "_" + input.value;
    if (obj !== null) obj.updateNamespace(value);
    document.getElementById("current-namespace")!.innerHTML = value;
}

function uploadPickerHandler(e: Event): void {
    const fileList = (e.target as HTMLInputElement).files;
    if (fileList && fileList.length != 0) {
        processFile(fileList[0]);
    }
    return;
}

function dropHandler(e: Event): void {
    if (!(e instanceof DragEvent) || !e.dataTransfer || e.dataTransfer.items.length == 0) return;
    e.preventDefault();
    if(e.dataTransfer.items) {
        const item: DataTransferItem = e.dataTransfer.items[0];
        if (item.kind === "file") {
            const file: File | null = item.getAsFile();
            if (file) processFile(file);
            return;
        }
    } else {
        const file: File | null = e.dataTransfer.files[0]; // # Now we have a file
        if (file) processFile(file);
        return;
    }
}

function dragOverHandler(e: Event): void {
    e.preventDefault();
}

function processFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.addEventListener('load', (e:ProgressEvent) => {
        const result: string | ArrayBuffer | null = (e.target as FileReader).result;
        if (!(typeof result === 'string')) return;
        loadObject(new OOI(file.name, result));
    });
    reader.readAsText(file);
}
