/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

//import com.objectplanet.image.PngEncoder;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Yazany6b
 */
public class LoadExported extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {      
        response.setContentType("image/png");
        String image = request.getParameter(Keys.RequestParams.EXOPRTED_IMAGE_LOCATION);
        
        try{
            //FileSystemView.getFileSystemView().
            final String image_location = "/SkyUML/Data/Exports/"+image;
            
            
            File f = new File(image_location);
            Image loaded = ImageIO.read(f);
            
            OutputStream st = response.getOutputStream();
            InputStream in = new FileInputStream(f);
            byte [] buffer = new byte[1024];
            int read = in.read(buffer);
            while(read > 0){
                st.write(buffer, 0, read);
                read = in.read(buffer);
            }
            
            st.flush();
            st.close();            
            
        }catch(Exception e){
        }finally{
            response.getOutputStream().close();
        }  
    }

    //http://localhost:8080/SkyUML/main?id=31&EXOPRTED_IMAGE=image.png
    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (RequestTools.isSessionEstablished(request)) {
            if (request.getSession().getAttribute(Keys.SessionAttribute.USER) != null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getMethod().equalsIgnoreCase("post")){
            response.getWriter().println("You Need To <a href=\"main?id=" + Keys.ViewID.LOGIN_ID+"\" >Login</a>");
            response.getWriter().close();
            return;
        }       
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
}
