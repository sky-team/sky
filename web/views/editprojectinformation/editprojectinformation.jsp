<%-- 
    Document   : editProfile
    Created on : May 5, 2013, 11:20:03 PM
    Author     : Hassan
--%>

<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.business.SharedProject"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.utils.Keys" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <form action="main?id=7" method="POST">
            <% 
                User user = (User)request.getSession(true).getAttribute("USER");
            %>
            <label>
                <% if(request.getAttribute("Message")!= null)
                                        {
                                                out.println(request.getAttribute("Message"));
                                        }
                                %>
            </label>
            <label>First Name<input type="text" name="FIRST_NAME" value=<%=user.getFirstName()%> ></label><br>
            <label>Last Name<input type="text" name="LAST_NAME" value=<%=user.getLastName()%> ></label><br>
            <label>Email<input type="text" name="EMAIL" value=<%=user.getEmail()%> disabled="true"></label><br>
            <label>Password <input type="text" name="PASSWORD"></label><br>
            <label>Confirm Password<input type="text" name="PASSWORD_C"></label><br>
            <input type="submit" value="Update">
            
            
            
            
        </form>
    </body>
</html>
