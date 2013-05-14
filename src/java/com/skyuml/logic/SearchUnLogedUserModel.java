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
public class SearchUnLogedUserModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.SEARCH_UN_PROJECT).forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            StringBuilder resString = new StringBuilder("");
            ArrayList<Project> projects =Project.selectStarByCondition(DefaultDatabase.getInstance().getConnection(),"ProjectName LIKE '%"+request.getParameter(Keys.RequestParams.PROJECT_NAME)+"%'");
            for (int i = 0; i < projects.size(); i++) {
                resString.append("<article><form><header><h3><a target=\"_blank\" href=\"#\">"+projects.get(i).getProjectName()+"</a></h3>"
                        +"<span>Project Owner : "+ ((User) User.selectByUserId(DefaultDatabase.getInstance().getConnection(),projects.get(i).getUserId())).getFirstName()+"</span>" +"</header><br><p>"+projects.get(i).getProjectDescription()+"</p></form></article>");
            }
            response.getWriter().print(resString.toString());
            response.getWriter().flush();
            response.getWriter().close();
        } catch (SQLException ex) {
            response.getWriter().print("No result");
            response.getWriter().flush();
            response.getWriter().close();
        }
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return true;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }
}
