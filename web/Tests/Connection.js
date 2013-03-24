/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Connection(s,d){
    this.source = s;
    this.destination = d;
    
    this.line = new Line();
}

Connection.prototype.hasPoints = function(mx,my){
    return this.line.hasPoints(mx,my);
}


Connection.prototype.setup = function(ctx){
    
    var src = this.source;
    var dest = this.destination;
    
    if(this.source.x + this.source.width > this.destination.x + this.destination.width){
        src = this.destination;
        dest = this.source;
    }
    
    
    if( (src.y < dest.y) && (dest.y < (src.y + src.height)) && 
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + src.width;
        this.line.y1 = src.y + (src.height/2);
        
        this.line.x2 = dest.x ;
        this.line.y2 = dest.y + (dest.height/2);
        
        return;
    }
    
    if( (src.y < dest.y) && (dest.y > (src.y + src.height)) && 
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + src.width;
        this.line.y1 = src.y + (src.height/2);
        
        this.line.x2 = dest.x + (dest.width/2);
        this.line.y2 = dest.y;
        
        return;
    }
    
    if( (src.y < dest.y) && (dest.y > (src.y + src.height)) && 
        (src.x + src.width > dest.x)){
        this.line.x1 = src.x + (src.width/2);
        this.line.y1 = src.y + (src.height);
        
        this.line.x2 = dest.x + (dest.width/2);
        this.line.y2 = dest.y;
        
        return;
    }
    
    if( (src.y > dest.y) && (src.y < (dest.y + dest.height)) &&
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + (src.width);
        this.line.y1 = src.y + (src.height/2);
        
        this.line.x2 = dest.x;
        this.line.y2 = dest.y + (dest.height/2);
        
        return;
    }
    
    if( (src.y > dest.y) && (src.y > (dest.y + dest.height)) &&
        (src.x + src.width < dest.x)){
        this.line.x1 = src.x + (src.width/2);
        this.line.y1 = src.y;
        
        this.line.x2 = dest.x;
        this.line.y2 = dest.y + (dest.height/2);
        
        return;
    }
    
    if( (src.y > dest.y) && (src.y > (dest.y + dest.height)) &&
        (src.x + src.width > dest.x)){
        this.line.x1 = src.x + (src.width/2);
        this.line.y1 = src.y;
        
        this.line.x2 = dest.x + dest.width/2;
        this.line.y2 = dest.y + (dest.height);
        
        return;
    }
}

Connection.prototype.draw = function(ctx){
    this.line.draw(ctx);
}

Connection.prototype.clear = function(ctx){
    this.line.clear(ctx);
}
