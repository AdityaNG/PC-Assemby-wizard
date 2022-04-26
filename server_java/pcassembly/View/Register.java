package pcassembly.View;

import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import javax.swing.table.DefaultTableModel;
import java.awt.event.*;
import pcassembly.Controller.*;
public class Register extends JFrame {
    private JTextField username, password, passwordConfirm;
    private JButton login, register;
    private JLabel err;

    private UIEventListener eventListener;    

    public Register() {
        super("PC Assembly Wiz - Register");

        username = new JTextField();
        password = new JTextField();
        passwordConfirm = new JTextField();
        login = new JButton("Login");
        register = new JButton("Register");
        err = new JLabel();

        login.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO : Extract and send details
                eventListener.actionPerformed(new UIEvent(UIEvent.GOTO_LOGIN, ""));
            }
        });

        register.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // TODO : Extract and send details
                eventListener.actionPerformed(new UIEvent(UIEvent.REGISTER, ""));
                var u=username.getText();
                var p=password.getText();
                var pc=passwordConfirm.getText();
                if(p.equals(pc))
                    if(SQLHelper.getSqlHelper().registerUser(u, p))
                        err.setText("User registered");
                    else
                        err.setText("Username already exixts");
                else
                    err.setText("passwords do not match");
            }
            
        });

        this.setLayout(new GridLayout(2, 1));
        
        JPanel usernamePasswordConfirmPanel = new JPanel();
        usernamePasswordConfirmPanel.setLayout(new GridLayout(3, 2));

        JPanel buttonsPanelRegister = new JPanel();
        buttonsPanelRegister.setLayout(new GridLayout(3, 1));
        
        err.setText("Err: message");

        usernamePasswordConfirmPanel.add(new JLabel("Username"));
        usernamePasswordConfirmPanel.add(username);
        usernamePasswordConfirmPanel.add(new JLabel("Password"));
        usernamePasswordConfirmPanel.add(password);
        usernamePasswordConfirmPanel.add(new JLabel("Confirm Password"));
        usernamePasswordConfirmPanel.add(passwordConfirm);

        buttonsPanelRegister.add(register);
        buttonsPanelRegister.add(login);
        buttonsPanelRegister.add(err);

        this.add(usernamePasswordConfirmPanel);
        this.add(buttonsPanelRegister);
        
        this.setSize(300, 300);
    }

    void setEventListener(UIEventListener el) {
        this.eventListener = el;
    }
}