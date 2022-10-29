var vector = {
    _x: 1,
    _y: 0,

    create: function (x, y) {
        let obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    setX: function (val) {
        this._x = val;
    },

    getX: function () {
        return this._x;
    },

    setY: function (val) {
        this._y = val;
    },

    getY: function () {
        return this._y;
    },

    setMagnitude: function (val) {
        let angle = this.getAngle();
        this._x = val * Math.cos(angle);
        this._y = val * Math.sin(angle);
    },

    getMagnitude: function () {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    },

    setAngle: function (val) {
        let magnitude = this.getMagnitude();
        this._x = magnitude * Math.cos(val);
        this._y = magnitude * Math.sin(val);
    },

    getAngle: function (val) {
        return Math.atan2(this._y, this._x);
    },

    add: function (v2) {
        return vector.create(this._x + v2.getX(), this._y + v2.getY());
    },

    subtract: function (v2) {
        return vector.create(this._x - v2.getX(), this._y - v2.getY());
    },

    multiply: function (val) {
        return vector.create(this._x * val, this._y * val);
    },

    divide: function (val) {
        return vector.create(this._x / val, this._y / val);
    },

    // in place update
    addTo: function (v2) {
        this._x += v2.getX();
        this._y += v2.getY();
    },

    // in place update
    subtractFrom: function (v2) {
        this._x -= v2.getX();
        this._y -= v2.getY();
    },

    // in place update
    multiplyBy: function (val) {
        this._x *= val;
        this._y *= val;
    },

    // in place update
    divideBy: function (val) {
        this._x /= val;
        this._y /= val;
    },
};