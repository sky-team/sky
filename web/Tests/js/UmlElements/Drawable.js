/* 
 *author : Yazan Baniyounes
 */

function Drawable(){
    this.drawColor = "black";
    this.clearColor = "white";
    this.x = 0;
    this.y = 0;
}

Drawable.prototype.hasPoints = function(mx,my){
    return false;
}

Drawable.prototype.draw = function(ctx){
     
}

Drawable.prototype.clear = function(ctx){
     
}

Drawable.prototype.toStr = function(){
    return "";
}

