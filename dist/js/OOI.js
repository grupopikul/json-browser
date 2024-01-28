import * as dom from "./dom.js";
var OOI = /** @class */ (function () {
    function OOI(fileName, json) {
        this.idList = {}; // GET RID OF LATER
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
            }
        }
        this.beginParse(this.object);
    }
    OOI.prototype.beginParse = function (obj) {
        dom.clearTree();
        if ((obj instanceof Error)) {
            dom.oneValue(String(obj), "50px");
        }
        else if (obj === null) {
            dom.oneValue("NULL!");
        }
        else if (typeof obj === "boolean") {
            if (obj)
                dom.oneValue("TRUE!");
            else
                dom.oneValue("False...");
        }
        else if (typeof obj === "number") {
            dom.oneValue(String(obj));
        }
        else if (typeof obj === "string") {
            dom.oneValue(obj);
        }
        else {
            console.log(typeof obj);
            console.log(obj);
        }
    };
    // Create three parse functions, parseObject, parseArray, parseLiterally
    OOI.prototype.parseObject = function (obj) {
        for (var property in obj) {
            var value = obj[property]; // dumb
            if (Array.isArray(value)) {
                for (var el in value) {
                    if (typeof el === 'object') {
                        this.parseObject(value);
                    }
                    else {
                        console.log("".concat(typeof property, ":").concat(property, ":").concat(typeof value, ":").concat(value));
                    }
                }
            }
            else if (typeof value === 'object') {
                this.parseObject(value);
            }
            else {
                console.log("".concat(typeof property, ":").concat(property, ":").concat(typeof value, ":").concat(value));
            }
        }
    };
    OOI.prototype.updateNamespace = function (namespace) {
        var oldnamespace = this.privateNamespace;
        this.privateNamespace = namespace;
    };
    return OOI;
}());
export default OOI;
//# sourceMappingURL=OOI.js.map