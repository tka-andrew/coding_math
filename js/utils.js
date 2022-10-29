var utils = {

    randomRange: function (min, max) {
        return min + Math.random() * (max - min);
    },

    quadraticBezier: function (p0, p1, p2, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 2) * p0.x +
            (1 - t) * 2 * t * p1.x +
            t * t * p2.x;

        pFinal.y = Math.pow(1 - t, 2) * p0.y +
            (1 - t) * 2 * t * p1.y +
            t * t * p2.y;

        return pFinal;
    },

    cubicBezier: function (p0, p1, p2, p3, t, pFinal) {
        pFinal = pFinal || {};
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

    rectIntersect: function (rect0, rect1) {
        return this.rangeIntersect(rect0.x, rect0.x + rect0.width, rect1.x, rect1.x + rect1.width) &&
            this.rangeIntersect(rect0.y, rect0.y + rect0.height, rect1.y, rect1.y + rect1.height)
    }

}