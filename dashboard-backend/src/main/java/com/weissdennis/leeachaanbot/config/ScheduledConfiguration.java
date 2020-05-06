package com.weissdennis.leeachaanbot.config;

import com.weissdennis.leeachaanbot.integration.twitch.TwitchUser;
import com.weissdennis.leeachaanbot.integration.twitch.UserData;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.persistence.UserRepository;
import com.weissdennis.leeachaanbot.persistence.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;

@Configuration
@EnableScheduling
public class ScheduledConfiguration {

    private final static Logger LOGGER = LoggerFactory.getLogger(ScheduledConfiguration.class);

    private final UserRepository userRepository;
    private final ConfigRepository configRepository;

    @Autowired
    public ScheduledConfiguration(UserRepository userRepository, ConfigRepository configRepository) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
    }

    @Scheduled(cron = "0 46 21 * * *")
    public void updateUserInfo() {
        LOGGER.info("Executed update of user info at " + Instant.now().toString());

        HttpHeaders headers = new HttpHeaders();
        List<Configs> configs = configRepository.findAll();
        headers.set("Client-ID", configs.get(0).getClientId());
        headers.set("Authorization", "Bearer " + configs.get(0).getAccessToken());

        List<Users> users = userRepository.findAll();
        for (int i = 0; i < users.size(); i++) {
            LOGGER.info("User " + i);

            Users user = users.get(i);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<UserData> response = restTemplate.exchange(
                    "https://api.twitch.tv/helix/users?id=" + user.getUserId(),
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    UserData.class
            );

            UserData userData = response.getBody();
            TwitchUser twitchUser = userData != null && userData.getData() != null && userData.getData().size() > 0 ?
                    userData.getData().get(0) : null;
            if (twitchUser != null) {
                user.setName(twitchUser.getLogin());
                user.setDisplayName(twitchUser.getDisplay_name());
                user.setProfilePictureUrl(twitchUser.getProfile_image_url());
            }

            userRepository.save(user);
        }
    }
}
