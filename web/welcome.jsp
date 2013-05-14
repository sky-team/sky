<%-- 
    Document   : welcome
    Created on : May 7, 2013, 11:56:18 PM
    Author     : Yazany6b
--%>

<%@page import="com.skyuml.utils.Keys"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <a href="main?id=<%= Keys.ViewID.LOGIN_ID %>">Login Or Register</a>
        <a href="main?id=<%= Keys.ViewID.MY_PROJECTS_ID %>">My Projects</a>
    </body>
</html>
