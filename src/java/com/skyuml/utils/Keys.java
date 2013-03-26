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
    public static String TEST_WS_VIEW = "/views/testws.jsp";
    
    }
    
    public static final class ServletMapping {
    private ServletMapping(){}
    
    public static String WS_REQUEST_HANNDLER = "/wsmain";
    
    }
    public static final class WSAppMapping{
        private WSAppMapping(){}
        public final static int UML_COLLAPORATION_ID = 1;
        public final static int TEAM_CHAT_ID = 2;
        public final static int AUTO_SAVE_ID = 3;
        
    }
    public static final class JSONMapping{
        private JSONMapping(){}
        
        public final static String APP_ID = "app-id";
        public final static String REQUEST_INFO = "request-info";
        
        public static final class RequestInfo{
            private RequestInfo(){}
            public final static String REQUEST_TYPE = "request-type";
            public final static String PROJECT_NAME = "project-name";
            public final static String PROJECT_OWNER = "project-owner";
            public final static String DIAGRAM_NAME ="diagram-name";
            public final static String USER_COLOR ="user-color";
            public final static String USER_FULL_NAME ="user-full-name";
            public final static String USER_ID = "user-id";
            
        }
    }
    
    


}
