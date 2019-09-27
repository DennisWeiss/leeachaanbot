package com.weissdennis.leeachaanbot.model;

import com.weissdennis.leeachaanbot.persistence.CurrencySettings;

import java.util.List;

public class PublicConfig {
    private String broadcasterChannelName;
    private String botUsername;
    private String donationCurrency;
    private CurrencySettings currency;
    private List<String> excludedUsers;

    public String getBroadcasterChannelName() {
        return broadcasterChannelName;
    }

    public void setBroadcasterChannelName(String broadcasterChannelName) {
        this.broadcasterChannelName = broadcasterChannelName;
    }

    public String getBotUsername() {
        return botUsername;
    }

    public void setBotUsername(String botUsername) {
        this.botUsername = botUsername;
    }

    public String getDonationCurrency() {
        return donationCurrency;
    }

    public void setDonationCurrency(String donationCurrency) {
        this.donationCurrency = donationCurrency;
    }

    public CurrencySettings getCurrency() {
        return currency;
    }

    public void setCurrency(CurrencySettings currency) {
        this.currency = currency;
    }

    public List<String> getExcludedUsers() {
        return excludedUsers;
    }

    public void setExcludedUsers(List<String> excludedUsers) {
        this.excludedUsers = excludedUsers;
    }
}
