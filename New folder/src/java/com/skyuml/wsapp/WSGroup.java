/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp;

import com.skyuml.utils.Keys;
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

    ConcurrentLinkedQueue<Tuple<String, WSUser>> textMessages;
    ConcurrentLinkedQueue<Tuple<ByteBuffer, WSUser>> binaryMessages;
    ArrayList<WSUser> members;
    boolean includeSender;
    Thread broadcastMessages;
    final int SLEEP_TIME = 100;
    final Object lock = new Object();
    boolean removeUserOnIOException;
    UserIOExceptionHandler onIOException;

    public WSGroup(boolean inCludeSender) {
        this.includeSender = inCludeSender;
        members = new ArrayList<WSUser>();
        removeUserOnIOException = true;

        textMessages = new ConcurrentLinkedQueue<Tuple<String, WSUser>>();
        binaryMessages = new ConcurrentLinkedQueue<Tuple<ByteBuffer, WSUser>>();
        //lock = new Object();

        broadcastMessages = new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    synchronized (lock) {
                        while (!textMessages.isEmpty()) {
                            Tuple<String, WSUser> tuple = textMessages.remove();
                            broadcastTextMessage(tuple.getItem1(), tuple.getItem2());
                        }

                        while (!binaryMessages.isEmpty()) {
                            Tuple<ByteBuffer, WSUser> tuple = binaryMessages.remove();
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

    public ArrayList<WSUser> getCurrentWSUsers() {
        return members;
    }

    public int numberOfMembers() {
        return members.size();
    }

    //check if websocket user is exist
    public boolean isWebSocketExist(WSUser user) {
        return (members.indexOf(user) == -1) ? false : true;
    }

    //check if user is exit 
    public boolean isUserExist(WSUser user) {
        boolean fla = false;
        synchronized (lock) {
            for (int i = 0; i < members.size(); i++) {
                if (members.get(i).getUserId() == user.getUserId()) {
                    fla = true;
                    break;
                }
            }
        }
        return fla;
    }

    public void addMember(WSUser member) {
        synchronized (lock) {
            if (members.indexOf(member) == -1) {
                members.add(member);
            }
        }
    }

    public void removeMember(WSUser member) {
        synchronized (lock) {
            members.remove(member);
        }
    }

    public void closeGroup() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                boolean flag = true;
                while (flag) {
                    try {
                        if (textMessages.isEmpty()) {
                            broadcastMessages.stop();
                            flag = false;
                            members.clear();
                            textMessages.clear();
                            binaryMessages.clear();
                        }
                        Thread.sleep(100);
                    } catch (Exception exp) {
                        exp.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public void pushTextMessage(String msg, WSUser sender) {
        synchronized (lock) {
            textMessages.add(new Tuple<String, WSUser>(msg, sender));
        }
    }

    public void pushBinaryMessage(ByteBuffer msg, WSUser sender) {
        synchronized (lock) {
            binaryMessages.add(new Tuple<ByteBuffer, WSUser>(msg, sender));
        }
    }

    private void broadcastTextMessage(String msg, WSUser sender) {

        if (members.size() <= 0) {
            return;
        }

        if (includeSender) {
            for (int i = 0;i < members.size();i++) {//change it to for loop

                synchronized (members.get(i)) {
                    try {
                        members.get(i).sendTextMessage(msg);
                    } catch (IOException ex) {
                        if (removeUserOnIOException) {
                            String un = members.get(i).getFullName();
                            members.remove(members.get(i));
                            if (onIOException != null) {
                                onIOException.boradcastProblem(members, un);
                            }
                        }
                    }
                }
            }
        } else {
            for (int i = 0;i < members.size();i++) {
                synchronized (members.get(i)) {
                    if (!members.get(i).equals(sender)) {
                        try {
                            members.get(i).sendTextMessage(msg);
                        } catch (IOException ex) {
                            String un = members.get(i).getFullName();
                            members.remove(members.get(i));
                            if (onIOException != null) {
                                onIOException.boradcastProblem(members, un);
                            }
                        }
                    }
                }

            }
        }

    }

    private void broadcastBinatyMessage(ByteBuffer buf, WSUser sender) {

        synchronized (lock) {
            if (members.size() <= 0) {
                return;
            }

            if (includeSender) {
                for (WSUser user : members) {
                    try {

                        synchronized (user) {
                            user.sendBinaryMessage(buf);
                        }
                    } catch (IOException exp) {

                        exp.printStackTrace();
                    }
                }
            } else {
                for (WSUser user : members) {
                    try {
                        if (!user.equals(sender)) {

                            synchronized (user) {
                                user.sendBinaryMessage(buf);
                            }
                        }
                    } catch (IOException exp) {
                        exp.printStackTrace();
                    }
                }
            }
        }
    }

    public void setOnUserIOExceptionHandler(UserIOExceptionHandler ex) {
        this.onIOException = ex;
    }

    public void setRemoveUserOnIOException(boolean bo) {
        removeUserOnIOException = bo;
    }

    public static class UserIOExceptionHandler {

        public UserIOExceptionHandler() {
        }

        public void boradcastProblem(ArrayList<WSUser> members, String userName) {
            String msg = "{\"" + Keys.JSONMapping.APP_ID + "\":0,\"" + Keys.JSONMapping.REQUEST_INFO + "\":{"
                    + "\"" + Keys.JSONMapping.RequestInfo.USER_FULL_NAME + "\":\"" + userName + "\"}}";
            for (WSUser wSUser : members) {
                try {
                    wSUser.sendTextMessage(msg);
                } catch (IOException ex) {
                    Logger.getLogger(WSGroup.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

        }
    }
}
