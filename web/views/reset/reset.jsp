<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
        <title>Reset</title>
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/animate-custom.css" />
		<link rel="stylesheet" type="text/css" href="css/style2.css" />
		<link rel="stylesheet" type="text/css" href="css/demo_2.css" />
		<style>	body {
				background: #e1c192 url(images/wood_pattern.jpg);
			}
		</style>
    </head>
    <body>
	<div class="codrops-top">
                <a href="http://tympanus.net/Tutorials/RealtimeGeolocationNode/">
                    <pre >Welcome <strong>Unknown</strong></pre>
                </a>
                <span class="right">
                   <a href="../index/index.jsp">
                        <strong>Home</strong>
                    </a>
					<a href="../aboutus/aboutus.jsp">
                        <strong>About Us</strong>
                    </a>
					<a href="contact.jsp">
                        <strong>Contact us</strong>
                    </a>
                </span>
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
                            <form  action="mysuperscript.php" autocomplete="on"> 
                                <form  action="mysuperscript.php" autocomplete="on"> 
                                <h1> Reset password </h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="e"> Your email</label>
                                    <input id="username" name="username" required="required" type="text" placeholder="mymail@mail.com"/>
                                </p>
                                
                                <p class="signin button"> 
									<input type="submit" value="New password"/> 
								</p>
                                <p class="change_link">  
									Login
									<a href="../login/login.jsp" class="to_register"> Go and log in </a>
								</p>
                            </form>
                        </div>
						

                        
                    </div>
                </div>  
            </section>
            </div>
    </body>
</html>