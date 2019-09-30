package com.weissdennis.leeachaanbot.config;

import com.weissdennis.leeachaanbot.integration.twitch.TwitchUser;
import com.weissdennis.leeachaanbot.integration.twitch.UserData;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.persistence.UserRepository;
import com.weissdennis.leeachaanbot.persistence.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Configuration
@EnableScheduling
public class ScheduledConfiguration {

    private final UserRepository userRepository;
    private final ConfigRepository configRepository;

    @Autowired
    public ScheduledConfiguration(UserRepository userRepository, ConfigRepository configRepository) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
    }

    @Scheduled(fixedRate = 300000)
    public void updateUserInfo() {
        HttpHeaders headers = new HttpHeaders();
        List<Configs> all = configRepository.findAll();
        headers.set("Client-ID", all.get(0).getClientId());

        List<Users> users = userRepository.findAll();
        for (int i = 0; i < users.size(); i++) {
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
