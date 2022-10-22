window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    context.translate(0, height/2); 
    
    // since the y axis in computer screen is inverted, 
    // we need to invert the scale in order to see the sine wave that we normally see in Math
    context.scale(1, -1); 

    let scaleFactor = 200; // just a random factor to enlarge the sine wave

    for (let radian = 0; radian < 2 * Math.PI; radian += 0.01) {
        let x = radian * scaleFactor;
        let y = Math.sin(radian) * scaleFactor;
        
        context.fillRect(x, y, 5, 5);
    }
}