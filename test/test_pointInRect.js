window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    const twoPI = Math.PI * 2;

    let rect0 = {
        x: Math.random() * width,
        y: Math.random() * height,
        width: -50 + Math.random() * 100,
        height: -50 + Math.random() * 100,
    };

    context.clearRect(0, 0, width, height); // to clear everything

    context.fillStyle = "#999";
    context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);

    document.body.addEventListener("mousemove", function (event) {
        point = {
            x: event.clientX,
            y: event.clientY
        }

        if (utils.pointInRect(point.x, point.y, rect0)) {
            context.fillStyle = "#f66";
        } else {
            context.fillStyle = "#999";
        }
        context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
    })
}