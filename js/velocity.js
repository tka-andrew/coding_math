window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let particles = [];
    let numOfParticles = 100;
    for (let i = 0; i < numOfParticles; ++i) {
        particles.push(particle.create(width / 2, height / 2, Math.random(), Math.random() * Math.PI * 2));
    }

    const twoPI = Math.PI * 2;

    update();

    function update() {
        context.clearRect(0, 0, width, height); // to clear everything

        for (let i = 0; i < numOfParticles; ++i) {
            let p = particles[i];
            p.update();
            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(), 10, 0, twoPI, false);
            context.fill();
        }

        requestAnimationFrame(update);
    }
}