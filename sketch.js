//Módulos da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint; //restrições (ainda não iremos usar)

//variáveis
var engine, world, solo, torre, cannon, angle, ball, balls=[], boat, boats=[];
var fundo_img, torre_img;

var boatAnimation = [];
var boatJSON, boatPNG; 
var boatBrokenAnimation = []
var boatBrokenJSON, boatBrokenPNG

//pré-carregamento das imagens
function preload() {
  fundo_img = loadImage("assets/background.gif");
  torre_img = loadImage("assets/tower.png");
  boatJSON = loadJSON("assets/boat/boat.json"); //spritedata
  boatPNG = loadImage("assets/boat/boat.png"); //spritesheet
  boatBrokenJSON = loadJSON("assets/boat/brokenBoat.json");
  boatBrokenPNG = loadImage("assets/boat/brokenBoat.png");
}

function setup() {
  //criação da tela
  canvas = createCanvas(1200, 600);
  //criação do mecanismo de física
  engine = Engine.create();
  //criação do mundo
  world = engine.world;

  angleMode(DEGREES);
  angle = 20;

  //criação do corpo do solo
  var options = {
    isStatic: true
  }

  solo = Bodies.rectangle(0,height-1,width*2,1,options); //estava width/2 na posX
  World.add(world,solo);
  
  //criacao do canhao (objeto a partir da classe)
  cannon = new Cannon(180,110,130,100,angle);

  //criação do corpo da torre
  torre = Bodies.rectangle(160,350,160,310,options);
  World.add(world,torre);

  //animação do barco inteiro
  var boatFrames = boatJSON.frames;
  for(var i=0; i<boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatPNG.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }
  
  var boatBrokenFrames = boatBrokenJSON.frames;
  for(var i=0; i<boatBrokenFrames.length; i++){
    var pos = boatBrokenFrames[i].position;
    var img = boatBrokenPNG.get(pos.x,pos.y,pos.w,pos.h);
    boatBrokenAnimation.push(img);
  }

}

function draw() {

  background("white");
  //imagem de fundo
  image(fundo_img,0,0,1200,600);
  
  //atualização do mecanismo de física
  Engine.update(engine);

  //desenhar o corpo do solo (rect, biblioteca p5)
  push();
  rectMode(CENTER);
  rect(solo.position.x, solo.position.y,width*2,1);
  pop();
  
  //desenhar o corpo da torre
  push(); //insere uma nova configuração
  imageMode(CENTER);
  image(torre_img,torre.position.x,torre.position.y,160,310);
  pop(); //tira essa nova configuração

  //exibe o canhão
  cannon.show();
  
  //percorre a matriz bolas para mostrá-las e detectar sua colisão com o barco
  for(var i=0; i < balls.length; i += 1){
    showCannonBalls(balls[i],i);
    collisionWithBoat(i);
  }

  

  showBoats();
  
}

function keyReleased() {
  if(keyCode == 32){
    balls[balls.length - 1].shoot();
  }
}
function keyPressed(){
  if(keyCode == 32){
  //criação da bola (objeto a partir da classe)
  ball = new CannonBall(cannon.x,cannon.y);
  balls.push(ball);
}
}

function showCannonBalls(ball, i) {
  if(ball){
    ball.show()
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(i);
    }
  }
}

function showBoats(){
  if(boats.length > 0){
  if(boats[boats.length-1] == undefined || boats[boats.length-1].body.position.x < width - 450){
  var positions = [-70,-110,-60,-90];
  var position = random(positions);
  boat = new Boat(width-80, height-60, 170, 170, position, boatAnimation);
  boats.push(boat);  
}
  for(var i = 0; i < boats.length; i++){
    if(boats[i]){
      Matter.Body.setVelocity(boats[i].body,{ 
      x:-2,
      y:0,
    });
    boats[i].show();
    boats[i].animate();

  }
 } 
}
  else{
    //criação do barco (objeto a partir da classe Boat)
  boat = new Boat(width-80, height-60, 170, 170, -80, boatAnimation);
  boats.push(boat);
  }
}

function collisionWithBoat(index){
  //percorrer a matriz de barcos
  for(var i=0; i < boats.length; i=i+1){
    //detectar a colisão
    if(balls[index] !== undefined && boats[i] != undefined){
    //         0                           0
    //         0                           1
    //         1                           0
    //         1                           1 

    var collision = Matter.SAT.collides(balls[index].body,boats[i].body);

    if(collision.collided){
      boats[i].remove(i);
      Matter.World.remove(world,balls[index].body);
      delete balls[index];
    }
    }
  }
}