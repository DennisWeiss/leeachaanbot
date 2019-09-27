package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.model.PointsLeaderboardEntry;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.UserRepository;
import com.weissdennis.leeachaanbot.persistence.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
