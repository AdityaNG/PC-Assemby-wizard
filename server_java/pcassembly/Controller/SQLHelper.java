package pcassembly.Controller;

import pcassembly.Model.*;
import java.util.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class SQLHelper {

   Connection c = null;
   Statement stmt = null;

   private SQLHelper() {
      try {
         Class.forName("org.postgresql.Driver");
         c = DriverManager .getConnection("jdbc:postgresql://localhost:5432/pc_assembly",
            "postgres", "12345678");
         c.setAutoCommit(false);
         System.out.println("Opened database successfully");
      } catch (Exception e) {
         e.printStackTrace();
      }
   }

   // Singleton 
   private static SQLHelper SQLHelperInstance = null;
   public static SQLHelper getSqlHelper() {
      if (SQLHelper.SQLHelperInstance==null)
         SQLHelper.SQLHelperInstance = new SQLHelper();
      
      return SQLHelper.SQLHelperInstance;
   }

   protected void finalize() { 
      try {
         stmt.close();
         c.close();
      } catch (SQLException e) {
         e.printStackTrace();
      }
   }

   public boolean userLoginCheck(String name, String password) {
      boolean res = false;
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand( "SELECT * FROM USERS WHERE name=" + name + " and password=" + password + ";" );
         }
         while ( rs.next() ) {
            res = true;
            Users i = new Users();
            i.userUUID = UUID.nameUUIDFromBytes(rs.getString("user_uuid").getBytes());
            i.name = rs.getString("name");
            i.email = rs.getString("email");
            i.password = rs.getString("password");

            System.out.println("User Login : " + i.toString());
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }

      return res;
   }

   public boolean registerUser(String name, String password) {
      // TODO : Implement
      boolean res = false;
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand("SELECT * FROM USERS WHERE name=" + name + " and password=" + password + ";" );
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }

      return res;
   }

   public ArrayList<Users> getAllUsers() {
      ArrayList<Users> users = new ArrayList<Users>();
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand( "SELECT * FROM USERS;" );
         }
         while ( rs.next() ) {
            Users i = new Users();
            i.userUUID = UUID.nameUUIDFromBytes(rs.getString("user_uuid").getBytes());
            i.name = rs.getString("name");
            i.email = rs.getString("email");
            i.password = rs.getString("password");

            users.add(i);
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }
      return users;
   }

   public ArrayList<Items> getAllItems() {
      ArrayList<Items> items = new ArrayList<Items>();
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand( "SELECT * FROM ITEMS;" );
         }
         while ( rs.next() ) {
            Items i = new Items();
            i.itemUUID = UUID.nameUUIDFromBytes(rs.getString("item_uuid").getBytes());
            i.itemName = rs.getString("item_name");
            i.itemDescription = rs.getString("item_description");
            i.imageURL = new URL(rs.getString("imageURL"));
            i.productURL = new URL(rs.getString("productURL"));
               
            i.typeUUID = UUID.nameUUIDFromBytes(rs.getString("type_uuid").getBytes());
            i.typeName = rs.getString("type_name");

            items.add(i);
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }
      System.out.println("Got" + String.valueOf(items.size()) + " items");
      return items;
   }


   public ResultSet runCommand(String q) throws SQLException, MalformedURLException {
      stmt = c.createStatement();
      ResultSet rs = stmt.executeQuery( q );
      //stmt.close();
      return rs;
   }

}
