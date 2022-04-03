package pcassembly;

import pcassembly.Model.*;
import pcassembly.View.*;
import pcassembly.Controller.SQLHelper;
import java.util.ArrayList;


public class Main {
   public static void main( String args[] ) {
      
      try {
         SQLHelper s = new SQLHelper();
         ArrayList<Items> items = s.getAllItems();

         GUI g = new GUI(items);
         g.startGUI();
         
         for (Items i : items) {
            System.out.println(i.itemName);
         }

         ArrayList<Users> users = s.getAllUsers();
         
         for (Users i : users) {
            System.out.println(i.email);
         }

      } catch ( Exception e ) {
         e.printStackTrace();
      }
      System.out.println("Operation done successfully");
   }
}
