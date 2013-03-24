/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Text(text){
    this.x = 0;
    this.y = 0; 
    
    this.width = 0;
    this.height = 0;
    
    this.text = text;
    
    this.fontFamily = "Arial";
    this.fontSize = 10;
    
    this.drawColor = "black";
    this.clearColor = "white";
}
Text.prototype.setup = function (ctx){
    this.fontSize = getBestSize(ctx,this.text, this.fontFamily, this.width, this.height);
}

Text.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

Text.prototype.draw = function(ctx){
    
    ctx.strokeStyle= this.drawColor;
    ctx.font=this.fontSize+"px "+this.fontFamily;
    ctx.fillText(this.text,this.x,this.y);
    ctx.stroke();
}

Text.prototype.clear = function(ctx){
    this.fontSize = getBestSize(this.text, this.fontFamily, this.width, this.height);
    ctx.strokeStyle= this.clearColor;
    ctx.font=this.fontSize+"px "+fontFamily;
    ctx.fillText(text,this.x,this.y);
    ctx.stroke();
}

Text.prototype.toStr = function(){
    return "Text:["+this.text+"] , "+"X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}
