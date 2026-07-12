/*=========================================
 Marwar Time News Studio
 textEngine.js
 Part 1
=========================================*/

//------------------------------------------
// Fit Text In Box
//------------------------------------------

function fitText(text, box) {

    let size = box.maxSize;

    while (size >= box.minSize) {

        ctx.font = `${box.weight} ${size}px ${box.font}`;

        const lines = wrapLines(text, box.width);

        const lineHeight = size + box.lineGap;

        const totalHeight = lines.length * lineHeight;

        if (
            lines.length <= box.maxLines &&
            totalHeight <= box.height
        ) {

            return {
                size,
                lines,
                lineHeight
            };

        }

        size--;

    }

    return {

        size: box.minSize,

        lines: wrapLines(text, box.width),

        lineHeight: box.minSize + box.lineGap

    };

}

//------------------------------------------
// Wrap Lines
//------------------------------------------

function wrapLines(text, maxWidth) {

    const words = text.trim().split(/\s+/);

    const lines = [];

    let line = "";

    for (const word of words) {

        const test = line + word + " ";

        if (
            ctx.measureText(test).width > maxWidth &&
            line !== ""
        ) {

            lines.push(line.trim());

            line = word + " ";

        }

        else {

            line = test;

        }

    }

    if (line.trim() !== "") {

        lines.push(line.trim());

    }

    return lines;

}

//------------------------------------------
// Draw Center Text
//------------------------------------------

function drawCentered(lines, box, fontSize, lineHeight) {

    ctx.save();

    ctx.fillStyle = box.color;

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.font = `${box.weight} ${fontSize}px ${box.font}`;

    const startY =
        box.y +
        (box.height - (lines.length * lineHeight)) / 2 +
        lineHeight / 2;

    const centerX = box.x + box.width / 2;

    lines.forEach((line, index) => {

        ctx.fillText(

            line,

            centerX,

            startY + index * lineHeight

        );

    });

    ctx.restore();

}

/*=========================================
 Marwar Time News Studio
 textEngine.js
 Part 2
=========================================*/

//------------------------------------------
// Smart Balance
//------------------------------------------

function balanceLines(lines, maxWidth) {

    if (lines.length < 2) return lines;

    let changed = true;

    while (changed) {

        changed = false;

        for (let i = 0; i < lines.length - 1; i++) {

            const current = lines[i].split(" ");
            const next = lines[i + 1].split(" ");

            if (next.length === 0) continue;

            const candidate =
                current.join(" ") + " " + next[0];

            if (ctx.measureText(candidate).width < maxWidth) {

                current.push(next.shift());

                lines[i] = current.join(" ");
                lines[i + 1] = next.join(" ");

                changed = true;

            }

        }

    }

    return lines.filter(l => l.trim() !== "");

}

//------------------------------------------
// Draw Headline
//------------------------------------------

function drawHeadline(text) {

    const result = fitText(text, LAYOUT.headline);

    result.lines = balanceLines(
        result.lines,
        LAYOUT.headline.width
    );

    drawCentered(

        result.lines,

        LAYOUT.headline,

        result.size,

        result.lineHeight

    );

}

//------------------------------------------
// Draw Left Text
//------------------------------------------

function drawLeft(text, box) {

    const result = fitText(text, box);

    ctx.save();

    ctx.fillStyle = box.color;

    ctx.textAlign = "left";

    ctx.textBaseline = "top";

    ctx.font =
        `${box.weight} ${result.size}px ${box.font}`;

    let y = box.y;

    result.lines.forEach(line => {

        ctx.fillText(line, box.x, y);

        y += result.lineHeight;

    });

    ctx.restore();

}

/*=========================================
 Marwar Time News Studio
 textEngine.js
 Part 3
=========================================*/

//------------------------------------------
// Draw Body With Auto Fit
//------------------------------------------

function drawBody(text){

    const box = LAYOUT.body;

    let fontSize = box.maxSize;

    while(fontSize >= box.minSize){

        ctx.font = `${box.weight} ${fontSize}px ${box.font}`;

        let lines = wrapLines(text, box.width);

        lines = balanceLines(lines, box.width);

        const lineHeight = fontSize + box.lineGap;

        const totalHeight = lines.length * lineHeight;

        if(totalHeight <= box.height){

            renderBody(lines, box, fontSize, lineHeight);

            return;

        }

        fontSize--;

    }

    renderOverflow(text, box);

}

//------------------------------------------
// Render Body
//------------------------------------------

function renderBody(lines, box, size, lineHeight){

    ctx.save();

    ctx.fillStyle = box.color;

    ctx.font = `${box.weight} ${size}px ${box.font}`;

    ctx.textAlign = "left";

    ctx.textBaseline = "top";

    let y = box.y;

    for(const line of lines){

        ctx.fillText(line, box.x, y);

        y += lineHeight;

    }

    ctx.restore();

}

//------------------------------------------
// Overflow
//------------------------------------------

function renderOverflow(text, box){

    ctx.save();

    ctx.fillStyle = box.color;

    ctx.font =
    `${box.weight} ${box.minSize}px ${box.font}`;

    ctx.textAlign="left";

    ctx.textBaseline="top";

    let lines = wrapLines(text, box.width);

    const lineHeight =
    box.minSize + box.lineGap;

    const maxLines =
    Math.floor(box.height / lineHeight);

    lines = lines.slice(0,maxLines);

    if(lines.length){

        let last = lines[lines.length-1];

        while(
            ctx.measureText(last + "...").width >
            box.width
        ){

            last = last.slice(0,-1);

        }

        lines[lines.length-1]=last+"...";

    }

    let y=box.y;

    lines.forEach(line=>{

        ctx.fillText(line,box.x,y);

        y+=lineHeight;

    });

    ctx.restore();

}

//------------------------------------------
// Draw Date
//------------------------------------------

function drawDate(text){

    const d = LAYOUT.date;

    ctx.save();

    ctx.fillStyle = d.color;

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.font =
    `${d.weight} ${d.size}px ${d.font}`;

    ctx.fillText(

        text,

        d.x + d.width/2,

        d.y + d.height/2

    );

    ctx.restore();

}