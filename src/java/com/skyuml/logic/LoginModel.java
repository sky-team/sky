/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import com.skyuml.business.Invitation;
import com.skyuml.business.JoinRequest;
import com.skyuml.business.Project;
import com.skyuml.business.SharedProject;
import com.skyuml.business.User;
import com.skyuml.datamanagement.DefaultDatabase;
import com.skyuml.utils.Keys;
import com.skyuml.utils.RequestTools;
import com.skyuml.utils.Tuple;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author AbO_UsAmH
 */
public class LoginModel extends AuthenticateModel{

    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(RequestTools.isSessionEstablished(request)){
            HttpSession session = request.getSession();
            User user = ((User)session.getAttribute(Keys.SessionAttribute.USER)); 
            if( user != null){
                
                ArrayList<Tuple<Integer,String>> result = new ArrayList<Tuple<Integer, String>>();
                try {
                    result = getAllInfoAbout(user);
                } catch (SQLException ex) {
                    Logger.getLogger(LoginModel.class.getName()).log(Level.SEVERE, null, ex);
                }

                request.setAttribute(Keys.AttributeNames.SUMMRY_DATA_NAME, result);
                request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW).forward(request, response);
            }else{
                RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW);
                dispatcher.forward(request, response);
            }
        }else{
            RequestDispatcher dispatcher = request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW);
            dispatcher.forward(request, response);
        }
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        try {
            
            User user = User.selectByEmail(DefaultDatabase.getInstance().getConnection(), request.getParameter(Keys.RequestParams.USER_EMAIL));
            String password = request.getParameter(Keys.RequestParams.USER_PASSWORD);//Encryption.SHA_512(request.getParameter(Keys.RequestParams.USER_PASSWORD));
            if (password.equals(user.getPassword())) {
               HttpSession session = request.getSession();
               session.setAttribute(Keys.SessionAttribute.USER,user);
               
               ArrayList<Tuple<Integer,String>> result = new ArrayList<Tuple<Integer, String>>();
                try {
                    result = getAllInfoAbout(user);
                } catch (SQLException ex) {
                    Logger.getLogger(LoginModel.class.getName()).log(Level.SEVERE, null, ex);
                }

                request.setAttribute(Keys.AttributeNames.SUMMRY_DATA_NAME, result);
               
               request.getRequestDispatcher(Keys.ViewMapping.GET_STARTED_VIEW).forward(request, response);
            }else
            {
                request.setAttribute("Message", "Invalid E-mail Or Password");
                request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW).forward(request, response);
            }
        }catch(SQLException e){
            request.setAttribute("Message", "Invalid E-mail Or Password");
            request.getRequestDispatcher(Keys.ViewMapping.LOGIN_VIEW).forward(request, response);
        } 
    }

    @Override
    public boolean isAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return true;
    }

    @Override
    public void onUnAuthenticateAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
    
    public static ArrayList<Tuple<Integer,String>> getAllInfoAbout(User user) throws SQLException{
       ArrayList<Tuple<Integer,String>> res = new ArrayList<Tuple<Integer, String>>();
       String format1 = "<h2>%s </h2>";
       String format2 = "<h2>%s : %s </h2>";
       int id = user.getUserId();
       StringBuilder strb = new StringBuilder();
       
       //get all invitation
        ArrayList<Invitation> inv = Invitation.selectByReceiverId(DefaultDatabase.getInstance().getConnection(), id);
        if(inv.isEmpty()){
            res.add(new Tuple<Integer, String>(inv.size(), String.format(format1, "You don't have any invitation")));
        }else{
            for (Invitation invitation : inv) {
                User sender = User.selectByUserId(DefaultDatabase.getInstance().getConnection(), invitation.getSender());
                strb.append(String.format(format2, sender.getFirstName(),"invited you to " + invitation.getProjectName()));
            }
            res.add(new Tuple<Integer, String>(inv.size(), String.format(format1, strb.toString())));
        }
        
        //get all join request
        ArrayList<JoinRequest> joins = JoinRequest.selectByReceiverId(DefaultDatabase.getInstance().getConnection(), id);
        strb = new StringBuilder();
        
        if(joins.isEmpty()){
            res.add(new Tuple<Integer, String>(joins.size(), String.format(format1, "You don't have any join request")));
        }else{
            for (JoinRequest join : joins) {
                User sender = User.selectByUserId(DefaultDatabase.getInstance().getConnection(), join.getSender());
                strb.append(String.format(format2, sender.getFirstName(),"ask to join " + join.getProjectName()));
            }
            res.add(new Tuple<Integer, String>(joins.size(), String.format(format1, strb.toString())));
        }
        
        //get all my projects
        strb = new StringBuilder();
        ArrayList<Project> projects = Project.selectByUserId(DefaultDatabase.getInstance().getConnection(), id);
        if(projects.isEmpty()){
            res.add(new Tuple<Integer, String>(projects.size(), String.format(format1, "You don't have any project")));
        }else{
            for (Project project : projects) {
                strb.append(String.format(format1,project.getProjectName()));      
            }
            res.add(new Tuple<Integer, String>(projects.size(), strb.toString()));
        }
        
        //get all shared projecr
        
        strb = new StringBuilder();
        ArrayList<SharedProject>  shared = SharedProject.selectByUserId(DefaultDatabase.getInstance().getConnection(), id);
        if(shared.isEmpty()){
            res.add(new Tuple<Integer, String>(shared.size(), String.format(format1, "You don't have any project shared with you")));
        }else{
            for (SharedProject sproject : shared) {
                strb.append(String.format(format1,sproject.getProjectName()));      
            }
            res.add(new Tuple<Integer, String>(shared.size(), strb.toString()));
        }
        
        return res;
    }
}
