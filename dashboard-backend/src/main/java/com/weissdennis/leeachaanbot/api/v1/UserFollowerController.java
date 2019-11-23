package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.integration.twitch.TwitchData;
import com.weissdennis.leeachaanbot.integration.twitch.TwitchFollow;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/follower")
public class UserFollowerController {

    @PostMapping
    public void postNewFollower(TwitchData<TwitchFollow> followData) {
        System.out.println(followData);
    }

}
