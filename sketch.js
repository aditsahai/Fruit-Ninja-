var sword , swordSound;
var score;
var gameState = 1;
var PLAY = 1;
var END =0;
var enemyGroup, fruitGroup;
var fruit1 ,  fruit2 , fruit3 , fruit4;
var monster , monsterImage;
var gameOver , gameOverImg , gameOverSound;



function preload(){
   
  
 swordImage = loadImage("sword.png"); 
  fruit1 =    loadImage("fruit1.png");
  fruit2 =    loadImage("fruit2.png");
  fruit3 =    loadImage("fruit3.png");
  fruit4 =    loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png");
  monsterImage = loadImage("alien2.png");
  gameOverImg =   loadImage("gameover.png");
  swordSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
 
}

function setup(){
createCanvas(600 , 600);

  sword = createSprite(70,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  
  sword.setCollider("circle",0,0,40);
  

  
}

function draw(){
  
  
  
  background("lightblue");
  

  
  if(gameState===PLAY){
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  fruits();
  Enemy();

  if(sword.isTouching(fruitGroup))
  {
   fruitGroup.destroyEach();
   score = score+2;
  swordSound.play();
  }
  
if(sword.isTouching(enemyGroup))
{
  gameState= END;
  gameOverSound.play();

}
  }
  
  if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    gameOver = createSprite(400,200,20,20);
    gameOver.addImage(gameOverImg);
    
    sword.x = 200;
    sword.y = 200;
  }
  
   text("Score:"+score,300,30);
  
   
  
  
  drawSprites();
  
  position = Math.round(random(1,2));
 
}

function fruits()
{
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    fruit.velocityX=-(10 + (score/4));
    
    //fruit.debug=true;
    
    r=Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1);
    } else if(r===2){
      fruit.addImage(fruit2);
    } else if(r===3){
      fruit.addImage(fruit3);
    } else if(r===4){
      fruit.addImage(fruit4);
    }
    
    fruit.y =Math.round(random(50,350));
    fruitGroup.add(fruit);
    
      
    }
  }

function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
   monster.velocityX=-(10 + (score/4));
   
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}