import * as dom from "./dom.js";

export interface nodeTuple {
    element: dom.NodeElement;
    object: { [key: string]: any } | Array<any>;
}
interface nodeDictionary {
    [index: string]: nodeTuple;
}
export default class OOI {
    filename: string;
    object: Object; // is Object same as any?
    nodeIdList: nodeDictionary = {}
    privateNamespace: string; // GET RID OF LATER

    constructor(fileName: string, json: string, privateNamespace: string) {
        this.filename = fileName;
        this.privateNamespace = privateNamespace;
        if (json.length == 0) {
            this.object = "empty file";
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
        else {
            dom.clearTree();
            const newNode: dom.NodeElement = this.parseObject(this.object, document.getElementsByClassName("root")[0] as HTMLElement, this.filename);
            newNode.toggleVis();
        }
    }
    rerender(): void {
        if(this.object instanceof Error) {
            dom.oneValue(String(this.object), "20px");
            return
        }
        const maybeLiteral: string | null = this.checkLiteral(this.object);
        if(maybeLiteral) dom.oneValue(maybeLiteral, "200px");
        else {
            dom.clearTree();
            const newNode: dom.NodeElement = this.parseObject(this.object, document.getElementsByClassName("root")[0] as HTMLElement, this.filename);
            newNode.toggleVis();
        }
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
    isArray(obj: any) {
        if(Array.isArray(obj)) return true;
    }
    // Create three parse functions, parseObject, parseArray, parseLiterally
    parseObject(obj: any, container: HTMLElement, title?: string): dom.NodeElement {
        // I choose to use any here because that is what JSON returns
        // and I don't know what is coming in.
        const newNode: dom.NodeElement = new dom.NodeElement(this.newId());
        this.nodeIdList[newNode.id] = {"element": newNode, "object": obj};

        if (obj) obj[(this.privateNamespace+"_id")] = newNode.id;
        newNode.addNodeToContainer(container);
        if (title) newNode.addTitleToNode(title);
        // This loop is only for key-value pairs, we don't support arrays yet
        for (const property in obj) {
            const value: any = obj[property];
            const maybeLiteral: string | null = this.checkLiteral(value);
            if(maybeLiteral) {
                newNode.addPropertyToNode(property, value);
            } else { // this ignores that the object should know its key
                const newTitle = this.isArray(value) ? property + "[]" : property;
                this.parseObject(value, newNode.getContainerFromNode(), newTitle);
            }

        }
        return newNode;
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
        // TODO: gotta go through our object and make the change
        // Then we do a rerender
        console.log(this.privateNamespace);
    }
}

