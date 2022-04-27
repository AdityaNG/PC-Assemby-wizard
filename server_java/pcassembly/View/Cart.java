package pcassembly.View;

import pcassembly.Controller.*;
import pcassembly.Model.*;
import javax.swing.*;
import javax.swing.border.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import java.awt.event.*;

public class Cart extends JFrame {
    
    private ArrayList<Items> items;
    private UIEventListener eventListener;
    private ArrayList<ProductView> productViews;

    JPanel ItemsPanel;
    JScrollPane scrollPane;
    GridLayout gl;

    public Cart() {
        super("PC Assembly Wiz - Cart");

        
        this.refresh();

        JMenuBar menuBar = new JMenuBar();;
        JMenu jMenu;

        jMenu = new JMenu("PC Assemby");
        jMenu.setMnemonic(KeyEvent.VK_A);
        jMenu.getAccessibleContext().setAccessibleDescription("The only menu in this program that has menu items");

        menuBar.add(jMenu);

        JMenuItem cartMenu;
        cartMenu = new JMenuItem("All Products", KeyEvent.VK_T);
        cartMenu.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO Auto-generated method stub
                eventListener.actionPerformed(new UIEvent(UIEvent.GOTO_PRODUCTS, ""));
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

    public void refresh() {
        //this.removeAll();

        SQLHelper s = SQLHelper.getSqlHelper();

        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setExtendedState(JFrame.MAXIMIZED_BOTH); 
        this.items = s.getCart();

        ItemsPanel = new JPanel();
        Border padding = BorderFactory.createEmptyBorder(10, 10, 10, 10);
        ItemsPanel.setBorder(padding);
        
        gl = new GridLayout(this.items.size(), 1);

        productViews = new ArrayList<ProductView>();
        
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
    
        scrollPane = new JScrollPane(ItemsPanel);
        scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        this.add(scrollPane, BorderLayout.CENTER);

    }

    void setEventListener(UIEventListener el) {
        this.eventListener = el;
    }
}