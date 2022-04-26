package pcassembly.View;

public class UIEvent {
    public static final int LOGIN = 1;
    public static final int REGISTER = 2;

    public static final int GOTO_LOGIN = 3;
    public static final int GOTO_REGISTER = 4;

    public static final int LOGOUT = 5;
    public static final int GOTO_CART = 6;
    public static final int GOTO_PRODUCTS = 7;

    private int id;
    private String actionCommand = null;

    
    public UIEvent(int id, String command) {
        this.id = id;
        this.actionCommand = command;
    }

    public int getID() {
        return id;
    }
    
    public String getString() {
        return actionCommand;
    }
}