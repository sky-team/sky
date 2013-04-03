/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BlurEffects(sc,sb){
    this.shadowColor = sc;
    this.shadowBlur = sb;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.opacity = 0.5;
    this.fill = true;
}

BlurEffects.prototype.startEffects = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.shadowOffsetX=this.shadowOffsetX;
    ctx.shadowOffsetY=this.shadowOffsetY;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOpacity = this.opacity;
    ctx.shadowFill = this.fill;
}

BlurEffects.prototype.endEffects = function(ctx){
    ctx.closePath();
    ctx.restore();
    ctx.shadowBlur = undefined;
    ctx.shadowColor = undefined;
    ctx.shadowOpacity = undefined;
    ctx.shadowFill = true;
}

BlurEffects.prototype.getType = function(){
    return "blur";
}
