package pcassembly;

import pcassembly.Model.*;
import pcassembly.View.*;
import pcassembly.Controller.SQLHelper;
import java.util.ArrayList;


public class Main {
   public static void main( String args[] ) {
      
      SQLHelper s = SQLHelper.getSqlHelper();
/*      System.out.println(s.registerUser("delete", "dfascs"));
      System.out.println(s.registerUser("adityang", "dfascs"));
      System.out.println(s.registerUser("lol", "dfascs")); */


      GUI g = new GUI();
      g.startGUI();
         
      ArrayList<Users> users = s.getAllUsers();
         
      for (Users i : users) {
         System.out.println(i.email);
      }
      System.out.println("Operation done successfully");
   }
}
