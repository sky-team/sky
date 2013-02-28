/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.diagrams;

import java.util.ArrayList;
import java.util.Iterator;

/**
 *
 * @author Yazan
 */
public final class AssociationSpot {
    
    private ArrayList<Association> associations = new ArrayList<Association>();

    public int size() {
        return associations.size();
    }

    public boolean isEmpty() {
        return associations.isEmpty();
    }

    public boolean contains(Object o) {
        return associations.contains(o);
    }

    public int indexOf(Object o) {
        return associations.indexOf(o);
    }

    public Object[] toArray() {
        return associations.toArray();
    }

    public <T> T[] toArray(T[] a) {
        return associations.toArray(a);
    }

    public Association get(int index) {
        return associations.get(index);
    }

    public boolean add(Association e) {
        return associations.add(e);
    }

    public Association remove(int index) {
        return associations.remove(index);
    }

    public boolean remove(Object o) {
        return associations.remove(o);
    }

    public void clear() {
        associations.clear();
    }

    public Iterator<Association> iterator() {
        return associations.iterator();
    }
    
    
}
