class Boat
{
    //características
    constructor(x,y,w,h,posY){
        
        this.body = Bodies.rectangle(x,y,w,h);
        this.image = loadImage("assets/boat.png");
        World.add(world,this.body);
        this.w = w;
        this.h = h;
        this.posY = posY;
    }

    //métodos

    show(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.posY,this.w, this.h);
        pop();

        
    }
}