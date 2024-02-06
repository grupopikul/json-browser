// Adapt this to something AppManager which is like this but without add etc.

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
    this.launcherParent.appendChild(this.launcher);
  }

  new_window(elementType: string = "div", loader: boolean = true): HTMLElement {
    let newWindow: HTMLElement = document.createElement(elementType);

    if(loader) {
      newWindow.innerHTML = "loading...";
    }

    // Handle windowList
    if(this.activeWindow === null) this.activeWindow = 0;
    else this.activeWindow = this.windowList.length;
    this.windowList.push(newWindow);
    this.parentWindow.appendChild(newWindow);

    let newIcon : HTMLElement = document.createElement('li');
    newIcon.innerHTML = (this.activeWindow+1).toString();
    this.launcher.appendChild(newIcon);

    return newWindow;
  }

  close_window() {
    // remove item from windowList
    // remove item from LauncherParent
    // remove item from parentWindow


    // switch the window
  }

  switch_window() {
    // just turn a different item on
  }

  set_loader() {
    // this calls a loading window
  }
}
