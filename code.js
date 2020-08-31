var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":3,"version":"6SwV8oyDcqrkUmerJKVhj8TTBxVRLb4H","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"gYSP0hk0cJ4P3pi5RetoBrKR0mrUIQtg","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"2R0DgWtd3BuInv1oINbfyKQOKmn.6UfR","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----



var PLAY = 1;
var END = 0;
var gameState = PLAY;


 var stone=createSprite(350,340,20,20);
  stone.setAnimation("Stone");
  stone.visible=false;
  //stone.velocityX=-4;
  stone.scale=0.1;
  stone.lifetime=100;
  

var monkey=createSprite(60,320,20,20);
monkey.setAnimation("monkey");
monkey.scale=0.1;

var ground=createSprite(200,370,400,20);
ground.x = ground.width /2;

var rockGroup=createGroup();
var bananaGroup=createGroup();

var count =0;












function draw() {
  
  background(255);
  
  text("life time: "+ count, 250, 100);
  console.log(World.frameRate);
  
  if (gameState===PLAY) {
    if(keyDown("space") && monkey.y >= 195){
      monkey.velocityY = -14 ;
      playSound("assets/category_jump/arcade_game_jump_1.mp3", false);
      
    }
    
     count = count+ Math.round(World.frameRate/60);
     
     
     monkey.velocityY = monkey.velocityY + 0.8;
     
     ground.velocityX=-6;
     
     creatstone();
     
     creatbanana();
     
     if (ground.x>0) {
      ground.x=ground.width/2; 
     }
    
      if (count>0 && count%100 === 0){
      playSound("assets/category_digital/ring_1.mp3");
    }
    
   
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
   playSound("assets/category_bell/vibrant_game_bell_twinkle_positive_touch_1.mp3", false);
    }
    
    if (monkey.isTouching(rockGroup)) {
       gameState=END;
       
    
        
     }
      
     
    monkey.collide(ground);
    
  }else if (gameState===END){
  
  ground.velocityX = 0;
    monkey.velocityY = 0;
    stone.velocityX=0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stone.lifetime=(-1);
    
      rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    rockGroup.destroyEach();
       bananaGroup.destroyEach();
       count=0;
  textSize(20);
  
  text("game over press r to restart", 70,200);
   

  
    
  }
  

  
 drawSprites();
   
 if(keyDown("r")&&gameState===END) {
    reset();
  }
       
  
}



function creatstone(){
  if(World.frameCount%300===0){
  var stone=createSprite(350,340,20,20);
  stone.setAnimation("Stone");
  stone.visible=true;
  stone.velocityX=-(4+ 3*count/100);
  stone.lifetime=100;
  stone.scale=0.1;
  
  rockGroup.add(stone);
  }
 
  
}



function creatbanana(){
  if(World.frameCount%80===0){
  var banana=createSprite(randomNumber(100,350),randomNumber(120,200),20,20);
  banana.setAnimation("Banana");
  banana.velocityX=-(4+ 3*count/100);
  banana.lifetime=100;
  banana.scale=0.05;
  
  bananaGroup.add(banana);
  }
 
  
}

function reset(){
 gameState=PLAY;
  count = count+ Math.round(World.frameRate/60);
 ground.velocityX=-6;
 
}
































  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
