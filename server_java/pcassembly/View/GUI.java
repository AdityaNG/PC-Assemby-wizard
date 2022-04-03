package pcassembly.View;

import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.*;

public class GUI {
    private ArrayList<Items> items;
    private JFrame loginFrame, registerFrame, mainFrame, cartFrame;

    // -------------------------------------------------------------------
    // Login Frame
    private JTextField loginFrame_username, loginFrame_password;
    private JButton loginFrame_login, loginFrame_register;
    private JLabel loginFrame_err;
    // Login Frame End
    // -------------------------------------------------------------------
    // Register Frame
    private JTextField registerFrame_username, registerFrame_password, registerFrame_passwordConfirm;
    private JButton registerFrame_login, registerFrame_register;
    private JLabel registerFrame_err;
    // Register Frame End
    // -------------------------------------------------------------------

    public GUI(ArrayList<Items> items) {
        final GUI GUIObject = this;
        this.items = items;
        mainFrame = new JFrame("PC Assembly Wiz");
        loginFrame = new JFrame("PC Assembly Wiz - Login");
        registerFrame = new JFrame("PC Assembly Wiz - Register");
        cartFrame = new JFrame("PC Assembly Wiz");
        
        mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainFrame.setExtendedState(JFrame.MAXIMIZED_BOTH);
        
        // -------------------------------------------------------------------
        // Login Frame
        //loginFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        loginFrame_username = new JTextField();
        loginFrame_password = new JTextField();
        loginFrame_login = new JButton("Login");
        loginFrame_register = new JButton("Register");
        loginFrame_err = new JLabel();

        loginFrame_login.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Login");
                GUIObject.loginFrame.setVisible(false);
                GUIObject.mainFrame.setVisible(true);
            }
        });

        loginFrame_register.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Register");
                GUIObject.loginFrame.setVisible(false);
                GUIObject.registerFrame.setVisible(true);
            }
        });

        loginFrame.setLayout(new GridLayout(2, 1));
        
        JPanel usernamePasswordPanel = new JPanel();
        usernamePasswordPanel.setLayout(new GridLayout(2, 2));

        JPanel buttonsPanel = new JPanel();
        buttonsPanel.setLayout(new GridLayout(3, 1));
        
        loginFrame_err.setText("Err: message");

        usernamePasswordPanel.add(new JLabel("Username"));
        usernamePasswordPanel.add(loginFrame_username);
        usernamePasswordPanel.add(new JLabel("Password"));
        usernamePasswordPanel.add(loginFrame_password);

        buttonsPanel.add(loginFrame_login);
        buttonsPanel.add(loginFrame_register);
        buttonsPanel.add(loginFrame_err);

        loginFrame.add(usernamePasswordPanel);
        loginFrame.add(buttonsPanel);
        
        loginFrame.setSize(300, 300);

        // Login Frame End
        // -------------------------------------------------------------------
        // Register Frame
        registerFrame_username = new JTextField();
        registerFrame_password = new JTextField();
        registerFrame_passwordConfirm = new JTextField();
        registerFrame_login = new JButton("Login");
        registerFrame_register = new JButton("Register");
        registerFrame_err = new JLabel();

        registerFrame_login.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Login");
                GUIObject.registerFrame.setVisible(false);
                GUIObject.loginFrame.setVisible(true);
            }
        });

        registerFrame_register.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Register");
                GUIObject.registerFrame.setVisible(false);
                GUIObject.mainFrame.setVisible(true);
            }
        });

        registerFrame.setLayout(new GridLayout(2, 1));
        
        JPanel usernamePasswordConfirmPanel = new JPanel();
        usernamePasswordConfirmPanel.setLayout(new GridLayout(3, 2));

        JPanel buttonsPanelRegister = new JPanel();
        buttonsPanelRegister.setLayout(new GridLayout(3, 1));
        
        registerFrame_err.setText("Err: message");

        usernamePasswordConfirmPanel.add(new JLabel("Username"));
        usernamePasswordConfirmPanel.add(registerFrame_username);
        usernamePasswordConfirmPanel.add(new JLabel("Password"));
        usernamePasswordConfirmPanel.add(registerFrame_password);
        usernamePasswordConfirmPanel.add(new JLabel("Confirm Password"));
        usernamePasswordConfirmPanel.add(registerFrame_passwordConfirm);

        buttonsPanelRegister.add(registerFrame_register);
        buttonsPanelRegister.add(registerFrame_login);
        buttonsPanelRegister.add(registerFrame_err);

        registerFrame.add(usernamePasswordConfirmPanel);
        registerFrame.add(buttonsPanelRegister);
        
        registerFrame.setSize(300, 300);
        // Register Frame end
        // -------------------------------------------------------------------
    }

    public void startGUI() {
        loginFrame.setVisible(true);
    }

    public void startGUIOLD(){
        JFrame frame = new JFrame("PC Assembly Wiz");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setExtendedState(JFrame.MAXIMIZED_BOTH); 
        

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
        frame.add(scrollPane, BorderLayout.CENTER);
    
        frame.setVisible(true);    
    
    }
}
