package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.integration.twitch.TwitchData;
import com.weissdennis.leeachaanbot.integration.twitch.TwitchFollow;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/follower")
public class UserFollowerController {

    @PostMapping
    public void postNewFollower(@RequestBody TwitchData<TwitchFollow> followData) {
        System.out.println(followData);
    }

}
