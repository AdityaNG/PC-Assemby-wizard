package pcassembly.View;

import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import java.awt.event.*;

public class GUI {
    private JFrame cartFrame;
    private MainView mainFrame;
    private Login loginFrame;
    private Register registerFrame;

    public GUI() {
        final GUI GUIObject = this;
        mainFrame = new MainView();
        loginFrame = new Login();
        registerFrame = new Register();
        cartFrame = new JFrame("PC Assembly Wiz");
        
        mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainFrame.setExtendedState(JFrame.MAXIMIZED_BOTH);

        
        loginFrame.setEventListener(new UIEventListener() {
            @Override
            public void actionPerformed(UIEvent ev) {
                switch (ev.getID()) {
                    case UIEvent.LOGIN:
                        System.out.println("LOGIN");
                        loginFrame.setVisible(false);
                        mainFrame.setVisible(true);
                        break;
                    case UIEvent.GOTO_REGISTER:
                    System.out.println("GOTO_REGISTER");
                        loginFrame.setVisible(false);
                        registerFrame.setVisible(true);
                        break;
                }

                
            } 
        });

        registerFrame.setEventListener(new UIEventListener() {
            @Override
            public void actionPerformed(UIEvent ev) {
                switch (ev.getID()) {
                    case UIEvent.REGISTER:
                        System.out.println("REGISTER");
                        registerFrame.setVisible(false);
                        mainFrame.setVisible(true);
                        break;
                    case UIEvent.GOTO_LOGIN:
                    System.out.println("GOTO_LOGIN");
                        registerFrame.setVisible(false);
                        loginFrame.setVisible(true);
                        break;
                }
            } 
        });
    }

    public void startGUI() {
        loginFrame.setVisible(true);
    }
}
