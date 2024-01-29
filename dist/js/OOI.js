import * as dom from "./dom.js";
export default class OOI {
    constructor(fileName, json, privateNamespace) {
        this.nodeIdList = {};
        this.filename = fileName;
        this.privateNamespace = privateNamespace;
        if (json.length == 0) {
            this.object = "empty file";
        }
        else {
            try {
                this.object = JSON.parse(json);
            }
            catch (e) {
                this.object = e instanceof Error ? e : new Error(String(e));
                dom.oneValue(String(this.object), "20px");
                return;
            }
        }
        const maybeLiteral = this.checkLiteral(this.object);
        if (maybeLiteral)
            dom.oneValue(maybeLiteral, "200px");
        else {
            dom.clearTree();
            this.parseObject(this.object, document.getElementsByClassName("root")[0]);
        }
    }
    rerender() {
        if (this.object instanceof Error) {
            dom.oneValue(String(this.object), "20px");
            return;
        }
        const maybeLiteral = this.checkLiteral(this.object);
        if (maybeLiteral)
            dom.oneValue(maybeLiteral, "200px");
        else {
            dom.clearTree();
            this.parseObject(this.object, document.getElementsByClassName("root")[0]);
        }
    }
    checkLiteral(obj) {
        if (obj === null) {
            return "null";
        }
        else if (typeof obj === "boolean") {
            if (obj)
                return "true";
            else
                return "false";
        }
        else if (typeof obj === "number") {
            return obj.toString();
        }
        else if (typeof obj === "string") {
            return obj;
        }
        else {
            return null;
        }
    }
    isArray(obj) {
        if (Array.isArray(obj))
            return true;
    }
    // Create three parse functions, parseObject, parseArray, parseLiterally
    parseObject(obj, container, title) {
        const newNode = new dom.NodeElement(this.newId());
        this.nodeIdList[newNode.id] = { "element": newNode, "object": obj };
        if (obj)
            obj[(this.privateNamespace + "id")] = newNode.id; // why woudln't it be an object. if empty, i suppose
        newNode.addNodeToContainer(container);
        if (title)
            newNode.addTitleToNode(title);
        // This loop is only for key-value pairs, we don't support arrays yet
        for (const property in obj) {
            const value = obj[property];
            const maybeLiteral = this.checkLiteral(value);
            if (maybeLiteral) {
                newNode.addPropertyToNode(property, value);
            }
            else { // this ignores that the object should know its key
                const newTitle = this.isArray(value) ? property + "[]" : property;
                this.parseObject(value, newNode.getContainerFromNode(), newTitle);
            }
        }
    }
    newId() {
        var id = crypto.randomUUID().split('-')[0];
        while (this.nodeIdList[id] !== undefined) {
            id = crypto.randomUUID().split('-')[0];
        }
        return id;
    }
    updateNamespace(namespace) {
        const oldnamespace = this.privateNamespace;
        this.privateNamespace = namespace;
        // TODO: gotta go through our object and make the change
        // Then we do a rerender
        console.log(this.privateNamespace);
    }
}
//# sourceMappingURL=OOI.js.map