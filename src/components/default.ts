function updateTransition() {
    let el = document.querySelector("body.one");

    if (el) {
        el.classList.remove("one");
        el.classList.add("two");
        updateBackgroundImage(el);
    } else {
        el = document.querySelector("body.two");
        if (el) {
            el.classList.remove("two");
            el.classList.add("three");
        } else {
            el = document.querySelector("body.three");
            el.classList.remove("three");
            el.classList.add("one");
        }
    }

    return el;
}

function updateBackgroundImage(el: Element) {
    if (el.classList.contains("bg-img-1")) {
        el.classList.remove("bg-img-1");
        el.classList.add("bg-img-2");
    } else {
        el.classList.remove("bg-img-2");
        el.classList.add("bg-img-1");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateTransition();
});

window.setInterval(updateTransition, 15000);
