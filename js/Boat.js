class Boat
{
    //características
    constructor(x,y,w,h,posY,boatAnimation){
        
        this.body = Bodies.rectangle(x,y,w,h);
        //this.image = loadImage("assets/boat.png");
        World.add(world,this.body);
        this.w = w;
        this.h = h;
        this.posY = posY;
        this.animation = boatAnimation;
        this.speed = 0.05;
        this.IsBroken = false
    }

    animate(){
        this.speed += 0.05;
    }

    //métodos

    remove(index){
        //inserir código
        Matter.Body.setVelocity(this.body,{x:0,y:0});
        this.animation = boatBrokenAnimation;
        this.speed = 0.06
        this.w = 300;
        this.h = 300;
        this.IsBroken = true
        setTimeout(() => {
            Matter.World.remove(world, this.body);
            delete boats[index];
        }, 500); //tempo é dado em milissegundos
    }

    show(){
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.posY,this.w, this.h);
        pop();

        
    }
}