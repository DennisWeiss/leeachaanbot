package com.weissdennis.leeachaanbot.model;

public class PointsLeaderboardEntry {
    private int position;
    private String profilePicture;
    private String userId;
    private String username;
    private int points;

    public PointsLeaderboardEntry position(int position) {
        this.position = position;
        return this;
    }

    public PointsLeaderboardEntry profilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public PointsLeaderboardEntry userId(String userId) {
        this.userId = userId;
        return this;
    }

    public PointsLeaderboardEntry username(String username) {
        this.username = username;
        return this;
    }

    public PointsLeaderboardEntry points(int points) {
        this.points = points;
        return this;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

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
}
