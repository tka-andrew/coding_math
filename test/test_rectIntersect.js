window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    const twoPI = Math.PI * 2;
    let maxRectWidth = 150;
    let maxRectHeight = 150;

    let rect0 = {
        x: Math.random() * (width - maxRectWidth - maxRectWidth) + maxRectWidth,
        y: Math.random() * (height - maxRectHeight - maxRectHeight) + maxRectHeight,
        width: 50 + Math.random() * 100,
        height: 50 + Math.random() * 100,
    };

    let rect1 = {
        x: Math.random() * (width - maxRectWidth - maxRectWidth) + maxRectWidth,
        y: Math.random() * (height - maxRectHeight - maxRectHeight) + maxRectHeight,
        width: 50 + Math.random() * 100,
        height: 50 + Math.random() * 100,
    };

    context.clearRect(0, 0, width, height); // to clear everything

    if (utils.rectIntersect(rect0, rect1)) {
        context.fillStyle = "#f66";
    } else {
        context.fillStyle = "#999";
    }
    context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
    context.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);

    document.body.addEventListener("mousemove", function (event) {
        context.clearRect(0, 0, width, height); // to clear everything
        rect1.x = event.clientX;
        rect1.y = event.clientY;

        if (utils.rectIntersect(rect0, rect1)) {
            context.fillStyle = "#f66";
        } else {
            context.fillStyle = "#999";
        }
        context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
        context.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
    })
}