const numbers = {
    0: [],
    1: [1, 0, 2, 0],
    2: [1, 1, 2, 1],
    3: [1, 0, 2, 1],
    4: [1, 1, 2, 0],
    5: [1, 1, 2, 0, 2, 0, 1, 0],
    6: [2, 0, 2, 1],
    7: [1, 0, 2, 0, 2, 0, 2, 1],
    8: [1, 1, 2, 1, 2, 1, 2, 0],
    9: [1, 1, 2, 1, 2, 1, 2, 0, 2, 0, 1, 0],
}

function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    ctx.strokeStyle = stroke;
    ctx.lineCap = "round";
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function drawScaledLine(ctx, x1, y1, x2, y2, stroke) {
    var xofs = 150
    var yofs = 20
    var xs = (ctx.canvas.clientWidth - xofs * 2) / 2.0;
    var ys = (ctx.canvas.clientHeight - yofs * 2) / 4.0;

    drawLine(ctx, [x1 * xs + xofs, y1 * ys + yofs], [x2 * xs + xofs, y2 * ys + yofs], stroke, 5);
}

function fixx(p, xs) {
    if (xs < 0) {
        p = 1 - (p - 1)
    }
    return p
}

function fixy(p, ys) {
    if (ys < 0) {
        p = 4 - p
    }
    return p
}

function drawNumber(ctx, num, stroke) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScaledLine(ctx, 1, 0, 1, 4, stroke);

    while (num >= 1) {
        var digit
        var xs = 1
        var ys = 1
        if (num >= 1000) {
            digit = Math.floor(num / 1000)
            num %= 1000
            xs = -1
            ys = -1
        } else if (num >= 100) {
            digit = Math.floor(num / 100)
            num %= 100
            ys = -1
        } else if (num >= 10) {
            digit = Math.floor(num / 10)
            num %= 10
            xs = -1
        } else {
            digit = num
            num = 0
        }
    
        var points = numbers[digit]
        for(i = 0; i < points.length; i += 4) {
            drawScaledLine(ctx,
                           fixx(points[i], xs),
                           fixy(points[i+1], ys),
                           fixx(points[i+2], xs),
                           fixy(points[i+3], ys),
                           stroke)
        }
    }
}

num = 10
function draw() {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    var d = new Date(); // for now
    num = d.getHours() * 100 + d.getMinutes()

    drawNumber(ctx, num, 'green');
    
    title = document.getElementById('time')
    title.title = num
}

function startTime() {
    setInterval(draw, 1000);
}

draw()
