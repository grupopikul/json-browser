import * as dom from "./dom.js";
var OOI = /** @class */ (function () {
    function OOI(fileName, json) {
        this.nodeIdList = {}; // GET RID OF LATER
        this.privateNamespace = ""; // GET RID OF LATER
        this.filename = fileName;
        if (json.length == 0) {
            this.object = {};
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
        var maybeLiteral = this.checkLiteral(this.object);
        if (maybeLiteral)
            dom.oneValue(maybeLiteral, "200px");
        else
            this.parseObject(this.object, document.getElementsByClassName("root")[0]);
    }
    OOI.prototype.checkLiteral = function (obj) {
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
    };
    // Create three parse functions, parseObject, parseArray, parseLiterally
    OOI.prototype.parseObject = function (obj, container, title) {
        var newNode = dom.createNode(this.newId());
        this.nodeIdList[newNode.id] = newNode;
        dom.addNodeToContainer(container, newNode);
        if (title)
            dom.addTitleToNode(newNode, title);
        // This loop is only for key-value pairs, we don't support arrays yet
        for (var property in obj) {
            var value = obj[property];
            var maybeLiteral = this.checkLiteral(value);
            if (maybeLiteral) {
                dom.addPropertyToNode(newNode, property, value);
            }
            else { // this ignores that the object should know its key
                this.parseObject(value, dom.getContainerFromNode(newNode), property);
            }
        }
    };
    OOI.prototype.newId = function () {
        var id = crypto.randomUUID().split('-')[0];
        while (this.nodeIdList[id] !== undefined) {
            id = crypto.randomUUID().split('-')[0];
        }
        return id;
    };
    OOI.prototype.updateNamespace = function (namespace) {
        var oldnamespace = this.privateNamespace;
        this.privateNamespace = namespace;
    };
    return OOI;
}());
export default OOI;
//# sourceMappingURL=OOI.js.map