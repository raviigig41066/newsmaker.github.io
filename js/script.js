/*=========================================
 Marwar Time News Studio
 script.js
 Part 1
=========================================*/

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Inputs
const headlineInput = document.getElementById("headline");
const bodyInput = document.getElementById("body");
const dateInput = document.getElementById("date");

// Buttons
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const shareBtn = document.getElementById('share');

// Template Image
const template = new Image();
template.src = "assets/template.jpg";

// Canvas Size
canvas.width = LAYOUT.canvas.width;
canvas.height = LAYOUT.canvas.height;

// Auto Date
dateInput.value = new Date().toLocaleDateString("hi-IN",{
    day:"2-digit",
    month:"long",
    year:"numeric"
});

// Wait until template loads
template.onload = () => {

    drawCard();

};

// Live Preview
headlineInput.addEventListener("input", drawCard);
bodyInput.addEventListener("input", drawCard);
dateInput.addEventListener("input", drawCard);

// Buttons
generateBtn.addEventListener("click", drawCard);

downloadBtn.addEventListener("click", downloadPNG);

shareBtn.addEventListener("click", shareImage);

//-------------------------------------
// Main Draw
//-------------------------------------

function drawCard(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.drawImage(
        template,
        0,
        0,
        canvas.width,
        canvas.height
    );

    //---------------------------------
    // Headline
    //---------------------------------

    drawHeadline(
        headlineInput.value.trim()
    );

    //---------------------------------
    // Body
    //---------------------------------

    drawBody(
        bodyInput.value.trim()
    );

    //---------------------------------
    // Date
    //---------------------------------

    drawDate(
        dateInput.value
    );

}

//-------------------------------------
// Download
//-------------------------------------

function downloadPNG(){

    const link=document.createElement("a");

    link.download="MarwarTime-News.png";

    link.href=canvas.toDataURL("image/png");

    link.click();

}

/*=========================================
 Marwar Time News Studio
 script.js
 Part 2
=========================================*/

//-------------------------------------
// Render Quality
//-------------------------------------

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

//-------------------------------------
// Wait for Font
//-------------------------------------

async function initStudio(){

    if(document.fonts){

        await document.fonts.ready;

    }

    if(template.complete){

        drawCard();

    }

}

initStudio();
//-------------------------------------
// share image 
//-------------------------------------

async function shareImage() {

    console.log("navigator.share =", !!navigator.share);
    console.log("navigator.canShare =", !!navigator.canShare);

    render();

    const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, "image/png")
    );

    const file = new File([blob], "news.png", { type: "image/png" });

    console.log("File Size:", file.size);

    if (!navigator.share) {
        alert("navigator.share NOT supported");
        return;
    }

    if (navigator.canShare && !navigator.canShare({ files: [file] })) {
        alert("Browser cannot share files");
        return;
    }

    try {
        await navigator.share({
            files: [file],
            title: "Marwar Time",
            text: "Breaking News"
        });

        alert("Shared Successfully");

    } catch (e) {
        alert(e.message);
        console.log(e);
    }
}

//-------------------------------------
// Window Resize
//-------------------------------------

window.addEventListener("resize",()=>{

    requestAnimationFrame(drawCard);

});

//-------------------------------------
// Keyboard Shortcut
//-------------------------------------

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="s"){

        e.preventDefault();

        downloadPNG();

    }

});

//-------------------------------------
// Paste News
//-------------------------------------

bodyInput.addEventListener("paste",()=>{

    setTimeout(drawCard,50);

});

//-------------------------------------
// Auto Upper Trim
//-------------------------------------

headlineInput.addEventListener("blur",()=>{

    headlineInput.value=
    headlineInput.value.trim();

    drawCard();

});

bodyInput.addEventListener("blur",()=>{

    bodyInput.value=
    bodyInput.value.trim();

    drawCard();

});

//-------------------------------------
// Export PNG
//-------------------------------------

function downloadPNG(){

    const link=document.createElement("a");

    link.download=
    "MarwarTime-"+Date.now()+".png";

    link.href=
    canvas.toDataURL("image/png",1.0);

    link.click();

}

//-------------------------------------
// Clear Form
//-------------------------------------

function clearForm(){

    headlineInput.value="";

    bodyInput.value="";

    drawCard();

}

//-------------------------------------
// Demo Data
//-------------------------------------

function loadDemo(){

headlineInput.value=
"132 कांस्टेबलों के तबादले, आबूरोड यातायात विभाग फिर खाली";

bodyInput.value=
"सिरोही जिले में पुलिस विभाग में बड़ा फेरबदल करते हुए 132 कांस्टेबलों का तबादला किया गया है। आबूरोड यातायात शाखा एक बार फिर चर्चा में है।";

drawCard();

}

//-------------------------------------
// Template Error
//-------------------------------------

template.onerror=()=>{

    ctx.fillStyle="#222";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#fff";

    ctx.font="bold 50px Arial";

    ctx.textAlign="center";

    ctx.fillText(

    "Template Not Found",

    canvas.width/2,

    canvas.height/2

    );

};

//-------------------------------------
// First Render
//-------------------------------------

setTimeout(()=>{

    if(template.complete){

        drawCard();

    }

},300);


/*=========================================
 Marwar Time News Studio
 script.js
 Part 3
=========================================*/

//-------------------------------------
// WhatsApp Smart Paste
//-------------------------------------

function parseNews(raw){

    raw = raw.replace(/\r/g,"").trim();

    let lines = raw.split("\n").filter(l=>l.trim()!="");

    if(lines.length==0){

        return;

    }

    headlineInput.value = lines.shift().trim();

    bodyInput.value = lines.join("\n");

    drawCard();

}

//-------------------------------------
// Ctrl + V Anywhere
//-------------------------------------

document.addEventListener("paste",(e)=>{

    if(
        document.activeElement===headlineInput ||
        document.activeElement===bodyInput
    ){
        return;
    }

    const text=e.clipboardData.getData("text");

    if(text.length>20){

        e.preventDefault();

        parseNews(text);

    }

});

//-------------------------------------
// Character Counter
//-------------------------------------

function updateCounter(){

    const h=headlineInput.value.length;

    const b=bodyInput.value.length;

    document.title=
    `Headline ${h} | Body ${b}`;

}

headlineInput.addEventListener("input",updateCounter);

bodyInput.addEventListener("input",updateCounter);

//-------------------------------------
// Auto Generate
//-------------------------------------

let timer;

function autoGenerate(){

    clearTimeout(timer);

    timer=setTimeout(()=>{

        drawCard();

    },150);

}

headlineInput.addEventListener("input",autoGenerate);

bodyInput.addEventListener("input",autoGenerate);

//-------------------------------------
// Export JPG
//-------------------------------------

function downloadJPG(){

    const link=document.createElement("a");

    link.download="MarwarTime-News.jpg";

    link.href=canvas.toDataURL("image/jpeg",1);

    link.click();

}

//-------------------------------------
// Copy Image
//-------------------------------------

async function copyPNG(){

    if(!navigator.clipboard) return;

    canvas.toBlob(async(blob)=>{

        await navigator.clipboard.write([

            new ClipboardItem({

                "image/png":blob

            })

        ]);

    });

}

//-------------------------------------
// Save JSON
//-------------------------------------

function saveProject(){

    const data={

        headline:headlineInput.value,

        body:bodyInput.value,

        date:dateInput.value

    };

    localStorage.setItem(

        "MarwarTimeProject",

        JSON.stringify(data)

    );

}

//-------------------------------------
// Load JSON
//-------------------------------------

function loadProject(){

    const data=

    localStorage.getItem(

        "MarwarTimeProject"

    );

    if(!data) return;

    const p=JSON.parse(data);

    headlineInput.value=p.headline;

    bodyInput.value=p.body;

    dateInput.value=p.date;

    drawCard();

}

window.addEventListener("beforeunload",saveProject);

window.addEventListener("load",loadProject);

//-------------------------------------
// Ready
//-------------------------------------

console.log("Marwar Time News Studio Ready");
