window.onload = () => {
    const el: HTMLElement = document.querySelector(".root")!;
    el.oncontextmenu = addNodeFromEvent;
    el.onclick = toggleVis;

    const fileSelector: HTMLInputElement = document.getElementById('file-selector') as HTMLInputElement;
    fileSelector.addEventListener('change', (event: Event) => {
        const fileList = (event.target as HTMLInputElement).files;
        if (fileList && fileList.length != 0) {
            processFile(fileList[0]);
        }
        return;
    });

    updateNamespace(null);
};

// *Globals
const objs: OOI[] = [] as OOI[];
var currentObject: number = -1;
function loadObject(obj: OOI): void {
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
