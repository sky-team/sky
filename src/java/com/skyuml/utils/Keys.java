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

    private Keys() {
    }

    public static final class ConnectionSettings {

        private ConnectionSettings() {
        }
        public static final String DATABASE_IP = "localhost";
        public static final int DATABASE_PORT = 3306;
    }

    //used to exchage data between servlet and jsp "view"
    public static final class AttributeNames {

        private AttributeNames() {
        }
        public static final String USER_ATTRIBUTE_NAME = "USER_DATA";
        public static final String PROJECT_ATTRIBUTE_NAME = "PROJECT_DATA";
        public static final String SHARED_PROJECT_ATTRIBUTE_NAME = "SHARED_PROJECT_DATA";
        public static final String INVITATIONS_ATTRIBUTE_NAME = "INVITATIONS_ATTRIBUTE_NAME";
        public static final String JOINS_ATTRIBUTE_NAME = "JOINS_ATTRIBUTE_NAME";
        public static final String SUMMRY_DATA_NAME = "SUMMRY_DATA";
        //INVITATIONS_ATTRIBUTE_NAME
    }

    //used to get the data from POST or GET request in servlet
    public static final class RequestParams {

        private RequestParams() {
        }
        public static final String USER_ID = "USER_ID";
        public static final String PROJECT_NAME = "PROJECT_NAME";
        public static final String PROJECT_OWNER_ID = "PROJECT_OWNER_ID";
        public static final String DIAGRAM_NAME = "DIAGRAM_NAME";
        public static final String USER_NAME = "username";
        public static final String PASSWORD = "password";
        public static final String EMAILS = "EMAILS";
        public static final String MESSAGE = "MESSAGE";
        public static final String REQUEST_ID = "requestId";
        public static final String ACTION = "action";
        public static final String UNSHARED_USERS = "UNSHARED_USERS";
        
        public static final String USER_EMAIL = "EMAIL";
        public static final String USER_PASSWORD = "PASSWORD";
        public static final String USER_CONFIRM_PASSWORD = "PASSWORD_C";
        public static final String USER_FIRST_NAME = "FIRST_NAME";
        public static final String USER_LAST_NAME = "LAST_NAME";
        public static final String USER_OLD_PASSWORD = "PASSWORD_O";
        public static final String PROJECT_DESCRIPTION = "PROJECT_DESCRIPTION";
        public static final String PROJECT_JOIN_MESSAGE = "PROJECT_JOIN";
        public static final String EXOPRTED_IMAGE_LOCATION = "EXPORTED_IMAGE";
    }

    public static final class SessionAttribute {

        private SessionAttribute() {
        }
        public static final String USER = "USER";
    }

    public static final class Extensions {

        private Extensions() {
        }
        public static final String DIAGRAM_EXTENSION = ".dgr";
    }

    public static final class ViewID {

        private ViewID() {
        }
        public static int LOGIN_ID = 2;
        public static int WELCOME_ID = 1;
        public static int REGISTER_ID = 3;
        public static int OPEN_WS_CONNECTION_ID = 4;
        public static int INDEX_ERROR_ID = 5;
        public static int OPEN_PROJECT_ID = 6;
        public static int TEST_WS_ID = 7;
        public static int TEST_CHAT_ID = 8;
        public static int SIMPE_MY_PRPJECTS_ID = 9;
        public static int SIMPE_LOGIN = 10;
        public static int MY_PROJECTS_ID = 11;
        public static int RESET_PASSWORD_ID = 12;
        public static int CREATE_PROJECT_ID = 13;
        public static int EDIT_PROJECT = 14;
        public static int EDIT_PROFILE = 15;
        public static int CREATE_DIAGEAM = 16;
        public static int MY_INVITATIONS_VIEW_ID = 17;
        public static int MY_JOINS_VIEW_ID = 18;
        public static int INVITE_DEAL_ID = 19;
        public static int JOIN_DEAL_ID = 20;
        public static int REMOVE_USER_FROM_SHARE_ID = 21;
        public static int SEARCH_UN_PROJECT = 22;
        public static int SEARCH_PROJECT = 23;
        public static int GET_STARTED_ID = 24;
        public static int LOGOUT_ID = 25;
        public static int MY_PROJECTS_REQUESTS_ID = 26;
        public static int SHARED_WITH_ME_PROJECTS_ID = 27;
        public static int LEAVE_PROJECT_ID = 28;
        public static int CHOOSE_DIRECTION_MODEL_ID = 29;
        public static int WELCOME_NEW_USER_MODEL_ID = 30;
        public static int DELETE_PROJECT_ID = 30;
        public static int EXPORTER_VIEW_ID = 31;
        public static int EXPORTED_VIEWER_ID = 32;
        public static int QUICK_START_ID = 33;
    }

    public static final class ViewMapping {

        private ViewMapping() {
        }
        public static String INDEX_ERROR_VIEW = "/views/error.jsp";
        public static String OPEN_PROJECT_VIEW = "/views/openProject.jsp";
        public static String TEST_WS_VIEW = "/views/testws.jsp";
        public static String TEST_CHAT_VIEW = "/views/testChat.jsp";
        public static String SIMPE_MY_PRPJECTS_VIEW = "/views/simplemyproject.jsp";
        public static String SIMPE_LOGIN = "/views/simplelogin.jsp";
        public static String MY_PROJECTS_VIEW = "/views/selectProject.jsp";
        public static String VIEW_MY_INVITATIONS_VIEW = "/views/myinvitationsview.jsp";
        public static String VIEW_MY_JOINS_VIEW = "/views/myjoinsview.jsp";
        public static String WELCOME_NEW_USER_VIEW = "/views/welcomenewuserview.jsp";
        //new
        public static String CHOOSE_DIRECTION_VIEW = "/views/choosedirectionview.jsp";
        public static String LOGIN_VIEW = "/views/login.jsp";
        public static String WELCOME_VIEW = "/views/welcome.jsp";
        public static String GET_STARTED_VIEW = "/views/home.jsp";
        public static String REGISTER_VIEW = "/views/login.jsp?#toregister";
        public static String RESET_PASSWORD_VIEW = "/views/reset/reset.jsp";
        //
        public static String EDIT_PROJECT = "/views/editProjectInfo.jsp";
        public static String EDIT_PROFILE = "/views/editmyprofileview.jsp";

        //
        public static String MY_INVITATIONS_VIEW = "/views/myinvitationsview.jsp";
        public static String MY_JOINS_VIEW = "/views/myjoinsview.jsp";
        public static String INVITE_DEAL_VIEW = "/views/invite_deal.jsp";
        public static String JOIN_DEAL_VIEW = "/views/join.jsp";
        public static String CREATE_PROJECT_VIEW = "/views/createProject.jsp";
        public static String SEARCH_UN_PROJECT = "/views/searchu.jsp";
        public static String SEARCH_PROJECT = "/views/search.jsp";
        public static String SHARED_WITH_ME_PROJECTS = "/views/shared.jsp";
        public static String QUICK_START_VIEW = "/views/quickStart.jsp";
    }

    public static final class ServletMapping {

        private ServletMapping() {
        }
        public static String WS_REQUEST_HANNDLER = "/wsmain";
    }

    public static final class WSAppMapping {

        private WSAppMapping() {
        }
        public final static int UML_COLLAPORATION_ID = 1;
        public final static int TEAM_CHAT_ID = 2;
        public final static int AUTO_SAVE_ID = 3;
        public final static int SVG_EXPORTER_ID = 4;
        public final static int CURSOR_ID = 5;
    }

    public static final class JSONMapping {

        private JSONMapping() {
        }
        public final static String APP_ID = "app-id";
        public final static String REQUEST_INFO = "request-info";
        public final static String TOKEN_ID = "token-id";

        public static final class RequestInfo {

            private RequestInfo() {
            }
            public final static String REQUEST_TYPE = "request-type";
            //user
            public final static String USER_COLOR = "user-color";
            public final static String USER_FULL_NAME = "user-full-name";
            public final static String USER_ID = "user-id";
            //project
            public final static String PROJECT_NAME = "project-name";
            public final static String PROJECT_OWNER = "project-owner";
            //diagram
            public final static String DIAGRAM_NAME = "diagram-name";
            public final static String DIAGRAM_TYPE = "diagram-type";
            public final static String DIAGRAM_CONTENT = "diagram-content";

            public static final class DiagramContent {

                private DiagramContent() {
                }
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

                public static final class Association {

                    private Association() {
                    }
                    public static final String ASSOCIATION_SOURCE = "association-source";
                    public static final String ASSOCIATION_DESTINATION = "association-destination";
                    public static final String SOURCE_SPOT = "source-spot";
                    public static final String DESTINATION_SPOT = "destination-spot";
                }

                public static final class UseCaseDiagram {

                    private UseCaseDiagram() {
                    }
                    //public static final String ACTOR_NAME = "actor-name";
                    //public static final String OVAL_NAME = "oval-name";
                }

                public static final class ClassDiagram {

                    private ClassDiagram() {
                    }
                    public static final String METHODS = "methods";
                    public static final String MEMBERS = "members";
                    public static final String OPERATION = "operation";
                }
            }
        }
    }
}
