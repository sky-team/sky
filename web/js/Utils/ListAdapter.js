
function ListAdapter(select){
    this.select = select;
}

ListAdapter.prototype.setSelectElement = function(select){
    this.select = select;
}

ListAdapter.prototype.get = function(index){
    return this.select.options[index];
}

ListAdapter.prototype.removeSelected = function(){
    this.select.remove(this.select.selectedIndex);
}

ListAdapter.prototype.remove = function(text){
    var removes = new Array();
    for (var i = 0; i < this.select.options.length; i++) {
        if(this.select.options[i].text == text){
            removes.push(i);
        }
    }
    
    for (var i = 0; i < removes.length; i++) {
         this.select.remove(removes[i]);
    }
    
}

ListAdapter.prototype.containesText = function(element_text){
    for (var i = 0; i < this.select.options.length; i++) {
        if(this.select.options[i].text == element_text){
            return true;
        }
    }
    
    return false;
}

ListAdapter.prototype.indexOfText = function(element_text){
    for (var i = 0; i < this.select.options.length; i++) {
        if(this.select.options[i].text == element_text){
            return i;
        }
    }
    
    return -1;
}

ListAdapter.prototype.removeAt = function(index){
    this.select.remove(index);
}

ListAdapter.prototype.addElement = function(text,value,name,id){
    var option= document.createElement("option");
    option.text=text;
    option.value = value;
    option.name = name;
    option.id = id;
    try
    {
        this.select.add(option,this.select.options[null]);
    }
    catch (e)
    {
        this.select.add(option,null);
    }
}

ListAdapter.prototype.getSelectedValue = function(){
    return this.select.options[this.select.selectedIndex].value;
}


ListAdapter.prototype.getSelectedText = function(){
    return this.select.options[this.select.selectedIndex].text;
}

ListAdapter.prototype.setSelectedText = function(text){
    this.select.options[this.select.selectedIndex].text = text;
}

ListAdapter.prototype.replaceText = function(old_text,new_text){
    //this.select.options[this.select.selectedIndex].text = text;
    for (var i = 0; i < this.select.options.length; i++) {
        if(this.select.options[i].text == old_text){
            this.select.options[i].text = new_text;
            return i;
        }
    }
}

ListAdapter.prototype.replaceByText = function(old_text,new_text,new_value,new_name,new_id){
    //this.select.options[this.select.selectedIndex].text = text;
    for (var i = 0; i < this.select.options.length; i++) {
        if(this.select.options[i].text == old_text){
            this.select.options[i].text = new_text;
            this.select.options[i].name = new_name;
            this.select.options[i].value = new_value;
            this.select.options[i].id = new_id;
            return i;
        }
    }
}

ListAdapter.prototype.replaceById = function(old_Id,new_text,new_value,new_name,new_id){
    //this.select.options[this.select.selectedIndex].text = text;
    for (var i = 0; i < this.select.options.length; i++) {
        if(this.select.options[i].id == old_Id){
            this.select.options[i].text = new_text;
            this.select.options[i].name = new_name;
            this.select.options[i].value = new_value;
            this.select.options[i].id = new_id;
            return i;
        }
    }
}

ListAdapter.prototype.setText = function(index,text){
    this.select.options[index].text = text;
}

ListAdapter.prototype.clear = function(){
    this.select.innerHTML = "";
}
