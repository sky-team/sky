/* 
 *author : Yazan Baniyounes
 */

function UmlElement(){
    this.x = 0;
    this.y = 0;
    this.drawColor = "black";
    this.clearColor = "white";
}

UmlElement.prototype.hasPoints = function(mx,my){
    throw "Not Emplemented";
}

UmlElement.prototype.draw = function(ctx){
    throw "Not Emplemented";
}

UmlElement.prototype.clear = function(ctx){
    throw "Not Emplemented";
}

UmlElement.prototype.toStr = function(){
    return "X:"+this.x+" , Y:"+this.y;
}

