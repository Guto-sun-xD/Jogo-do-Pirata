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
        push();
        imageMode(CENTER);
        image(this.canhao,this.x,this.y,this.w,this.h);
        pop();

        image(this.base,70,20,200,200);
        //noFill();
        
    }
    
}