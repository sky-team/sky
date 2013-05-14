<%@page import="com.skyuml.utils.RequestTools"%>
<%@page import="com.skyuml.business.SharedProject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <title>Login/Registration</title>


        <link rel="stylesheet" type="text/css" href="css/login/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="css/login/css/animate-custom.css"/>

        <script src="js/validationLoginRegistration.js"></script>

        <link rel="stylesheet" href="css/layout.css">

    </head>
    <body>

        <div class="divHeader mertoFont" style="height:130px">
            <%
                if (RequestTools.isSessionEstablished(request)) {
                    if ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER) != null) {
                        RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW);
                        dispatcher.forward(request, response);
                    }
                }

                User s = new User();
                s.setFirstName("Unknown");
                s.setLastName("User");
            %>
            <img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/>
            <div class="divider"></div>
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SEARCH_UN_PROJECT %>"><div class="headerItem metroIcon"><img src="images/header/search.png"/><h2>search</h2></div></a>
            <div class="headerUserinfo">
                <div class="userFName"> <%= s.getFirstName()%></div>
                <div class="userLName"> <%= s.getLastName()%></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>

            </div>
            <a id="right-menu" href="#right-menu" class="chatButton metroIcon" ></a>

        </div>

        <div class="container">
            <header>
                <h1> </h1>
            </header>
            <section>				
                <div id="container_demo" >
                    <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>
                    <a class="hiddenanchor" id="toreset"></a>

                    <div id="wrapper">
                        <div id="login" class="animate form">

                            <form  action="main?id=<%= Keys.ViewID.LOGIN_ID%>" autocomplete="on" name="loginform" onsubmit="return loginValidation(this);" method="POST"> 
                                <h1>Log in</h1> 
                                <p> <label for="username" class="uname" style="color:red;">
                                        <% if (request.getAttribute("Message") != null) {
                                                out.println(request.getAttribute("Message"));
                                            }
                                        %> </label></br>
                                    <label for="username" class="uname" data-icon="e" id="loginemail" > Your email</label>
                                    <input id="username" name="<%= Keys.RequestParams.USER_EMAIL%>" required="required" type="email" placeholder="mymail@mail.com"/>
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p" > Your password </label>
                                    <input id="password" name="<%= Keys.RequestParams.USER_PASSWORD%>" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                                </p>
                                <!-- <p> <label for="username" class="uname" style="color:red;"></label><p>Rest your password </p><a href="../reset/reset.jsp">Click Here</a></p>
                                                                 </br>															
                                                                </p>-->
                                <p class="login button"> 
                                    <input type="submit" value="Login" onclick="return loginValidation(this.form);"/> 
                                </p>
                                <p class="change_link">
                                    Not a member yet ?
                                    <a href="#toregister" class="to_register">Join us</a>
                                </p>
                            </form>
                        </div>



                        <div id="register" class="animate form">
                            <form  action="main?id=<%= Keys.ViewID.REGISTER_ID%>" autocomplete="on" method="POST"> 
                                <h1> Sign up </h1> 
                                <p>
                                    <label for="username" class="uname" style="color:red;">
                                        <% if (request.getAttribute("Message") != null) {
                                                out.println(request.getAttribute("Message"));
                                            }
                                        %> </label>
                                    <label for="usernamesignup" class="uname" data-icon="u">Your First Name</label>
                                    <input id="usernamesignup" name="<%= Keys.RequestParams.USER_FIRST_NAME%>" required="required" type="text" placeholder="mysuperusername690" />
                                </p>
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">Your Last Name</label>
                                    <input id="usernamesignup" name="<%= Keys.RequestParams.USER_LAST_NAME%>" required="required" type="text" placeholder="mysuperusername690" />
                                </p>
                                <p> 
                                    <label for="emailsignup" class="youmail" data-icon="e" > Your email</label>
                                    <input id="emailsignup" name="<%= Keys.RequestParams.USER_EMAIL%>" required="required" type="email" placeholder="mysupermail@mail.com"/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="youpasswd" data-icon="p">Your password </label>
                                    <input id="passwordsignup" name="<%= Keys.RequestParams.USER_PASSWORD%>" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">Please confirm your password </label>
                                    <input id="passwordsignup_confirm" name="<%= Keys.RequestParams.USER_CONFIRM_PASSWORD%>" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p class="signin button"> 
                                    <input type="submit" value="Sign up"/> 
                                </p>
                                <p class="change_link">  
                                    Already a member ?
                                    <a href="#tologin" class="to_register"> Go and log in </a>
                                </p>
                            </form>
                        </div>

                    </div>
                </div>  
            </section>
        </div>
        <script type="text/javascript" >

        </script>
    </body>
</html>