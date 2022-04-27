package pcassembly.View;

import pcassembly.Controller.*;
import pcassembly.Model.*;
import javax.swing.*;
import java.util.ArrayList;
import java.net.*;
import javax.imageio.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;

public class ProductView extends JComponent {

    public ProductView(Items i) throws IOException {

        GridLayout gl = new GridLayout(1, 5);
        this.setLayout(gl);

        URL url = i.imageURL;
        System.out.println(url.toString());

        Image image = ImageIO.read(url);
        image = image.getScaledInstance(100, 100, java.awt.Image.SCALE_SMOOTH); 
        ImageIcon icon = new ImageIcon(image);
        final JLabel iconLabel = new JLabel(icon, SwingConstants.CENTER);
        final JButton add = new JButton("Add");
        final JButton remove = new JButton("Remove");
        final JLabel countLabel = new JLabel(
            String.valueOf(SQLHelper.getSqlHelper().getItemCountInCart(i.itemUUID)),
            SwingConstants.CENTER
        ); 

        add.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println(e);
                int count = Integer.valueOf(countLabel.getText());
                countLabel.setText(String.valueOf(count+1));
                SQLHelper.getSqlHelper().addToCart(i.itemUUID, count+1);
            }
        });

        remove.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println(e);
                int count = Integer.valueOf(countLabel.getText());
                if (count>0) {
                    countLabel.setText(String.valueOf(count-1));
                    SQLHelper.getSqlHelper().addToCart(i.itemUUID, count-1);
                }
            }
        });
                
        this.add(new JLabel(i.itemName, SwingConstants.CENTER));
        this.add(add);
        this.add(remove);
        this.add(countLabel);
        this.add(iconLabel);
    }
}
