// Adapt this to something AppManager which is like this but without add etc.
const launcher_class = "wm-launcher";
const window_class = "wm-window";
export default class WindowManager {
    _new_launcher_el() {
        let el = document.createElement("ul");
        el.className = launcher_class;
        return el;
    }
    _new_window_el(elementType) {
        let el = document.createElement(elementType);
        el.className = window_class;
        return el;
    }
    _new_launcher_item_el() {
        let el = document.createElement("li");
        return el;
    }
    // So, the idea here is that only styling is pulled out of normal flow.
    // The script can set dataset, innerhtml if it wants to.
    // It would probably at some pont make more sense to inherit a different object.
    // Probably should overload the attach function too
    constructor(parentWindow = document.body, launcherParent = document.body) {
        // windowList items
        this.windowList = [];
        this.activeWindow = null;
        if (typeof parentWindow === "string") {
            let tempElement = document.querySelector(parentWindow);
            if (tempElement instanceof HTMLElement)
                parentWindow = tempElement;
            else
                throw new Error("parentWindow didn't resolve to an element");
        }
        if (typeof launcherParent === "string") {
            let tempElement = document.querySelector(launcherParent);
            if (tempElement instanceof HTMLElement)
                launcherParent = tempElement;
            else
                throw new Error("launcherParent didn't resolve to an element");
        }
        this.parentWindow = parentWindow;
        this.launcherParent = launcherParent;
        this.launcher = this._new_launcher_el();
        this.launcherParent.appendChild(this.launcher);
    }
    new_window(input = {}) {
        var _a, _b, _c;
        let elementType = (_a = input.elementType) !== null && _a !== void 0 ? _a : "div";
        let loader = (_b = input.loader) !== null && _b !== void 0 ? _b : true;
        let name = (_c = input.name) !== null && _c !== void 0 ? _c : null;
        let newWindow = this._new_window_el(elementType);
        if (loader) {
            newWindow.innerHTML = "loading...";
        }
        // Handle windowList
        let windowNumber = this.windowList.length;
        this.windowList.push(newWindow);
        this.parentWindow.appendChild(newWindow);
        let newIcon = this._new_launcher_item_el();
        if (name === null)
            name = (windowNumber + 1).toString();
        newIcon.innerHTML = name;
        newIcon.dataset.windowNumber = windowNumber.toString();
        const cb = function (event) {
            this.switch_window(+event.currentTarget.dataset.windowNumber);
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
    // get_active_window
    switch_window(which) {
        if (which >= this.windowList.length)
            throw new Error("Can't switch to window that doesn't exist");
        if (which === this.activeWindow)
            return;
        let icons = this.launcher.querySelectorAll("li");
        if (this.activeWindow !== null) {
            this.windowList[this.activeWindow].classList.remove("active");
            icons[this.activeWindow].classList.remove("active");
        }
        this.activeWindow = which;
        this.windowList[this.activeWindow].classList.add("active");
        icons[this.activeWindow].classList.add("active");
        return;
    }
}
//# sourceMappingURL=tabs.js.map