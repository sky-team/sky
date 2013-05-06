
function parseJsonArray(json_array){
    var list = new ArrayList();
    for (var i = 0; i < json_array.length; i++) {
        if(isJsonArray(json_array[i])){
            list.add(parseJsonArray(json_array[i]));
        }else
            if(isJsonObject(json_array[i])){
                list.add(parseJsonObject(json_array[i]));
            }else
                list.add(json_array[i]);
    } 

    return list;
}

function parseJsonObject(json_object){
    var map = new HashMap();
    for(var key in json_object)
    {
        if(isJsonArray(json_object[key])){
            map.add(key,parseJsonArray( json_object[key]));
        }else
            if(isJsonObject(json_object[key])){
                map.add(key,parseJsonObject(json_object[key]));
            }else
                map.add(key,json_object[key]);
    } 
    
    return map;
}
 
function parseJson(json){
    
    var jobject = JSON && JSON.parse(json) || $.parseJSON(json); 
    
    var result = null;
    if(isJsonArray(jobject)){
        result = parseJsonArray( jobject);
    }else
    if(isJsonObject(jobject)){
        result = parseJsonObject(jobject);
    }else
        result = jobject;
    
    
    return result;
}