//Módulos da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint; //restrições (ainda não iremos usar)

//variáveis
var engine, world, solo, torre, cannon, angle;
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
  
  angle = 20;
  //criacao do canhao
  cannon = new Cannon(180,110,130,100,angle);

  //criação do corpo da torre
  torre = Bodies.rectangle(160,350,160,310,options);
  World.add(world,torre);
  
 
}

function draw() {

  background("white");
  //imagem de fundo
  image(fundo_img,0,0,1200,600);
  
  //atualização do mecanismo de física
  Engine.update(engine);

  //desenhar o corpo do solo (rect, biblioteca p5)
  rect(solo.position.x, solo.position.y,width,1);
  

  //desenhar o corpo da torre
  push(); //insere uma nova configuração
  imageMode(CENTER);
  image(torre_img,torre.position.x,torre.position.y,160,310);
  pop(); //tira essa nova configuração

  cannon.show();

  
   
}
