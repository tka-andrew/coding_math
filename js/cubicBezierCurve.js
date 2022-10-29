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

    create: function (j1, cp1, cp2, j2) {
        let obj = Object.create(this);
        obj.set_j1(j1);
        obj.set_cp1(cp1);
        obj.set_cp2(cp2);
        obj.set_j2(j2);
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
}