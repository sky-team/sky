<%-- 
    Document   : simplelogin
    Created on : Apr 30, 2013, 10:17:31 PM
    Author     : Hamza
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Welcome to Sky UML - Login</h1>
        <form action="main?id=2" method="POST">
            <table>
                <tr>
                    <th> User Name </th> 
                    <th><input type="text" name="username" value="Hamza"/></th>
                </tr>
                <tr>    
                    <th> Password  </th><th><input type="password" name="password" value="12345"/></th>
                </tr>
                <tr>
                    <th></th>
                    <th><input type="submit" value="Login"/></th>
                </tr>
            </table>
        </form>
    </body>
</html>
