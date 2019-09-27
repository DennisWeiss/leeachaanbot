package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.integration.twitch.TwitchUser;
import com.weissdennis.leeachaanbot.integration.twitch.UserData;
import com.weissdennis.leeachaanbot.model.PointsLeaderboardEntry;
import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Users;
import com.weissdennis.leeachaanbot.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class LeaderboardService {

    private final UserRepository userRepository;
    private final ConfigRepository configRepository;

    @Autowired
    public LeaderboardService(UserRepository userRepository, ConfigRepository configRepository) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
    }

    public List<PointsLeaderboardEntry> getPointsLeaderboard() {
        List<Users> users = userRepository
                .findAll();
        users.sort((a, b) -> b.getPoints() - a.getPoints());

        List<PointsLeaderboardEntry> pointsLeaderboardEntries = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        List<Configs> all = configRepository.findAll();
        headers.set("Client-ID", all.get(0).getClientId());

        for (int i = 0; i < users.size(); i++) {
            Users user = users.get(i);

            Map<String, String> params = new HashMap<>();
            params.put("login", user.getUserId());

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<UserData> response = restTemplate.exchange(
                    "https://api.twitch.tv/helix/users?login=" + user.getName(),
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    UserData.class
            );

            UserData userData = response.getBody();
            TwitchUser twitchUser = userData != null && userData.getData() != null && userData.getData().size() > 0 ?
                    userData.getData().get(0) : null;

            pointsLeaderboardEntries.add(
                    new PointsLeaderboardEntry()
                            .position(i + 1)
                            .userId(user.getUserId())
                            .username(twitchUser != null ? twitchUser.getDisplay_name() : null)
                            .profilePicture(twitchUser != null ? twitchUser.getProfile_image_url() : null)
                            .points(user.getPoints())
            );
        }

        return pointsLeaderboardEntries;
    }
}
