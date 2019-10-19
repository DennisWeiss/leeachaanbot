package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.PointsLeaderboardEntry;
import com.weissdennis.leeachaanbot.service.LeaderboardService;
import com.weissdennis.leeachaanbot.service.PermissionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;
    private final PermissionsService permissionsService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService, PermissionsService permissionsService) {
        this.leaderboardService = leaderboardService;
        this.permissionsService = permissionsService;
    }

    @RequestMapping(path = "/points", method = RequestMethod.GET)
    public HttpEntity<List<PointsLeaderboardEntry>> getPointsLeaderboard() {
        return new ResponseEntity<>(leaderboardService.getPointsLeaderboard(), HttpStatus.OK);
    }

    @RequestMapping(path = "/bits", method = RequestMethod.GET)
    public HttpEntity<List<PointsLeaderboardEntry>> getBitsLeaderboard() {
        return new ResponseEntity<>(leaderboardService.getBitsLeaderboard(), HttpStatus.OK);
    }

    @RequestMapping(path = "/deleteuser/{username}", method = RequestMethod.DELETE)
    public HttpEntity deleteUser(@PathVariable String username, @RequestHeader("Authorization") String authorization) {
        if (permissionsService.hasAdministrationRights(authorization)) {
            return new ResponseEntity(leaderboardService.deleteUser(username) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

}
