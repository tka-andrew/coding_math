var lineSegment = {
    _p1: {
        x: 0,
        y: 0,
    },
    _p2: {
        x: 0,
        y: 0,
    },

    create: function (p1, p2) {
        let obj = Object.create(this);
        obj.set_p1(p1);
        obj.set_p2(p2);
        return obj;
    },

    set_p1: function (p1) {
        this._p1 = {
            x: p1.x,
            y: p1.y
        }
    },

    get_p1: function () {
        return this._p1;
    },

    set_p2: function (p2) {
        this._p2 = {
            x: p2.x,
            y: p2.y
        }
    },

    get_p2: function () {
        return this._p2;
    },
}