package com.weissdennis.leeachaanbot.model;

import java.util.List;

public class CustomCommand {
    private List<String> commandHandles;
    private String response;
    private boolean showTwitchHandle;

    public List<String> getCommandHandles() {
        return commandHandles;
    }

    public void setCommandHandles(List<String> commandHandles) {
        this.commandHandles = commandHandles;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public boolean isShowTwitchHandle() {
        return showTwitchHandle;
    }

    public void setShowTwitchHandle(boolean showTwitchHandle) {
        this.showTwitchHandle = showTwitchHandle;
    }
}
