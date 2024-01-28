import * as dom from "./dom.js";

export default class OOI {
    filename: string;
    object: Object;
    idList: { [key: string]: Boolean } = {}; // GET RID OF LATER
    privateNamespace: string = ""; // GET RID OF LATER

    constructor(fileName: string, json: string) {
        this.filename = fileName;
        if (json.length == 0) {
            this.object = {}
        } else {
            this.object = JSON.parse(json);
        }
        this.beginParse(this.object);
    }
    beginParse(obj: Object): void {
        if (obj === null) {
            dom.oneValue("NULL!");
        } else if (typeof obj === "boolean" ) {
            if(obj) dom.oneValue("TRUE!");
            else dom.oneValue("False...");
        } else if (typeof obj === "number" ) {
            dom.oneValue(String(obj));
        } else if (typeof obj === "string" ) {
            dom.oneValue(obj);
        } else {
            console.log(typeof obj);
            console.log(obj);
        }
    }
    // Create three parse functions, parseObject, parseArray, parseLiterally
    parseObject(obj: Object): void {
        for (const property in obj) {
            var value: any = obj[property as keyof Object]; // dumb
            if (Array.isArray(value)) {
                for (const el in value) {
                    if (typeof el === 'object') {
                        this.parseObject(value);
                    } else {
                        console.log(`${typeof property}:${property}:${typeof value}:${value}`);
                    }
                }
            } else if (typeof value === 'object') {
                this.parseObject(value);
            } else {
                console.log(`${typeof property}:${property}:${typeof value}:${value}`);
            }
        }
    }
    updateNamespace(namespace: string): void {
        const oldnamespace: string = this.privateNamespace;
        this.privateNamespace = namespace;
    }
}

