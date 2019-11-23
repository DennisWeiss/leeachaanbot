package com.weissdennis.leeachaanbot.integration.twitch;

import java.time.Instant;

public class TwitchFollow {

    private String from_id;
    private String from_name;
    private String to_id;
    private String to_name;
    private Instant followed_at;

    public String getFrom_id() {
        return from_id;
    }

    public void setFrom_id(String from_id) {
        this.from_id = from_id;
    }

    public String getFrom_name() {
        return from_name;
    }

    public void setFrom_name(String from_name) {
        this.from_name = from_name;
    }

    public String getTo_id() {
        return to_id;
    }

    public void setTo_id(String to_id) {
        this.to_id = to_id;
    }

    public String getTo_name() {
        return to_name;
    }

    public void setTo_name(String to_name) {
        this.to_name = to_name;
    }

    public Instant getFollowed_at() {
        return followed_at;
    }

    public void setFollowed_at(Instant followed_at) {
        this.followed_at = followed_at;
    }

    @Override
    public String toString() {
        return "TwitchFollow{" +
                "from_id='" + from_id + '\'' +
                ", from_name='" + from_name + '\'' +
                ", to_id='" + to_id + '\'' +
                ", to_name='" + to_name + '\'' +
                ", followed_at=" + followed_at +
                '}';
    }
}
