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
    private ArrayList<ProductView> productViews;

    public MainView() {
        super("PC Assembly Wiz - Products");

        productViews = new ArrayList<ProductView>();
        SQLHelper s = SQLHelper.getSqlHelper();
        this.items = s.getAllItems();

        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setExtendedState(JFrame.MAXIMIZED_BOTH); 
        

        JPanel ItemsPanel = new JPanel();
        GridLayout gl = new GridLayout(this.items.size(), 1);
        ItemsPanel.setLayout(gl);
        for (int index=0; index<this.items.size(); index++) {
            
            try {
                final Items i = this.items.get(index);

                ProductView p = new ProductView(i);
                productViews.add(p);
                ItemsPanel.add(p);
            } catch (Exception e) {
                e.printStackTrace();
            }
            
        }
    
        JScrollPane scrollPane = new JScrollPane(ItemsPanel);
        scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        this.add(scrollPane, BorderLayout.CENTER);

        JMenuBar menuBar = new JMenuBar();;
        JMenu jMenu;

        jMenu = new JMenu("PC Assemby");
        jMenu.setMnemonic(KeyEvent.VK_A);
        jMenu.getAccessibleContext().setAccessibleDescription("The only menu in this program that has menu items");

        menuBar.add(jMenu);

        JMenuItem cartMenu;
        cartMenu = new JMenuItem("Cart", KeyEvent.VK_T);
        cartMenu.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO Auto-generated method stub
                eventListener.actionPerformed(new UIEvent(UIEvent.GOTO_CART, ""));
            }

        });
        jMenu.add(cartMenu);

        JMenuItem logoutMenu;
        logoutMenu = new JMenuItem("Logout", KeyEvent.VK_U);
        logoutMenu.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO Auto-generated method stub
                eventListener.actionPerformed(new UIEvent(UIEvent.LOGOUT, ""));
            }

        });
        
        jMenu.add(logoutMenu);


        this.setJMenuBar(menuBar);
    }

    void setEventListener(UIEventListener el) {
        this.eventListener = el;
    }

    public void refresh() {
        
    }
}