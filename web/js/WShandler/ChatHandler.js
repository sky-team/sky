

function ChatHandler(){
    this.app_id = 2;
    this.projectName = "";
    this.projectOwner = "";
    this.info = new HashMap();
    this.communicator = null;
    this.messages = new Array();
    this.message_count = 0;
    this.updater = null;
    this.messages_viewer = null;
    this.SubInfo = function (name,color){
        this.name = name;
        this.color = color;
    }
}

ChatHandler.prototype.setProjectName = function (name){
    this.projectName = name;
}

ChatHandler.prototype.setProjectOwner = function (owner){
    this.projectOwner = owner;
}

ChatHandler.prototype.setWebSocketHandler = function (handler){
    this.communicator = handler;
}

ChatHandler.prototype.messageReceived = function (json_map){
    
    var request_info = json_map.get("request-info");
    var request_type = request_info.get("request-type");
    switch (request_type){
        case 2:
            if(request_info.get("message")){
                var msg = request_info.get("message");
                var id = request_info.get("user-id");
                var info =  this.info.get(id);
                this.messages.push(msg);
                this.message_count ++;
                this.messages_viewer.innerHTML += "\r\n" + info.name + " : " + msg;
                }
            break;
        case 1:
            var color = request_info.get("user-color");
            var name = request_info.get("user-full-name");
            var id = request_info.get("user-id");
            var info = new this.SubInfo(name,color);
            this.info.add(id,info);
            if(this.updater != null){
                this.updater.innerHTML += '<li id="updater_' +id+ ' ><a href="#"><span style="width:10px;height:10px;background-color:'+color+';position: absolute;"></span>' + name + '</a></li>';
            }
            break;
        case -1:

            var id = request_info.get("user-id");

            this.updater.removeChild(document.getElementById("updater_"+id));
            this.info.remove(id);
            break;
    }
}

ChatHandler.prototype.closeChannel = function (){
    //{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":1}}
    var map = new HashMap();
    
    map.add("app-id",2);
    
    var request_info = new HashMap();
    
    request_info.add("project-name",this.projectName);
    request_info.add("project-owner",this.projectOwner);
    request_info.add("request-type",-1);

    map.add("request-info",request_info);

    this.communicator.send(map.toJson());
}

ChatHandler.prototype.openChannel = function (){
    //{"app-id":2,"request-info":{"project-name":"a","diagram-name":"b","project-owner":1,"request-type":1}}
    var map = new HashMap();
    
    map.add("app-id",2);
    
    var request_info = new HashMap();
    
    request_info.add("project-name",this.projectName);
    request_info.add("project-owner",this.projectOwner);
    request_info.add("request-type",1);

    map.add("request-info",request_info);

    this.communicator.send(map.toJson());
}

ChatHandler.prototype.sendMessage = function (msg){
    
    var map = new HashMap();
    
    map.add("app-id",2);
    
    var request_info = new HashMap();
    
    request_info.add("project-name",this.projectName);
    request_info.add("project-owner",this.projectOwner);
    request_info.add("message",msg);
    request_info.add("request-type",2);

    map.add("request-info",request_info);

    this.communicator.send(map.toJson());
}

ChatHandler.prototype.numberOfMessages = function (){
    return this.messages.length;
}

ChatHandler.prototype.popMessage = function (){
    return this.messages.pop();
}