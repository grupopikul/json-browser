export default class OOI {
    filename: string;
    object: Object;
    nodeIdList: {
        [key: string]: HTMLElement;
    };
    privateNamespace: string;
    constructor(fileName: string, json: string, privateNamespace: string);
    rerender(): void;
    checkLiteral(obj: any): string | null;
    isArray(obj: any): true | undefined;
    parseObject(obj: Object, container: HTMLElement, title?: string): void;
    newId(): string;
    updateNamespace(namespace: string): void;
}
