const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 2;
let randomIndex = 0;
let levelcount = 1;
let characterReset = false;
let speed = 10;

const animals = ["img/icons/test_dog.gif", "img/icons/cat_test.gif"];
const animalTops = [511, 547];

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img/layers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img/layers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/layers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img/layers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/layers/layer-5.png';

var character = document.getElementById("character");
var animal = document.getElementById("animal");
var title = document.getElementById("title");
var characterLeftStart = parseInt(getComputedStyle(character).getPropertyValue("left"));

setInterval(function () {

    //Gigachad
    var characterLeft = parseInt(getComputedStyle(character).getPropertyValue("left"));
    var characterWidth = parseInt(getComputedStyle(character).getPropertyValue("width"));
    var characterHeight = parseInt(getComputedStyle(character).getPropertyValue("height"));
    var characterY = parseInt(getComputedStyle(character).getPropertyValue("top"));

    //Dog
    var dogLeft = parseInt(getComputedStyle(animal).getPropertyValue("left"));
    var dogWidth = parseInt(getComputedStyle(animal).getPropertyValue("width"));
    var dogHeight = parseInt(getComputedStyle(animal).getPropertyValue("height"));
    var dogY = parseInt(getComputedStyle(animal).getPropertyValue("top"));
    var animalImage = document.getElementById("animalImage");

    //speed diff
    if (speed > 20 + (levelcount * 1)) {
        character.style.left = (characterLeft + (speed - 20)) + "px";
        characterLeft = (characterLeft + (speed - 20));
    }

    if (speed < 20 + (levelcount * 1)) {
        if (characterLeft <= 5){
            character.style.left = 5;
        }
        else {
            character.style.left = (characterLeft + (speed - 20)) + "px";
            characterLeft = (characterLeft + (speed - 20));
        }    
    }

    //herkent het aantal px niet
    //console.log("hond  is " + animal.style.width + "px"); 

    // herkent het aantal px wel
    //console.log("hond  is " + dogWidth + "px"); 

    //collision detection

    //Van ventje en hond denkbeeldige rectangle maken

    if (characterLeft < dogLeft + dogWidth &&
        characterLeft - 80 + characterWidth > dogLeft &&
        characterY < dogY + dogHeight &&
        characterY + characterHeight > dogY) 
    {
        //collision detected
        levelcount++;
        title.innerHTML = "Level " + levelcount;
        character.style.left = characterLeftStart + "px";
        randomIndex = Math.floor(Math.random() * animals.length);
        animalImage.src = animals[randomIndex];
        animal.style.top = animalTops[randomIndex] + "px";
        
    } else {
        //no collision
    }
}, 100);

function getSpeed(sensorSpeed) {
    speed = Math.round(sensorSpeed, 0);
}

/* code used for the background, this is displayed in a canvas */

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;

        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }

        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.1);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1.1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
animate();