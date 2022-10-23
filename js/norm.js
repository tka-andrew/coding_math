window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let values = [];
    for (let i = 0; i < 100; ++i) {
        // here we offset to minimum is 5, but later the graph will be normalize to 0
        values.push(Math.random() * 100 + 5);
    }

    min = Math.min.apply(null, values);
    max = Math.max.apply(null, values);

    function norm(value, min, max) {
        return (value - min) / (max - min);
    }

    context.beginPath();
    for (let i = 0; i < values.length; ++i) {
        let normValue = norm(values[i], min, max);
        let x = width / (values.length - 1) * i;
        let y = height - height * normValue;

        if (i == 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    }

    context.stroke();
}