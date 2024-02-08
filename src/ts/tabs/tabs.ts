// Adapt this to something AppManager which is like this but without add etc.
const launcher_class = "wm-launcher";
const window_class = "wm-window";

export default class WindowManager {
  parentWindow: HTMLElement;

  // Launcher items
  launcherParent: HTMLElement;
  launcher: HTMLElement;

  // windowList items
  windowList: Array<HTMLElement> = [];
  activeWindow: number | null = null;

  constructor(parentWindow: string | HTMLElement = document.body, launcherParent: string | HTMLElement = document.body) {
    if(typeof parentWindow === "string") {
      let tempElement: Element | null = document.querySelector(parentWindow);
      if(tempElement instanceof HTMLElement) parentWindow = tempElement;
      else throw new Error("parentWindow didn't resolve to an element");
    }

    if(typeof launcherParent === "string") {
      let tempElement: Element | null = document.querySelector(launcherParent);
      if(tempElement instanceof HTMLElement) launcherParent = tempElement;
      else throw new Error("launcherParent didn't resolve to an element");
    }

    this.parentWindow = parentWindow;
    this.launcherParent = launcherParent;

    this.launcher = document.createElement("ul");
    this.launcher.className = launcher_class;
    this.launcherParent.appendChild(this.launcher);

  }

  new_window(input: { elementType?: string, loader?: boolean, name?: string}): HTMLElement {
    let elementType: string = input.elementType ?? "div";
    let loader: boolean = input.loader ?? true;
    let name: string | null = input.name ?? null;
    let newWindow: HTMLElement = document.createElement(elementType);
    newWindow.className = window_class;
    if(loader) {
      newWindow.innerHTML = "loading...";
    }

    // Handle windowList
    let windowNumber = this.windowList.length;
    this.windowList.push(newWindow);
    this.parentWindow.appendChild(newWindow);

    let newIcon : HTMLElement = document.createElement('li');
    if(name === null) name = (windowNumber+1).toString();
    newIcon.innerHTML = name;
    newIcon.dataset.windowNumber = windowNumber.toString();

    const cb: (this: WindowManager, arg0: Event) => void = function(event: Event) {
      this.switch_window(+(event.currentTarget as HTMLElement).dataset.windowNumber!);
      event.preventDefault();
      event.stopPropagation();
    };
    newIcon.addEventListener('click', cb.bind(this));
    this.launcher.appendChild(newIcon);

    return newWindow;
  }

  close_window() {
    // unimplemented
  }

  switch_window(which: number): void {
    if(which >= this.windowList.length) throw new Error("Can't switch to window that doesn't exist");
    if(which === this.activeWindow) return;
    let icons = this.launcher.querySelectorAll("li");
    if(this.activeWindow !== null) {
      this.windowList[this.activeWindow].classList.remove("active");
      icons[this.activeWindow].classList.remove("active");
    }
    this.activeWindow = which;
    this.windowList[this.activeWindow].classList.add("active");
    icons[this.activeWindow].classList.add("active");

    return;
  }

  set_loader() {
    // this calls a loading window
  }
}
