window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let particles = [];
    let numOfParticles = 100;
    const twoPI = Math.PI * 2;
    for (let i = 0; i < numOfParticles; ++i) {
        particles.push(particle.create(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * twoPI, 0.1));
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height); // to clear everything

        for (let i = 0; i < numOfParticles; ++i) {
            let p = particles[i];
            p.update();
            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(), 5, 0, twoPI, false);
            context.fill();
        }

        requestAnimationFrame(update);
    }
}