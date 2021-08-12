var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  ghost=createSprite(300,200,10,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3

  spookySound.loop();     
}

function draw() {
  background(200);
  if(tower.y > 400){
    tower.y = 300
  }  

  if(gameState=="play"){

  
 
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    if(keyDown("left")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState="end"
    }
    
    if(climbersGroup.isTouching(ghost)){
      ghost.collide(climber);
    }
    
    spawndoors();
      
  }
  if(gameState=="end"){
    text("Game Over",300,300);
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
  }
    ghost.velocityY=ghost.velocityY+0.8;
    drawSprites(); 
}
function spawndoors(){
  if(frameCount%300==0){
    door=createSprite(200,-10,);
    door.velocityY=2;

    climber=createSprite(200,50)
    climber.velocityY=2;

    invisibleBlock=createSprite(200,60,climber.width-10,10)
    invisibleBlock.velocityY=2;
    

    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    
    door.x=Math.round(random(120,450));
    climber.x=door.x;
    invisibleBlock.x=door.x

    invisibleBlockGroup.visible=false;
    ghost.depth=door.depth+1;
    door.lifetime=700;
    climber.lifetime=700;
    invisibleBlock.lifetime=700;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    

  }
}