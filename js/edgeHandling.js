window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let wrappingParticle = particle.create(width / 2, height / 2, 10, Math.PI / 4);
    wrappingParticle.radius = 40;

    let spreadingParticles = [];
    for (let i = 0; i < 20; ++i) {
        let p = particle.create(width / 2, height / 2, Math.random() * 10 + 1, Math.PI * Math.random());
        p.radius = Math.random() * 20 + 1;
        spreadingParticles.push(p);
    }

    let bouncingParticle = particle.create(width / 2, height / 2, 10, Math.PI / 4);
    bouncingParticle.radius = 30;
    let bouncingScale = -0.9;

    const twoPI = Math.PI * 2;

    render();

    function render() {
        context.clearRect(0, 0, width, height);

        wrappingParticle.update();
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(wrappingParticle.position.getX(), wrappingParticle.position.getY(), wrappingParticle.radius, 0, twoPI);
        context.fill();

        if (wrappingParticle.position.getX() - wrappingParticle.radius > width) {
            wrappingParticle.position.setX(-wrappingParticle.radius);
        }
        if (wrappingParticle.position.getX() + wrappingParticle.radius < 0) {
            wrappingParticle.position.setX(width + wrappingParticle.radius);
        }
        if (wrappingParticle.position.getY() - wrappingParticle.radius > height) {
            wrappingParticle.position.setY(-wrappingParticle.radius);
        }
        if (wrappingParticle.position.getY() + wrappingParticle.radius < 0) {
            wrappingParticle.position.setY(height + wrappingParticle.radius);
        }

        if (spreadingParticles.length > 0) {
            context.fillStyle = "#ff0f00";
            for (let i = 0; i < spreadingParticles.length; ++i) {
                let p = spreadingParticles[i];
                context.beginPath();
                context.arc(p.position.getX(), p.position.getY(), p.radius, 0, twoPI);
                context.fill();
                p.update();
            }
            removeOutOfBoundaryParticles();
        }

        context.beginPath();
        context.fillStyle = "#0000ff";
        context.arc(bouncingParticle.position.getX(), bouncingParticle.position.getY(), bouncingParticle.radius, 0, twoPI);
        context.fill();

        if (bouncingParticle.position.getX() + bouncingParticle.radius > width) {
            bouncingParticle.position.setX(width - bouncingParticle.radius);
            bouncingParticle.velocity.setX(bouncingParticle.velocity.getX() * bouncingScale);
        }
        if (bouncingParticle.position.getX() - bouncingParticle.radius < 0) {
            bouncingParticle.position.setX(bouncingParticle.radius);
            bouncingParticle.velocity.setX(bouncingParticle.velocity.getX() * bouncingScale);
        }
        if (bouncingParticle.position.getY() + bouncingParticle.radius > height) {
            bouncingParticle.position.setY(height - bouncingParticle.radius);
            bouncingParticle.velocity.setY(bouncingParticle.velocity.getY() * bouncingScale);
        }
        if (bouncingParticle.position.getY() - bouncingParticle.radius < 0) {
            bouncingParticle.position.setY(bouncingParticle.radius);
            bouncingParticle.velocity.setY(bouncingParticle.velocity.getY() * bouncingScale);
        }
        bouncingParticle.update();

        requestAnimationFrame(render);
    }

    function removeOutOfBoundaryParticles() {
        for (let i = spreadingParticles.length - 1; i >= 0; --i) {
            var p = spreadingParticles[i];
            if (p.position.getX() - p.radius > width ||
                p.position.getX() + p.radius < 0 ||
                p.position.getY() - p.radius > height ||
                p.position.getY() + p.radius < 0) {
                spreadingParticles.splice(i, 1);
            }
        }
    }
}
