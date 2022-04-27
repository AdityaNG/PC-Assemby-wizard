package pcassembly.Model;

import java.util.*;

/**
 * 
 */
public class Users {

    /**
     * Default constructor
     */
    private Users() {
    }

    /**
     * 
     */
    private String userUUID;

    /**
     * 
     */
    private String email;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private String password;

    public String getUserUUID() {
        return this.userUUID;
    }
    public String getEmail() {
        return this.email;
    }
    public String getName() {
        return this.name;
    }
    public String getPassword() {
        return this.password;
    }

    public static class UserBuilder {
        Users u;
        public  UserBuilder() {
            this.u = new Users();
        }

        public  UserBuilder userUUID(String i) {
            this.u.userUUID = i;
            return this;
        }
        public  UserBuilder email(String i) {
            this.u.email = i;
            return this;
        }
        public  UserBuilder name(String i) {
            this.u.name = i;
            return this;
        }
        public  UserBuilder password(String i) {
            this.u.password = i;
            return this;
        }

        public Users generate() {
            return this.u;
        }
    }

}