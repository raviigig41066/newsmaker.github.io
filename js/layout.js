/*=========================================
 Marwar Time News Studio
 layout.js
 Pixel Perfect Layout
=========================================*/

const LAYOUT = {

    canvas: {
        width: 1920,
        height: 1920
    },

    //-------------------------------------
    // HEADLINE AREA
    //-------------------------------------

    headline: {

        x: 150,
        y: 380,

        width: 1620,
        height: 330,

        align: "center",
        valign: "middle",

        color: "#FFD400",

        font: "'Noto Sans Devanagari'",

        weight: "900",

        minSize: 56,

        maxSize: 88,

        maxLines: 3,

        lineGap: 18

    },

    //-------------------------------------
    // BODY AREA
    //-------------------------------------

    body: {

        x: 150,
        y: 760,

        width: 1620,
        height: 860,

        align: "left",

        color: "#FFFFFF",

        font: "'Noto Sans Devanagari'",

        weight: "700",

        minSize: 34,

        maxSize: 52,

        lineGap: 20,

        padding: 0

    },

    //-------------------------------------
    // DATE
    //-------------------------------------

    date: {

        x: 1185,

        y: 88,

        width: 280,

        height: 70,

        align: "center",

        color: "#111",

        font: "Arial",

        weight: "900",

        size: 48

    },

    //-------------------------------------
    // SAFE AREA
    //-------------------------------------

    safe: {

        left: 80,

        right: 1840,

        top: 80,

        bottom: 1840

    }

};