
function DiagramsManager(paper){
    this.diagrams = new HashMap();
    this.paper = paper;
    this.communicator = null;
    this.userId = "";
    this.tokenId = "notoken";
    this.appId = "";
    this.projectName = "";
    this.projectOwner = "";
    this.changesHandler = new DiagramChangesHandler();
    this.listAdapter = new ListAdapter(null);
    this.selectedDiagram = null;
}

DiagramsManager.prototype.isDiagramOpened = function(name){
    return this.diagrams.containsKey(name);
}

DiagramsManager.prototype.switchToDiagram = function(name){
    if(!this.selectedDiagram){
        this.selectDiagram = this.getDiagram(name);
        this.selectedDiagram.showElements();
        return;
    }
    
    if(this.selectedDiagram.name == name)
        return;
    
    this.selectedDiagram.hideElements();
    this.selectedDiagram = this.getDiagram(name);
    this.selectedDiagram.showElements();
}

DiagramsManager.prototype.setSelectElement = function(select){
    this.listAdapter.setSelectElement(select);
}

DiagramsManager.prototype.setProjectName = function(name){
    this.diagrams.forEach(function(k,v){
        v.setProjectName(name);
    });
    this.projectName = name;
    this.changesHandler.projectName = name;
}

DiagramsManager.prototype.setProjectOwner = function(owner){
    this.diagrams.forEach(function(k,v){
        v.setProjectOwner(owner);
    });
    this.projectOwner = owner;
    this.changesHandler.projectOwner = owner;
}

DiagramsManager.prototype.setUserId = function(id){
    this.diagrams.forEach(function(k,v){
        v.setUserId(id);
    });
    this.userId = id;
    this.changesHandler.userId = id;
}

DiagramsManager.prototype.setTokenId = function(id){
    this.diagrams.forEach(function(k,v){
        v.setTokenId(id);
    });
    this.tokenId = id;
    this.changesHandler.tokenId = id;
}

DiagramsManager.prototype.setAppId = function(id){
    this.diagrams.forEach(function(k,v){
        v.setAppId(id);
    });
    this.appId = id;
    this.changesHandler.appId = id;
}

DiagramsManager.prototype.setWebSocketHandler = function(handle){
    this.diagrams.forEach(function(k,v){
        v.setWebSocketHandler(handle);
    });
    this.communicator = handle;
    this.changesHandler.communicator = handle;
}

DiagramsManager.prototype.createDiagram = function(name,type){    
    if(this.diagrams.containsKey(name))
        return false;
    
    var diagram = new Diagram(name, type, this.paper);
    
    diagram.setAppId(this.appId);
    diagram.setProjectName(this.projectName);
    diagram.setWebSocketHandler(this.communicator);
    diagram.setProjectOwner(this.projectOwner);
    diagram.setTokenId(this.tokenId);
    diagram.setUserId(this.userId);
    
    this.diagrams.add(name,diagram);
    this.listAdapter.addElement(name, name, type, name+":"+type);
    this.changesHandler.createDiagram(name, type);
    return true;
}

DiagramsManager.prototype.remove = function(name){
    this.changesHandler.removeDiagram(name);
}

DiagramsManager.prototype.renameDiagram = function(old_name,new_name){
    if(this.diagrams.containsKey(new_name)){
        return false;
    }
    
    if(old_name == new_name)
        return true;
    
    this.diagrams.replaceKey(old_name, new_name);
    this.listAdapter.replaceText(old_name, new_name);
    this.changesHandler.renameDiagram(old_name, new_name);
    return true;
}

DiagramsManager.prototype.closeDiagram = function(name){
    
    if(!this.diagrams.containsKey(name)){
        return false;
    }
    
    var diagram = this.getDiagram(name);
    
    diagram.deallocate();
    this.diagrams.remove(name);
    this.listAdapter.remove(name);
    this.changesHandler.closeDiagram(name);
}

DiagramsManager.prototype.openDiagram = function(name){
    this.changesHandler.openDiagram(name);
}

DiagramsManager.prototype.getDiagram = function(name){
    var diagram = null;
    
    this.diagrams.forEach(function(k,v){
       if(k == name){
           diagram = v;
       }
    });
    
    return diagram;
}

DiagramsManager.prototype.createRequestDiagram = function(request_info){
    //diagram_header = new HashMap();
    var name = request_info.get("diagram-name");
    var type = request_info.get("diagram-type");
    var diagram = new Diagram(name, type, this.paper);
    
    diagram.setAppId(this.appId);
    diagram.setProjectName(this.projectName);
    diagram.setWebSocketHandler(this.communicator);
    diagram.setProjectOwner(this.projectOwner);
    diagram.setTokenId(this.tokenId);
    diagram.setUserId(this.userId);
    
    return diagram;
}

DiagramsManager.prototype.executeCloseDiagram = function(diagram){
    
    this.diagrams.remove(diagram.name);
    var index = this.listAdapter.indexOfText(diagram.name);
    this.listAdapter.removeAt(index);
    
    diagram.deallocate();
}

DiagramsManager.prototype.executeCreateDiagram = function(request_info){
    var diagram = this.createRequestDiagram(request_info);
    
    this.diagrams.add(diagram.name,diagram);
    this.listAdapter.addElement(diagram.name, diagram.name, diagram.type, "");
}

DiagramsManager.prototype.executeUpdateDiagram = function(name){
    
    var splits = name.split("//");
    
    var old_name = splits[0];
    var new_name = splits[1];
    
    var diagram = this.getDiagram(old_name);
    
    var index = this.listAdapter.indexOfText(diagram.name);
    this.listAdapter.setText(index, new_name);
    this.diagrams.replaceKey(diagram.name, new_name);
    diagram.setName(new_name);
}

DiagramsManager.prototype.executeDeleteDiagram = function(diagram){
    
    this.diagrams.remove(diagram.name);
    var index = this.listAdapter.indexOfText(diagram.name);
    this.listAdapter.removeAt(index);
    
    diagram.deallocate();
}

DiagramsManager.prototype.executeCloseProject = function(){
    
    this.diagrams.forEach(function(k,dia){
        dia.deallocate();
    });
    
    this.diagrams.clear();
    this.listAdapter.clear();
    
    this.changesHandler = null;
}

DiagramsManager.prototype.executeAddComponent = function(component,diagram){

    var methods = null;
    var attributes = null;
    var type = component.get("component-type");
    if(component.containsKey("methods")){
        methods = component.get("methods");//members
    }
    
    if(component.containsKey("members")){
        attributes = component.get("members");
    }
    
    var x = component.get("x-location");
    var y = component.get("y-location");
    var id = component.get("component-id");
    var title = component.get("title");
    
    var shape = diagram.putShape(type, x, y, title, id);   
    if(methods){
        methods.forEach(function(text){
            var method = new ClassMethod("", "", "");
             method.fromFormat(text);
             shape.addMethod(method);
        });
    }
    
    if(attributes){
        attributes.forEach(function(text){
             var attr = new ClassAttribute("", "", "");
             attr.fromFormat(text);
             shape.addAttribute(attr);
        });
    }
    
    shape.update();
}

DiagramsManager.prototype.executeAddAssociation = function(association,diagram){
    if(association == null || diagram == null)
        return;
    if(association.size() == 0)
        return;
    var source_id = association.get("association-source");
    var dest_id = association.get("association-destination");
    var type = association.get("component-type");
    var id = association.get("component-id");
    var source_spot_dec = parseInt(association.get("source-spot"));
    var dest_spot_dec = parseInt(association.get("destination-spot"));
    diagram.selectShape(source_id);
    var source = diagram.selectedShape;
    diagram.selectShape(dest_id);
    var dest = diagram.selectedShape;
    
    if(source == null || dest == null)
        return;
    
    var source_spot = source.connectionSpots.getSpot(source_spot_dec);
    var dest_spot = dest.connectionSpots.getSpot(dest_spot_dec);

    diagram.putAssociation(source, dest, source_spot, dest_spot, type, id);
}

DiagramsManager.prototype.executeDiagramComponents = function(diagram_components,diagram){
//    diagram_components = ArrayList();
    
    var _this = this;
    diagram_components.forEach(function(component){
        _this.executeAddComponent(component, diagram);
    });
}

DiagramsManager.prototype.executeDiagramAssociations = function(diagram_associations,diagram){
//    diagram_attributes = ArrayList();
    var _this = this;
    diagram_associations.forEach(function(association){
        _this.executeAddAssociation(association, diagram);
    });
}

DiagramsManager.prototype.executeOpenDiagram = function(diagram_content,diagram){
    
    var diagram_components = diagram_content.get("components");
    var diagram_associations = diagram_content.get("associations");
    
    this.executeDiagramComponents(diagram_components, diagram);
    this.executeDiagramAssociations(diagram_associations, diagram); 
    
}

DiagramsManager.prototype.executeCreateComponent = function(diagram_content,diagram){
    var id = diagram_content.get("component-id");
    var type = diagram_content.get("component-type");
    if(diagram_content.containsKey("association-source")){//add remove
        diagram.selectShape(diagram_content.get("association-source"));
        var source = diagram.selectedShape;
        diagram.selectShape(diagram_content.get("association-destination"));
        var destination = diagram.selectedShape;
        var source_spot = parseInt(diagram_content.get("source-spot"));
        var destination_spot = parseInt(diagram_content.get("destination-spot"));
        if(source == null || destination == null)
            return;
        diagram.putAssociation(source, destination, source_spot, destination_spot, type, id)
    }else{
        var x = diagram_content.get("x-location");
        var y = diagram_content.get("y-location");

        diagram.putShape(type, x, y, "SkySwan", id);
        if(diagram != this.selectedDiagram){
            diagram.hideElements();
        }
    }
}


DiagramsManager.prototype.executeDeleteComponent = function(diagram_content,diagram){
    var id = diagram_content.get("component-id");
    var type = diagram_content.get("component-type");
    
    diagram.selectShape(id);
    var shape = diagram.selectedShape;
    
    /*8if(diagram_content.containsKey("association-source")){//add remove
        var source = diagram_content.get("association-source");
        var destination = diagram_content.get("association-destination");
        
        diagram.deallocatAssociation(source, destination, id);
    }
    */
    if(diagram_content.containsKey("association-source")){//add remove
        var source_id = diagram_content.get("association-source");
        var destination_id = diagram_content.get("association-destination");
        
        diagram.selectShape(source_id);
        var source = diagram.selectedShape;
        
        diagram.selectShape(destination_id);
        var dest = diagram.selectedShape;
        if(dest == null || source == null)
            return;
        diagram.deallocatAssociation(source, dest, id);
        shape.update();
    }else{
        diagram.deallocateShape(shape);
    }
    
}

DiagramsManager.prototype.executeUpdateComponent = function(diagram_content,diagram){
    var id = diagram_content.get("component-id");
    var type = diagram_content.get("component-type");
        
    diagram.selectShape(id);
    var shape = diagram.selectedShape;
    if(diagram_content.containsKey("x-location")){
        var x = parseInt(diagram_content.get("x-location"));
        var y = parseInt(diagram_content.get("y-location"));
        shape.setLocation(x, y);
    }
    
    if(diagram_content.containsKey("title")){
        shape.setTitle(diagram_content.get("title"));
        shape.update();
    }
    
    if(diagram_content.containsKey("methods")){//add remove rename
        var list = diagram_content.get("methods");
        var operation = parseInt(diagram_content.get("operation"));
        
        switch(operation){
            case -1:
                list.forEach(function(format){
                    var method = new ClassMethod("", "", "");
                    method.fromFormat(format);
                    shape.removeMethod(method);
                });
                break;
            case 0:
                list.forEach(function(format){
                    var method_old = new ClassMethod("", "", "");
                    var method_new = new ClassMethod("", "", "");
                    var splits = format.split("//");
                    method_old.fromFormat(splits[0]);
                    method_new.fromFormat(splits[1]);
                    shape.replaceMethod(method_old, method_new);
                });
                break;
            case 1:
                list.forEach(function(format){
                    var method = new ClassMethod("", "", "");
                    method.fromFormat(format);
                    shape.addMethod(method);
                });
                break;
        }
    }
    
    if(diagram_content.containsKey("members")){//add remove rename
        var list = diagram_content.get("members");
        var operation = parseInt(diagram_content.get("operation"));
        if(list == null)
        {
            return;
        }
        switch(operation){
            case -1:
                list.forEach(function(format){
                    var attr = new ClassAttribute("", "", "");
                    attr.fromFormat(format);
                    shape.removeAttribute(attr);
                });
                break;
            case 0:
                list.forEach(function(format){
                    var attr_old = new ClassAttribute("", "", "");
                    var attr_new = new ClassAttribute("", "", "");
                    var splits = format.split("//");
                    attr_old.fromFormat(splits[0]);
                    attr_new.fromFormat(splits[1]);
                    shape.replaceAttribute(attr_old, attr_new);
                });
                break;
            case 1:
                list.forEach(function(format){
                    var attr = new ClassAttribute("", "", "");
                    attr.fromFormat(format);
                    shape.addAttribute(attr);
                });
                break;
        }
    }
    
    if(diagram_content.containsKey("association-source")){//add remove
        var source = diagram_content.get("association-source");
        var destination = diagram_content.get("association-destination");
        var source_spot = diagram_content.get("source-spot");
        var destination_spot = diagram_content.get("destination-spot");
        
        diagram.putAssociation(source, destination, source_spot, destination_spot, type, id)
    }
    
    shape.update();
}

DiagramsManager.prototype.executeRequestInfo = function(request_info){
    var diagram = null;
    if(!request_info.containsKey("request-type"))
        return;
    
    var request_type = parseInt(request_info.get("request-type"));
    
    switch(request_type){
        case 1://diagram opened
            if(this.selectedDiagram){
                this.selectedDiagram.hideElements();
            }
            
            diagram = this.createRequestDiagram(request_info);
            try{
                this.executeOpenDiagram(request_info.get("diagram-content"),diagram);
            }catch(e){
                alert("Error : " + e);
            }
            this.diagrams.add(diagram.name,diagram);
            if(!this.listAdapter.containesText(diagram.name))
                this.listAdapter.addElement(diagram.name, diagram.name, diagram.type, "");
            this.selectedDiagram = diagram;
            break;
        
        case 2: //close diagram
            diagram = this.getDiagram(request_info.get("diagram-name"));
            this.executeCloseDiagram(diagram);
            break;

        case -2: //close project
            this.executeCloseProject();
            break;
        case 3: //update component
            diagram = this.getDiagram(request_info.get("diagram-name"));
            this.executeUpdateComponent(request_info.get("diagram-content"), diagram);
            break;
        case -3:
            this.executeUpdateDiagram(request_info.get("diagram-name"));
            break;
        case 4: //create component
            diagram = this.getDiagram(request_info.get("diagram-name"));
            this.executeCreateComponent(request_info.get("diagram-content"), diagram);
            break;
        case -4:
            this.executeCreateDiagram(request_info);
            break;
        case 5: //update component
            diagram = this.getDiagram(request_info.get("diagram-name"));
            this.executeDeleteComponent(request_info.get("diagram-content"), diagram);
            break;
        case -5:
            diagram = this.getDiagram(request_info.get("diagram-name"));
            this.executeDeleteDiagram(diagram);
            break;
    }
}

DiagramsManager.prototype.messageReceived = function(parsed_json){
    if(parsed_json.containsKey("app-id")){
        if(parseInt(parsed_json.get("app-id")) != this.appId)
            return;
    }

    if(parsed_json.containsKey("request-info")){
        this.executeRequestInfo(parsed_json.get("request-info"));
    }
}