package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Configs {
    private String clientId;
    private String clientSecret;
    private String accessToken;
    private String refreshToken;
    private String redirectUri;
    private String broadcasterChannelName;
    private String botUsername;
    private String botOAuthPassword;
    private String donationCurrency;
    private CurrencySettings currency;
    private List<String> excludedUsers;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
        this.redirectUri = redirectUri;
    }

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

    public String getBotOAuthPassword() {
        return botOAuthPassword;
    }

    public void setBotOAuthPassword(String botOAuthPassword) {
        this.botOAuthPassword = botOAuthPassword;
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
