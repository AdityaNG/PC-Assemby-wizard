package pcassembly;

import pcassembly.Model.*;
import pcassembly.Controller.SQLHelper;
import java.util.ArrayList;


public class Main {
   public static void main( String args[] ) {
      try {
         SQLHelper s = new SQLHelper();
         ArrayList<Items> items = s.getAllItems();
         
         for (Items i : items) {
            System.out.println(i.itemName);
         }

      } catch ( Exception e ) {
         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
         System.exit(0);
      }
      System.out.println("Operation done successfully");
   }
}
