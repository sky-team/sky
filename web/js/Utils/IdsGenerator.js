
function IdsGenerator(prefix){
    this.list = new ArrayList();
    this.updated_list = new Array();
    this.prefix = prefix;
    this.last_try = 0;//Number.MAX_VALUE;
    this.range = 2000;//Number.MIN_VALUE;
}

IdsGenerator.prototype.nextId = function (){
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    for (var i = 0; i < this.range; i++) {
        var index = this.updated_list.indexOf(this.prefix+i);
        if(index <= -1){
             this.last_try = i;
             break;            
        }
         /*if(!this.list.containes(this.prefix+i)){
             this.last_try = i;
             break;
         }*/
    }
    
    var id = this.prefix + this.last_try;
    console.log("genereted : " + id);
    this.updated_list.push(id);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    return id;
}

IdsGenerator.prototype.isReserveId = function (id){
    return this.updated_list.indexOf(id) > -1;
}

IdsGenerator.prototype.reserveId = function (id){

    console.log("--------------------------------------------------");
    console.log("Reserving ID : " + id);
    if(!this.isReserveId()){
        console.log("Not Resirved");
         this.updated_list.push(id);
    }
    
    console.log("--------------------------------------------------");
}

IdsGenerator.prototype.unreserveId = function (id){
    if(this.isReserveId(id)){
         this.updated_list.splice(this.updated_list.indexOf(id),1);
    }
}

IdsGenerator.prototype.clear = function (){
    this.updated_list.splice(0,this.updated_list.length);
}