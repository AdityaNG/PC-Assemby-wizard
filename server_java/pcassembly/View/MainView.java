package pcassembly.View;

import pcassembly.Controller.*;
import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import java.awt.event.*;

public class MainView extends JFrame {
    
    private ArrayList<Items> items;
    private UIEventListener eventListener;

    public MainView() {
        super("PC Assembly Wiz - MainView");

        SQLHelper s = SQLHelper.getSqlHelper();
        this.items = s.getAllItems();

        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setExtendedState(JFrame.MAXIMIZED_BOTH); 
        

        JPanel ItemsPanel = new JPanel();
        GridLayout gl = new GridLayout(this.items.size(), 5);
        ItemsPanel.setLayout(gl);
        for (int index=0; index<this.items.size(); index++) {
            
            try {
                Items i = this.items.get(index);
                URL url = i.imageURL;
                System.out.println(url.toString());

                Image image = ImageIO.read(url);
                image = image.getScaledInstance(100, 100, java.awt.Image.SCALE_SMOOTH); 
                ImageIcon icon = new ImageIcon(image);
                final JLabel iconLabel = new JLabel(icon);
                final JButton add = new JButton("Add");
                final JButton remove = new JButton("Remove");
                final JLabel countLabel = new JLabel("0");

                add.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        System.out.println(e);
                        int count = Integer.valueOf(countLabel.getText());
                        countLabel.setText(String.valueOf(count+1));
                    }
                });

                remove.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        System.out.println(e);
                        int count = Integer.valueOf(countLabel.getText());
                        if (count>0)
                            countLabel.setText(String.valueOf(count-1));
                    }
                });
                
                ItemsPanel.add(new JLabel(i.itemName));
                ItemsPanel.add(add);
                ItemsPanel.add(remove);
                ItemsPanel.add(countLabel);
                ItemsPanel.add(iconLabel);
            } catch (Exception e) {
                e.printStackTrace();
            }
            
    
        }
    
        JScrollPane scrollPane = new JScrollPane(ItemsPanel);
        scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        this.add(scrollPane, BorderLayout.CENTER);
    }

    void setEventListener(UIEventListener el) {
        this.eventListener = el;
    }
}