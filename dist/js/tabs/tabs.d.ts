export default class WindowManager {
    parentWindow: HTMLElement;
    launcherParent: HTMLElement;
    launcher: HTMLElement;
    windowList: Array<HTMLElement>;
    activeWindow: number | null;
    constructor(parentWindow?: string | HTMLElement, launcherParent?: string | HTMLElement);
    new_window(elementType?: string, loader?: boolean): HTMLElement;
    close_window(): void;
    switch_window(): void;
    set_loader(): void;
}
