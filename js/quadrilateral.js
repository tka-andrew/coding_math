// modified from LeetCode587
var getHullPoints = function (trees) {
    // sort according to x coordinates
    // if x coordinates are the same, sort according to y coordinates
    trees = trees.sort(function (a, b) {
        if (a.x == b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
    });

    const isClockwise = function (treeP, treeQ, treeR) {
        return ((treeR.y - treeP.y) * (treeQ.x - treeP.x) - (treeR.x - treeP.x) * (treeQ.y - treeP.y)) < 0
    }

    const hull = []

    for (let i = 0; i < trees.length; i++) {
        while (hull.length >= 2 && isClockwise(hull[hull.length - 2], hull[hull.length - 1], trees[i])) {
            hull.pop(); // pop if the trees are in clockwise direction
        }
        hull.push(trees[i])
    }

    for (let i = trees.length - 2; i >= 0; i--) { // trees.length - 2 is to skip the last tree that is included in hull
        while (hull.length >= 2 && isClockwise(hull[hull.length - 2], hull[hull.length - 1], trees[i])) {
            hull.pop(); // pop if the trees are in clockwise direction
        }
        hull.push(trees[i])
    }

    const uniqueHullSet = new Set(hull) // to remove duplicates by converting array to set
    const fence = Array.from(uniqueHullSet) // convert set to array
    return fence

};
var quadrilateral = {
    _p1: {
        x: 0,
        y: 0,
    },
    _p2: {
        x: 0,
        y: 0,
    },
    _p3: {
        x: 0,
        y: 0,
    },
    _p4: {
        x: 0,
        y: 0,
    },

    create: function (p1, p2, p3, p4) {
        let obj = Object.create(this);

        let points = [];
        points.push(p1);
        points.push(p2);
        points.push(p3);
        points.push(p4);
        let hullPoints = getHullPoints(points);
        if (hullPoints.length >= 3) {
            obj.set_p1(hullPoints[0]);
            obj.set_p2(hullPoints[1]);
            obj.set_p3(hullPoints[2]);
        }
        if (hullPoints.length == 4) {
            obj.set_p4(hullPoints[3]);
        } else {
            obj.set_p4(hullPoints[2]);
        }
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

    set_p3: function (p3) {
        this._p3 = {
            x: p3.x,
            y: p3.y
        }
    },

    get_p3: function () {
        return this._p3;
    },

    set_p4: function (p4) {
        this._p4 = {
            x: p4.x,
            y: p4.y
        }
    },

    get_p4: function () {
        return this._p4;
    },
}