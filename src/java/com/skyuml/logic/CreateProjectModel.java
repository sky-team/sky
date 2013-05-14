/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Project;
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
public class CreateProjectModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter(Keys.RequestParams.PROJECT_NAME)== null || request.getParameter(Keys.RequestParams.PROJECT_NAME)=="")
            request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
        try {
            ArrayList<Project> currentProjects = Project.selectByUserId(DefaultDatabase.getInstance().getConnection(), ((User)request.getSession(true).getAttribute(Keys.SessionAttribute.USER)).getUserId());
            for (int i = 0; i < currentProjects.size(); i++) {
                if(currentProjects.get(i).getProjectName().equals(request.getParameter(Keys.RequestParams.PROJECT_NAME))){
                    response.getWriter().print("0");
                    response.getWriter().flush();
                    response.getWriter().close();
                    break;
                }
            }
            response.getWriter().print("1");
            response.getWriter().flush();
            response.getWriter().close();
        } catch (SQLException ex) {
            request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
        }catch (Exception e){
            request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
        }        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            ArrayList<Project> currentProjects = Project.selectByUserId(DefaultDatabase.getInstance().getConnection(), ((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getUserId());
            for (int i = 0; i < currentProjects.size(); i++) {
                if(currentProjects.get(i).getProjectName().equals(request.getParameter(Keys.RequestParams.PROJECT_NAME))){
                    request.setAttribute("Message", "Invalid project name, project exist");
                    request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
                    break;
                }
            }
            
            Project newProject = new Project();
            newProject.setProjectName(request.getParameter(Keys.RequestParams.PROJECT_NAME));
            newProject.setUserId(((User)request.getSession().getAttribute(Keys.SessionAttribute.USER)).getUserId());
            if(request.getParameter(Keys.RequestParams.PROJECT_DESCRIPTION) == null || request.getParameter(Keys.RequestParams.PROJECT_DESCRIPTION).equals("")){
                newProject.setProjectDescription("");
            }else{
                newProject.setProjectDescription(request.getParameter(Keys.RequestParams.PROJECT_DESCRIPTION));
            }
            
           Project.insert(DefaultDatabase.getInstance().getConnection(), newProject);
           request.setAttribute("Message", "Create project successfuly");
           request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
        } catch (SQLException ex) {
            request.setAttribute("Message", "Unable to create project");
            request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
        }catch (Exception e){
            request.setAttribute("Message", "Unable to create project");
            request.getRequestDispatcher(Keys.ViewMapping.CREATE_PROJECT_VIEW).forward(request, response);
        }
        
    }
    
    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            if(request.getSession().getAttribute(Keys.SessionAttribute.USER) != null)
                return true;
        }
        
        return false;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
    
}
