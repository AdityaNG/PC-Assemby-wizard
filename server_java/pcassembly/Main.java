package pcassembly;

import pcassembly.Model.*;
import pcassembly.View.*;
import pcassembly.Controller.SQLHelper;
import java.util.ArrayList;


public class Main {
   public static void main( String args[] ) {
      
      SQLHelper s = SQLHelper.getSqlHelper();
      
      /*    
      System.out.println(s.registerUser("delete", "dfascs"));
      System.out.println(s.registerUser("adityang", "dfascs"));
      System.out.println(s.registerUser("lol", "dfascs"));
      // */


      /*
      System.out.println(s.registerUser('adityang5@gmail.com', 'dfascs'););
      System.out.println(s.registerUser('adityang5@gmail.com', 'dfascs'););
      // */

      /* cartHasItem
      System.out.println(s.cartHasItem("1001"));
      System.out.println(s.cartHasItem("1002"));
      // */

      /* addToCart
      s.addToCart("1001", 7);
      s.addToCart("1691", 7);
      s.addToCart("5001", 7);
      // */

      /*
      for (Items i: s.getCart()) {
         System.out.println(i.itemName);  
      }
      //*/

      // /*
      GUI g = new GUI();
      g.startGUI();
         
      ArrayList<Users> users = s.getAllUsers();
         
      for (Users i : users) {
         System.out.println(i.getEmail());
      }
      System.out.println("Operation done successfully");
      //*/
   }
}
