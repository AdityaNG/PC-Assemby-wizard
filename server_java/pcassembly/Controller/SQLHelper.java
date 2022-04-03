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

   public SQLHelper() throws SQLException, ClassNotFoundException {
      Class.forName("org.postgresql.Driver");
      c = DriverManager .getConnection("jdbc:postgresql://localhost:5432/pc_assembly",
         "postgres", "12345678");
      c.setAutoCommit(false);
      System.out.println("Opened database successfully");
   }

   protected void finalize() { 
      try {
         stmt.close();
         c.close();
      } catch (SQLException e) {
         e.printStackTrace();
      }
   }  

   public ArrayList<Users> getAllUsers() throws MalformedURLException, SQLException {
      ResultSet rs = this.runCommand( "SELECT * FROM USERS;" );
      ArrayList<Users> users = new ArrayList<Users>();
      while ( rs.next() ) {
         Users i = new Users();
         i.userUUID = UUID.nameUUIDFromBytes(rs.getString("user_uuid").getBytes());
         i.name = rs.getString("name");
         i.email = rs.getString("email");
         i.password = rs.getString("password");

         users.add(i);
      }
      rs.close();
      return users;
   }

   public ArrayList<Items> getAllItems() throws MalformedURLException, SQLException {
      ResultSet rs = this.runCommand( "SELECT * FROM ITEMS;" );
      ArrayList<Items> items = new ArrayList<Items>();
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
      return items;
   }


   public ResultSet runCommand(String q) throws SQLException, MalformedURLException {
      stmt = c.createStatement();
      ResultSet rs = stmt.executeQuery( q );
      //stmt.close();
      return rs;
   }

}
