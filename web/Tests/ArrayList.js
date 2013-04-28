/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Node(v){
    this.value = v;
    this.next = null;
    this.prev = null;
}

function ArrayList(){
    
    this.first = null;
    this.last = null;
    this.count = 0;
    this.comparetor = function(e1,e2){
        return e1 == e2;
    }
}

ArrayList.prototype.add = function(e){
    if(this.first == null){
        this.first = new Node(e);
        this.first.next = null;
        this.first.prev = null;
        this.last = this.first;
    }else{
        this.last.next = new Node(e);
        this.last.next.prev = this.last;
        this.last.next.next = null;
        this.last = this.last.next;
    }
        
    this.count ++;
}
    
ArrayList.prototype.isEmpty = function (){
    return this.first == null;
}
    
ArrayList.prototype.size = function (){
    return this.count;
}
    
ArrayList.prototype.get =  function (index){
    var temp = this.first;
        
    for (var i = 0; i < index; i++) {
        temp = temp.next;
    }
        
    return temp.value;
}

ArrayList.prototype.indexOf = function (o){
    var temp = this.first;
    var index = 0;
        
    while(temp){
        
        if(this.comparetor(temp.value, o))
            return index;
        
        index ++;
        temp = temp.next;
    }
    
    return -1;
}

ArrayList.prototype.lastIndexOf = function (o){
    var temp = this.last;
    var index = this.size() - 1;
        
    while(temp){
        
        if(this.comparetor(temp.value, o))
            return index;
        
        index --;
        temp = temp.prev;
    }
    
    return -1;
}

ArrayList.prototype.remove = function (o){
    var temp = this.first;
        
    while(temp){
        if(this.comparetor(temp.value, o)){
            this.count --;
            if(temp.prev){
                if(temp.next){
                    temp.prev.next = temp.next;
                    temp.next.prev = temp.prev;
                }else{
                    temp.prev.next = null;
                    this.last = temp.prev;
                }
            }else{
                if(temp.next){
                    temp.next.prev = null;
                    this.first = temp.next;
                }else{
                    this.first = null;
                    this.last = null;
                }
            }
                
            return o;
        }
            
        temp = temp.next;
    }
        
    return null;
}
    
ArrayList.prototype.removeAt = function (index){
    var temp = this.first;
        
    for (var i = 0; i < index; i++) {
        temp = temp.next;
    }
        
    if(temp.prev){
        if(temp.next){
            temp.prev.next = temp.next;
            temp.next.prev = temp.prev;
        }else{
            temp.prev.next = null;
            this.last = temp.prev;
        }
    }else{
        if(temp.next){
            temp.next.prev = null;
            this.first = temp.next;
        }else{
            this.first = null;
            this.last = null;
        }
    }
        
    this.count --;
    
    return temp.value;
}

ArrayList.prototype.forEach = function (callback){
    var temp = this.first;
    
    while(temp){
        callback(temp.value);
        
        temp = temp.next;
    }
}

ArrayList.prototype.toArray = function (){
    var temp = this.first;
    
    var eles = new Array();
    
    while(temp){
        eles.push(temp.value);
        temp = temp.next;
    }
    
    return eles;
}


