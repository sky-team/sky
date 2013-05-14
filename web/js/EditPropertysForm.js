
var class_edit;
var actor_edit;
var usecase_edit;
var diagram_edit;
var attributes_select;
var methods_select;
var method_param_select;
var diagram_type_select;
var edit_diagrams_select;
var diagrams_select;

var is_editor_shown = false;
var methods_params = new HashMap();
var deleted_methods = new ArrayList();
var deleted_attribute = new ArrayList();

function clearSelects(){
    attributes_select.innerHTML = "";
    methods_select.innerHTML = "";
    method_param_select.innerHTML = "";
    edit_diagrams_select.innerHTML = "";
}
 
function hideAllEdits(){
    class_edit.style.visibility = "hidden";
    diagram_edit.style.visibility = "hidden";
} 
 
function clearTextFields(){
    document.getElementById("element_title").value = "";
    document.getElementById("class_info_name").value = "";
    document.getElementById("class_info_datatype").value = "";
    document.getElementById("class_info_mp_name").value = "";
    document.getElementById("class_info_mp_datatype").value = "";
    
    document.getElementById("create_new_diagram_name").value = "";
    document.getElementById("rename_new_diagram_name").value = "";
}

function clearAll(){
    clearSelects();
    clearTextFields();
            
    methods_params.clear();
    deleted_attribute.clear();
    deleted_methods.clear();
}

function fillEditMenuForDiagrams(){
    console.log("fill edit for diagrams");
    clearAll();
    console.log("fields cleared");
    console.log("filling options");
    for (var i = 0; i < diagrams_select.options.length; i++) {
        addToList(edit_diagrams_select, diagrams_select.options[i].text, diagrams_select.options[i].value, 'old',diagrams_select.options[i].text);
    }
    console.log("all diagrams filled");
}

function createSelectedDiagram(){
    var diagram_name = document.getElementById("create_new_diagram_name").value;
    var type = diagram_type_select.options[diagram_type_select.selectedIndex].value;
    if(diagram_name.length == 0){
        alert("Please Enter Diagram Name First");
        return;
    }
    
    if(!diagrams_manager.createDiagram(diagram_name, type))
    {
        alert("Unable to create diagram sorry :(");
    }else{
        addToList(edit_diagrams_select,diagram_name,"","","");
    }
}

function renameSelectedDiagram(){
    var diagram_name = document.getElementById("rename_new_diagram_name").value;
    if(diagram_name == ""){
        alert("Please Enter The New Diagram Name First");
        return;
    }
    
    if(diagrams_select.selectedIndex < 0){
        alert("Please Select Diagram First");
        return;
    }
    
    var old_name = diagrams_select.options[diagrams_select.selectedIndex].text;
    
    if(!diagrams_manager.renameDiagram(old_name, diagram_name))
    {
        alert("Unable to rename diagram sorry :(");
    }else{
        edit_diagrams_select.options[edit_diagrams_select.selectedIndex].text = diagram_name;
    }
}

function closeSelectedDiagram(){    
    if(diagrams_select.selectedIndex < 0){
        alert("Please Select Diagram First");
        return;
    }
    
    var name = diagrams_select.options[diagrams_select.selectedIndex].text;
    
    if(!diagrams_manager.closeDiagram(name))
    {
        alert("Unable to close diagram sorry :(");
    }else{
        //edit_diagrams_select.remove(edit_diagrams_select.selectedIndex);
    }
}

function deleteSelectedDiagram(){
    if(diagrams_select.selectedIndex < 0){
        alert("Please Select Diagram First");
        return;
    }
    
    if(!window.confirm("Are you sure you want to delete the diagram?")){
        return ;
    }
    
    var name = diagrams_select.options[diagrams_select.selectedIndex].text;
    
    if(!diagrams_manager.deleteDiagram(name))
    {
        alert("Unable to delete diagram sorry :(");
    }else{
        edit_diagrams_select.remove(edit_diagrams_select.selectedIndex);
    }
}

function selectedDiagramChanged(){
    document.getElementById("rename_new_diagram_name").value = edit_diagrams_select.options[edit_diagrams_select.selectedIndex].text;
}

function fillEditMenu(){
    clearAll();
    
    if(diagrams_manager.selectedDiagram == null )//|| !is_editor_shown
        return;
    
    var selected_shape = diagrams_manager.selectedDiagram.getGlowed();
    diagram = diagrams_manager.selectedDiagram;
    
    if(selected_shape == null)
        return ;
    
    document.getElementById("element_title").value = selected_shape.getTitle();
    if(selected_shape instanceof ClassDiagram){
        for (var i = 0; i < selected_shape.methods.length; i++) {
            var method = selected_shape.methods[i];
                                
            var id = "method"+i;
            addToList(methods_select, method.access+method.name+'():'+method.datatype, 
                method.name+','+method.datatype+','+method.access, 'old',method.toFormat());

            var list = new ArrayList();
                    
            method.params.forEach(function(param){
                addToList(method_param_select, param,"", 'method_select_value');
                list.add(param);
            });
                    
            methods_params.add(method.toFormat(), list);
        }
                
        for (var i = 0; i < selected_shape.attributes.length; i++) {
            var attribute = selected_shape.attributes[i];
                                
            addToList(attributes_select, attribute.access+attribute.name+':'+attribute.datatype,
                attribute.name+','+attribute.datatype+','+attribute.access, 'old',attribute.toFormat());
        }
                
        class_edit.style.visibility = "visible";
        return;
    }
}    
function confirmClassChanges(){
    
    if(diagrams_manager.selectedDiagram == null )//|| !is_editor_shown
        return;
    
    var selected_shape = diagrams_manager.selectedDiagram.getGlowed();
    diagram = diagrams_manager.selectedDiagram;
    if(selected_shape == null)
        return ;
    
    diagrams_manager.selectedDiagram.unglowShape();
    if(selected_shape.getTitle() != document.getElementById("element_title").value){
        diagram.changeTitle(selected_shape,document.getElementById("element_title").value);
    }
    
    if(selected_shape instanceof ClassDiagram){
            
        var attrs_updates = new ArrayList();
        var attrs_new = new ArrayList();
        for (var i = 0; i < attributes_select.options.length; i++) {
            if(attributes_select.options[i].name == 'old'){
                
                var format = attributes_select.options[i].id;
                var old_attr = new ClassAttribute("", "", "");
                old_attr.fromFormat(format);
                var splits = attributes_select.options[i].value.split(',');
                var attribute = new ClassAttribute(splits[0], splits[2], splits[1]);
                if(attribute.toStr() != old_attr.toStr())
                    attrs_updates.add(old_attr.toFormat() + "//" + attribute.toFormat());
            }else{
                
                var splits = attributes_select.options[i].value.split(',');
                var attribute = new ClassAttribute(splits[0], splits[2], splits[1]);
                attrs_new.add(attribute.toFormat());
            }
        }
        
        var methods_updates = new ArrayList();
        var methods_new = new ArrayList();
        for (var i = 0; i < methods_select.options.length; i++) {    
            if(methods_select.options[i].name == 'old'){
                var format = methods_select.options[i].id;
                var old_method = new ClassMethod("", "", "");
                old_method.fromFormat(format);
                var splits = methods_select.options[i].value.split(',');
                var method = new ClassMethod(splits[0], splits[2], splits[1]);
                var list = methods_params.get(methods_select.options[i].id);
                if(list != null){
                    list.forEach(function(param){
                        var p_splits = param.split(':');
                        method.addParam(p_splits[0], p_splits[1]);
                    });
                }
                if(method.toStr() != old_method.toStr())
                    methods_updates.add(old_method.toFormat() + "//" + method.toFormat());
            }else{
                
                var splits = methods_select.options[i].value.split(',');
                var method = new ClassMethod(splits[0], splits[2], splits[1]);
                var list = methods_params.get(methods_select.options[i].id);
                
                try{
                list.forEach(function(param){
                    var p_splits = param.split(":");
                    method.addParam(p_splits[0], p_splits[1]);
                });
                }catch(ex){
                    alert(ex);
                }
                
                methods_new.add(method.toFormat());
            }   
        }    
        var methods_delete = new ArrayList();
        var attrs_delete = new ArrayList();
        deleted_attribute.forEach(function(option){
            if(option.name == 'old'){
                attrs_delete.add(option.id);
            }
        });
            
        deleted_methods.forEach(function(option){
            if(option.name == 'old'){
                methods_delete.add(option.id);
            }
        });
        if(methods_new.size() > 0)
            diagram.addMethodsList(selected_shape, methods_new);
            
        if(attrs_new.size() > 0)
            diagram.addAttributesList(selected_shape, attrs_new);
            
        if(methods_updates.size() > 0)
            diagram.renameMethodsList(selected_shape, methods_updates);
            
        if(attrs_updates.size() > 0)
            diagram.renameAttributesList(selected_shape, attrs_updates);
            
        if(methods_delete.size() > 0)
            diagram.removeMethodsList(selected_shape, methods_delete);
            
        if(attrs_delete.size() > 0)
            diagram.removeAttributesList(selected_shape, attrs_delete);
    }
                
    selected_shape.update();
    diagram.unglowShape();
    
}
        
function addToList(select,option_text,option_value,option_name){
    var option=document.createElement("option");
    option.text=option_text;
    option.value = option_value;
    option.name = option_name;
    try
    {
        select.add(option,select.options[null]);
    }
    catch (e)
    {
        select.add(option,null);
    }
}
        
function addToList(select,option_text,option_value,option_name,option_id){
    var option=document.createElement("option");
    option.text=option_text;
    option.value = option_value;
    option.name = option_name;
    option.id = option_id;
    try
    {
        select.add(option,select.options[null]);
    }
    catch (e)
    {
        select.add(option,null);
    }
    return option;
}
        
function addAttribute(){
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
    
    addToList(attributes_select, access+class_info_name+':'+class_info_datatype, 
        class_info_name+','+class_info_datatype+','+access, 'new');
}
        
function addMethod(){
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
            
    var id = "method"+methods_select.options.length;
    addToList(methods_select, access+class_info_name+'():'+class_info_datatype, 
        class_info_name+','+class_info_datatype+','+access, 'new',id);
            
    var list = new ArrayList();
    methods_params.add(id, list);
}
        
function addParam(){
    if(methods_select.selectedIndex < 0){
        alert("Please Select Method First");
        return;
    }
            
    var class_info_name = document.getElementById("class_info_mp_name").value;
    var class_info_datatype = document.getElementById("class_info_mp_datatype").value;
            
    addToList(method_param_select, class_info_name+':'+class_info_datatype,"", 'method_select_value');
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    list.add(class_info_name+":"+class_info_datatype);
}
        
function removeSelectedMethod(){
    if(methods_select.selectedIndex < 0){
        alert("Please Select Method First");
        return;
    }
    deleted_methods.add(methods_select.options[methods_select.selectedIndex]);
    methods_params.remove(methods_select.options[methods_select.selectedIndex].id);
    var index = method_param_select.selectedIndex + 1 == method_param_select.options.length ? method_param_select.selectedIndex : method_param_select.selectedIndex-1;
    methods_select.remove(methods_select.selectedIndex);
    methods_select.selectedIndex = index;
    selectedMethodChanged();
}
        
function removeSelectedAttribute(){
    if(attributes_select.selectedIndex < 0){
        alert("Please Select Attribute First");
        return;
    }
    deleted_attribute.add(attributes_select.options[attributes_select.selectedIndex]);
    attributes_select.remove(attributes_select.selectedIndex);
    var index = attributes_select.selectedIndex + 1 == attributes_select.options.length ? attributes_select.selectedIndex : attributes_select.selectedIndex-1;
    attributes_select.selectedIndex = index;
    selectedAttributeChanged();
}
        
function removeSelectedParam(){
    if(method_param_select.selectedIndex < 0){
        alert("Please Select Param First");
        return;
    }
            
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    list.remove(method_param_select.options[method_param_select.selectedIndex].text);
            
    var index = method_param_select.selectedIndex + 1 == method_param_select.options.length ? method_param_select.selectedIndex : method_param_select.selectedIndex-1;
    method_param_select.remove(method_param_select.selectedIndex);
    method_param_select.selectedIndex = index;
    selectedParamChanged();
}
        
function updateSelectedMethod(){
    if(methods_select.selectedIndex < 0){
        alert("Please Select Method First");
        return;
    }
    var option = methods_select.options[methods_select.selectedIndex];
            
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
    option.value = class_info_name+','+class_info_datatype+','+access;
    option.text = access+class_info_name+'():'+class_info_datatype;
}
        
function updateSelectedAttribute(){
    if(attributes_select.selectedIndex < 0){
        alert("Please Select Attribute First");
        return;
    }
    
    var option = attributes_select.options[attributes_select.selectedIndex];
            
    var class_info_name = document.getElementById("class_info_name").value;
    var class_info_datatype = document.getElementById("class_info_datatype").value;
            
    var access = "+";
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].checked)
        {
            access = accesses[i].value;
            break;
        }
    }
            
    option.value = class_info_name+','+class_info_datatype+','+access;
    option.text = access+class_info_name+':'+class_info_datatype;
}
        
function updateSelectedParam(){
    if(method_param_select.selectedIndex){
        alert("Please Select Param First");
        return;
    }
    var option = method_param_select.options[method_param_select.selectedIndex];
            
    var class_info_name = document.getElementById("class_info_mp_name").value;
    var class_info_datatype = document.getElementById("class_info_mp_datatype").value;
            
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    var index = list.indexOf(option.value);
    list.set(index,class_info_name+':'+class_info_datatype);
            
    option.value = class_info_name+':'+class_info_datatype;
    option.text = class_info_name+':'+class_info_datatype;
}
        
function selectedMethodChanged(){
    method_param_select.innerHTML = "";
    var list = methods_params.get(methods_select.options[methods_select.selectedIndex].id);
    list.forEach(function (param){
        //var split = param.split(",");
        addToList(method_param_select, param, "", "");
    });
            
    var splits = methods_select.options[methods_select.selectedIndex].value.split(',');
    document.getElementById("class_info_name").value = splits[0];
    document.getElementById("class_info_datatype").value = splits[1];
            
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].value == splits[2])
        {
            accesses[i].checked = true;
        }else{
            accesses[i].checked = false;
        }
    }    
}
        
function selectedAttributeChanged(){
    //alert("");
    var splits = attributes_select.options[attributes_select.selectedIndex].value.split(',');
    document.getElementById("class_info_name").value = splits[0];
    document.getElementById("class_info_datatype").value = splits[1];    
                        
    var accesses = document.getElementsByName("class_access");
            
    for (var i = 0; i < accesses.length; i++) {
        if(accesses[i].value == splits[2])
        {
            accesses[i].checked = true;
        }else{
            accesses[i].checked = false;
        }
    }  
            
}
        
function selectedParamChanged(){
    var splits = method_param_select.options[method_param_select.selectedIndex].text.split(':');
    document.getElementById("class_info_mp_name").value = splits[0];
    document.getElementById("class_info_mp_datatype").value = splits[1];
  
}

function tryExportDiagram(){
    var width = drawCanvas.offsetWidth;
    var height = drawCanvas.offsetHeight;

    diagrams_manager.selectedDiagram.tryExport(width, height);
}

function handlerExportResult(json_map){ 
    console.log("main?id="+document.getElementById("exporterID").value+"&"+document.getElementById("exportParamKey").value+"="+json_map.get("result"));
    var win = window.open("main?id="+document.getElementById("exporterID").value+"&"+document.getElementById("exportParamKey").value+"="+json_map.get("result"), '_blank');
    win.focus();
}

function handlerChatMessage(json_map){
    chat_handler.messageReceived(json_map);
}

function sendChatMessage(){//
    //alert("Sending : " + document.getElementById("usermsg").value)
    chat_handler.sendMessage(document.getElementById("usermsg").value);
}
