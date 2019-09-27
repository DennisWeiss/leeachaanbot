package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.PublicConfig;
import com.weissdennis.leeachaanbot.service.PublicConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/config")
public class PublicConfigController {

    private final PublicConfigService publicConfigService;

    @Autowired
    public PublicConfigController(PublicConfigService publicConfigService) {
        this.publicConfigService = publicConfigService;
    }

    @RequestMapping(path = "/current", method = RequestMethod.GET)
    public HttpEntity<PublicConfig> getConfig() {
        return new ResponseEntity<>(publicConfigService.getConfig(), HttpStatus.OK);
    }
}
