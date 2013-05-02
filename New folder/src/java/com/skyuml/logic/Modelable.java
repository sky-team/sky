/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.logic;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Hamza
 */
public interface Modelable {
    void executGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
    void executPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException;
}
