
function IdsGenerator(prefix){
    this.list = new ArrayList();
    this.prefix = prefix;
    this.last_try = 0;//Number.MAX_VALUE;
    this.range = 2000;//Number.MIN_VALUE;
}

IdsGenerator.prototype.nextId = function (){
    
    for (var i = this.last_try; i < this.range; i+=1) {
         if(!this.list.containes(this.prefix+i)){
             this.last_try = i;
             break;
         }
    }
    
    var id = this.prefix + this.last_try;
    
    this.list.add(id);
    return id;
}

IdsGenerator.prototype.isReserveId = function (id){
    return this.list.containes(id);
}

IdsGenerator.prototype.reserveId = function (id){
    if(!this.list.containes(id)){
         this.list.add(id);
    }
}

IdsGenerator.prototype.unreserveId = function (id){
    if(this.list.containes(id)){
         this.list.remove(id);
    }
}
