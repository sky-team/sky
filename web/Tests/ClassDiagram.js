/* 
 * author : Yazan Baniyounes
 */

function ClassDiagram(){
    this.line1 = new Line();
    this.line2 = new Line();
    
    this.title = new Text("");
    
    this.methods = new Array();
    this.attributes = new Array();
    this.connections = new Array();
    this.effects = new Array();
    
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    
    this.drawColor = "black";
    this.clearColor = "white";
    
    this.lineWidth = 0;
}

//ClassDiagram.prototype = new Drawable();
//ClassDiagram.prototype = new UmlElement();

ClassDiagram.prototype.setup = function(ctx){
    
    this.title.setup(ctx);
    
    var max_width = this.title.width;
    
    var methods_bound = 0;
    var attributes_bound = 0;

    for (i = 0; i < this.methods.length; i++) {
        this.methods[i].x = this.x;
        this.methods[i].setup(ctx);
        this.methods[i].drawColor = this.drawColor;
        this.methods[i].clearColor = this.clearColor;
        max_width = Math.max(max_width, this.methods[i].width);
        methods_bound += this.methods[i].height;
    }
    
    for (i = 0; i < this.attributes.length; i++) {
        this.attributes[i].x = this.x;
        this.attributes[i].setup(ctx);
        this.attributes[i].drawColor = this.drawColor;
        this.attributes[i].clearColor = this.clearColor;
        max_width = Math.max(max_width, this.attributes[i].width);
        attributes_bound += this.attributes[i].height;
    }
    
    methods_bound += (this.title.fontSize);
    attributes_bound += this.title.fontSize;
    
    this.width = max_width + 10;
    
    this.title.x = this.x + ( (this.width - this.title.width) / 2 );
    this.title.y = this.y + (this.title.fontSize);
    
    this.line1.x1 = this.x;
    this.line1.y1 = this.y + this.title.height + 10;
    this.line1.x2 = this.x + this.width;
    this.line1.y2 = this.line1.y1;
    
    this.line2.x1 = this.x;
    this.line2.y1 = this.line1.y1 + methods_bound;
    this.line2.x2 = this.x + this.width;
    this.line2.y2 = this.line2.y1;
    
    this.height = (this.line2.y2 - this.y) + attributes_bound;
    
    this.line1.lineWidth = this.lineWidth;
    this.line2.lineWidth = this.lineWidth;
    
    this.line1.drawColor = this.drawColor;
    this.line2.drawColor = this.drawColor;
    
    this.title.drawColor = this.drawColor;
    this.title.clearColor = this.clearColor;
    
    var cur_part = 0;
    
    for (i = 0; i < this.methods.length; i++) {
        this.methods[i].y = this.line1.y1 + cur_part + this.methods[i].fontSize;
        cur_part += this.methods[i].height + 1;
    }
    
    cur_part = 0;
    
    for (i = 0; i < this.attributes.length; i++) {
        this.attributes[i].y = this.line2.y1 + cur_part + this.attributes[i].fontSize;
        cur_part += this.attributes[i].height + 1;
    }
    
    for (i = 0; i < this.connections.length; i++) {
        this.connections[i].setup(ctx);
    }
}

ClassDiagram.prototype.hasPoints = function(mx,my){
    return (mx >= this.x && mx < (this.x+this.width)) && (my >= this.y && my <= (this.y+this.height));
}

ClassDiagram.prototype.draw = function(ctx){
    
    
    /*
    //debug text only
    {
        var text = new Text(this.width + " , " + Math.floor(this.title.height));
        text.x = this.x + this.width;
        text.y = this.y;
        text.width = 20;
        text.height = 10;
        text.fontSize = 20;
        
        text.draw(ctx);
    }*/
    
    for(var i = 0 ; i < this.effects.length ;i++){
        this.effects[i].startEffects(ctx);
    }
    
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle= this.drawColor;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

    this.title.draw(ctx);
    this.line1.draw(ctx);
    this.line2.draw(ctx);

    if(this.methods.length != 0)
    {
        for (var i = 0; i < this.methods.length; i++) {
            this.methods[i].draw(ctx);
        }
    }
    
    if(this.attributes.length != 0)
    {
        for (var i = 0; i < this.attributes.length; i++) {
            this.attributes[i].draw(ctx);
        }
    }
    
    for(var i = 0 ; i < this.effects.length ;i++){
        this.effects[i].endEffects(ctx);
    }
}

ClassDiagram.prototype.clear = function(ctx){
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

ClassDiagram.prototype.toStr = function(){
    return "X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}

