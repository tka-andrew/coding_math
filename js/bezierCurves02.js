window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    let p0 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };
    let desiredP = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };
    let p2 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };

    let cp = {};
    cp.x = desiredP.x * 2 - (p0.x + p2.x) / 2;
    cp.y = desiredP.y * 2 - (p0.y + p2.y) / 2;

    function drawPoint(p, fillStyle = "#000000") {
        let previousFillStyle = context.fillStyle
        context.beginPath();
        context.fillStyle = fillStyle;
        context.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = previousFillStyle;
    }

    drawPoint(p0);
    drawPoint(desiredP, "#F00000");
    drawPoint(p2);
    drawPoint(cp, "#00F");

    context.strokeStyle = "lightgray";
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(cp.x, cp.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();

    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    context.stroke();
};