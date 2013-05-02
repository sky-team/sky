/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Triangle(){
    this.line1 = new Line();
    this.line2 = new Line();
    this.line3 = new Line();
    
    this.conx = 0;
    this.cony = 0;
    
    this.size = 0;
    
    this.rotation = 0;
    this.direction = 0;
    
    this.effects = new Array();
}

Triangle.prototype = new Drawable();

Triangle.prototype.hasPoints = new function(mx,my){
    return false;
}

Triangle.prototype.update = function(){
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
            
            this.conx = this.line1.x2;
            this.cony = this.line1.y2 + this.size;
        break;
        
        case 1:
            
            this.line1.setX2(this.x - this.size);
            this.line1.setY2(this.y - this.size);
            
            this.line2.setX2(this.x + this.size);
            this.line2.setY2(this.y - this.size);
            
            this.conx = this.line1.x2 + this.size;
            this.cony = this.line1.y2;
        break;
        
        case 2:
            
            this.line1.setX2(this.x - this.size);
            this.line1.setY2(this.y - this.size);
 
            this.line2.setX2(this.x - this.size);
            this.line2.setY2(this.y + this.size);
            
            this.conx = this.line1.x2;
            this.cony = this.line1.y2 + this.size;
        break;
        
        case 3:
            
            this.line1.setX2(this.x - this.size);
            this.line1.setY2(this.y + this.size);

            this.line2.setX2(this.x + this.size);
            this.line2.setY2(this.y + this.size);
            
            this.conx = this.line1.x2 + this.size;
            this.cony = this.line1.y2;
        break;
    }
    
    this.line3.setX1(this.line1.x2);
    this.line3.setY1(this.line1.y2);
    this.line3.setX2( this.line2.x2);
    this.line3.setY2(this.line2.y2);
    
    this.line1.effects = this.effects;
    this.line2.effects = this.effects;
    this.line3.effects = this.effects;
    
    this.line1.update();
    this.line2.update();
    this.line3.update();
}

Triangle.prototype.destroyElement = function(){
    
    if(this.line1.element == null)
        return;
    
    this.line1.destroyElement();
    this.line2.destroyElement();
    this.line3.destroyElement();
}

Triangle.prototype.createElement = function(paper){
    if(this.line1.element != null)
        return;
    
    this.line1.createElement(paper);
    this.line2.createElement(paper);
    this.line3.createElement(paper);
}


Triangle.prototype.getWidth = function(){
    return this.size;
}

Triangle.prototype.getHeight = function(){
    return this.size;
}

Triangle.prototype.setSize = function(s){
    this.size = s;
}

Triangle.prototype.setX = function(x){
    this.x = x;
}

Triangle.prototype.setY = function(y){
    this.y = y;
}


Triangle.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.line1.setDrawColor(color);
    this.line2.setDrawColor(color);
    this.line3.setDrawColor(color);
}

Triangle.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.line1.setLineWidth(w);
    this.line2.setLineWidth(w);
    this.line3.setLineWidth(w);
}

Triangle.prototype.hide = function(){
    this.line1.hide();
    this.line2.hide();
    this.line3.hide();
}

Triangle.prototype.show = function(){
    this.line1.show();
    this.line2.show();
    this.line3.show();
}

Triangle.prototype.glow = function(attr){
    this.line1.glow(attr);
    this.line2.glow(attr);
    this.line3.glow(attr);
}

Triangle.prototype.unglow = function(){  
   this.line1.unglow();
   this.line2.unglow();
   this.line3.unglow();
}

Triangle.prototype.toSvg = function(){
    var svg = '';
    svg += this.line1.toSvg();
    svg += this.line2.toSvg();
    svg += this.line3.toSvg();

    return svg;
}