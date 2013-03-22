/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp;

/**
 *
 * @author Hamza
 */
public class Tuple<X,Y> {
    private X item1;
    private Y item2;

    
    public Tuple(X i1,Y i2){
        item1 = i1;
        item2 = i2;
    }
    public X getItem1(){
        return item1;
    }
    public Y getItem2(){
        return item2;
    }

}
