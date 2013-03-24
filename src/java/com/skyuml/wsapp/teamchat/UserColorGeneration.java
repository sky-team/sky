/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.teamchat;

import java.util.Random;

/**
 *
 * @author userzero
 */
public class UserColorGeneration {
    int[] r;
    int[] g;
    int[] b;
    
    
    public UserColorGeneration(){
        r = new int[23];
        g = new int[23];
        b = new int[23];
        
        int counter = 0;

        for (int i = 10 ;i<=230;i+=10 ){
            r[counter] = i;
            g[counter] = i;
            b[counter] = i;
            counter++;
         }
    }
    
    public String getRandomColor(){
        int index,rc = 0 ,gc = 0, bc = 0;
        Random rand = new Random();
        
        index = -1;
        
        while(index == -1 ){
            index = rand.nextInt(r.length);
            if(r[index] != -1){
                rc = r[index];
                r[index] = -1;
            }
            
        }
        
        index = -1;
        while(index == -1 ){
            index = rand.nextInt(g.length);
            if(g[index] != -1){
                gc = g[index];
                g[index] = -1;
            }
            
        }
        
        index = -1;
        while(index == -1 ){
            index = rand.nextInt(b.length);
            if(b[index] != -1){
                bc = b[index];
                b[index] = -1;
            }
            
        }
        
        return String.format("RGB(%d,%d,%d)", rc,gc,bc);
    }
}
