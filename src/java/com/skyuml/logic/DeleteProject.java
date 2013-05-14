/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Project;
import com.skyuml.business.SharedProject;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Yazany6b
 */
public class DeleteProject extends AuthenticateModel {

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int owner = Integer.parseInt(request.getParameter(Keys.RequestParams.PROJECT_OWNER_ID));
        String pname = request.getParameter(Keys.RequestParams.PROJECT_NAME);
        
        Project p = new Project(owner, pname, "");
        try {
            ArrayList<SharedProject> shs = SharedProject.selectByOwnerIdAndProjectName(DefaultDatabase.getInstance().getConnection(), owner, pname);
            if(shs.size() > 0){
                response.getWriter().println("The project still shared. Unable to delete");
            }
            Project.delete(DefaultDatabase.getInstance().getConnection(), p);
            response.getWriter().println("The project deleted");
            
        } catch (SQLException ex) {
            response.getWriter().println("Error Ocurred while deleting");
            Logger.getLogger(DeleteProject.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        if(RequestTools.isSessionEstablished(request))
        {
            if(((User)session.getAttribute(Keys.SessionAttribute.USER)) != null)
                return true;
        }
        return  false;
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
