package com.weissdennis.leeachaanbot.api.v1;

import com.weissdennis.leeachaanbot.model.CustomCommand;
import com.weissdennis.leeachaanbot.persistence.Customcommands;
import com.weissdennis.leeachaanbot.service.CustomCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/customcommands")
public class CustomCommandController {

    private final CustomCommandService customCommandService;

    @Autowired
    public CustomCommandController(CustomCommandService customCommandService) {
        this.customCommandService = customCommandService;
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public HttpEntity<Customcommands> addCustomCommand(@RequestBody CustomCommand customCommand) {
        return new ResponseEntity<>(customCommandService.addCustomCommand(customCommand), HttpStatus.OK);
    }
}
