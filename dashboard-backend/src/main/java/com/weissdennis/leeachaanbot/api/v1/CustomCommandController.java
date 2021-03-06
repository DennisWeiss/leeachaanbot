package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.CustomCommand;
import com.weissdennis.leeachaanbot.persistence.Customcommands;
import com.weissdennis.leeachaanbot.service.CustomCommandService;
import com.weissdennis.leeachaanbot.service.PermissionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/customcommands")
public class CustomCommandController {

    private final CustomCommandService customCommandService;
    private final PermissionsService permissionsService;

    @Autowired
    public CustomCommandController(CustomCommandService customCommandService, PermissionsService permissionsService) {
        this.customCommandService = customCommandService;
        this.permissionsService = permissionsService;
    }

    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public HttpEntity<List<Customcommands>> getAllCustomCommands() {
        return new ResponseEntity<>(customCommandService.getAllCustomCommands(), HttpStatus.OK);
    }

    @RequestMapping(path = "/id/{id}", method = RequestMethod.GET)
    public HttpEntity<Customcommands> getCustomCommand(@PathVariable String id) {
        Customcommands customCommand = customCommandService.getCustomCommand(id);
        if (customCommand != null) {
            return new ResponseEntity<>(customCommand, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public HttpEntity<Customcommands> addCustomCommand(@RequestBody CustomCommand customCommand,
                                                       @RequestHeader("Authorization") String authorization) {
        if (permissionsService.hasAdministrationRights(authorization)) {
            return new ResponseEntity<>(customCommandService.addCustomCommand(customCommand), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public HttpEntity<Customcommands> updateCustomCommand(@RequestBody Customcommands customCommand,
                                                          @RequestHeader("Authorization") String authorization) {
        if (permissionsService.hasAdministrationRights(authorization)) {
            Customcommands updatedCustomCommand = customCommandService.updateCustomCommand(customCommand);
            if (updatedCustomCommand != null) {
                return new ResponseEntity<>(updatedCustomCommand, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(path = "/delete/{id}", method = RequestMethod.DELETE)
    public HttpEntity<Void> deleteCustomCommand(@PathVariable String id,
                                                @RequestHeader("Authorization") String authorization) {
        if (permissionsService.hasAdministrationRights(authorization)) {
            boolean deleted = customCommandService.deleteCustomCommand(id);
            return new ResponseEntity<>(deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
