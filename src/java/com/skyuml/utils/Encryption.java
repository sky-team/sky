/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

/**
 *
 * @author AbO_UsAmH
 */
public final class Encryption {
    private Encryption(){}
    /*public static  void  main(String[] args){
        String s = Encryption.generateRandomPasswordSolt();
        System.out.println(s);
        System.out.println(Encryption.SHA_512(s));
        System.out.println(Encryption.SHA_512("12345"));
        
        s = Encryption.generateRandomPasswordSolt();
        System.out.println(s);
        System.out.println(Encryption.SHA_512(s));
        
        s = Encryption.generateRandomPasswordSolt();
        System.out.println(s);
        System.out.println(Encryption.SHA_512(s));
    }*/
    public static String SHA_512(String input){
        MessageDigest md;
        String message = input;
        String out = "";
        try {
            md= MessageDigest.getInstance("SHA-512");
 
            md.update(message.getBytes());
            byte[] mb = md.digest();
            
            for (int i = 0; i < mb.length; i++) {
                byte temp = mb[i];
                String s = Integer.toHexString(new Byte(temp));
                while (s.length() < 2) {
                    s = "0" + s;
                }
                s = s.substring(s.length() - 2);
                out += s;
            }
            
 
        } catch (NoSuchAlgorithmException e) {
            System.out.println("ERROR: " + e.getMessage());
        }
        return out;
    }
    public static String generateRandomPasswordSolt(){
        String fromString = "qwertyuiopASDFGHJK!@#$%^&*()Lzxcvbn1234567890mQWERTYUIOPasdfghjklZXCVBNM" ;
        StringBuilder finaString = new StringBuilder("") ;
        String appendString = "" ;
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            appendString =  ""+fromString.charAt(Math.abs(random.nextInt())%72);
            finaString.append(appendString);
        }
        return finaString.toString();
    }
}
