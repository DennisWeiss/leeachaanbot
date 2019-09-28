package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.model.TwitchTokenResponse;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.persistence.Securities;
import com.weissdennis.leeachaanbot.persistence.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;


@Service
public class RefreshTwitchApiTokenService {

    private final SecurityRepository securityRepository;
    private final ConfigRepository configRepository;

    @Autowired
    public RefreshTwitchApiTokenService(SecurityRepository securityRepository, ConfigRepository configRepository) {
        this.securityRepository = securityRepository;
        this.configRepository = configRepository;
    }

    public void refreshTwitchApiToken() {

        Securities security = securityRepository.findAll().get(0);
        Configs config = configRepository.findAll().get(0);


        String uriString = UriComponentsBuilder
                .fromUriString("https://id.twitch.tv/oauth2/token")
                .queryParam("grant_type", "refresh_token")
                .queryParam("refresh_token", security.getRefreshToken())
                .queryParam("client_id", config.getClientId())
                .queryParam("client_secret", config.getClientSecret())
                .build()
                .toUriString();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TwitchTokenResponse> response = restTemplate.exchange(
                uriString,
                HttpMethod.POST,
                new HttpEntity<>(new HashMap<>()),
                TwitchTokenResponse.class
        );

        if (response.getBody() != null) {
            TwitchTokenResponse twitchTokenResponse = response.getBody();
            security.setAccessToken(twitchTokenResponse.getAccess_token());
            security.setRefreshToken(twitchTokenResponse.getRefresh_token());

            securityRepository.save(security);
        }
    }
}
