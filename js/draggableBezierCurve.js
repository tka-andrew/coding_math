window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
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

    let currentControl = null;

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

    var updateNeeded = true;

    document.body.addEventListener("mousedown", function (event) {
        document.body.style.cursor = 'move';
        if (mouseNear(event, j1)) {
            currentControl = j1;
        } else if (mouseNear(event, j2)) {
            currentControl = j2;
        } else if (mouseNear(event, cp1)) {
            currentControl = cp1;
        } else if (mouseNear(event, cp2)) {
            currentControl = cp2;
        } else {
            document.body.style.cursor = 'default';
        }
    })

    document.body.addEventListener("mouseup", function (event) {
        document.body.style.cursor = 'default';
        currentControl = null;
    })

    document.body.addEventListener("mousemove", function (event) {
        if (currentControl === null) {
            return;
        }
        currentControl.x = event.clientX;
        currentControl.y = event.clientY;
        updateNeeded = true;
    })

    render();

    function render() {
        if (updateNeeded) {
            context.clearRect(0, 0, width, height);

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
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(j1.x, j1.y);
            context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, j2.x, j2.y);
            context.stroke();
            updateNeeded = false;
        }
        requestAnimationFrame(render);
    }

};