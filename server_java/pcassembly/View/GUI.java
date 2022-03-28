package pcassembly.View;

import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import javax.swing.table.DefaultTableModel;


public class GUI {
    private ArrayList<Items> items;

    public GUI(ArrayList<Items> items) {
        this.items = items;
    }

    public void startGUI(){
        JFrame frame = new JFrame("PC Assembly Wiz");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(1000,800);
        

        JPanel ItemsPanel = new JPanel();
        //ItemsPanel.setLayout(new GridLayout(3, this.items.size()));
        GridLayout gl = new GridLayout(this.items.size(), 3);
        
        ItemsPanel.setLayout(gl);
        
        for (int index=0; index<this.items.size(); index++) {
        //for (int index=0; index<3; index++) {
            
            try {
                Items i = this.items.get(index);
                
            
                URL url;

                //url = new URL(i.imageURL);
                url = i.imageURL;
                
                System.out.println(url.toString());

                Image image = ImageIO.read(url);
                image = image.getScaledInstance(120, 120, java.awt.Image.SCALE_SMOOTH); 
                ImageIcon icon = new ImageIcon(image);
                JLabel iconLabel = new JLabel(icon);
                

                ItemsPanel.add(new JLabel(i.itemName));
                ItemsPanel.add(new JButton("Add"));
                ItemsPanel.add(iconLabel);
                

            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            
    
        }
    
        JScrollPane scrollPane = new JScrollPane(ItemsPanel);
        scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        frame.add(scrollPane, BorderLayout.CENTER);
    
        frame.setVisible(true);    
    
    }
}
