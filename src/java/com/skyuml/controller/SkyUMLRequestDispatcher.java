/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 11
 */
package com.skyuml.controller;


import com.skyuml.logic.ChooseDirectionModel;
import com.skyuml.logic.CreateProjectModel;
import com.skyuml.logic.DeleteProject;
import com.skyuml.logic.EditProfileModel;
import com.skyuml.logic.EditProjectInformation;
import com.skyuml.logic.ExportedViewer;
import com.skyuml.logic.GetStartedModel;
import com.skyuml.logic.InviteModel;
import com.skyuml.logic.JoinModel;
import com.skyuml.logic.LeaveProjectModel;
import com.skyuml.logic.LoadExported;
import com.skyuml.logic.LoginModel;
import com.skyuml.logic.LogoutModel;
import com.skyuml.logic.ModelManager;
import com.skyuml.logic.Modelable;
import com.skyuml.logic.MyProjects;
import com.skyuml.logic.OpenProjectModel;
import com.skyuml.logic.OpenWSConnectionModel;
import com.skyuml.logic.QuickStartModel;
import com.skyuml.logic.RegistrationModel;
import com.skyuml.logic.RemoveUserFromShare;
import com.skyuml.logic.RequestOnMyProjectModel;
import com.skyuml.logic.SearchModel;
import com.skyuml.logic.SearchUnLogedUserModel;
import com.skyuml.logic.SharedWithMeModel;
import com.skyuml.logic.ViewMyInvitationsModel;
import com.skyuml.logic.ViewMyJoinsModel;

import com.skyuml.logic.WelcomeModel;
import com.skyuml.logic.WelcomeNewUserModel;
import com.skyuml.utils.Keys;
import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public class SkyUMLRequestDispatcher extends HttpServlet {
    ModelManager manager;

    public SkyUMLRequestDispatcher()throws ServletException{
        super.init();
        manager = ModelManager.getInstance();
        test();
        
        manager.put(Keys.ViewID.WELCOME_ID, new WelcomeModel());
        manager.put(Keys.ViewID.LOGIN_ID, new LoginModel());
        manager.put(Keys.ViewID.LOGOUT_ID, new LogoutModel());
        manager.put(Keys.ViewID.MY_PROJECTS_ID, new MyProjects());
        manager.put(Keys.ViewID.SEARCH_PROJECT, new SearchModel());
        manager.put(Keys.ViewID.MY_JOINS_VIEW_ID, new ViewMyJoinsModel());
        manager.put(Keys.ViewID.MY_INVITATIONS_VIEW_ID, new ViewMyInvitationsModel());
        manager.put(Keys.ViewID.SHARED_WITH_ME_PROJECTS_ID, new SharedWithMeModel());
        manager.put(Keys.ViewID.GET_STARTED_ID, new GetStartedModel());
        manager.put(Keys.ViewID.INVITE_DEAL_ID, new InviteModel());
        manager.put(Keys.ViewID.JOIN_DEAL_ID, new JoinModel());
        manager.put(Keys.ViewID.LEAVE_PROJECT_ID, new LeaveProjectModel());
        manager.put(Keys.ViewID.REGISTER_ID, new RegistrationModel());
        manager.put(Keys.ViewID.SEARCH_UN_PROJECT, new SearchUnLogedUserModel());
        manager.put(Keys.ViewID.CHOOSE_DIRECTION_MODEL_ID, new ChooseDirectionModel());
        manager.put(Keys.ViewID.EDIT_PROFILE, new EditProfileModel());
        manager.put(Keys.ViewID.EDIT_PROJECT, new EditProjectInformation());
        manager.put(Keys.ViewID.OPEN_PROJECT_ID, new OpenProjectModel());
        manager.put(Keys.ViewID.OPEN_WS_CONNECTION_ID, new OpenWSConnectionModel());
        manager.put(Keys.ViewID.REMOVE_USER_FROM_SHARE_ID, new RemoveUserFromShare());
        manager.put(Keys.ViewID.MY_PROJECTS_REQUESTS_ID, new RequestOnMyProjectModel());
        manager.put(Keys.ViewID.WELCOME_NEW_USER_MODEL_ID, new WelcomeNewUserModel());
        manager.put(Keys.ViewID.CREATE_PROJECT_ID, new CreateProjectModel());
        manager.put(Keys.ViewID.DELETE_PROJECT_ID, new DeleteProject());
        manager.put(Keys.ViewID.EXPORTER_VIEW_ID, new LoadExported());
        manager.put(Keys.ViewID.EXPORTED_VIEWER_ID, new ExportedViewer());
        manager.put(Keys.ViewID.QUICK_START_ID, new QuickStartModel());
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("do get");
        test();
        int id = getRequestId(request);

        if(id < 1){//less than 1 mean error occur
            
            //dispatch to the error page
            request.setAttribute("id",id);
            handleError(request, response);
            
        }else{
            
           
            Modelable model = manager.get(id);
            
            if(model != null){//check if the model of that id exist
                
                model.executGet(request, response);
                
            }else{
                //dispatch to the error page
                request.setAttribute("id", id);
                handleError(request, response);
            }
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       int id = getRequestId(request);

        if(id < 1){//less than 1 mean error occur
            
            //dispatch to the error page
            request.setAttribute("id",id);
            handleError(request, response);
            
        }else{
            
            Modelable model = manager.get(id);
            
            if(model != null){//check if the model of that id exist
                
                model.executPost(request, response);
                
            }else{
                //dispatch to the error page
                request.setAttribute("id", id);
                handleError(request, response);
            }
        }
    }

    private void handleError(HttpServletRequest request,HttpServletResponse response)
            throws ServletException,IOException{
      RequestDispatcher dispatcher = request.getRequestDispatcher("/views/error.jsp");
      dispatcher.forward(request, response);
    }
    
    private int getRequestId(HttpServletRequest req){
        String id = req.getParameter("id");
        
        if(id == null){
            return 0;
        }else{
            try{
                int v = Integer.parseInt(id);
                return v;
            }catch(NumberFormatException exp){
                return 0;
            }
        }
    }
    
    private void test(){
       
            
      
    }


}
