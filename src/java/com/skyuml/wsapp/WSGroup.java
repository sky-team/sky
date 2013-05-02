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
import java.util.Iterator;
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
                if (members.get(i).equals(user)) {
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
                System.out.println("Register new memebr in project " + member.getFullName());
            }else{
                System.out.println("Fail to Register new memebr in project ,, member already exist." + member.getFullName());
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
                            flag = false;
                            members.clear();
                            binaryMessages.clear();
                            broadcastMessages.stop();
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
        ArrayList<WSUser> tempToDelete = new ArrayList<WSUser>();

        if (members.size() <= 0) {
            return;
        }

        if (includeSender) {
            for (int i = 0; i < members.size(); i++) {//change it to for loop

                synchronized (members.get(i)) {
                    try {
                        members.get(i).sendTextMessage(msg);
                    } catch (IOException ex) {
                        if (removeUserOnIOException) {
                            tempToDelete.add(members.get(i));
                            logError(members.get(i).getFullName() +" : Not responding, i'm going to remove him");
                        }
                        if (onIOException != null) {
                            onIOException.boradcastProblem(members, members.get(i).getFullName());
                        }
                    }
                }
            }

            //clear dicconnected users 
            if (tempToDelete.size() > 0) {
                for (Iterator<WSUser> it = tempToDelete.iterator(); it.hasNext();) {
                    members.remove(it.next());
                }
                tempToDelete.clear();
            }

        } else {
            for (int i = 0; i < members.size(); i++) {
                System.out.println(i);
                synchronized (members.get(i)) {
                    if (members.get(i).getUserId() != sender.getUserId()) {
                        try {
                            members.get(i).sendTextMessage(msg);
                        } catch (IOException ex) {
                            if (removeUserOnIOException) {
                                tempToDelete.add(members.get(i));
                                logError(members.get(i).getFullName() +" : Not responding, i'm going to remove him");
                            }
                            if (onIOException != null) {
                                onIOException.boradcastProblem(members, members.get(i).getFullName());
                            }
                        }
                    }
                }

            }

            //clear dicconnected users 
            if (tempToDelete.size() > 0) {
                for (Iterator<WSUser> it = tempToDelete.iterator(); it.hasNext();) {
                    members.remove(it.next());
                }
                tempToDelete.clear();
            }
        }

    }

    private void logError(String msg) {
        System.out.println(msg);
    }

    private void broadcastBinatyMessage(ByteBuffer buf, WSUser sender) {
         throw new UnsupportedOperationException("Not supported yet. Come and fix me 'Hamza' !!");
        /*
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
                        if (user.getUserId() != sender.getUserId()) {

                            synchronized (user) {
                                user.sendBinaryMessage(buf);
                            }
                        }
                    } catch (IOException exp) {
                        exp.printStackTrace();
                    }
                }
            }
        }*/
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
            String msg = "{\"" + Keys.JSONMapping.APP_ID + "\":2,\"" + Keys.JSONMapping.REQUEST_INFO + "\":{"
                    + "\"" + Keys.JSONMapping.RequestInfo.USER_FULL_NAME + "\":\"" + userName + "\",\"" + Keys.JSONMapping.RequestInfo.REQUEST_TYPE + "\":-1}}";
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
