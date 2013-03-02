/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.utils;

import java.io.File;
import java.io.FileFilter;

/**
 *
 * @author Yazan
 */
public class DgrFilter implements FileFilter{

    @Override
    public boolean accept(File pathname) {
        return pathname.getName().toUpperCase().endsWith(Keys.Extensions.DIAGRAM_EXTENSION.toUpperCase()) && pathname.isFile();
    }
    
}
