package com.weissdennis.leeachaanbot.integration.twitch;

import java.util.List;

public class TwitchData<T> {

    private int total;
    private List<T> data;
    private Pagination pagination;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

    @Override
    public String toString() {
        return "TwitchData{" +
                "total=" + total +
                ", data=" + data +
                ", pagination=" + pagination +
                '}';
    }
}
