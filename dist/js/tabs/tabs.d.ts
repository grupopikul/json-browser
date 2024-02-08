export default class WindowManager {
    parentWindow: HTMLElement;
    launcherParent: HTMLElement;
    launcher: HTMLElement;
    windowList: Array<HTMLElement>;
    activeWindow: number | null;
    _new_launcher_el(): HTMLElement;
    _new_window_el(elementType: string): HTMLElement;
    _new_launcher_item_el(): HTMLElement;
    constructor(parentWindow?: string | HTMLElement, launcherParent?: string | HTMLElement);
    new_window(input?: {
        elementType?: string;
        loader?: boolean;
        name?: string;
    }): HTMLElement;
    close_window(): void;
    switch_window(which: number): void;
}
