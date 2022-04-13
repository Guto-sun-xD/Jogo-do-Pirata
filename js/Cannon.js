class Cannon{
    constructor(x,y,w,h,a){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
        this.base = loadImage("assets/cannonBase.png");
        this.canhao = loadImage("assets/canon.png");
    }
  
    show(){
        
        if(keyIsDown(RIGHT_ARROW) && this.a < +50){
            this.a += 1;
        }
        
        if(keyIsDown(LEFT_ARROW) && this.a > -30){
            this.a -= 1;
        }
          
        push();
        translate(this.x, this.y);
        rotate(this.a);
        imageMode(CENTER);
        image(this.canhao,0,0,this.w,this.h);
        pop();

        image(this.base,70,20,200,200);
        //noFill();
        
    }
    
}