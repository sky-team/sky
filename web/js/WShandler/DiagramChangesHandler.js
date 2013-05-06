function DiagramChangesHandler(){
    this.appId = 1;
    this.tokenId = "not_tacken";
    this.userId = -1;
    this.projectName = "";
    this.projectOwner = "";
    this.communicator = null;
}

DiagramChangesHandler.prototype.createDiagram = function(name,type){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", name);
    request_info.add("diagram-type", type);
    request_info.add("request-type", -4);
    
    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}

DiagramChangesHandler.prototype.removeDiagram = function(name){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", name);
    request_info.add("request-type", -5);
    
    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}

DiagramChangesHandler.prototype.renameDiagram = function(old_name,new_name){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", old_name + "//"+new_name);
    request_info.add("request-type", -3);

    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}

DiagramChangesHandler.prototype.closeDiagram = function(name){
    
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", name);
    request_info.add("request-type", 2);
    
    map.add("request-info", request_info);

    this.communicator.send(map.toJson());
}

DiagramChangesHandler.prototype.openDiagram = function(name){
    var map = new HashMap();
    
    map.add("app-id", this.appId);
    map.add("token-id", this.tokenId);

    var request_info = new HashMap();
    request_info.add("user-id", this.userId);
    request_info.add("project-name", this.projectName);
    request_info.add("project-owner", this.projectOwner);
    request_info.add("diagram-name", name);
    request_info.add("request-type", 1);
    
    map.add("request-info", request_info);
    var json = map.toJson();
    this.communicator.send(json);
}
