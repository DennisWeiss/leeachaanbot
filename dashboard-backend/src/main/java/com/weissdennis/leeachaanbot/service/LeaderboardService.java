package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.integration.twitch.BitsLeaderboardData;
import com.weissdennis.leeachaanbot.integration.twitch.BitsLeaderboardEntry;
import com.weissdennis.leeachaanbot.model.PointsLeaderboardEntry;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.SecurityRepository;
import com.weissdennis.leeachaanbot.persistence.UserRepository;
import com.weissdennis.leeachaanbot.persistence.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardService {

    private final UserRepository userRepository;
    private final ConfigRepository configRepository;
    private final SecurityRepository securityRepository;

    @Autowired
    public LeaderboardService(UserRepository userRepository, ConfigRepository configRepository,
                              SecurityRepository securityRepository) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
        this.securityRepository = securityRepository;
    }

    public List<PointsLeaderboardEntry> getPointsLeaderboard() {
        List<Users> users = userRepository
                .findAll();
        users.sort((a, b) -> b.getPoints() - a.getPoints());

        List<PointsLeaderboardEntry> pointsLeaderboardEntries = new ArrayList<>();

        for (int i = 0; i < users.size(); i++) {
            Users user = users.get(i);

            pointsLeaderboardEntries.add(
                    new PointsLeaderboardEntry()
                            .position(i + 1)
                            .userId(user.getUserId())
                            .username(user.getDisplayName())
                            .profilePicture(user.getProfilePictureUrl())
                            .points(user.getPoints())
            );
        }

        return pointsLeaderboardEntries;
    }

    public List<BitsLeaderboardEntry> getBitsLeaderboard() {
        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        //TODO: Update on expired access token
        headers.set("Authorization", "Bearer " + securityRepository.findAll().get(0).getAccessToken());

        ResponseEntity<BitsLeaderboardData> response = restTemplate.exchange(
                "https://api.twitch.tv/helix/bits/leaderboard",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                BitsLeaderboardData.class
        );

        BitsLeaderboardData bitsLeaderboardData = response.getBody();

        return bitsLeaderboardData.getData();
    }
}
