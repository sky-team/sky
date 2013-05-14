/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

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
import org.eclipse.jdt.internal.compiler.ast.TrueLiteral;

/**
 *
 * @author Hassan
 */
public class RemoveUserFromShare extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int userid = Integer.valueOf(request.getParameter(Keys.RequestParams.USER_ID));
        int ownerID = ((User)request.getSession(true).getAttribute(Keys.SessionAttribute.USER)).getUserId();
        String projectName = request.getParameter(Keys.RequestParams.PROJECT_NAME);
        ArrayList<SharedProject> sharedProject;
        
        try {
            sharedProject = SharedProject.selectByOwnerId(DefaultDatabase.getInstance().getConnection(), ownerID);
        
            ArrayList<SharedProject> finalShredProject = new ArrayList<SharedProject>();
            for(int i = 0 ;i < sharedProject.size() ; i++){
                if(sharedProject.get(i).getProjectName().equals(projectName)){
                    finalShredProject.add(sharedProject.get(i));
                }
            }
            sharedProject = null;
            
            for(int i  = 0 ; i < finalShredProject.size(); i++){
                if(finalShredProject.get(i).getUserId() == userid){
                    SharedProject.delete(DefaultDatabase.getInstance().getConnection(), finalShredProject.get(i));
                    response.getWriter().print("1");
                    response.getWriter().flush();
                    response.getWriter().close();
                    break;
                }
            }
            
        } catch (SQLException ex) {
            
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
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
    
}
