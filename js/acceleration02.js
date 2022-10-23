window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    const twoPI = Math.PI * 2;

    let planeSVG = new Image();
    planeSVG.src = "svg/airplane.svg"
    planeSVG.onload = function () {
        context.drawImage(planeSVG, 0, 0);
    }
    let plane = particle.create(width / 2, height / 2, 0, 0);
    let thrust = vector.create(0, 0);
    let angle = 0;
    let turningLeft = false;
    let turningRight = false;
    let thrusting = false;
    let reverse = false;

    document.body.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                thrusting = true;
                break;

            case "ArrowDown":
                thrusting = true;
                reverse = true;
                break;

            case "ArrowLeft":
                turningLeft = true;
                break;


            case "ArrowRight":
                turningRight = true;
                break;

            default:
                break;
        }
    })

    document.body.addEventListener("keyup", function (event) {
        switch (event.key) {
            case "ArrowUp":
                thrusting = false;
                break;

            case "ArrowDown":
                thrusting = false;
                reverse = false;
                break;

            case "ArrowLeft":
                turningLeft = false;
                break;


            case "ArrowRight":
                turningRight = false;
                break;

            default:
                break;
        }
    })

    update();

    function update() {
        context.clearRect(0, 0, width, height); // to clear everything

        if (turningLeft) {
            angle -= 0.05;
        } else if (turningRight) {
            angle += 0.05;
        }

        if (reverse) {
            thrust.setAngle(angle + Math.PI);
        } else {
            thrust.setAngle(angle);
        }

        if (thrusting) {
            thrust.setMagnitude(0.1);
            plane.accelerate(thrust);
        } else {
            thrust.setMagnitude(0);
            if (plane.velocity.getX() !== 0 || plane.velocity.getY() !== 0) {
                let deceleration = vector.create(plane.velocity.getX() * -1 * 0.025, plane.velocity.getY() * -1 * 0.025)
                plane.accelerate(deceleration)
            }
        }

        plane.update();

        context.save();
        context.translate(plane.position.getX(), plane.position.getY());
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        context.stroke();

        // The svg center point is not at the center of svg image
        // Hence, it looks weird when it turns
        // context.drawImage(planeSVG, 0, 0);

        context.restore();

        if (plane.position.getX() > width) {
            plane.position.setX(0);
        }
        if (plane.position.getX() < 0) {
            plane.position.setX(width);
        }
        if (plane.position.getY() > height) {
            plane.position.setY(0);
        }
        if (plane.position.getY() < 0) {
            plane.position.setY(height);
        }

        requestAnimationFrame(update);
    }
}