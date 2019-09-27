package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.integration.twitch.BitsLeaderboardEntry;
import com.weissdennis.leeachaanbot.model.PointsLeaderboardEntry;
import com.weissdennis.leeachaanbot.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @RequestMapping(path = "/points", method = RequestMethod.GET)
    public HttpEntity<List<PointsLeaderboardEntry>> getPointsLeaderboard() {
        return new ResponseEntity<>(leaderboardService.getPointsLeaderboard(), HttpStatus.OK);
    }

    @RequestMapping(path = "/bits", method = RequestMethod.GET)
    public HttpEntity<List<BitsLeaderboardEntry>> getBitsLeaderboard() {
        return new ResponseEntity<>(leaderboardService.getBitsLeaderboard(), HttpStatus.OK);
    }

}
