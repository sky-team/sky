/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.business;

import com.skyuml.datamanagement.Utils;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.sql.Date;
import java.sql.Timestamp;
/**
 *
 * @author Hamza
 */
public class Invitation {
    
    
    private final static String tableName = "inviterequest";
    private final static String requrestIdColumn = "request_id";
    private final static String senderColumn = "sender";
    private final static String receiverColumn = "receiver";
    private final static String projectNameColumn = "project_name";
    private final static String msgColumn = "msg";
    private final static String stateColumn = "state";
    private final static String dateColumn = "date";
    
    private int requestId;
    private int sender;
    private int receiver;
    private String msg;
    private Timestamp date;
    private String projectName;
    private State state;
    
    public Invitation(){
        
    }
    
    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public int getSender() {
        return sender;
    }

    public void setSender(int sender) {
        this.sender = sender;
    }

    public int getReceiver() {
        return receiver;
    }

    public void setReceiver(int receiver) {
        this.receiver = receiver;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public static enum State{
        accept,wait,reject
    }
    
    public static boolean insert(Connection connection ,int from ,int to,String projectName,String msg) throws SQLException{
        
        Statement st =   connection.createStatement();
        
        String col = senderColumn+","+receiverColumn+","+projectNameColumn+","+msgColumn + ","+dateColumn;
        String values = from + "," + to + ",'" + projectName + "','" + msg + "', now()";

        try{
        int res = st.executeUpdate(String.format(Utils.Formats.INSERT_FORMAT,
                tableName,col,values));
        }catch(SQLException exp){
            //exp.printStackTrace();
            return false;
        }finally{
            st.close();
        }
        
                
        return true;///change this
    }
    
    public static ArrayList<Invitation> selectByReceiverId(Connection connection,int receiver_id) throws SQLException{
        ArrayList<Invitation> inv = new ArrayList<Invitation>();
        
        //String values = "";
        String where = receiverColumn + " = "+receiver_id ;
        Statement st =  connection.createStatement();
        System.out.println(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        ResultSet res = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        
        while(res.next()){
            Invitation invt = new Invitation();
            
            invt.setSender(res.getInt(senderColumn));
            invt.setReceiver(res.getInt(receiverColumn));
            invt.setRequestId(res.getInt(requrestIdColumn));
            invt.setProjectName(res.getString(projectNameColumn));
            invt.setMsg(res.getString(msgColumn));
            invt.setDate(res.getTimestamp(dateColumn));
            String state = res.getString(stateColumn);
            
            if(state.equals(State.accept.name())){
                invt.setState(State.accept);
            }else if(state.equals(State.wait.name())){
                invt.setState(State.wait);
            }else if(state.equals(State.reject)){
                invt.setState(State.reject);
            }
            
            inv.add(invt);
        }

        return inv;
        
    }
    
        public static ArrayList<Invitation> selectByReceiverIdAndState(Connection connection,int receiver_id,State state) throws SQLException{
        ArrayList<Invitation> inv = new ArrayList<Invitation>();
        
        //String values = "";
        String where = receiverColumn + " = "+receiver_id + " AND "+stateColumn + " = '"+state.name()+"'" ;
        
        Statement st =  connection.createStatement();
        System.out.println(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        
        ResultSet res = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        
        while(res.next()){
            Invitation invt = new Invitation();
            
            invt.setSender(res.getInt(senderColumn));
            invt.setReceiver(res.getInt(receiverColumn));
            invt.setRequestId(res.getInt(requrestIdColumn));
            System.out.println("");
            
            invt.setProjectName(res.getString(projectNameColumn));
            invt.setMsg(res.getString(msgColumn));
            invt.setDate(res.getTimestamp(dateColumn));
            String temps = res.getString(stateColumn);
            
            if(temps.equals(State.accept.name())){
                invt.setState(State.accept);
            }else if(temps.equals(State.wait.name())){
                invt.setState(State.wait);
            }else if(temps.equals(State.reject)){
                invt.setState(State.reject);
            }
            
            inv.add(invt);
        }

        return inv;
        
    }
        public static Invitation selectByRequestId(Connection connection,int request_id) throws SQLException{
        
        
        //String values = "";
        String where = requrestIdColumn + " = "+request_id  ;
        
        Statement st =  connection.createStatement();
        System.out.println(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        
        ResultSet res = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        Invitation invt = null;
        
        while(res.next()){
            invt = new Invitation();
            
            invt.setSender(res.getInt(senderColumn));
            invt.setReceiver(res.getInt(receiverColumn));
            System.out.println("Test MSG : "+invt.getSender() + "  " +invt.getReceiver());
            
            invt.setRequestId(res.getInt(requrestIdColumn));
            invt.setProjectName(res.getString(projectNameColumn));
            invt.setMsg(res.getString(msgColumn));
            invt.setDate(res.getTimestamp(dateColumn));
            String temps = res.getString(stateColumn);
            
            if(temps.equals(State.accept.name())){
                invt.setState(State.accept);
            }else if(temps.equals(State.wait.name())){
                invt.setState(State.wait);
            }else if(temps.equals(State.reject)){
                invt.setState(State.reject);
            }
            
            
        }

        return invt;
        
    }
    
    public static ArrayList<Invitation> selectBySenderId(Connection connection,int sender_id) throws SQLException{
        ArrayList<Invitation> inv = new ArrayList<Invitation>();
        
        //String values = "";
        String where = senderColumn + " = "+sender_id ;
        Statement st =  connection.createStatement();
        System.out.println(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        ResultSet res = st.executeQuery(String.format(Utils.Formats.SELECT_CONDITION_FORMAT, Utils.Formats.STAR,tableName,where));
        
        while(res.next()){
            Invitation invt = new Invitation();
            
            invt.setSender(res.getInt(senderColumn));
            invt.setReceiver(res.getInt(receiverColumn));
            invt.setRequestId(res.getInt(requrestIdColumn));
            invt.setProjectName(res.getString(projectNameColumn));
            invt.setMsg(res.getString(msgColumn));
            invt.setDate(res.getTimestamp(dateColumn));
            String state = res.getString(stateColumn);
            
            if(state.equals(State.accept.name())){
                invt.setState(State.accept);
            }else if(state.equals(State.wait.name())){
                invt.setState(State.wait);
            }else if(state.equals(State.reject)){
                invt.setState(State.reject);
            }
            
            inv.add(invt);
        }

        return inv;
        
    }
    
    public static boolean removeBySenderState(Connection connection,int sender_id,State state) throws SQLException{
        
        Statement st = connection.createStatement();
        String where = senderColumn+" = " + sender_id+ " AND "+ stateColumn+" = '"+state.name()+"'";
        
        int res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT, tableName,where));
        
        st.close();
        
        return true;
    }
    
    public static boolean removeByReceiverState(Connection connection,int reciver_id,State state) throws SQLException{
        
        Statement st = connection.createStatement();
        String where = receiverColumn+" = " + reciver_id+ " AND "+ stateColumn+" = '"+state.name()+"'";
        
        int res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT, tableName,where));
        
        st.close();
        
        return true;
    }
    
    public static boolean removeByRequestId(Connection connection,int req_id) throws SQLException{
        
        Statement st = connection.createStatement();
        String where = requrestIdColumn+" = " + req_id;
        
        int res = st.executeUpdate(String.format(Utils.Formats.DELETE_FORMAT, tableName,where));
        
        st.close();
        
        return true;
    }
    
    public static boolean updateReceiverStateByRequestID(Connection connection,int request_id,State state) throws SQLException{
        
        Statement st = connection.createStatement();
        String where = requrestIdColumn+" = " + request_id;
        String values = stateColumn+"='"+state.name()+"'";
        int res = st.executeUpdate(String.format(Utils.Formats.UPDATE_FORMAT, tableName,values,where));
        
        st.close();
        
        return true;
    }
    
    
    
    
}
