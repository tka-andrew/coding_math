window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    function generateQuadrilateral() {
        let p1 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        let p2 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        let p3 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        let p4 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        return quadrilateral.create(p1, p2, p3, p4);
    }

    function drawPoint(p, radius = 4, fillStyle = "#000000") {
        let previousFillStyle = context.fillStyle
        context.beginPath();
        context.fillStyle = fillStyle;
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = previousFillStyle;
    }

    function drawQuadrilateral(q) {
        let p1 = q.get_p1();
        let p2 = q.get_p2();
        let p3 = q.get_p3();
        let p4 = q.get_p4();

        drawPoint(p1);
        drawPoint(p2, 10, '#ff0000');
        drawPoint(p3, 20, '#00ff00');
        drawPoint(p4, 30, '#0000ff');

        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.lineTo(p4.x, p4.y);
        context.lineTo(p1.x, p1.y);
        context.stroke();
    }

    let q1 = generateQuadrilateral();
    let q2 = generateQuadrilateral();

    let hasIntersection = utils.quadrilateralIntersect(q1, q2);

    drawQuadrilateral(q1);
    drawQuadrilateral(q2);
    if (hasIntersection) {
        context.fill();
    }

};