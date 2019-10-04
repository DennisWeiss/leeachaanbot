package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Customcommands {
    @Id
    private String _id;

    private List<String> commandHandles;

    private String response;

    private boolean showTwitchHandle;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

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
