import * as dom from "./dom.js";

export default class OOI {
    filename: string;
    object: Object;
    nodeIdList: { [key: string]: HTMLElement } = {}; // GET RID OF LATER
    privateNamespace: string = ""; // GET RID OF LATER

    constructor(fileName: string, json: string) {
        this.filename = fileName;
        if (json.length == 0) {
            this.object = {}
        } else {
            try {
                this.object = JSON.parse(json);
            } catch (e) {
                this.object = e instanceof Error ? e : new Error(String(e))
                dom.oneValue(String(this.object), "20px")
                return;
            }
        }
        const maybeLiteral: string | null = this.checkLiteral(this.object);
        if(maybeLiteral) dom.oneValue(maybeLiteral, "200px")
        else this.parseObject(this.object, document.getElementsByClassName("root")[0] as HTMLElement);
    }
    checkLiteral(obj: any): string | null {
         if (obj === null) {
            return "null";
        } else if (typeof obj === "boolean" ) {
            if(obj) return "true";
            else return "false";
        } else if (typeof obj === "number" ) {
            return obj.toString();
        } else if (typeof obj === "string" ) {
            return obj;
        } else {
            return null;
        }
    }
    // Create three parse functions, parseObject, parseArray, parseLiterally
    parseObject(obj: Object, container: HTMLElement, title?: string): void {
        const newNode: HTMLElement = dom.createNode(this.newId());
        this.nodeIdList[newNode.id] = newNode;
        dom.addNodeToContainer(container, newNode);
        if (title) dom.addTitleToNode(newNode, title);
        // This loop is only for key-value pairs, we don't support arrays yet
        for (const property in obj) {
            const value: any = obj[property as keyof typeof obj];
            const maybeLiteral: string | null = this.checkLiteral(value);
            if(maybeLiteral) {
                dom.addPropertyToNode(newNode, property, value);
            } else { // this ignores that the object should know its key
                this.parseObject(value, dom.getContainerFromNode(newNode), property);
            }

        }
    }

    newId() {
        var id: string = crypto.randomUUID().split('-')[0];
        while(this.nodeIdList[id] !== undefined) {
            id = crypto.randomUUID().split('-')[0];
        }
        return id
    }

    updateNamespace(namespace: string): void {
        const oldnamespace: string = this.privateNamespace;
        this.privateNamespace = namespace;
    }
}

