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
    
    public static final class ConnectionSettings {
        private ConnectionSettings(){}
        public static final String DATABASE_IP = "localhost";
        public static final int DATABASE_PORT = 3306;
    }
    
    //used to exchage data between servlet and jsp "view"
    public static final class AttributeNames{
        private AttributeNames(){}
        public static final String USER_ATTRIBUTE_NAME = "USER_DATA";
        public static final String PROJECT_ATTRIBUTE_NAME = "PROJECT_DATA";
        public static final String SHARED_PROJECT_ATTRIBUTE_NAME = "SHARED_PROJECT_DATA";
        
    }
    
    //used to get the data from POST or GET request in servlet
    public static final class RequestParams{
        private RequestParams(){}
        public static final String USER_ID = "USER_ID";
        public static final String PROJECT_NAME = "PROJECT_NAME";
        public static final String PROJECT_OWNER_ID = "PROJECT_OWNER_ID";
        public static final String DIAGRAM_NAME = "DIAGRAM_NAME";
        public static final String USER_NAME = "username";
        public static final String PASSWORD = "password";
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
    public static String OPEN_PROJECT_VIEW = "/views/openProject.jsp";
    public static String TEST_WS_VIEW = "/views/testws.jsp";
    public static String TEST_CHAT_VIEW = "/views/testChat.jsp";
    public static String SIMPE_MY_PRPJECTS_VIEW = "/views/simplemyproject.jsp";
    public static String SIMPE_LOGIN = "/views/simplelogin.jsp";
    public static String MY_PROJECTS_VIEW = "/views/selectProject.jsp";
    
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
        public final static int SVG_EXPORTER_ID = 4;
        
    }
    
    public static final class JSONMapping{
        private JSONMapping(){}
        
        public final static String APP_ID = "app-id";
        public final static String REQUEST_INFO = "request-info";
        public final static String TOKEN_ID = "token-id";
        public static final class RequestInfo{
            private RequestInfo(){}
            public final static String REQUEST_TYPE = "request-type";
            
            //user
            public final static String USER_COLOR ="user-color";
            public final static String USER_FULL_NAME ="user-full-name";
            public final static String USER_ID = "user-id";
            
            //project
            public final static String PROJECT_NAME = "project-name";
            public final static String PROJECT_OWNER = "project-owner";
 
            //diagram
            public final static String DIAGRAM_NAME ="diagram-name";
            public final static String DIAGRAM_TYPE = "diagram-type";
            public final static String DIAGRAM_CONTENT="diagram-content";
            
            
            public static final class DiagramContent{
                private DiagramContent(){}
                
                //common content
                public static final String X_LOCATION = "x-location";
                public static final String Y_LOCATION = "y-location";
                
                public static final String COMPONENT_ID = "component-id";
                public static final String COMPONENT_TYPE = "component-type";
                public static final String TITLE = "title";
                
                public static final String ASSOCIATIONS = "associations";
                public static final String COMPONENTS = "components";
                
                public static final String DIAGRAM_HEADER = "diagram-header";
                public static final String DIAGRAM_BODY = "diagram-body";
                
                public static final class Association{
                    private Association(){}
                    
                    
                    public static final String ASSOCIATION_SOURCE = "association-source";
                    public static final String ASSOCIATION_DESTINATION = "association-destination";
                }
                
                public static final class UseCaseDiagram{
                    private UseCaseDiagram(){}
                    
                    //public static final String ACTOR_NAME = "actor-name";
                    //public static final String OVAL_NAME = "oval-name";
                    
                }
                
                
                public static final class ClassDiagram{
                    private ClassDiagram(){}
                    
                    public static final String METHODS = "methods";
                    public static final String MEMBERS = "members";
                    public static final String OPERATION = "operation";
                }
                
            }
            
        }
    }
    
    


}
