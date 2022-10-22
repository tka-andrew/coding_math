window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var centerX = width * .25;
    var centerX_02 = width * .5;
    var centerX_04 = width * .5;
    var centerY = height * .25;
    var centerY_02 = height * .25;
    var centerY_04 = height * .75;
    const twoPI = Math.PI * 2;
    let radius = 200;
    let radian = 0;
    let xradian = 0;
    let yradian = 0;
    let change = 0.05;
    let xchange = 0.05;
    let ychange = 0.1;
    let yradius = 100;
    let xradius = 400;

    render();
    
    function render() {
        let y = centerY + radius * Math.sin(radian);
        let x = centerX + radius * Math.cos(radian);
        let y2 = centerY_02 + yradius * Math.sin(radian);
        let x2 = centerX_02 + xradius * Math.cos(radian);
        let y3 = centerY_04 + yradius * Math.sin(yradian);
        let x3 = centerX_04 + xradius * Math.cos(xradian);

        context.clearRect(0, 0, width, height); // to clear everything

        // circle
        context.beginPath();
        context.arc(x, y, 20, 0, twoPI, false);
        context.fill()

        // ellipse
        context.beginPath();
        context.arc(x2, y2, 20, 0, twoPI, false);
        context.fill();

        // Lissajous Curve
        context.beginPath();
        context.arc(x3, y3, 20, 0, twoPI, false);
        context.fill();

        radian += change;
        yradian += ychange;
        xradian += xchange;

        requestAnimationFrame(render);
    }
}