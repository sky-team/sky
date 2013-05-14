<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>

        <title>Welcome to SKYUML </title>
        <link rel="stylesheet" type="text/css" href="css/wel_default.css" />
        <link rel="stylesheet" type="text/css" href="css/wel_component.css" />
        <script src="js/modernizr.custom.js"></script>

    </head>
    <body>
        <div class="container">	
            <div class="os-phrases" id="os-phrases">
                <% User user = (User) request.getSession().getAttribute(Keys.SessionAttribute.USER);%>
                <h2>Welcome <%= user.getFirstName() + " " + user.getLastName()%></h2>
                <h2>To SkyUML</h2>
                <h2>Where you can</h2>
                <h2>Collaborate </h2>
                <h2>Share</h2>
                <h2>Access any where</h2>
                <h2>and now</h2>
                <h2>Have Fun</h2>
            </div>
        </div><!-- /container -->

        <script src="js/jquery.js"></script>
        <script src="js/jquery.lettering.js"></script>
        <script>
            $(document).ready(function() {
                $("#os-phrases > h2").lettering('words').children("span").lettering().children("span").lettering();
            })
            
            $(function() {
                setTimeout(redirect, 47000);
            });

            function redirect() {
               window.location.href = 'main?id=<%= Keys.ViewID.CHOOSE_DIRECTION_MODEL_ID %>';
            }
        </script>
    </body>
</html>