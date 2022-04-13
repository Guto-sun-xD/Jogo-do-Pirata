class CannonBall{
    constructor(x,y){

        var options = {
            isStatic: true
        }; //objeto JS
        this.r = 20;
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world,this.body);
        this.image = loadImage("assets/cannonball.png");

    }

    show(){
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x, this.body.position.y,this.r,this.r);
        pop();
    }
    
    shoot(){
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {x: +20, y: -10});
    }

}