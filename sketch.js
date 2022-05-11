//Módulos da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint; //restrições (ainda não iremos usar)

//variáveis
var engine, world, solo, torre, cannon, angle, ball, balls=[], boat, boats=[];
var fundo_img, torre_img;


//pré-carregamento das imagens
function preload() {
  fundo_img = loadImage("assets/background.gif");
  torre_img = loadImage("assets/tower.png");
}

function setup() {
  //criação da tela
  canvas = createCanvas(1200, 600);
  //criação do mecanismo de física
  engine = Engine.create();
  //criação do mundo
  world = engine.world;
  //criação do corpo do solo
  var options = {
    isStatic: true
  }

  solo = Bodies.rectangle(width/2,height-1,width*2,1,options);
  World.add(world,solo);
  
  angleMode(DEGREES);
  angle = 20;
  //criacao do canhao (objeto a partir da classe)
  cannon = new Cannon(180,110,130,100,angle);

  //criação do corpo da torre
  torre = Bodies.rectangle(160,350,160,310,options);
  World.add(world,torre);

  //criação da bola (objeto a partir da classe CannonBall)
  ball = new CannonBall(cannon.x,cannon.y);

  
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
  boat = new Boat(width-80, height-60, 170, 170, position);
  boats.push(boat);  
}
  for(var i = 0; i < boats.length; i++){
    if(boats[i]){
      Matter.Body.setVelocity(boat.body,{
      x:-2,
      y:0,
    });
    boats[i].show();
  }
 } 
}
  else{
    //criação do barco (objeto a partir da classe Boat)
  boat = new Boat(width-80, height-60, 170, 170, -80);
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