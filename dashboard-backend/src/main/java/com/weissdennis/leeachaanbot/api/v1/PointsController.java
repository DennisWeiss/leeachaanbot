package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.PointsScore;
import com.weissdennis.leeachaanbot.service.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/points")
public class PointsController {

    private final PointsService pointsService;

    @Autowired
    public PointsController(PointsService pointsService) {
        this.pointsService = pointsService;

    }

    @RequestMapping(path = "/user/{userId}", method = RequestMethod.GET)
    public HttpEntity<PointsScore> getScore(@PathVariable  String userId) {
        PointsScore pointsScore = pointsService.getScore(userId);
        if (pointsScore != null) {
            return new ResponseEntity<>(pointsScore, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
