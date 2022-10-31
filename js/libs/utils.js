var utils = {

    randomRange: function (min, max) {
        return min + Math.random() * (max - min);
    },

    quadraticBezier: function (p0, p1, p2, t) {
        let pFinal = {};
        pFinal.x = Math.pow(1 - t, 2) * p0.x +
            (1 - t) * 2 * t * p1.x +
            t * t * p2.x;

        pFinal.y = Math.pow(1 - t, 2) * p0.y +
            (1 - t) * 2 * t * p1.y +
            t * t * p2.y;

        return pFinal;
    },

    cubicBezier: function (p0, p1, p2, p3, t) {
        let pFinal = {};
        pFinal.x = Math.pow(1 - t, 3) * p0.x +
            Math.pow(1 - t, 2) * 3 * t * p1.x +
            (1 - t) * 3 * t * t * p2.x +
            t * t * t * p3.x;
        pFinal.y = Math.pow(1 - t, 3) * p0.y +
            Math.pow(1 - t, 2) * 3 * t * p1.y +
            (1 - t) * 3 * t * t * p2.y +
            t * t * t * p3.y;

        return pFinal;
    },

    norm: function (value, min, max) {
        return (value - min) / (max - min);
    },

    linear_interpolation: function (norm, min, max) {
        return (max - min) * norm + min;
    },

    distance: function (p0, p1) {
        let dx = p1.x - p0.x;
        let dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function (x0, x1, y0, y1) {
        let dx = x1 - x0;
        let dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },

    circleCollision: function (c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },

    circlePointCollision: function (c0, point) {
        return utils.distanceXY(c0.x, point.x, c0.y, point.y) <= c0.radius;
    },

    pointInRect: function (x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width) &&
            utils.inRange(y, rect.y, rect.y + rect.height);
    },

    inRange: function (val, min, max) {
        return val >= Math.min(min, max) && val <= Math.max(min, max);
    },

    rangeIntersect: function (min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) &&
            Math.min(min0, max0) <= Math.max(min1, max1);
    },

    segmentIntersect(segment1, segment2) {
        let p0 = segment1.get_p1();
        let p1 = segment1.get_p2();
        let p2 = segment2.get_p1();
        let p3 = segment2.get_p2();
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
        }
        return null;
    },

    rectIntersect: function (rect0, rect1) {
        return this.rangeIntersect(rect0.x, rect0.x + rect0.width, rect1.x, rect1.x + rect1.width) &&
            this.rangeIntersect(rect0.y, rect0.y + rect0.height, rect1.y, rect1.y + rect1.height)
    },

    quadrilateralIntersect: function (q1, q2) {
        let q1LineList = [
            lineSegment.create(q1.get_p1(), q1.get_p2()),
            lineSegment.create(q1.get_p2(), q1.get_p3()),
            lineSegment.create(q1.get_p3(), q1.get_p4()),
            lineSegment.create(q1.get_p4(), q1.get_p1()),
        ]
        let q2LineList = [
            lineSegment.create(q2.get_p1(), q2.get_p2()),
            lineSegment.create(q2.get_p2(), q2.get_p3()),
            lineSegment.create(q2.get_p3(), q2.get_p4()),
            lineSegment.create(q2.get_p4(), q2.get_p1()),
        ]
        for (let s1 of q1LineList) {
            for (let s2 of q2LineList) {
                let intersectPoint = utils.segmentIntersect(s1, s2);
                if (intersectPoint !== null) {
                    return intersectPoint;
                }
            }
        }
        return null;
    },

    getLinesFromPoints: function (points) {
        let lines = [];
        if (!Array.isArray(points) || points.length < 2) {
            return [];
        }
        let currentP = points[0];
        for (let i = 0; i < points.length; ++i) {
            let nextP = points[i];
            lines.push(lineSegment.create(currentP, nextP));
            currentP = nextP;
        }
        return lines;
    },

    cubicBezierIntersect: function (cbc1, cbc2) {
        let points1 = cbc1.get_points();
        let points2 = cbc2.get_points();
        // check quadrilateral first
        // if both quadrilaterals do not intersect, then do not need to proceed with bezier curve checking
        let q1 = quadrilateral.create(cbc1.get_j1(), cbc1.get_cp1(), cbc1.get_cp2(), cbc1.get_j2())
        let q2 = quadrilateral.create(cbc2.get_j1(), cbc2.get_cp1(), cbc2.get_cp2(), cbc2.get_j2())
        let intersectPoint = utils.quadrilateralIntersect(q1, q2);
        if (intersectPoint === null) {
            return null;
        }

        let lineCbc1 = utils.getLinesFromPoints(points1);
        let lineCbc2 = utils.getLinesFromPoints(points2);

        for (let s1 of lineCbc1) {
            for (let s2 of lineCbc2) {
                let intersectPoint = utils.segmentIntersect(s1, s2);
                if (intersectPoint !== null) {
                    return intersectPoint;
                }
            }
        }
    }
}