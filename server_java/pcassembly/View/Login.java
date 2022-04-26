package pcassembly.View;

import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.*;
import java.util.EventListener;
import pcassembly.Controller.*;

public class Login extends JFrame {
    private JTextField username, password;
    private JButton login, register;
    private JLabel err;
    private UIEventListener eventListener;    

    public Login() {
        super("PC Assembly Wiz - Login");

        //this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        username = new JTextField();
        password = new JTextField();
        login = new JButton("Login");
        register = new JButton("Register");
        err = new JLabel();

        login.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String u=username.getText();
                String p=password.getText();
                if(SQLHelper.getSqlHelper().userLoginCheck(u, p)) {
                    err.setText("User logged in");
                    eventListener.actionPerformed(new UIEvent(UIEvent.LOGIN, ""));
                } else {
                    err.setText("Invalid username-password combination");
                }
                
            }
        });

        register.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO : Extract and send details
                eventListener.actionPerformed(new UIEvent(UIEvent.GOTO_REGISTER, ""));
                
            }
        });

        this.setLayout(new GridLayout(2, 1));
        
        JPanel usernamePasswordPanel = new JPanel();
        usernamePasswordPanel.setLayout(new GridLayout(2, 2));

        JPanel buttonsPanel = new JPanel();
        buttonsPanel.setLayout(new GridLayout(3, 1));
        
        err.setText("Err: message");

        usernamePasswordPanel.add(new JLabel("Username"));
        usernamePasswordPanel.add(username);
        usernamePasswordPanel.add(new JLabel("Password"));
        usernamePasswordPanel.add(password);

        buttonsPanel.add(login);
        buttonsPanel.add(register);
        buttonsPanel.add(err);

        this.add(usernamePasswordPanel);
        this.add(buttonsPanel);
        
        this.setSize(300, 300);
    }

    void setEventListener(UIEventListener el) {
        this.eventListener = el;
    }
}