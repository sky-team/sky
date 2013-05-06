
function Pair(k,v){
    this.key = k;
    this.value = v;
    this.next = null;
    this.prev = null;
}

function HashMap(){
    this.iterator = null;
    this.isBreak = false;
    
    this.first = null;
    this.last = null;
    this.count = 0;   
    
    this.comparetor = function(key1,key2){
        return key1 == key2;
    }
}

HashMap.prototype.add = function(k,v){
    if(this.first == null){
        this.first = new Pair(k,v);
        this.first.next = null;
        this.first.prev = null;
        this.last = this.first;
    }else{
        this.last.next = new Pair(k,v);
        this.last.next.prev = this.last;
        this.last.next.next = null;
        this.last = this.last.next;
    }
        
    this.count ++;
}
    
HashMap.prototype.isEmpty = function (){
    return this.first == null;
}
    
HashMap.prototype.size = function (){
    return this.count;
}

HashMap.prototype.containsKey = function (key){
    var temp = this.first;
        
    while(temp){
        if(this.comparetor(temp.key, key))
            return true;
        temp = temp.next;
    }
    
    return false;
}

HashMap.prototype.containsValue = function (value){
    var temp = this.first;
        
    while(temp){
        if(this.comparetor(temp.value, value))
            return true;
        temp = temp.next;
    }
    
    return false;
}
   
HashMap.prototype.get =  function(key){
    var temp = this.first;
    while(temp){
        if(this.comparetor(temp.key, key))
            return temp.value;
        temp = temp.next;
    }
        
    return null;
}

HashMap.prototype.remove = function (key){
    var temp = this.first;
        
    while(temp){
        if(this.comparetor(temp.key, key)){
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
                
            return temp.value;
        }
            
        temp = temp.next;
    }
        
    return null;
}

HashMap.prototype.clear = function (){
    this.count = 0;
    this.first = null;
    this.last = null;
}

HashMap.prototype.forEach = function (callback){
    var temp = this.first;
    this.isBreak = false;
    while(temp){
        callback(temp.key,temp.value);
        if(this.isBreak)
            break;
        temp = temp.next;
    }
}

HashMap.prototype.keySet = function (){
    var set = new ArrayList();
    
    var temp = this.first;
    
    while(temp){
        set.add(temp.key);
        temp = temp.next;
    }
}

HashMap.prototype.valueSet = function (){
    var set = new ArrayList();
    
    var temp = this.first;
    
    while(temp){
        set.add(temp.value);
        temp = temp.next;
    }
}

HashMap.prototype.toJson = function(){
    
    var temp = this.first;
    var json = '{';
    while(temp){
        var val = "";

        var add = "";
        if(temp.next != null)
            add = ',';

        if(temp.value instanceof HashMap || temp.value instanceof ArrayList){
            val = temp.value.toJson();
            json += '"' + temp.key + '"' + ':' + val + add;
        }
        else{
            var del = '"';
            if(!isNaN(temp.value))
                del = "";
            val = temp.value; 
            json += '"' + temp.key + '"' + ':' + del + val + del + add;
        }
        
        temp = temp.next;
    }
    
    json += '}';
    
    return json;
}

/*
 *@description break the current runing forEach
 */
HashMap.prototype.doBreak = function (){
    this.isBreak = true;
}

/*
 *@description move the iterator pointer to the first element
 **/
HashMap.prototype.iterator_first = function (){
    this.iterator = this.first; 
}

/*
 *@description move the iterator pointer to the last element
 */
HashMap.prototype.iterator_last = function (){
    this.iterator = this.last; 
}

/*
 *@function get value that the iterator pointer is pointing to. 
 */
HashMap.prototype.iterator_currentValue = function (){
    return this.iterator.value; 
}

/*
 *@function get key that the iterator pointer is pointing to. 
 */
HashMap.prototype.iterator_currentKey = function (){
    return this.iterator.key; 
}

/*
 *@description move the iterator pointer one step backward
 */
HashMap.prototype.iterator_prev = function (){
    this.iterator = this.iterator.prev;
}

ArrayList.prototype.iterator_hasPrev = function (){
    return this.iterator != null; 
}

/*
 *@description move the iterator pointer one step forward
 */
HashMap.prototype.iterator_next = function (){
    this.iterator = this.iterator.next;
}

HashMap.prototype.iterator_hasNext = function (){
    return this.iterator != null;
}