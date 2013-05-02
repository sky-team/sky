
function ChangeObserver(name,type){
    this.appId = 1;
    this.tokenId = "not_tacken";
    this.userId = -1;
    this.projectName = "";
    this.projectOwner = "";
    this.diagramName = name;
    this.diagramType = type;
    this.communicator = null;
}

ChangeObserver.prototype.getTypeId = function(element){
    if(element instanceof ClassDiagram){
        return "c-1";
    }
}

ChangeObserver.prototype.LocationChanged = function(id,element){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);

    var diagram_content = new HashMap();
    diagram_content.add("x-location", element.x);
    diagram_content.add("y-location", element.y);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    diagram_content.add("diagram-type", this.diagramType);
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    var json = map.toJson();
    
    alert(json);
    alert(JSON.stringify(json));
    
    this.communicator.send(json);
}

ChangeObserver.prototype.MethodAdded = function(id,element,method){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", 1);
    diagram_content.add("methods", method);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ChangeObserver.prototype.MethodRemove = function(id,element,method){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", -1);
    diagram_content.add("methods", method);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ChangeObserver.prototype.MethodUpdate = function(id,element,old_attrib,new_attrib){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", 0);
    diagram_content.add("methods", old_attrib + "//" + new_attrib);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ChangeObserver.prototype.AttributeAdded = function(id,element,attrib){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", 1);
    diagram_content.add("members", attrib);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}


ChangeObserver.prototype.AttributeRemove = function(id,element,attrib){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", -1)
    diagram_content.add("members", attrib);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ChangeObserver.prototype.AttributeUpdate = function(id,element,old_attrib,new_attrib){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", -3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", 0);
    diagram_content.add("members", old_attrib + "//" + new_attrib);
    diagram_content.add("component-id", id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}
