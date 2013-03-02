/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.utils;

import java.util.ArrayList;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Hamza
 */
public final class RequestTools {
    
    public static boolean isSessionEstablished (HttpServletRequest req){
        return (req.getSession(false) == null)? false : true;
    }
    
    private static ArrayList<String> enumToStringArray(Enumeration<String> eitems){
        ArrayList<String> items = new ArrayList<String>();
        
        while(eitems.hasMoreElements()){
            items.add(eitems.nextElement());
        }
        return items;
    }
    
    public static boolean isParamExist(HttpServletRequest req,String ...params){
        boolean flag = false;
        if(params.length != 0){
            
            ArrayList<String> keys = enumToStringArray(req.getParameterNames());
            for (String string : params) {
                for (String key : keys) {
                    if(string.equals(key)){
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    }
}
