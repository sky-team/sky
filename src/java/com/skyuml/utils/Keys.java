/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.utils;

/**
 *
 * @author Yazan
 */
public final class Keys {
    private Keys(){}
    
    public static final class AttributeNames{
        private AttributeNames(){}
        public static final String USER_ATTRIBUTE_NAME = "USER_DATA";
        public static final String PROJECT_ATTRIBUTE_NAME = "PROJECT_DATA";
        
    }
    
    public static final class RequestParams{
        private RequestParams(){}
        public static final String USER_ID = "USER_ID";
        public static final String PROJECT_NAME = "PROJECT_NAME";
        public static final String PROJECT_OWNER_ID = "PROJECT_OWNER_ID";
        public static final String DIAGRAM_NAME = "DIAGRAM_NAME";
    }
    public static final class SessionAttribute{
        private SessionAttribute(){}
        public static final String USER = "USER";
        
        
    }
    
    public static final class Extensions{
        private Extensions(){}
        public static final String DIAGRAM_EXTENSION = ".dgr"; 
    }
    
    public static final class ViewMapping {
    private ViewMapping(){}
    
    public static String INDEX_ERROR_VIEW = "/views/error.jsp";
    public static String OPEN_PROJECT_VIEW = "/views/openProjectView.jsp";
    
    }
    
    public static final class ServletMapping {
    private ServletMapping(){}
    
    public static String WS_REQUEST_HANNDLER = "/wsmain";
    
    }
    
    


}
