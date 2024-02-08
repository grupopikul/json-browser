export default class WindowManager {
    parentWindow: HTMLElement;
    launcherParent: HTMLElement;
    launcher: HTMLElement;
    windowList: Array<HTMLElement>;
    activeWindow: number | null;
    constructor(parentWindow?: string | HTMLElement, launcherParent?: string | HTMLElement);
    new_window(input: {
        elementType?: string;
        loader?: boolean;
        name?: string;
    }): HTMLElement;
    close_window(): void;
    switch_window(which: number): void;
    set_loader(): void;
}
