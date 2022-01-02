var PLAY = 1;
var END = 0;
var gameState = PLAY;

var nezuko, nezuko_running, nezuko_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score=0;

var gameOver, restart;


function preload(){
  nezuko_running =   loadAnimation("hi.png");
  
  groundImage = loadImage("ground2.png");
  
  
  obstacle1 = loadImage("akaza-removebg-preview.png");
  obstacle2 = loadImage("muzan-removebg-preview.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  nezuko = createSprite(50,180,20,50);
  
  nezuko.scale = 0.9;
  obstacle1.scale =0.01
  obstacle2.scale =0.01
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    nezuko.changeAnimation("running", nezuko_running);
    
    if(keyDown("space") && nezuko.y >= 159) {
      nezuko.velocityY = -12;
    }
  
    nezuko.velocityY = nezuko.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    nezuko.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(nezuko)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    

    ground.velocityX = 0;
    nezuko.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    

    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);

    obstacle.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}