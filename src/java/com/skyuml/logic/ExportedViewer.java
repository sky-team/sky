/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Yazany6b
 */
public class ExportedViewer extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        
        response.getWriter().printf("<img src=\"%s\"/>", "main?id="+ Keys.ViewID.EXPORTER_VIEW_ID+"&"+Keys.RequestParams.EXOPRTED_IMAGE_LOCATION+"="+
                request.getParameter(Keys.RequestParams.EXOPRTED_IMAGE_LOCATION));
        response.getWriter().close();
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        
        response.getWriter().printf("<img src=\"%s\"></img>", "main?id="+ Keys.ViewID.EXPORTER_VIEW_ID);
        response.getWriter().close();        
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
