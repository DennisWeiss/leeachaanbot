package com.weissdennis.leeachaanbot.model;

public class PointsScore {
    private String userId;
    private String username;
    private int points;
    private String currencyNameSingular;
    private String currencyNamePlural;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getCurrencyNameSingular() {
        return currencyNameSingular;
    }

    public void setCurrencyNameSingular(String currencyNameSingular) {
        this.currencyNameSingular = currencyNameSingular;
    }

    public String getCurrencyNamePlural() {
        return currencyNamePlural;
    }

    public void setCurrencyNamePlural(String currencyNamePlural) {
        this.currencyNamePlural = currencyNamePlural;
    }
}
