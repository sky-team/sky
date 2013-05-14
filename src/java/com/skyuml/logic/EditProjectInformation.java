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
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hassan
 */
public class EditProjectInformation extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            int ownerID = ((User) request.getSession().getAttribute(Keys.SessionAttribute.USER)).getUserId();
            String project_name = request.getParameter(Keys.RequestParams.PROJECT_NAME).trim();
            String description = request.getParameter(Keys.RequestParams.PROJECT_DESCRIPTION);

            Project project = Project.select(DefaultDatabase.getInstance().getConnection(), ownerID, project_name);
            project.setProjectDescription(description);
            Project.update(DefaultDatabase.getInstance().getConnection(), project);
            
            SharedProject sp = new SharedProject();
            try {
                String[] ushare_with = request.getParameter(Keys.RequestParams.UNSHARED_USERS).trim().split("_");
                for (String string : ushare_with) {
                    sp.setOwnerId(ownerID);
                    sp.setUserId(Integer.parseInt(string));
                    sp.setProjectName(project_name);

                    SharedProject.delete(DefaultDatabase.getInstance().getConnection(), sp);
                }
            } catch (Exception d) {
            }
            
            response.getWriter().println("<p style=\"color:green;\">Updated Successfully</p>");
            response.getWriter().flush();
        } catch (SQLException ex) {
            response.getWriter().println("<p style=\"color:red;\">Unable to updated</p>");
            response.getWriter().flush();
            response.getWriter().close();
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            if(request.getSession(true).getAttribute(Keys.SessionAttribute.USER) != null)
                return true;
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
