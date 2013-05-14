/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ConnectionSpots(){
    
    this.owner = null;
    
    this.XLeftSpot = 0;
    this.YLeftSpot = 0;
    
    this.XRightSpot = 0;
    this.YRightSpot = 0;    
    
    this.XTopSpot = 0;
    this.YTopSpot = 0;  
    
    this.XDownSpot = 0;
    this.YDownSpot = 0;
    
    this.radius = 10;
    
    this.leftElement = null;
    this.rightElement = null;
    this.topElement = null;
    this.downElement = null;
    
    this.isDestroyed = true;
}
ConnectionSpots.prototype = new Drawable();

ConnectionSpots.prototype.leftHasPoint = function(mx,my){
    return this.leftElement.isPointInside(mx,my);
}

ConnectionSpots.prototype.rightHasPoint = function(mx,my){
    return this.rightElement.isPointInside(mx,my);
}

ConnectionSpots.prototype.topHasPoint = function(mx,my){
    return this.topElement.isPointInside(mx,my);
}

ConnectionSpots.prototype.downHasPoint = function(mx,my){
    return this.downElement.isPointInside(mx,my);
}

ConnectionSpots.prototype.toStr = function(){
    return "Left["+this.XLeftSpot+","+this.YLeftSpot+"] , " +
        "Right["+this.XRightSpot+","+this.YRightSpot+"] , " + 
        "Top["+this.XTopSpot+","+this.YTopSpot+"] , " + 
        "Left["+this.XDownSpot+","+this.YDownSpot+"] , ";
}

ConnectionSpots.prototype.setRadius = function(r){
    this.radius = r;
    
    if(this.isDestroyed)
        return ;
    
    this.leftElement.attr({"r":r});
    this.rightElement.attr({"r":r});
    this.topElement.attr({"r":r});
    this.downElement.attr({"r":r});
}

ConnectionSpots.prototype.getSpotDirection = function(spot){
    if(this.leftElement == spot)
        return 1;

    if(this.rightElement == spot)
        return 2;

    if(this.topElement == spot)
        return 3;

    if(this.downElement == spot)
        return 4;
    
    return 0;
}

ConnectionSpots.prototype.getSpot = function(direction){
    if(direction == 1)
        return this.leftElement;

    if(direction == 2)
        return this.rightElement;

    if(direction == 3)
        return this.topElement;

    if(direction == 4)
        return this.downElement;
    
    return null;
}

ConnectionSpots.prototype.setXLeftSpot = function(x){
    this.XLeftSpot = x;
    if(this.isDestroyed)
        return ;
    this.leftElement.attr({"cx":x});
}

ConnectionSpots.prototype.setYLeftSpot = function(y){
    this.YLeftSpot = y;
    if(this.isDestroyed)
        return ;
    this.leftElement.attr({"cy":y});
}

ConnectionSpots.prototype.setXRightSpot = function(x){
    this.XRightSpot = x;
    if(this.isDestroyed)
        return ;
    this.rightElement.attr({"cx":x});
}

ConnectionSpots.prototype.setYRightSpot = function(y){
    this.YRightSpot = y;
    if(this.isDestroyed)
        return ;
    this.rightElement.attr({"cy":y});
}

ConnectionSpots.prototype.setXTopSpot = function(x){
    this.XTopSpot = x;
    if(this.isDestroyed)
        return ;
    this.topElement.attr({"cx":x});
}

ConnectionSpots.prototype.setYTopSpot = function(y){
    this.YTopSpot = y;
    if(this.isDestroyed)
        return ;
    this.topElement.attr({"cy":y});
}

ConnectionSpots.prototype.setXDownSpot = function(x){
    this.XDownSpot = x;
    if(this.isDestroyed)
        return ;
    this.downElement.attr({"cx":x});
}

ConnectionSpots.prototype.setYDownSpot = function(y){
    this.YDownSpot = y;
    if(this.isDestroyed)
        return ;
    this.downElement.attr({"cy":y});
}

ConnectionSpots.prototype.show = function(){
    if(this.isDestroyed)
        return ;
    this.leftElement.show();
    this.rightElement.show();
    this.topElement.show();
    this.downElement.show();
    this.resume();
    
}

ConnectionSpots.prototype.applyAttr = function(a){
    if(this.isDestroyed)
        return ;
    this.leftElement.attr(a);
    this.rightElement.attr(a);
    this.topElement.attr(a);
    this.downElement.attr(a);
}

ConnectionSpots.prototype.animate = function(anim,time){
    if(this.isDestroyed)
        return ;
    this.leftElement.animate(anim,time);
    this.rightElement.animate(anim,time);
    this.topElement.animate(anim,time);
    this.downElement.animate(anim,time);
}

ConnectionSpots.prototype.animate = function(anim,time,esay){
    if(this.isDestroyed)
        return ;
    this.leftElement.animate(anim,time,esay);
    this.rightElement.animate(anim,time,esay);
    this.topElement.animate(anim,time,esay);
    this.downElement.animate(anim,time,esay);
}

ConnectionSpots.prototype.animate = function(anim,time,esay,callback){
    if(this.isDestroyed)
        return ;
    this.leftElement.animate(anim,time,esay,callback);
    this.rightElement.animate(anim,time,esay,callback);
    this.topElement.animate(anim,time,esay,callback);
    this.downElement.animate(anim,time,esay,callback);
}

ConnectionSpots.prototype.resume = function(){
    if(this.isDestroyed)
        return ;
    this.leftElement.resume();
    this.rightElement.resume();
    this.topElement.resume();
    this.downElement.resume();
}

ConnectionSpots.prototype.stop = function(){
    if(this.isDestroyed)
        return ;
    this.leftElement.stop();
    this.rightElement.stop();
    this.topElement.stop();
    this.downElement.stop();
    
}

ConnectionSpots.prototype.hide = function(){
    
    if(this.isDestroyed)
        return ;
    this.leftElement.hide();
    this.rightElement.hide();
    this.topElement.hide();
    this.downElement.hide();
    this.stop();
    
}


ConnectionSpots.prototype.setDrawColor = function(color){
    this.drawColor = color;
    if(this.isDestroyed)
        return ;
    this.leftElement.attr({"stroke":color});
    this.rightElement.attr({"stroke":color});
    this.topElement.attr({"stroke":color});
    this.downElement.attr({"stroke":color});
}

ConnectionSpots.prototype.setDashArray = function(da){
    if(this.isDestroyed)
        return ;
    this.leftElement.attr({"stroke-dasharray":da});
    this.rightElement.attr({"stroke-dasharray":da});
    this.topElement.attr({"stroke-dasharray":da});
    this.downElement.attr({"stroke-dasharray":da});
}

ConnectionSpots.prototype.destroyElement = function(){
    if(this.isDestroyed || this.leftElement == null)
        return;
    
    this.isDestroyed = true;
    this.leftElement.remove();
    this.rightElement.remove();
    this.topElement.remove();
    this.downElement.remove();
    
    this.leftElement = null;
    this.rightElement = null;
    this.topElement = null;
    this.downElement = null;
}

ConnectionSpots.prototype.createElement = function(paper){
    
    if(!this.isDestroyed)
        return ;
    this.isDestroyed = false;
   this.leftElement = paper.circle(this.XLeftSpot, this.YLeftSpot, this.radius);
   this.rightElement = paper.circle(this.XRightSpot, this.YRightSpot, this.radius);
   this.topElement = paper.circle(this.XTopSpot, this.YTopSpot, this.radius);
   this.downElement = paper.circle(this.XDownSpot, this.YDownSpot, this.radius);
   
   this.applyAttr({"fill" : "green" , "fill-opacity" : 0.7});
   
   this.setDashArray("- ");
}

ConnectionSpots.prototype.setOnClickHandler = function(handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.click(handler);
    this.rightElement.click(handler);
    this.topElement.click(handler);
    this.downElement.click(handler);
}

ConnectionSpots.prototype.setOnMouseOverHandler = function(handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.mouseover(handler);
    this.rightElement.mouseover(handler);
    this.topElement.mouseover(handler);
    this.downElement.mouseover(handler);
}

ConnectionSpots.prototype.setOnMouseOutHandler = function(handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.mouseout(handler);
    this.rightElement.mouseout(handler);
    this.topElement.mouseout(handler);
    this.downElement.mouseout(handler);
}


ConnectionSpots.prototype.setOnHoverHandler = function(hover_in_handler,hover_out_handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.hover(hover_in_handler,hover_out_handler);
    this.rightElement.hover(hover_in_handler,hover_out_handler);
    this.topElement.hover(hover_in_handler,hover_out_handler);
    this.downElement.hover(hover_in_handler,hover_out_handler);
}

ConnectionSpots.prototype.setOnMouseMoveHandler = function(handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.mousemove(handler);
    this.rightElement.mousemove(handler);
    this.topElement.mousemove(handler);
    this.downElement.mousemove(handler);
}

ConnectionSpots.prototype.setOnMouseDownHandler = function(handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.mousedown(handler);
    this.rightElement.mousedown(handler);
    this.topElement.mousedown(handler);
    this.downElement.mousedown(handler);
}

ConnectionSpots.prototype.setOnMouseUpHandler = function(handler){
    if(this.isDestroyed)
        return ;
    this.leftElement.mouseup(handler);
    this.rightElement.mouseup(handler);
    this.topElement.mouseup(handler);
    this.downElement.mouseup(handler);
}