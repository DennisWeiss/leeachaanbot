package com.weissdennis.leeachaanbot.integration.twitch;

import java.util.List;

public class BitsLeaderboardData {
    private List<BitsLeaderboardEntry> data;

    public List<BitsLeaderboardEntry> getData() {
        return data;
    }

    public void setData(List<BitsLeaderboardEntry> data) {
        this.data = data;
    }
}
