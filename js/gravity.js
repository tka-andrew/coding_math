window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    let sun = particle.create(width/2, height/2, 0, 0);
    let planetX = particle.create(width/2 + 200, height/2, 10, -Math.PI/2);

    sun.mass = 20000;

    render();
    
    function render() {
        context.clearRect(0, 0, width, height);

        planetX.gravitateTo(sun);
        planetX.update();

        context.beginPath();
        context.fillStyle = "#ffff00";
        context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.fillStyle = "#0000ff";
        context.arc(planetX.position.getX(), planetX.position.getY(), 10, 0, Math.PI * 2, false);
        context.fill();

        requestAnimationFrame(render);
    }
}