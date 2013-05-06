/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function ActorSkeleton(){
    this.hand = new Line();
    this.body = new Line();
    this.lleg = new Line();
    this.rleg = new Line();
}

ActorSkeleton.prototype = new Drawable();

ActorSkeleton.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

ActorSkeleton.prototype.toStr = function(){
    
    return "X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}

ActorSkeleton.prototype.update = function(){
    
    this.hand.setX1(this.x);
    this.hand.setY1(this.y + this.height / 3);
    this.hand.setX2(this.x + this.width);
    this.hand.setY2(this.y + this.height / 3);
    
    this.body.setX1(this.x + this.width / 2);
    this.body.setY1(this.y);
    this.body.setX2(this.x + this.width / 2);
    this.body.setY2(this.y + this.height / 2 + this.height / 5);

    this.lleg.setX1(this.body.x2);
    this.lleg.setY1(this.body.y2);
    this.lleg.setX2(this.x);
    this.lleg.setY2(this.y + this.height);

    this.rleg.setX1(this.body.x2);
    this.rleg.setY1(this.body.y2);
    this.rleg.setX2(this.x + this.width);
    this.rleg.setY2(this.y + this.height);
    
    this.body.update();
    this.hand.update();
    this.lleg.update();
    this.rleg.update();
}

ActorSkeleton.prototype.destroyElement = function(){
    
    if(this.hand.element == null)
        return;
    
    this.hand.destroyElement();
    this.rleg.destroyElement();
    this.lleg.destroyElement();
    this.body.destroyElement();
    
}

ActorSkeleton.prototype.createElement = function(paper){
    
    if(this.hand.element != null)
        return;
    
    this.hand.createElement(paper);
    this.body.createElement(paper);
    this.rleg.createElement(paper);
    this.lleg.createElement(paper);
}


ActorSkeleton.prototype.getWidth = function(){
    return this.width;
}

ActorSkeleton.prototype.getHeight = function(){
    return this.height;
}


ActorSkeleton.prototype.setX = function(x){
    this.x = x;

}

ActorSkeleton.prototype.setY = function(y){
    this.y = y;    
}

ActorSkeleton.prototype.setLocation = function(x,y){ 
    this.x = x;
    this.y = y;    
}

ActorSkeleton.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.hand.setDrawColor(this.drawColor);
    this.body.setDrawColor(this.drawColor);
    this.rleg.setDrawColor(this.drawColor);
    this.lleg.setDrawColor(this.drawColor);
}

ActorSkeleton.prototype.setLineWidth = function(w){
    this.lineWidth = w;
       
    this.hand.setLineWidth(this.lineWidth);
    this.body.setLineWidth(this.lineWidth);
    this.rleg.setLineWidth(this.lineWidth);
    this.lleg.setLineWidth(this.lineWidth);
}

ActorSkeleton.prototype.setWidth = function(w){
    this.width = w;
}

ActorSkeleton.prototype.setHeight = function(h){
    this.height = h;
}

ActorSkeleton.prototype.animate = function(anim,time){
    
    this.hand.animate(anim,time);   
    this.body.animate(anim,time);   
    this.lleg.animate(anim,time);   
    this.rleg.animate(anim,time);   
}

ActorSkeleton.prototype.animate = function(anim,time,easing){
    this.hand.animate(anim,time,easing);   
    this.body.animate(anim,time,easing);   
    this.lleg.animate(anim,time,easing);   
    this.rleg.animate(anim,time,easing);    
}

ActorSkeleton.prototype.animate = function(anim,time,easing,callback){

    this.hand.animate(anim,time,easing,callback);   
    this.body.animate(anim,time,easing,callback);   
    this.lleg.animate(anim,time,easing,callback);   
    this.rleg.animate(anim,time,easing,callback);
}

ActorSkeleton.prototype.applyAttr = function(attr){
    this.hand.applyAttr(attr);
    this.body.applyAttr(attr);
    this.lleg.applyAttr(attr);
    this.rleg.applyAttr(attr);
}

ActorSkeleton.prototype.glow = function(attr){
    this.hand.glow(attr);
    this.body.glow(attr);
    this.lleg.glow(attr);
    this.rleg.glow(attr);
}

ActorSkeleton.prototype.unglow = function(){
    this.hand.unglow();
    this.body.unglow();
    this.lleg.unglow();
    this.rleg.unglow();
}

ActorSkeleton.prototype.toSvg = function(){
    var svg = ''
    svg += this.hand.toSvg();
    svg += this.body.toSvg();
    svg += this.lleg.toSvg();
    svg += this.rleg.toSvg();

    return svg;
}

ActorSkeleton.prototype.getType = function(){
    return "x-1";
}

ActorSkeleton.prototype.refresh = function(){
    this.body.refresh();
    this.hand.refresh();
    this.lleg.refresh();
    this.rleg.refresh();
}