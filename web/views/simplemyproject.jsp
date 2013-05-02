<%-- 
    Document   : simplemyproject
    Created on : Apr 30, 2013, 10:42:42 PM
    Author     : Hamza
--%>

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
        <h1>My Projects </h1>
        
            <% 
            ArrayList<Project> projs =  (ArrayList<Project>)request.getAttribute(Keys.AttributeNames.PROJECT_ATTRIBUTE_NAME);
            for(int i = 0; i < projs.size();i++){%>
            <a href="main?id=3&PROJECT_NAME=<%=projs.get(i).getProjectName()%>&PROJECT_OWNER_ID=<%= projs.get(i).getUserId()%>"><%=projs.get(i).getProjectName()%></a>
            <%
            }
            %>
            
            <h1>Projects Shared With Me </h1>  
            <%
            ArrayList<SharedProject> shar = (ArrayList<SharedProject>)request.getAttribute(Keys.AttributeNames.SHARED_PROJECT_ATTRIBUTE_NAME);
            System.out.println("Sizzzae from View  : " + shar.size());
            for(SharedProject shared : shar){
                //System.out.println("Sizzzae from View  : " + shar.size());
            %>
            <a href="main?id=3&PROJECT_NAME=<%=shared.getProjectName()%>&PROJECT_OWNER_ID=<%= shared.getOwnerId()%>"><%=shared.getProjectName()%></a>
            <% } %>
    </body>
</html>
