window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    let arrowX = width/2;
    let arrowY = height/2;
    var dy = 0;
    var dx = 0;
    var radian = 0;

    render();
    
    function render() {
        context.clearRect(0, 0, width, height); // to clear everything

        context.save(); // save untransformed context

        // do transformations to draw the arrow
        // if we dont do this, the coordinates will have postive x and positive y only
        context.translate(arrowX, arrowY); // so that the (0,0) is at the center
        context.rotate(radian); // we rotate the canvas's coordinate system instead of the arrow

        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(-20, 0);
        context.moveTo(20, 0);
        context.lineTo(10, -10);
        context.moveTo(20, 0);
        context.lineTo(10, 10);
        context.stroke();
        
        context.restore(); // restore back to untransformed context
        requestAnimationFrame(render);
    }

    document.body.addEventListener("mousemove", function(event) {
        dx = event.clientX - arrowX;
        dy = event.clientY - arrowY;
        radian = Math.atan2(dy, dx); // atan2 is used to get heading
        
        // angle = radian * 180 / Math.PI;
        // angle = angle < 0 ? angle + 360 : angle;
        // console.log(angle)
    }) 
}