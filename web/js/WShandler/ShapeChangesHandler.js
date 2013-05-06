
function ShapeChangesHandler(name,type){
    this.appId = 1;
    this.tokenId = "not_tacken";
    this.userId = -1;
    this.projectName = "";
    this.projectOwner = "";
    this.diagramName = name;
    this.diagramType = type;
    this.communicator = null;
}

ShapeChangesHandler.prototype.titleChanged = function(element){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);

    var diagram_content = new HashMap();
    diagram_content.add("title", element.title.getText());
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.locationChanged = function(element){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);

    var diagram_content = new HashMap();
    diagram_content.add("x-location", element.x);
    diagram_content.add("y-location", element.y);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());

    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.methodAdded = function(element,method){    
    var methods = new ArrayList();
    methods.add(method);
    
    this.manyMethodAdded(element, methods);
}

ShapeChangesHandler.prototype.methodRemoved = function(element,method){
    var methods = new ArrayList();
    methods.add(method);
    
    this.manyMethodRemoved(element, methods);
}

ShapeChangesHandler.prototype.methodUpdated = function(element,old_attrib,new_attrib){
    var methods = new ArrayList();
    methods.add(old_attrib + "//" + new_attrib);
    
    this.manyMethodUpdated(element, methods);
}

ShapeChangesHandler.prototype.attributeAdded = function(element,attrib){
    
    var attribs = new ArrayList();
    attribs.add(attrib);
    
    this.manyAttributeAdded(element, attribs);
}


ShapeChangesHandler.prototype.attributeRemoved = function(element,attrib){
    
    var attribs = new ArrayList();
    attribs.add(attrib);
    
    this.manyAttributesRemoved(element, attribs);
}

ShapeChangesHandler.prototype.attributeUpdated = function(element,old_attrib,new_attrib){
    
    var attribs = new ArrayList();
    attribs.add(old_attrib + "//" + new_attrib);
    
    this.manyAttributeUpdated(element, attribs);
}


ShapeChangesHandler.prototype.manyMethodAdded = function(element,methods){    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);
    
    var diagram_content = new HashMap();
    
    diagram_content.add("operation", 1);
    diagram_content.add("methods", methods);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.manyMethodRemoved = function(element,methods){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);
    
    var diagram_content = new HashMap();
    
    diagram_content.add("operation", -1);
    diagram_content.add("methods", methods);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.manyMethodUpdated = function(element,updates){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);
    
    var diagram_content = new HashMap();
    
    diagram_content.add("operation", 0);
    diagram_content.add("methods", updates);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.manyAttributeAdded = function(element,attribs){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);
    
    var diagram_content = new HashMap();
    
    diagram_content.add("operation", 1);
    diagram_content.add("members", attribs);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}


ShapeChangesHandler.prototype.manyAttributesRemoved = function(element,attribs){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);
    
    var diagram_content = new HashMap();

    diagram_content.add("operation", -1)
    diagram_content.add("members", attribs);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.manyAttributeUpdated = function(element,updates){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 3);
    
    var diagram_content = new HashMap();
    diagram_content.add("operation", 0);
    diagram_content.add("members", updates);
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.addAssociation = function(association){

    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();

    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 4);

    var diagram_content = new HashMap();
    diagram_content.add("component-id", association.getId());
    diagram_content.add("component-type", association.getType())
    diagram_content.add("association-source", association.source.id);
    diagram_content.add("association-destination", association.destination.id)
    diagram_content.add("source-spot", association.source_spot)
    diagram_content.add("destination-spot", association.destination_spot)
    
    request_info.add("diagram-content", diagram_content);

    map.add("request-info", request_info);

    var json = map.toJson();
    
    this.communicator.send(json);
}

ShapeChangesHandler.prototype.removeAssociation = function(association){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);
    
    var request_info = new HashMap();
    
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 5);
    
    var diagram_content = new HashMap();
    diagram_content.add("component-id", association.id);
    diagram_content.add("component-type", association.getType());
    diagram_content.add("association-source", association.source.id);
    diagram_content.add("association-destination", association.destination.id);
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);
    
    this.communicator.send(map.toJson());
}

ShapeChangesHandler.prototype.elementCreated = function(element){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 4);

    var diagram_content = new HashMap();
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    diagram_content.add("x-location", element.x);
    diagram_content.add("y-location", element.y);
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);

    var json = map.toJson();

    this.communicator.send(json);
}

ShapeChangesHandler.prototype.elementRemoved = function(element){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", this.diagramName);
    request_info.add("request-type", 5);

    var diagram_content = new HashMap();
    diagram_content.add("component-id", element.id);
    diagram_content.add("component-type", element.getType());
    
    request_info.add("diagram-content", diagram_content);
    
    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}