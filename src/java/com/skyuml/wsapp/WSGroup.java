/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp;

import com.skyuml.utils.Tuple;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Hamza
 */
public class WSGroup {
    
    ConcurrentLinkedQueue<Tuple<String,WSUser>> textMessages;
    ConcurrentLinkedQueue<Tuple<ByteBuffer,WSUser>> binaryMessages;
    
    ArrayList<WSUser> members;
    boolean includeSender;
    Thread broadcastMessages;
    final int SLEEP_TIME = 100;
    Object lock;
    
    public WSGroup(boolean inCludeSender){
        this.includeSender = inCludeSender;
        members = new ArrayList<WSUser>();
        
        textMessages = new ConcurrentLinkedQueue<Tuple<String,WSUser>>();
        binaryMessages = new ConcurrentLinkedQueue<Tuple<ByteBuffer, WSUser>>();
        lock = new Object();
        
        broadcastMessages = new Thread(new Runnable() {

            @Override
            public void run() {
                while(true){
                    if(!textMessages.isEmpty()){
                        for (Tuple<String, WSUser> tuple : textMessages) {
                            broadcastTextMessage(tuple.getItem1(), tuple.getItem2());
                        }
                    }
                    
                    if(!binaryMessages.isEmpty()){
                        for (Tuple<ByteBuffer, WSUser> tuple : binaryMessages) {
                            broadcastBinatyMessage(tuple.getItem1(), tuple.getItem2());
                        }
                    }
                    
                    try {
                        Thread.sleep(SLEEP_TIME);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(WSGroup.class.getName()).log(Level.SEVERE, null, ex);
                        ex.printStackTrace();
                    }
                }
            }
        });
        broadcastMessages.start();
    }
    

    
    public int numberOfMembers(){
        return members.size();
    }
    
    public boolean isMemberExist(WSUser user){
        return (members.indexOf(user) == -1)?false:true;
    }
    
    public void addMember(WSUser member){
        synchronized(lock){
            if(members.indexOf(member) == -1){
                members.add(member);
            }
        }
    }
    
    public void removeMember(WSUser member){
        synchronized(lock){
            members.add(member);
        }
    }
    
    public void pushTextMessage(String msg, WSUser sender){
        textMessages.add(new Tuple<String,WSUser>(msg,sender));
    }
    
    public void pushBinaryMessage(ByteBuffer msg,WSUser sender){
        binaryMessages.add(new Tuple<ByteBuffer,WSUser>(msg,sender));
    }
    
    private void broadcastTextMessage(String msg, WSUser sender){
        
        synchronized(lock){
        if(members.size() <= 0)
            return;
        
        if(includeSender){
            for (WSUser user : members) {
                try{
                    synchronized(user){
                        user.sendTextMessage(msg);
                    }
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }else{
            for (WSUser user : members) {
                try{
                    if(!user.equals(sender)){
                        
                        synchronized(user){
                            user.sendTextMessage(msg);
                        }
                    }
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }
        }
    }
    
    private void broadcastBinatyMessage(ByteBuffer buf, WSUser sender){
        
        synchronized(lock){
        if(members.size() <= 0)
            return;
        
        if(includeSender){
            for (WSUser user : members) {
                try{
                    
                    synchronized(user){
                        user.sendBinaryMessage(buf);
                    }
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }else{
            for (WSUser user : members) {
                try{
                    if(!user.equals(sender)){
                        
                        synchronized(user){
                            user.sendBinaryMessage(buf);
                        }
                    }
                }catch(IOException exp){
                    exp.printStackTrace();
                }
            }
        }
        }   
    }
    
}
