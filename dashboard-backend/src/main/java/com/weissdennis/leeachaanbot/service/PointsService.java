package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.model.PointsScore;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.persistence.UserRepository;
import com.weissdennis.leeachaanbot.persistence.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PointsService {

    private final UserRepository userRepository;
    private final ConfigRepository configRepository;

    @Autowired
    public PointsService(UserRepository userRepository, ConfigRepository configRepository) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
    }

    public PointsScore getScore(String userId) {
        Optional<Users> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();

            PointsScore pointsScore = new PointsScore();
            pointsScore.setUserId(user.getUserId());
            pointsScore.setUsername(user.getDisplayName());
            pointsScore.setPoints(user.getPoints());

            List<Configs> configs = configRepository.findAll();

            if (configs.size() > 0) {
                pointsScore.setCurrencyNameSingular(configs.get(0).getCurrency().getNameSingular());
                pointsScore.setCurrencyNamePlural(configs.get(0).getCurrency().getNamePlural());
            }

            return pointsScore;
        }
        return null;
    }

}
