package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.persistence.Configs;
import com.weissdennis.leeachaanbot.service.PermissionsService;
import com.weissdennis.leeachaanbot.service.SecuredConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/securedconfig")
public class SecuredConfigController {

    private final PermissionsService permissionsService;
    private final SecuredConfigService securedConfigService;

    @Autowired
    public SecuredConfigController(PermissionsService permissionsService, SecuredConfigService securedConfigService) {
        this.permissionsService = permissionsService;
        this.securedConfigService = securedConfigService;
    }

    @RequestMapping(path = "/current", method = RequestMethod.GET)
    public HttpEntity<Configs> getConfig(@RequestHeader("Authorization") String authorization) {
        if (permissionsService.hasAdministrationRights(authorization)) {
            Configs config = securedConfigService.getConfig();
            if (config != null) {
                return new ResponseEntity<>(config, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public HttpEntity<Configs> updateConfig(@RequestHeader("Authorization") String authorization,
                                            @RequestBody Configs config) {
        if (permissionsService.hasAdministrationRights(authorization)) {
            Configs currentConfig = securedConfigService.getConfig();
            if (currentConfig.get_id().equals(config.get_id())) {
                return new ResponseEntity<>(securedConfigService.updateConfig(config), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
