class CannonBall{
    constructor(x,y){

        var options = {
            isStatic: true
        }; //objeto JS
        this.r = 20;
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world,this.body);
        this.image = loadImage("assets/cannonball.png");
        this.trajetoria=[];
        this.animation=[this.image];
        this.isSink = false   
        this.speed = 0.05
    }

    show(){
        var index = floor(this.speed % this.animation.length);
        push();
        imageMode(CENTER);
        image(this.animation[index],this.body.position.x, this.body.position.y,this.r,this.r);
        pop();
        
        if(this.body.velocity.x > 0 && this.body.position.x > 230){
            var position = [this.body.position.x,this.body.position.y];
            this.trajetoria.push(position);
        }

        for(var i=0; i<this.trajetoria.length;i++){
            image(this.image, this.trajetoria[i][0], this.trajetoria[i][1],5,5);
        }
    }
    
    shoot(){
        var newAngle = cannon.a - 28;
        newAngle = newAngle*(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x*(180/3.14), 
            y: velocity.y*(180/3.14)
        });
    }
    remove(index){
        Matter.Body.setVelocity(this.body,{x:0,y:0});
        this.isSink = true
        this.animation = waterAnimation
        this.speed = 0.05
        this.r = 100
        setTimeout(() => {
            Matter.World.remove(world,this.body);
            delete balls[index];
        }, 2000);
    }
    
    animate(){
        this.speed += 0.05;
    }
}