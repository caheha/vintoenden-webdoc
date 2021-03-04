// ---------- Elements ---------- //
// Falling grape elements
var grape = document.getElementById('grape');
var barrel = document.getElementById('barrel');
var bottle = document.getElementById('bottle');
var box = document.getElementById('box');
var glass = document.getElementById('glass');

// Grape start position + grape in view bool
const startPos = window.innerHeight + 325;
var grapeInView = false;

// Show these elements
var textStyle = document.getElementById('text-style');
var countryMaps = document.querySelectorAll('.card img');
var bottlePic = document.querySelectorAll('.image-container img');
var video = document.getElementById('video');
var glassPic = document.getElementById('slutning');

// Intro overlay
var block = document.getElementById('block');
document.body.style.overflow = "hidden";

// Remove overlay onclick
block.onclick = () => {
    block.style.display = "none";
    document.body.style.overflow = "auto";
};

// Initialise parallax
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

// Main scroll function
document.onscroll = () => {
    // Get current scroll position
    let currentScroll = document.documentElement.scrollTop;

    // Make grape fixed on screen when scrolling past it
    if (currentScroll + 325 >= startPos) {
        grape.style.position = "fixed";
        grape.style.top = "325px";
        grapeInView = true;
    } else {
        grape.style.position = "absolute";
        grape.style.top = "calc(100vh + 325px)";
        grapeInView = false;
    }

    // If grape is fixed in view, rotate it
    if (grapeInView)
        rotateElement();

    // If video is visible, play it
    if (elementVisible(video))
        video.play();
    else 
        video.pause();

    // ---- Show elements when grape passes them ---- //
    // Intro text
    if (grapePassed(textStyle))
        textStyle.style.opacity = "1";
    else 
        textStyle.style.opacity = "0";

    // Country maps
    if (grapePassed(barrel))
        countryMaps.forEach(image => { image.style.opacity = "1"; });
    else 
        countryMaps.forEach(image => { image.style.opacity = "0"; });

    // Bottle pictures
    if (grapePassed(bottle))
        bottlePic.forEach(image => { image.style.opacity = "1"; });
    else 
        bottlePic.forEach(image => { image.style.opacity = "0"; });

    // Video
    if (grapePassed(box))
        video.style.opacity = "1";
    else 
        video.style.opacity = "0";

    // End + hide grape
    if (grapePassed(glass)){
        glassPic.style.opacity = "1";
        grape.style.opacity ="0";
    } else {
        glassPic.style.opacity = "0";
        grape.style.opacity ="1";
    }
};

// Rotates element based on scroll position
// adjust rotateAmount for faster/slower rotation
function rotateElement() {
    let rotateAmount = window.pageYOffset / 4;
    grape.style.transform = "rotate(" + rotateAmount + "deg)";
}

// Checks if grape element Y position is greater than elm, return bool
function grapePassed(elm) {
    if (grape.getBoundingClientRect().top > elm.getBoundingClientRect().top)
        return true;
    else 
        return false;
}

// Checks if element is visible on screen, return bool
function elementVisible(elm) {
    if (elm.getBoundingClientRect().bottom < 250 || elm.getBoundingClientRect().top > 250)
        return false;
    else 
        return true;
}