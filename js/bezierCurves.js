window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p0 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p1 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p2 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p3 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };

    context.beginPath();
    context.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
    context.fillStyle = "#FF0000";
    context.fill();

    context.beginPath();
    context.arc(p2.x, p2.y, 4, 0, Math.PI * 2, false);
    context.fillStyle = "#FF0000";
    context.fill();

    context.beginPath();
    context.arc(p3.x, p3.y, 4, 0, Math.PI * 2, false);
    context.fillStyle = "#000000";
    context.fill();

    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    context.fillStyle = "#000000";
    context.stroke();

    context.beginPath();
    context.moveTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.fillStyle = "#FF0000";
    context.setLineDash([5, 15]);
    context.stroke();

    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.setLineDash([5, 15]);
    context.stroke();

    context.fillStyle = "#000000";

    let pFinal = {};

    for (var t = 0; t <= 1; t += 0.01) {
        pFinal = utils.cubicBezier(p0, p1, p2, p3, t);
        context.beginPath();
        context.arc(pFinal.x, pFinal.y, 4, 0, Math.PI * 2, false);
        // context.stroke();
        context.fill();
    }

};