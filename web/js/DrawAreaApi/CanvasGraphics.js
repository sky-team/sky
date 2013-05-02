/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function CanvasGraphics(ctx){
    this.context = ctx;
}

CanvasGraphics.prototype = new Graphics();

CanvasGraphics.prototype.setup = function(){
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.font = this.font;
    this.context.shadowOffsetX = this.shadowOffsetX;
    this.context.shadowOffsetY = this.shadowOffsetY;
    this.context.shadowBlur = this.shadowBlur;
    this.context.shadowColor = this.shadowColor;
}

CanvasGraphics.prototype.clearRect = function(x, y, width, height){
    this.context.clearRect(x, y, width,height)
}

CanvasGraphics.prototype.rect = function(x, y, width, height){
    this.setup();
    this.context.rect(x, y, width, height);
    this.context.stroke();
}

CanvasGraphics.prototype.line = function(x1, y1, x2, y2){
    this.setup();
    this.context.moveTo(x1,y1);
    this.context.lineTo(x2,y2);
    this.context.stroke();
}

CanvasGraphics.prototype.dashLine = function(x1, y1, x2, y2,dash){
    this.setup();
    this.context.setLineDash(dash);
    this.context.moveTo(x1,y1);
    this.context.lineTo(x2,y2);
    this.context.stroke();
}

CanvasGraphics.prototype.fillText = function(text,x,y){
    this.setup();
    this.context.fillText(text, x, y);
    this.context.stroke();
}

CanvasGraphics.prototype.stroke = function(){
    
}

CanvasGraphics.prototype.beginPath = function(){
    this.context.beginPath();
}

CanvasGraphics.prototype.save = function(){
    this.context.save();
}

CanvasGraphics.prototype.closePath = function(){
    this.context.closePath();
}

CanvasGraphics.prototype.restore = function(){
    this.context.restore();
}

CanvasGraphics.prototype.measureText = function(text){
    this.setup();
    return this.context.measureText(text);
}