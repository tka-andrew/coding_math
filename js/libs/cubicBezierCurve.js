var cubicBezierCurve = {
    _j1: {
        x: 0,
        y: 0,
    },
    _j2: {
        x: 0,
        y: 0,
    },
    _cp1: {
        x: 0,
        y: 0,
    },
    _cp2: {
        x: 0,
        y: 0,
    },
    _points: [],

    create: function (j1, cp1, cp2, j2) {
        let obj = Object.create(this);
        obj.set_j1(j1);
        obj.set_cp1(cp1);
        obj.set_cp2(cp2);
        obj.set_j2(j2);
        obj.set_points();
        return obj;
    },

    set_j1: function (j1) {
        this._j1 = {
            x: j1.x,
            y: j1.y
        }
    },

    get_j1: function () {
        return this._j1;
    },

    set_cp1: function (cp1) {
        this._cp1 = {
            x: cp1.x,
            y: cp1.y
        }
    },

    get_cp1: function () {
        return this._cp1;
    },

    set_cp2: function (cp2) {
        this._cp2 = {
            x: cp2.x,
            y: cp2.y
        }
    },

    get_cp2: function () {
        return this._cp2;
    },

    set_j2: function (j2) {
        this._j2 = {
            x: j2.x,
            y: j2.y
        }
    },

    get_j2: function () {
        return this._j2;
    },

    set_points: function (numOfSegments = 20) {
        let timeSegment = 1 / numOfSegments;
        this._points = [];
        let j1 = this.get_j1();
        let cp1 = this.get_cp1();
        let cp2 = this.get_cp2();
        let j2 = this.get_j2();
        let bezierP = {};
        for (var t = 0; t <= 1; t += timeSegment) {
            bezierP = utils.cubicBezier(j1, cp1, cp2, j2, t);
            this._points.push(bezierP)
        }
        if (this._points.length == numOfSegments) {
            // should have extra one point
            // the below line is to cover the case such as t could be 0.950000002 before += 0.05
            bezierP = utils.cubicBezier(j1, cp1, cp2, j2, 1);
            this._points.push(bezierP)
        }
    },

    get_points: function () {
        return this._points;
    }
}