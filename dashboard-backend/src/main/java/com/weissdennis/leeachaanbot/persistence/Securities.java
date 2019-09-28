package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.annotation.Id;

public class Securities {
    @Id
    private String _id;

    private String accessToken;
    private String refreshToken;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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
}
