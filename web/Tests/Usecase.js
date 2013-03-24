/* 
 * author : Yazan Baniyounes
 */

function Usecase(){
    this.line1 = new Line();
    this.line2 = new Line();
    
    this.title = new Text("");
    
    this.methods = new Array();
    this.attributes = new Array();
    this.connections = new Array();
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    
    this.drawColor = "black";
    this.clearColor = "white";
}

Usecase.prototype.setup = function(ctx){
        
    this.line1.x1 = this.x;
    this.line1.y1 = this.y + (this.height / 5);
    this.line1.x2 = this.x + this.width;
    this.line1.y2 = this.line1.y1;
    
    this.line2.x1 = this.x;
    this.line2.y1 = this.y + ((this.height / 2) + ((this.height/5)));
    this.line2.x2 = this.x + this.width;
    this.line2.y2 = this.line2.y1;
    
    this.line1.drawColor = this.drawColor;
    this.line2.drawColor = this.drawColor;
    
    this.title.width = this.width;
    this.title.height = (this.height / 5);
    
    this.title.drawColor = this.drawColor;
    this.title.clearColor = this.clearColor;
    
    this.title.setup(ctx);
    
    this.title.x = this.x;
    this.title.y = this.y + this.title.fontSize;
    
    var part = 0;
        
    var cur_part = 0;
    
    if(this.methods.length != 0)
    {
        part = (this.line2.y1 - this.line1.y1) / this.methods.length;
        
        for (i = 0; i < this.methods.length; i++) {
            this.methods[i].width = this.width;
            this.methods[i].height = part;
            this.methods[i].x = this.x;
            this.methods[i].setup(ctx);
            this.methods[i].y = this.line1.y1 + cur_part + this.methods[i].fontSize;
            this.methods[i].drawColor = this.drawColor;
            this.methods[i].clearColor = this.clearColor;
            cur_part += part;
        }
    }
    
    if(this.attributes.length != 0)
    {
        part = ((this.height + this.y) - this.line2.y1) / this.attributes.length;
        
        cur_part = 0;
        
        for (i = 0; i < this.attributes.length; i++) {
            this.attributes[i].width = this.width;
            this.attributes[i].height = part;
            this.attributes[i].x = this.x;
            this.attributes[i].setup(ctx);
            this.attributes[i].y = this.line2.y1 + cur_part + this.attributes[i].fontSize;
            this.attributes[i].drawColor = this.drawColor;
            this.attributes[i].clearColor = this.clearColor;
            cur_part += part;
        }
    }

    for (i = 0; i < this.connections.length; i++) {
        this.connections[i].setup(ctx);
    }
}

Usecase.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

Usecase.prototype.draw = function(ctx){
    ctx.strokeStyle= this.drawColor;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    
    //this.setup(ctx);
    
    this.title.draw(ctx);
    this.line1.draw(ctx);
    this.line2.draw(ctx);

    if(this.methods.length != 0)
    {
        for (i = 0; i < this.methods.length; i++) {
            this.methods[i].draw(ctx);
        }
    }
    
    if(this.attributes.length != 0)
    {
        for (i = 0; i < this.attributes.length; i++) {
            this.attributes[i].draw(ctx);
        }
    }
    
    //alert("endDraw");
}

Usecase.prototype.clear = function(ctx){
    ctx.strokeStyle= this.clearColor;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
 
    this.setup(ctx);
 
    this.title.clear(ctx);
    this.line1.clear(ctx);
    this.line2.clear(ctx);
    
    if(this.methods.length != 0)
    {
        for (i = 0; i < this.methods.length; i++) {
            this.methods[i].clear(ctx);
        }
    }
    
    if(this.attributes.length != 0)
    {
        for (i = 0; i < this.attributes.length; i++) {
            this.attributes[i].clear(ctx);
        }
    }
}

Usecase.prototype.toStr = function(){
    return "X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}


