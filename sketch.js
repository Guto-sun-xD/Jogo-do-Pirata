//Módulos da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint; //restrições (ainda não iremos usar)

//variáveis
var engine, world, solo, torre, cannon, angle, ball, balls=[], boat;
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

  solo = Bodies.rectangle(0,height-1,width,1,options);
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

  //criação do barco (objeto a partir da classe Boat)
  boat = new Boat(width-80, height-60, 170, 170, -80);
 
}

function draw() {

  background("white");
  //imagem de fundo
  image(fundo_img,0,0,1200,600);
  
  //atualização do mecanismo de física
  Engine.update(engine);

  //desenhar o corpo do solo (rect, biblioteca p5)
  rect(solo.position.x, solo.position.y,width*2,1);
  
  //desenhar o corpo da torre
  push(); //insere uma nova configuração
  imageMode(CENTER);
  image(torre_img,torre.position.x,torre.position.y,160,310);
  pop(); //tira essa nova configuração

  //exibe o canhão
  cannon.show();
  
  for(var i=0; i < balls.length; i += 1){
    showCannonBalls(balls[i],i);
  }

  //exibe o barco
  boat.show();

  Matter.Body.setVelocity(boat.body,{
    x:-5,
    y:0,
  });
  
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
  }
}
