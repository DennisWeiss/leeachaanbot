package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.annotation.Id;

public class Users {
    @Id
    private String userId;

    private String name;
    private int points;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
