export declare function toggleVis(e: Event): Boolean;
export declare class NodeElement extends HTMLElement {
    constructor(id: string);
    closeNode(): void;
    getContainerFromNode(): HTMLElement;
    addNodeToContainer(container: HTMLElement): void;
    addPropertyToNode(key: string, value: string): void;
    addTitleToNode(title: string): void;
}
export declare function oneValue(value: string, size: string): void;
export declare function clearTree(): void;
