package pcassembly.View;

public class UIEvent {
    public static final int LOGIN = 1;
    public static final int REGISTER = 2;

    public static final int GOTO_LOGIN = 3;
    public static final int GOTO_REGISTER = 4;

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