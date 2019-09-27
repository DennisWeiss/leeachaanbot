package com.weissdennis.leeachaanbot.persistence;

public class CurrencySettings {
    private String nameSingular;
    private String namePlural;
    private int iterationCycleInMs;
    private int pointsPerViewIteration;
    private int followerMultiplier;
    private int subscriberMultiplier;

    public String getNameSingular() {
        return nameSingular;
    }

    public void setNameSingular(String nameSingular) {
        this.nameSingular = nameSingular;
    }

    public String getNamePlural() {
        return namePlural;
    }

    public void setNamePlural(String namePlural) {
        this.namePlural = namePlural;
    }

    public int getIterationCycleInMs() {
        return iterationCycleInMs;
    }

    public void setIterationCycleInMs(int iterationCycleInMs) {
        this.iterationCycleInMs = iterationCycleInMs;
    }

    public int getPointsPerViewIteration() {
        return pointsPerViewIteration;
    }

    public void setPointsPerViewIteration(int pointsPerViewIteration) {
        this.pointsPerViewIteration = pointsPerViewIteration;
    }

    public int getFollowerMultiplier() {
        return followerMultiplier;
    }

    public void setFollowerMultiplier(int followerMultiplier) {
        this.followerMultiplier = followerMultiplier;
    }

    public int getSubscriberMultiplier() {
        return subscriberMultiplier;
    }

    public void setSubscriberMultiplier(int subscriberMultiplier) {
        this.subscriberMultiplier = subscriberMultiplier;
    }
}
