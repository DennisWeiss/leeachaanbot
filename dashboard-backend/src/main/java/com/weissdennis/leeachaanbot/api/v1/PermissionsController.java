package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.Rights;
import com.weissdennis.leeachaanbot.service.PermissionsService;
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
@RequestMapping("/permissions")
public class PermissionsController {

    private final PermissionsService permissionsService;

    @Autowired
    public PermissionsController(PermissionsService permissionsService) {
        this.permissionsService = permissionsService;
    }

    @RequestMapping(path = "/administration", method = RequestMethod.POST)
    public HttpEntity<Rights> hasAdministrationRights(String accessToken) {
        boolean hasAdministrationRights = permissionsService.hasAdministrationRights(accessToken);
        return new ResponseEntity<>(new Rights(hasAdministrationRights), HttpStatus.OK);
    }
}
