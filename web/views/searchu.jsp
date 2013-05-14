<%@page import="com.skyuml.business.SharedProject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.skyuml.business.Project"%>
<%@page import="com.skyuml.business.User"%>
<%@page import="com.skyuml.utils.Keys"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        
        <link rel="stylesheet" href="css/fancyInput.css">
        

        <link rel="stylesheet" type="text/css" href="css/selectPro_style1.css" />
        <link rel="stylesheet" type="text/css" href="css/selectPro_style2.css" />
        <link rel="stylesheet" href="css/layout.css">
        <script src="js/modernizr.custom.34978.js"></script>	
        <script type="text/javascript" src="js/jquery.js"></script>
        <script src="js/fancyInput.js"></script>
    </head>
    <body>

        <div class="divHeader mertoFont"style="height: 130px;margin-top: 1px;">
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><img src="images/skyuml.png"style="width:200px;height:125px;position: absolute;"/></a>
            <div class="divider"></div>
            <a href="main?id=<%= Keys.ViewID.LOGIN_ID%>"><div class="headerItem metroIcon"><img src="images/header/home.png"/><h2>home</h2></div></a>
            <a href="main?id=<%= Keys.ViewID.SEARCH_UN_PROJECT %>"><div class="headerItem"><img src="images/header/search.png"/><h2>search</h2></div></a>
            <div class="headerUserinfo">
                <%
                    User s = new User();
                    s.setFirstName("Unknown");
                    s.setLastName("");
                    if ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER) != null) {
                        s.setFirstName((((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getFirstName()));
                        s.setLastName((((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getLastName()));
                    }
                %>
                <div class="userFName"> <%= s.getFirstName()%></div>
                <div class="userLName"> <%= s.getLastName()%></div>
                <div class="userPic"></div>
                <div class="userInfoDivider"></div>
                <a class="settingBTN metroIcon"></a>

            </div>
        </div>
        <h1> <% out.print("Search");%> </h1>

        <section class="input" style="text-align:center" >
            <div class="fancyInput">
                <input id="txtSearch" type="text" style="width: 723px;">
            </div>
        </section>

        <script>
            $('section :input').val('').fancyInput()[0].focus();
        </script>
        <h1><input type="button" value="Search" onclick="doAjax()"></h1>


        <div class="container">
            <section class="ib-container" id="ib-container">

            </section>
        </div>




        <!-- Include jQuery -->
        <script type="text/javascript" src="js/jquery.js"></script>

        <script type="text/javascript">
            function animation() {
                $(function() {

                    var $container = $('#ib-container'),
                            $articles = $container.children('article'),
                            timeout;

                    $articles.on('mouseenter', function(event) {

                        var $article = $(this);
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {

                            if ($article.hasClass('active'))
                                return false;

                            $articles.not($article.removeClass('blur').addClass('active'))
                                    .removeClass('active')
                                    .addClass('blur');

                        }, 65);

                    });

                    $container.on('mouseleave', function(event) {

                        clearTimeout(timeout);
                        $articles.removeClass('active blur');

                    });

                });
            }
            function doAjax() {
                var us = document.getElementById("txtSearch").value;

                try {
                    xmlHttp.open("POST", "main?id=<%= Keys.ViewID.SEARCH_UN_PROJECT%>&PROJECT_NAME=" + us, true);
                    xmlHttp.send();
                } catch (Ex) {
                }
            }

            var xmlHttp = null;


            if (window.XMLHttpRequest)
            {//OTHER BROWSERS
                xmlHttp = new XMLHttpRequest()
            }
            else if (window.ActiveXObject)
            {//IE
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
            }

            xmlHttp.onreadystatechange = function() {

                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var stri = xmlHttp.responseText;
                    stri = stri.split(";");

                    document.getElementById("ib-container").innerHTML = xmlHttp.responseText;
                    animation();
                }
            }

        </script>
    </body>
</html>