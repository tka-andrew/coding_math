window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    function generateCubicBezierCurve() {
        let j1 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        let cp1 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        let cp2 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        let j2 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        };
        return cubicBezierCurve.create(j1, cp1, cp2, j2);
    }

    function drawPoint(p, radius = 4, fillStyle = "#000000") {
        let previousFillStyle = context.fillStyle
        context.beginPath();
        context.fillStyle = fillStyle;
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = previousFillStyle;
    }

    function mouseNear(mouseevent, target) {
        let mX = mouseevent.clientX;
        let mY = mouseevent.clientY;
        let tolerance = 10;
        let xMatch = utils.inRange(mX, target.x - tolerance, target.x + tolerance);
        let yMatch = utils.inRange(mY, target.y - tolerance, target.y + tolerance);
        return xMatch && yMatch;
    }

    function onMouseDown() {
        document.body.style.cursor = 'move';
        if (mouseNear(event, cubicBezier1.get_j1())) {
            currentControl = cubicBezier1.get_j1();
        } else if (mouseNear(event, cubicBezier1.get_cp1())) {
            currentControl = cubicBezier1.get_cp1();
        } else if (mouseNear(event, cubicBezier1.get_cp2())) {
            currentControl = cubicBezier1.get_cp2();
        } else if (mouseNear(event, cubicBezier1.get_j2())) {
            currentControl = cubicBezier1.get_j2();
        } else if (mouseNear(event, cubicBezier2.get_j1())) {
            currentControl = cubicBezier2.get_j1();
        } else if (mouseNear(event, cubicBezier2.get_cp1())) {
            currentControl = cubicBezier2.get_cp1();
        } else if (mouseNear(event, cubicBezier2.get_cp2())) {
            currentControl = cubicBezier2.get_cp2();
        } else if (mouseNear(event, cubicBezier2.get_j2())) {
            currentControl = cubicBezier2.get_j2();
        } else {
            document.body.style.cursor = 'default';
        }
    }

    function onMouseUp() {
        document.body.style.cursor = 'default';
        currentControl = null;
    }

    function onMouseMove() {
        if (currentControl === null) {
            return;
        }
        currentControl.x = event.clientX;
        currentControl.y = event.clientY;
        updateNeeded = true;
    }

    function drawCubicBezierCurve(cbc) {
        let j1 = cbc.get_j1();
        let cp1 = cbc.get_cp1();
        let cp2 = cbc.get_cp2();
        let j2 = cbc.get_j2();
        drawPoint(j1, 10);
        drawPoint(cp1, 10, "#FF0000");
        drawPoint(cp2, 10, "#FF0000");
        drawPoint(j2, 10);

        context.strokeStyle = "gray";
        context.beginPath();
        context.setLineDash([5, 15]);
        context.moveTo(j1.x, j1.y);
        context.lineTo(cp1.x, cp1.y);
        context.stroke();

        context.strokeStyle = "gray";
        context.beginPath();
        context.setLineDash([5, 15]);
        context.moveTo(j2.x, j2.y);
        context.lineTo(cp2.x, cp2.y);
        context.stroke();

        context.setLineDash([]);

        // first point
        let pFinal = {}
        for (var t = 0; t <= 1; t += 0.01) {
            utils.cubicBezier(j1, cp1, cp2, j2, t, pFinal);
            drawPoint(pFinal, 4, "#000000")
        }

        for (var t = 0; t <= 1; t += 0.05) {
            utils.cubicBezier(j1, cp1, cp2, j2, t, pFinal);
            drawPoint(pFinal, 8, "#ff00ff")
        }

        // the below line is to cover the case where t could be 0.950000002 before += 0.05
        utils.cubicBezier(j1, cp1, cp2, j2, 1, pFinal);
        drawPoint(pFinal, 8, "#ff00ff")
    }

    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mousemove", onMouseMove);

    let currentControl = null;
    let cubicBezier1 = generateCubicBezierCurve();
    let cubicBezier2 = generateCubicBezierCurve();

    var updateNeeded = true;
    render();

    function render() {
        if (updateNeeded) {
            context.clearRect(0, 0, width, height);
            drawCubicBezierCurve(cubicBezier1);
            drawCubicBezierCurve(cubicBezier2);
            updateNeeded = false;
        }
        requestAnimationFrame(render);
    }

};