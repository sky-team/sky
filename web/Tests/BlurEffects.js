/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BlurEffects(sc,sb){
    this.shadowColor = sc;
    this.shadowBlur = sb;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
}

BlurEffects.prototype.startEffects = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.shadowOffsetX=this.shadowOffsetX;
    ctx.shadowOffsetY=this.shadowOffsetY;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.shadowColor;
}

BlurEffects.prototype.endEffects = function(ctx){
    ctx.closePath();
    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgb(0,0,0,0)";
}

BlurEffects.prototype.getType = function(){
    return "blur";
}
