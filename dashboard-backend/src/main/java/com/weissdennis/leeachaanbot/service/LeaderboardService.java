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
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final UserRepository userRepository;
    private final ConfigRepository configRepository;
    private final SecurityRepository securityRepository;
    private final RefreshTwitchApiTokenService refreshTwitchApiTokenService;

    @Autowired
    public LeaderboardService(UserRepository userRepository, ConfigRepository configRepository,
                              SecurityRepository securityRepository,
                              RefreshTwitchApiTokenService refreshTwitchApiTokenService) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
        this.securityRepository = securityRepository;
        this.refreshTwitchApiTokenService = refreshTwitchApiTokenService;
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

    public List<PointsLeaderboardEntry> getBitsLeaderboard() {
        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "Bearer " + securityRepository.findAll().get(0).getAccessToken());

        try {
            ResponseEntity<BitsLeaderboardData> response = restTemplate.exchange(
                    "https://api.twitch.tv/helix/bits/leaderboard",
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    BitsLeaderboardData.class
            );
            if (response.getStatusCode().value() == 401) {
                refreshTwitchApiTokenService.refreshTwitchApiToken();
                return getBitsLeaderboard();
            } else {
                BitsLeaderboardData bitsLeaderboardData = response.getBody();

                return mapBitsLeaderboardData(bitsLeaderboardData.getData());
            }
        } catch (RestClientException e) {
            refreshTwitchApiTokenService.refreshTwitchApiToken();
            return getBitsLeaderboard();
        }

    }

    private List<PointsLeaderboardEntry> mapBitsLeaderboardData(List<BitsLeaderboardEntry> leaderboard) {
        return leaderboard
                .stream()
                .map(this::mapBitsLeaderboardEntry)
                .collect(Collectors.toList());
    }

    private PointsLeaderboardEntry mapBitsLeaderboardEntry(BitsLeaderboardEntry bitsLeaderboardEntry) {
        Optional<Users> userOptional = userRepository.findByName(bitsLeaderboardEntry.getUser_name().toLowerCase());

        return new PointsLeaderboardEntry()
                .position(bitsLeaderboardEntry.getRank())
                .username(bitsLeaderboardEntry.getUser_name())
                .points(bitsLeaderboardEntry.getScore())
                .userId(bitsLeaderboardEntry.getUser_id())
                .profilePicture(userOptional.isPresent() ? userOptional.get().getProfilePictureUrl() : "");
    }
}
