let mousePos = {};

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("mousemove", function (e) {
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
});

window.addEventListener("mouseleave", function (e) {
    mousePos.x = -1;
    mousePos.y = -1;
});

let draw;

window.addEventListener("mousemove", function () {
    if (!draw) {
        draw = setInterval(function () {
            if (mousePos.x > 0 && mousePos.y > 0) {
                let range = 5;
                let color = "background: rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ");";
                let sizeInt = getRandomInt(5, 15);
                let size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
                let left = "left: " + getRandomInt(mousePos.x - range - sizeInt, mousePos.x + range) + "px;";
                let top = "top: " + getRandomInt(mousePos.y - range - sizeInt, mousePos.y + range) + "px;";
                let style = left + top + color;

                let div = document.createElement("div");
                div.className = "ball";
                div.style.cssText = style + size;

                div.addEventListener("animationend", function () {
                    this.parentNode.removeChild(this);
                }, false);

                document.getElementById("wrap").appendChild(div);
            }
        }, 1);
    }
});



