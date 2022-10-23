window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let minX = 50;
    let maxX = width - 50;
    let minY = 100;
    let maxY = height - 50;
    let minAlpha = 0;
    let maxAlpha = 1;
    let minRadius = 10;
    let maxRadius = 400;
    let t = 0;
    const twoPI = Math.PI * 2;

    function linear_interpolation(norm, min, max) {
        return (max - min) * norm + min;
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // when t = 0, it returns maxalpha
        // when t = 1, it returns minalpha
        context.globalAlpha = linear_interpolation(t, maxAlpha, minAlpha);

        context.beginPath();
        context.arc(linear_interpolation(t, minX, maxX),
            linear_interpolation(t, minY, maxY),
            linear_interpolation(t, minRadius, maxRadius),
            0, twoPI);
        context.fill();

        t += 0.005;
        if (t > 1) {
            t = 0;
        }

        requestAnimationFrame(update);
    }
}