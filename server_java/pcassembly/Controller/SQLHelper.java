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

      this.loggedInUser = new Users();
      this.loggedInUser.userUUID = "u001";
      this.loggedInUser.email = "adityang5@gmail.com";
      this.loggedInUser.name = "Aditya NG";
      this.loggedInUser.password = "12345678";
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

   private Users loggedInUser;

   public Users getCurrectUser() {
      return loggedInUser;
   }

   public boolean userLoginCheck(String name, String password) {
      boolean res = false;
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand("SELECT * FROM USERS WHERE name='" + name + "' and password='" + password + "';" );
         }
         while ( rs.next() ) {
            res = true;
            Users i = new Users();
            //i.userUUID = UUID.nameUUIDFromBytes(rs.getString("user_uuid").getBytes());
            i.userUUID = rs.getString("user_uuid");
            i.name = rs.getString("name");
            i.email = rs.getString("email");
            i.password = rs.getString("password");

            System.out.println("User Login : " + i.toString());
            this.loggedInUser = i;
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
            rs = this.runCommand("SELECT * FROM USERS WHERE name='" + name + "' and password='" + password + "';" );
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
            //i.userUUID = UUID.nameUUIDFromBytes(rs.getString("user_uuid").getBytes());
            i.userUUID = rs.getString("user_uuid");
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
            //i.itemUUID = UUID.nameUUIDFromBytes(rs.getString("item_uuid").getBytes());
            i.itemUUID = rs.getString("item_uuid");
            i.itemName = rs.getString("item_name");
            i.itemDescription = rs.getString("item_description");
            i.imageURL = new URL(rs.getString("imageURL"));
            i.productURL = new URL(rs.getString("productURL"));
               
            //i.typeUUID = UUID.nameUUIDFromBytes(rs.getString("type_uuid").getBytes());
            i.typeUUID = rs.getString("type_uuid");
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

   public ArrayList<Items> getCart() {
      ArrayList<Items> cart = new ArrayList<Items>();
      // SELECT * FROM cart JOIN items ON cart.item_uuid=cart.item_uuid WHERE user_uuid='u001' ;
      try {
         ResultSet rs;
         synchronized (this) { 
            //rs = this.runCommand( "SELECT * FROM ITEMS WHERE user_uuid='" + this.loggedInUser.userUUID + "' ;" );
            rs = this.runCommand( "SELECT * FROM cart JOIN items ON cart.item_uuid=items.item_uuid WHERE user_uuid='" + this.loggedInUser.userUUID + "' ;" );
         }
         while ( rs.next() ) {
            Items i = new Items();
            //i.itemUUID = UUID.nameUUIDFromBytes(rs.getString("item_uuid").getBytes());
            i.itemUUID = rs.getString("item_uuid");
            i.itemName = rs.getString("item_name");
            i.itemDescription = rs.getString("item_description");
            i.imageURL = new URL(rs.getString("imageURL"));
            i.productURL = new URL(rs.getString("productURL"));
               
            //i.typeUUID = UUID.nameUUIDFromBytes(rs.getString("type_uuid").getBytes());
            i.typeUUID = rs.getString("type_uuid");
            i.typeName = rs.getString("type_name");

            cart.add(i);
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }

      return cart;
   }

   public int getItemCountInCart(String itemUUID) {
      int res = 0;
      // SELECT sum(quantity) FROM cart WHERE item_uuid='2001';
      try {
         ResultSet rs;
         synchronized (this) { 
            //rs = this.runCommand( "SELECT * FROM ITEMS WHERE user_uuid='" + this.loggedInUser.userUUID + "' ;" );
            rs = this.runCommand( "SELECT sum(quantity) FROM cart WHERE item_uuid='" + itemUUID + "' ;" );
         }
         rs.next();
         res += rs.getInt("sum");
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }

      return res;
   }

   public boolean cartHasItem(String itemUUID) {
      boolean res = false;
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand( "SELECT * FROM cart JOIN items ON cart.item_uuid=items.item_uuid WHERE user_uuid='" + this.loggedInUser.userUUID + "' and cart.item_uuid='" + itemUUID + "' ;" );
         }
         while ( rs.next() ) {
            Items i = new Items();
            //i.itemUUID = UUID.nameUUIDFromBytes(rs.getString("item_uuid").getBytes());
            i.itemUUID = rs.getString("item_uuid");
            i.itemName = rs.getString("item_name");
            i.itemDescription = rs.getString("item_description");
            i.imageURL = new URL(rs.getString("imageURL"));
            i.productURL = new URL(rs.getString("productURL"));
               
            //i.typeUUID = UUID.nameUUIDFromBytes(rs.getString("type_uuid").getBytes());
            i.typeUUID = rs.getString("type_uuid");
            i.typeName = rs.getString("type_name");

            res = true;
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }

      return res;
   }

   public boolean dbHasItem(String itemUUID) {
      boolean res = false;
      try {
         ResultSet rs;
         synchronized (this) { 
            rs = this.runCommand( "SELECT * FROM items WHERE item_uuid='" + itemUUID + "' ;" );
         }
         while ( rs.next() ) {
            Items i = new Items();
            //i.itemUUID = UUID.nameUUIDFromBytes(rs.getString("item_uuid").getBytes());
            i.itemUUID = rs.getString("item_uuid");
            i.itemName = rs.getString("item_name");
            i.itemDescription = rs.getString("item_description");
            i.imageURL = new URL(rs.getString("imageURL"));
            i.productURL = new URL(rs.getString("productURL"));
               
            //i.typeUUID = UUID.nameUUIDFromBytes(rs.getString("type_uuid").getBytes());
            i.typeUUID = rs.getString("type_uuid");
            i.typeName = rs.getString("type_name");

            res = true;
         }
         rs.close();  
      } catch (Exception e) {
         e.printStackTrace();
      }

      return res;
   }


   public void addToCart(String itemUUID, int quantity) {
      // TODO: Update or Add (user_uuid=this.loggedInUser.userUUID,item_uuid=itemUUID,Quantity=quantity) from table Cart
      // this.loggedInUser.userUUID;

      String command;
      if (this.cartHasItem(itemUUID)) {
         // Update
         command = "UPDATE cart SET quantity='" + quantity + "' WHERE user_uuid='" + this.loggedInUser.userUUID + "' and item_uuid='" + itemUUID + "' ;" ;
         System.out.println("Update");
      } else {
         // Insert
         if (this.dbHasItem(itemUUID)) {
            command = "INSERT INTO cart(user_uuid, item_uuid, quantity) Values('" + this.loggedInUser.userUUID + "','" + itemUUID + "'," + String.valueOf(quantity) + ");";
            System.out.println("Insert");
         } else {
            System.out.println("Item not exist");
            return;
         }
      }

      try {
         synchronized (this) { 
            int rowcount = this.runUpdate(command);
            System.out.println("Rows affected = " + String.valueOf(rowcount));
         }
      } catch (Exception e) {
         e.printStackTrace();
      }
      
   }

   public void removeFromCart(String itemUUID) {
      // TODO: Remove (user_uuid=this.loggedInUser.userUUID,item_uuid=itemUUID) from table Cart
      // this.loggedInUser.userUUID;
   }

   public int calculateCartTotal() {
      // TODO: Calculate (user_uuid=this.loggedInUser.userUUID) from table Cart weighted cart total
      // this.loggedInUser.userUUID;
      // SELECT sum(cart.quantity * price) FROM cart JOIN items ON items.item_uuid=cart.item_uuid WHERE user_uuid='u001';
      return 0;
   }


   public ResultSet runCommand(String q) throws SQLException, MalformedURLException {
      stmt = c.createStatement();
      ResultSet rs = stmt.executeQuery( q );
      //stmt.close();
      return rs;
   }

   public int runUpdate(String q) throws SQLException, MalformedURLException {
      stmt = c.createStatement();
      int rowcount = stmt.executeUpdate( q );
      stmt.close();
      c.commit();
      return rowcount;
   }

}
