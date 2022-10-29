window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let p0 = {
        x: 100,
        y: 100
    };
    let p1 = {
        x: 500,
        y: 500
    };
    let p2 = {
        x: 600,
        y: 50
    };
    let p3 = {
        x: 80,
        y: 600
    };
    let clickPoint = null;

    document.body.addEventListener("mousedown", onMouseDown);

    function onMouseDown(event) {
        clickPoint = getClickPoint(event.clientX, event.clientY);
        if (clickPoint) {
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
        }
    }

    function onMouseMove(event) {
        clickPoint.x = event.clientX;
        clickPoint.y = event.clientY;
        render();
    }

    function onMouseUp(event) {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
    }

    function getClickPoint(x, y) {
        var points = [p0, p1, p2, p3];
        for (var i = 0; i < points.length; i++) {
            var p = points[i],
                dx = p.x - x,
                dy = p.y - y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) {
                return p;
            }

        }
    }


    render();

    function render() {
        context.clearRect(0, 0, width, height);

        drawPoint(p0);
        drawPoint(p1);
        drawPoint(p2);
        drawPoint(p3);

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.moveTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.stroke();

        var intersect = segmentIntersect(p0, p1, p2, p3);

        if (intersect) {
            context.beginPath();
            context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
            context.stroke();
        }

    }

    function drawPoint(p) {
        context.beginPath();
        context.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
        context.fill();
    }

    /**
     * y = mx + c
     * y = (y1-y0)/(x1-x0) * x + c
     * (x1-x0)(y) = (y1-y0)(x) + (x1-x0)(c)
     * -(y1-y0)(x) + (x1-x0)(y) = (x1-x0)(c)
     * (y1-y0)(x) + (x0-x1)(y) = (x1-x0)(c)
     * Ax + By = C // standard form
     * A = y1 - y0
     * B = x0 - x1
     * C = Ax + By = A(x0) + B(y0) = A(x1) + B(y1)
     */
    function lineIntersect(p0, p1, p2, p3) {
        let A1 = p1.y - p0.y;
        let B1 = p0.x - p1.x;
        let C1 = A1 * p0.x + B1 * p0.y;
        let A2 = p3.y - p2.y;
        let B2 = p2.x - p3.x;
        let C2 = A2 * p2.x + B2 * p2.y;
        let denominator = A1 * B2 - A2 * B1;

        if (denominator === 0) {
            return null;
        }

        return {
            x: (B2 * C1 - B1 * C2) / denominator,
            y: (A1 * C2 - A2 * C1) / denominator
        }
    }

    function segmentIntersect(p0, p1, p2, p3) {
        let A1 = p1.y - p0.y;
        let B1 = p0.x - p1.x;
        let C1 = A1 * p0.x + B1 * p0.y;
        let A2 = p3.y - p2.y;
        let B2 = p2.x - p3.x;
        let C2 = A2 * p2.x + B2 * p2.y;
        let denominator = A1 * B2 - A2 * B1;

        if (denominator === 0) {
            return null;
        }

        let intersectX = (B2 * C1 - B1 * C2) / denominator;
        let intersectY = (A1 * C2 - A2 * C1) / denominator;
        let rx0 = (intersectX - p0.x) / (p1.x - p0.x); // ratio
        let ry0 = (intersectY - p0.y) / (p1.y - p0.y); // ratio
        let rx1 = (intersectX - p2.x) / (p3.x - p2.x); // ratio
        let ry1 = (intersectY - p2.y) / (p3.y - p2.y); // ratio

        if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
            ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
            return {
                x: intersectX,
                y: intersectY
            }
        } else {
            return null;
        }
    }

};