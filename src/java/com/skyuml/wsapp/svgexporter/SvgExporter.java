/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.skyuml.wsapp.svgexporter;

import com.skyuml.utils.Keys;
import com.skyuml.wsapp.WSApp;
import com.skyuml.wsapp.WSUser;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

/**
 *
 * @author Yazany6b
 */
public class SvgExporter implements WSApp{

    private int app_id = 0;
    
    public SvgExporter(int appId){
        this.app_id = appId;
    }

    
    @Override
    public int getAppId() {
        return Keys.WSAppMapping.SVG_EXPORTER_ID;
    }

    @Override
    public void setAppId(int id) {
        app_id = id;
    }

    @Override
    public void onTextMessage(String msg, WSUser sender) {
        JSONObject jo;
        try {
            jo = (JSONObject) new JSONTokener(msg).nextValue();
            int aid = jo.getInt(Keys.JSONMapping.APP_ID);
            if(aid != Keys.WSAppMapping.SVG_EXPORTER_ID)
                return;
        } catch (JSONException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }
        String svg = "";
        String canvas_width = "";
        String canvas_height = "";
        String header;
        try {
            svg = jo.getString("content");
            canvas_width = jo.getInt("width")+"";
            canvas_height = jo.getInt("height")+"";
            
        } catch (JSONException ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        svg = svg.replace("&colon",":");
        svg = svg.replace("&qout","\"");
        svg = svg.replace("&less","<");
        svg = svg.replace("&larg",">");
        svg = svg.replace("&hash","#");
        svg = svg.replace("&slash","/");
        svg = svg.replace("&sime",";");
        svg = svg.replace("&comma",",");
        svg = svg.replace("&space"," ");
        svg = svg.replace("&obrace","{");
        svg = svg.replace("&cbrace","}");
        //svg = svg.replace("","\r\n");
        Runtime run = Runtime.getRuntime();
        PrintWriter writter = null;
        String file_name = "";
        
        try {

            File file_dic = new File("/SkyUML/Data/Exports/");
            file_dic.mkdirs();
            File export = File.createTempFile("export_", ".svg", file_dic);
            file_name = export.getName();
            
            writter = new PrintWriter(export);  
        } catch (Exception ex) {
            Logger.getLogger(SvgExporter.class.getName()).log(Level.SEVERE, null, ex);
        }
      
        header = "<svg style=\"overflow: hidden; position: relative;\" height=\""+canvas_height+"\" version=\"1.1\" width=\""+canvas_width+"\" xmlns=\"http://www.w3.org/2000/svg\">";
        
        writter.println(header);
        writter.println(svg);
        writter.println("</svg>");
        writter.close();
        
        try {
            Process pr = run.exec("java -jar /SkyUML/Libs/batik-1.7/batik-rasterizer.jar -m image/png -scripts text/ecmascript -w " + canvas_width + " -h " + canvas_height + " -onload /SkyUML/Data/Exports/" + file_name);
            pr.waitFor();
            
            String js = String.format("{\"app-id\":4,\"result\":\"%s\"}",file_name.replace(".svg", ".png"));
            
            sender.sendTextMessage(js);
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
