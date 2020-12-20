/* 
 * VizEet: An Audio Visualization script written by Daniel William Aber
 * For www.eetmusic.com
 * 
 * Important Note: This script must be loaded at the end of the body element.
 * Otherwise the HTML element selectors will not work correctly.
 * 
 */



//grab the div container
let container = document.getElementById("vizeetcontainer");
console.log("container set as = ", container);

//grab the canvas element
let canvas = document.getElementById("audiovisual");
console.log("canvas set as = ", canvas);

/* 
 * Resize canvas to fit container
 * important! for alignment, you should make things
 * relative to the canvas' current width/height.
 */
    canvas.width  = container.width;
    canvas.height = container.height;

//grab the audio element
let audioElement = document.getElementById("source");


//Audio Context node.  Used to Create other audio nodes
let audioCtx = new AudioContext();

/*
 * Next we need to make a Analyser node
 * Its the piece that will give us the frequency data to make visuals.
 */
let analyser = audioCtx.createAnalyser();

/*
 * Set the analysers fftSize after creating it.
 * Tells the analyser how large the array of data that it returns should be.
 * Takes the number you provide and divides by two.
 * Must be a value with a root of 2
 * 2048 (the max size that is working) returns 1024
 */
analyser.fftSize = 2048;

/*
 * Last node is the source node.  The analyser can not work with dom elements.
 * The element is converted into a node using createMediaElementSource
 * You can only convert an element to a media source once per page load!!
 */
let source = audioCtx.createMediaElementSource(audioElement);

//Connects the audio source to the users audio output devide
source.connect(analyser);
source.connect(audioCtx.destination);


/*
 * Create an array to store our data.
 * The web audio api is very particular about this.
 * The array needs to be an unsigned array, meaning it has no negative numbers,
 * That has a length of your fftSize we set earlier divided by 2.
 */
let data = new Uint8Array(analyser.frequencyBinCount);


function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
    function draw(){
        data=[...data];
        
    }
};


//Grab the player

var player=document.getElementById("player");

// One-liner to resume playback when user interacted with the page.
player.addEventListener('click', function() {
  audioCtx.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});