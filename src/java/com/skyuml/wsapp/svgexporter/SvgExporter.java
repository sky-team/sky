/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.svgexporter;

import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.Buffer;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yazany6b
 */
public class SvgExporter implements WSApp{

    
    private byte[] readFile(String file){
        FileInputStream inputStream = null;
        try {
            
            ArrayList<Byte> bytes = new ArrayList<Byte>();
            inputStream = new FileInputStream(file);
            byte [] buffer = new byte[1024];
            int read = inputStream.read(buffer, 0, buffer.length);
            while(read > 0){
                for (int i = 0; i < read; i++) {
                    bytes.add(buffer[i]);
                }
                
                if(inputStream.available() > 0)
                    read = inputStream.read(buffer, 0, buffer.length);
                else
                    read = 0;
            }
            
            byte [] data = new byte[bytes.size()];
            for (int i = 0; i < bytes.size(); i++) {
                data[i] = bytes.get(i).byteValue();
            }
            bytes.clear();
            return data;
        } catch (IOException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                inputStream.close();
            } catch (IOException ex) {
                Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
           
    }
    
    @Override
    public int getAppId() {
        return com.skyuml.utils.Keys.WSAppMapping.SVG_EXPORTER_ID;
    }

    @Override
    public void setAppId(int id) {
        
    }

    @Override
    public void onTextMessage(String msg, WSUser sender) {
        String svg  = msg;
        
        Runtime run = Runtime.getRuntime();
        PrintWriter writter = null;
        try {
            writter = new PrintWriter("/Exports/" + sender.getUserId()+".svg");
            return;
        } catch (FileNotFoundException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        String canvas_width = "";
        String canvas_height = "";
        String header;
        
        int index = svg.indexOf("||");
        
        String wh = svg.substring(0, index);
        svg = svg.substring(index+2,svg.length());
        
        String [] splits = wh.split(",");
        
        canvas_width = splits[0];
        canvas_height = splits[1];
        
        header = "<svg style=\"overflow: hidden; position: relative;\" height=\""+canvas_height+"\" version=\"1.1\" width=\""+canvas_width+"\" xmlns=\"http://www.w3.org/2000/svg\">";
        
        writter.println(header);
        writter.println(svg);
        writter.println("</svg>");
        
        try {
            Process pr = run.exec("java -jar \"batik-1.7\batik-rasterizer.jar\" -m image/png -scripts text/ecmascript -w " + canvas_width + "-h " + canvas_height + " -onload /Exports/" + sender.getUserId()+".svg");
            pr.waitFor();
            
            byte [] image = readFile("/Exports/" + sender.getUserId()+".png");
            
            ByteBuffer buffer = ByteBuffer.allocate(image.length);
            buffer.put(image);

            sender.sendBinaryMessage(buffer);
        } catch (IOException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InterruptedException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
        } 

    }

    @Override
    public void onBinaryMessage(ByteBuffer buf, WSUser sender) {
        
    }

    @Override
    public void onClose(int state, WSUser sender) {
        
    }
    
}
