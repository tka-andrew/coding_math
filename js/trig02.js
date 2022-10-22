window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    // using sine wave pattern to move an object up and down
    var centerX = width * .25;
    var centerX_02 = width * .5;
    var centerX_03 = width * .75;
    var centerX_04 = width * .5;
    var centerY = height * .25;
    var centerY_02 = height * .25;
    var centerY_04 = height * .75;
    var scale = 150;
    var change = 0.05;
    var radian = 0;
    var radius = 50;
    const twoPI = Math.PI * 2;

    render();
    
    function render() {
        let y = centerY + Math.sin(radian) * scale;
        let y2 = centerY + Math.cos(radian) * scale;
        let r = Math.max(radius + Math.sin(radian) * scale, 0); // radius cannot be negative
        let x = centerX_04 + Math.sin(radian) * scale;

        context.clearRect(0, 0, width, height); // to clear everything

        context.beginPath();
        context.arc(centerX, y, 50, 0, twoPI, false);
        context.fill();

        context.beginPath();
        context.arc(centerX_02, centerY_02, r, 0, twoPI, false);
        context.fill();

        context.beginPath();
        context.arc(centerX_03, y2, 50, 0, twoPI, false);
        context.fill();

        context.beginPath();
        context.arc(x, centerY_04, 50, 0, twoPI, false);
        context.fill();

        radian += change;

        requestAnimationFrame(render);
    }
}