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
import javax.servlet.http.HttpSession;
import org.apache.jasper.tagplugins.jstl.core.Catch;

/**
 *
 * @author Hassan
 */
public class SearchModel extends AuthenticateModel{

    private String getSharedWith(Project project){
        StringBuilder builder = new StringBuilder();
        
        try {
            ArrayList<SharedProject> sharedProjects = SharedProject.selectByOwnerIdAndProjectName(DefaultDatabase.getInstance().getConnection(),project.getUserId() ,project.getProjectName());
            for (SharedProject sharedProject : sharedProjects) {
                
                User user = User.selectByUserId(DefaultDatabase.getInstance().getConnection(), sharedProject.getUserId());
                builder.append(String.format("%s,%s,%s,%d;", user.getFirstName(),user.getLastName(),user.getEmail(),user.getUserId()));
            }
        }catch(Exception e){
            
        }
        
        return builder.toString();
    }
    
    private String createMyProject(Project p,int i,boolean enable_delete) throws SQLException{
        
        String tag = "<article>"
        + "  <form method=\"POST\" action=\"main?id=" + Keys.ViewID.OPEN_PROJECT_ID + "\" id=f"+i+">"
        + "<input type=\"hidden\" name=\""+ Keys.RequestParams.PROJECT_OWNER_ID +"\" value=\""+ p.getUserId() +"\"/>"
        + "<input type=\"hidden\" name=\""+ Keys.RequestParams.PROJECT_NAME +"\" value=\""+ p.getProjectName() +"\"/>"
        + "<header>"
        + "<h3>"+ p.getProjectName() +"</h3>"
        + "<span>Project Owner : "+ ((User) User.selectByUserId(DefaultDatabase.getInstance().getConnection(),p.getUserId())).getFirstName()+"</span>"
        + "</header><br><textarea id=\""+p.getProjectName()+"_"+p.getUserId()+"\" style=\"background-color:white;-webkit-user-select: none;border: none;width:100%;resize: none;\" rows=\"6\" "
        + "wrap=\"hard\"onselectstart=\"return false;\" onclick=\"return false;\" disabled=\"true\"  readonly>"+p.getProjectDescription()+"</textarea>"
        + "<table  style=\"width:100%;\">"
        + "<tr><td><button type=\"submit\" style=\"width:100%;\" type=\"submit\">Open</button></td>"
        + "<th> <button style=\"width:100%;\" type=\"button\" onclick=\"delete('"+ p.getProjectName()+"',"+p.getUserId()+")\" disabled=\""+ enable_delete +"\" >Delete</button></td></tr>"
        + "<tr><td><button style=\"width:100%;\" type=\"button\"  onclick=\"invite('" + p.getProjectName() + "');\">Invite</button></td>"
        + "<td><button style=\"width:100%;\" type=\"button\"  onclick=\"edit('" + p.getProjectName() + "','"+ p.getProjectDescription() 
        +"',"+p.getUserId()+",'"+ getSharedWith(p) + "');\">Edit</button></td></tr></table>"
        + "</form>"
        + "</article>";
        
        return tag;
    }
    
    private String createMyLeaveProject(Project p,int i) throws SQLException{
        
        String tag = "<article id=\"art" +i+ "\">"
        + "<form method=\"POST\" action=\"main?id=" + Keys.ViewID.OPEN_PROJECT_ID + "\" id=f"+i+">"
        + "<input type=\"hidden\" name="+ Keys.RequestParams.PROJECT_OWNER_ID +" value="+ p.getUserId() +"/>"
        + "<input type=\"hidden\" name="+ Keys.RequestParams.PROJECT_NAME +" value="+ p.getProjectName() +"/>"
        + "<header>"
        + "<h3>"+ p.getProjectName() +"</h3>"
        + "<span>Project Owner : "+ ((User) User.selectByUserId(DefaultDatabase.getInstance().getConnection(),p.getUserId())).getFirstName()+"</span>"
        + "</header><br><textarea id=\""+p.getProjectName()+"_"+p.getUserId()+"\" style=\"background-color:white;-webkit-user-select: none;border: none;width:100%;resize: none;\" rows=\"6\" "
        + "wrap=\"hard\"onselectstart=\"return false;\" onclick=\"return false;\" disabled=\"true\"  readonly>"+p.getProjectDescription()+"</textarea></form>"
        + "<table>"
        + "<tr><td><button type=\"submit\" style=\"width:100%;\" type=\"submit\">Open</button></td>"
        + "<tr><td><button style=\"width:100%;\" onclick=\"leave('" + p.getProjectName() + "' , " + p.getUserId() + ",'art"+i+"');\" type=\"button\">Leave</button></td></tr>"
        + "</table>"
        + "</article>";
        
        return tag;
    }
    
    
    private String createOtherJoinProject(Project p,int i) throws SQLException{
        
        String tag = "<article>"
        + "  <form method=\"POST\" action=\"main?id=" + Keys.ViewID.OPEN_PROJECT_ID + "\" id=f"+i+">"
        + "<input type=\"hidden\" name="+ Keys.RequestParams.PROJECT_OWNER_ID +" value="+ p.getUserId() +"/>"
        + "<input type=\"hidden\" name="+ Keys.RequestParams.PROJECT_NAME +" value="+ p.getProjectName() +"/>"
        + "<header>"
        + "<h3><a target=\"_blank\" href=\"javascript:document.getElementById('f"+i+"').submit()\">"+ p.getProjectName() +"</a></h3>"
        + "<span>Project Owner : "+ ((User) User.selectByUserId(DefaultDatabase.getInstance().getConnection(),p.getUserId())).getFirstName()+"</span>"
        + "</header><br><textarea id=\""+p.getProjectName()+"_"+p.getUserId()+"\" style=\"background-color:white;-webkit-user-select: none;border: none;width:100%;resize: none;\" rows=\"6\" "
        + "wrap=\"hard\"onselectstart=\"return false;\" onclick=\"return false;\" disabled=\"true\"  readonly>"+p.getProjectDescription()+"</textarea></form>"
        + "<th><button style=\"width:100%;\" onclick=\"join('" + p.getProjectName() + "',"+ p.getUserId()+");\" type=\"button\">Join</button></th>"
        + "</article>";
        
        return tag;
    }
    
    private boolean isShared(ArrayList<SharedProject> shares,int my_id){
        for (SharedProject sharedProject : shares) {
            if(sharedProject.getUserId() == my_id)
                return true;
        }
        
        return false;
    }
    
    @Override
    public void performGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(Keys.ViewMapping.SEARCH_PROJECT).forward(request, response);
    }

    @Override
    public void performPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession se = request.getSession();
            int user_id = ((User)se.getAttribute(Keys.SessionAttribute.USER)).getUserId();

            StringBuilder resString = new StringBuilder("");
            ArrayList<Project> projects = Project.selectStarByCondition(DefaultDatabase.getInstance().getConnection(),"ProjectName LIKE '%"+request.getParameter("search")+"%'");
            
            int index = -1;
            for (Project project : projects) {
                index ++;
                
                ArrayList<SharedProject> share_projects = SharedProject.selectByOwnerIdAndProjectName(DefaultDatabase.getInstance().getConnection(),project.getUserId(),project.getProjectName());
                
                if(project.getUserId() == user_id){
                    resString.append(createMyProject(project, index,share_projects.size() == 0));
                }else{                   
                        if(isShared(share_projects, user_id)){
                            resString.append(createMyLeaveProject(project, index));
                        }else{
                            resString.append(createOtherJoinProject(project, index));
                        }
                }
            }
            
            if(resString.length() <= 0 ){
                response.getWriter().print("No result");
            }else
                response.getWriter().print(resString.toString());
            response.getWriter().flush();
            response.getWriter().close();
        } catch (SQLException ex) {
            response.getWriter().print("An error happened");
            response.getWriter().flush();
            response.getWriter().close();
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
        if(request.getMethod().equalsIgnoreCase("post")){
            response.getWriter().println("You Need To <a href=\"main?id=" + Keys.ViewID.LOGIN_ID+"\" >Login</a>");
            response.getWriter().close();
            return;
        }       
        request.getRequestDispatcher(Keys.ViewMapping.WELCOME_VIEW).forward(request, response);
    }
    
}
