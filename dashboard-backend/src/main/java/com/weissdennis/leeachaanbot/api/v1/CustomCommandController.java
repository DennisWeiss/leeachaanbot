package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.CustomCommand;
import com.weissdennis.leeachaanbot.persistence.Customcommands;
import com.weissdennis.leeachaanbot.service.CustomCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/customcommands")
public class CustomCommandController {

    private final CustomCommandService customCommandService;

    @Autowired
    public CustomCommandController(CustomCommandService customCommandService) {
        this.customCommandService = customCommandService;
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
    public HttpEntity<Customcommands> addCustomCommand(@RequestBody CustomCommand customCommand) {
        return new ResponseEntity<>(customCommandService.addCustomCommand(customCommand), HttpStatus.OK);
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public HttpEntity<Customcommands> updateCustomCommand(@RequestBody Customcommands customCommand) {
        Customcommands updatedCustomCommand = customCommandService.updateCustomCommand(customCommand);
        if (updatedCustomCommand != null) {
            return new ResponseEntity<>(updatedCustomCommand, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/delete/{id}", method = RequestMethod.DELETE)
    public HttpEntity<Void> deleteCustomCommand(@PathVariable String id) {
        boolean deleted = customCommandService.deleteCustomCommand(id);
        return new ResponseEntity<>(deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
