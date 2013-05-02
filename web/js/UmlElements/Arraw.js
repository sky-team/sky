/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Arraw(){
    this.line1 = new Line();
    this.line2 = new Line();
    
    this.conx = 0;
    this.cony = 0;
    
    this.size = 10;
    
    this.rotation = 0;
    this.direction = 0;
    
    this.effects = new Array();
}

Arraw.prototype = new Drawable();

Arraw.prototype.hasPoints = new function(mx,my){
    return false;
}

Arraw.prototype.update = function(){
    this.line1.setX1(this.x);
    this.line1.setY1(this.y);
    this.line2.setX1(this.x);
    this.line2.setY1(this.y);
    
    switch(this.direction){
        case 0:
            
            this.line1.setX2(this.x + this.size);
            this.line1.setY2(this.y - this.size);

            this.line2.setX2(this.x + this.size);
            this.line2.setY2(this.y + this.size);
            
        break;
        
        case 1:
            
            this.line1.setX2(this.x - this.size);
            this.line1.setY2(this.y - this.size);
            
            this.line2.setX2(this.x + this.size);
            this.line2.setY2(this.y - this.size);
        break;
        
        case 2:
            
            this.line1.setX2(this.x - this.size);
            this.line1.setY2(this.y - this.size);
 
            this.line2.setX2(this.x - this.size);
            this.line2.setY2(this.y + this.size);
        break;
        
        case 3:
            
            this.line1.setX2(this.x - this.size);
            this.line1.setY2(this.y + this.size);

            this.line2.setX2(this.x + this.size);
            this.line2.setY2(this.y + this.size);
            
        break;
    }
    
    this.conx = this.line1.x1;
    this.cony = this.line1.y1;
    
    this.line1.effects = this.effects;
    this.line2.effects = this.effects;
    
    this.line1.update();
    this.line2.update();
}

Arraw.prototype.destroyElement = function(){
    
    if(this.line1.element == null)
        return;
    
    this.line1.destroyElement();
    this.line2.destroyElement();
}

Arraw.prototype.createElement = function(paper){
    if(this.line1.element != null)
        return;
    
    this.line1.createElement(paper);
    this.line2.createElement(paper);
}


Arraw.prototype.getWidth = function(){
    return this.size;
}

Arraw.prototype.getHeight = function(){
    return this.size;
}

Arraw.prototype.setSize = function(s){
    this.size = s;
}

Arraw.prototype.setX = function(x){
    this.x = x;
}

Arraw.prototype.setY = function(y){
    this.y = y;
}


Arraw.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.line1.setDrawColor(color);
    this.line2.setDrawColor(color);
}

Arraw.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.line1.setLineWidth(w);
    this.line2.setLineWidth(w);
}

Arraw.prototype.hide = function(){
    this.line1.hide();
    this.line2.hide();
}

Arraw.prototype.show = function(){
    this.line1.show();
    this.line2.show();
}

Arraw.prototype.glow = function(attr){
    this.line1.glow(attr);
    this.line2.glow(attr);
}

Arraw.prototype.unglow = function(){  
   this.line1.unglow();
   this.line2.unglow();
}

Arraw.prototype.toSvg = function(){
    var svg = '';
    svg += this.line1.toSvg();
    svg += this.line2.toSvg();

    return svg;
}