package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.integration.twitch.ModeratorsData;
import com.weissdennis.leeachaanbot.integration.twitch.TwitchUser;
import com.weissdennis.leeachaanbot.integration.twitch.UserData;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.persistence.Securities;
import com.weissdennis.leeachaanbot.persistence.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PermissionsService {

    private final ConfigRepository configRepository;
    private final SecurityRepository securityRepository;

    @Autowired
    public PermissionsService(ConfigRepository configRepository, SecurityRepository securityRepository) {
        this.configRepository = configRepository;
        this.securityRepository = securityRepository;
    }

    public boolean hasAdministrationRights(String accessToken) {
        UserData userData = getUserDataFromToken(accessToken);

        if (userData != null && userData.getData() != null && userData.getData().size() > 0) {
            TwitchUser twitchUser = userData.getData().get(0);

            List<Configs> configs = configRepository.findAll();
            if (configs.size() > 0) {
                if (configs.get(0).getBroadcasterChannelName().toLowerCase().equals(twitchUser.getLogin().toLowerCase())) {
                    return true;
                }

                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders headers = new HttpHeaders();

                List<Securities> securities = securityRepository.findAll();
                if (securities.size() > 0) {
                    headers.set("Authorization", "Bearer " + securities.get(0).getAccessToken());

                    ResponseEntity<UserData> response = restTemplate.exchange(
                            "https://api.twitch.tv/helix/users?login=" + configs.get(0).getBroadcasterChannelName(),
                            HttpMethod.GET,
                            new HttpEntity<>(headers),
                            UserData.class
                    );

                    UserData broadcasterUserData = response.getBody();

                    if (broadcasterUserData != null && broadcasterUserData.getData() != null &&
                            broadcasterUserData.getData().size() > 0) {
                        ResponseEntity<ModeratorsData> moderatorsResponse = restTemplate.exchange(
                                "https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=" +
                                        broadcasterUserData.getData().get(0).getId(),
                                HttpMethod.GET,
                                new HttpEntity<>(headers),
                                ModeratorsData.class
                        );

                        ModeratorsData moderators = moderatorsResponse.getBody();
                        if (moderators != null) {
                            for (int i = 0; i < moderators.getData().size(); i++) {
                                if (moderators.getData().get(i).getUser_id().equals(twitchUser.getId())) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    private UserData getUserDataFromToken(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + accessToken);

        ResponseEntity<UserData> response = restTemplate.exchange(
                "https://api.twitch.tv/helix/users",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                UserData.class
        );

        return response.getBody();
    }
}
