window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    const twoPI = Math.PI * 2;

    let circle0 = {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 50 + Math.random() * 100
    };

    context.clearRect(0, 0, width, height); // to clear everything
    context.beginPath();
    context.arc(circle0.x, circle0.y, circle0.radius, 0, twoPI, false);
    context.fillStyle = "#999";
    context.fill()

    document.body.addEventListener("mousemove", function (event) {
        point = {
            x: event.clientX,
            y: event.clientY
        }

        if (utils.circlePointCollision(circle0, point)) {
            context.fillStyle = "#f66";
        } else {
            context.fillStyle = "#999";
        }

        context.fill()
    })
}