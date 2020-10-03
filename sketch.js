//creating global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle,obstacles, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime=0;
var ground;
var score=0;


function preload(){
  
  //create/load monkey animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //load obstacle/banana images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  background("white");
  //create monkey
  monkey=createSprite(80,315,20,20);
  //add moving animation to monkey
  monkey.addAnimation("moving",monkey_running);
  //scale monkey image
  monkey.scale=0.1;
  
  //create ground
  ground=createSprite(400,350,900,10);
  //make ground move backwards
  ground.velocityX=-4;
  console.log(ground.x);
  //create groups
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  

  

  
}


function draw() {
  background("white");
  //give scrolling ground
  ground.x=ground.width/2;
  //call "bananas" function
  bananas();
  //call "obstacles" function
  obstacles();
  //jump when space key is pressed
  //FIX ISSUE WHERE MONKEY JUMPS TOO HIGH AND REACHES GROUND TOO SLOWLY  
  if (keyDown("space")){ 
    monkey.y=-4;
  } 
  //add gravity to monkey
  monkey.velocityY=monkey.velocityY+0.8 
  //make sure monkey doesnt fall down
  monkey.collide(ground);
  //if monkey touches banana, destroy banana sprite 
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  //if monkey touches rock, destroy rock sprite
  if (monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
  }
  //create and display score
  //FIX ISSUE WHERE SCORE DOES NOT WORK NOT ADDING 2 WHEN MONKEY TOUCHES BANANA (NaN,undefined)
  stroke("black");
  textSize(20);
  fill("black");
  text("score:"+score,10,390);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:" +survivalTime,100,50);
  
  
  drawSprites();
  
}
  
  


function bananas(){ 
  if (frameCount%80===0){
    //create banana & assign random y position range 120-200
  banana=createSprite(400,Math.round(random(120,200)),20,20);
    //add image to banana sprite
    banana.addImage("banana",bananaImage);
    //scale image
    banana.scale=0.1;
    //give velocityX (speed and direction)
    banana.velocityX=-4;
    //set lifetime to prevent memory leakage
    banana.lifetime=100;
    //add code for "banana" into "bananaGroup"
    bananaGroup.add(banana);
    
  }
}
  
function obstacles(){
  //every 300 frames code in code block runs
  if (frameCount%300===0){
    //create obstacle sprites
    var obstacle=createSprite(370,320,20,20);
    //assign velocityX to obstacles
    obstacle.velocityX=(-6);
    //add images to obstacles
    obstacle.addImage("obstacle",obstacleImage);
    //scale obstacle images
    obstacle.scale=0.2;
    //set lifetime to obstacles to prevent memory leaks
    obstacle.lifetime=100;
    //add obstacle for "obstacle" to "obstacleGroup"
    obstacleGroup.add(obstacle);
      }
}
  
  
  

  
  
  
  






