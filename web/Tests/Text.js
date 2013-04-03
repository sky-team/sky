/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Text(text){

    this.width = 0;
    this.height = 0;
    
    this.text = text;
    
    this.fontFamily = "Arial";
    this.fontSize = 20;
    
    this.effects = new Array();
}

Text.prototype = new Drawable();

Text.prototype.setup = function (ctx){
    var best = getRealSize(ctx,this.text,this.fontSize,this.fontFamily);
    this.width = best.width;
    this.height = best.height;
}

Text.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

Text.prototype.draw = function(ctx){
    
    for(var i = 0 ; i < this.effects.length ;i++){
        this.effects[i].startEffects(ctx);
    }

    ctx.strokeStyle= this.drawColor;
    ctx.font=this.fontSize+"px "+this.fontFamily;
    ctx.fillText(this.text,this.x,this.y);
    ctx.stroke();
    
    for(var i = 0 ; i < this.effects.length ;i++){
        this.effects[i].endEffects(ctx);
    }
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
