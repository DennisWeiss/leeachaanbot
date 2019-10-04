package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.mapper.CustomCommandMapper;
import com.weissdennis.leeachaanbot.model.CustomCommand;
import com.weissdennis.leeachaanbot.persistence.CustomCommandRespository;
import com.weissdennis.leeachaanbot.persistence.Customcommands;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomCommandService {

    private final CustomCommandRespository customCommandRespository;

    @Autowired
    public CustomCommandService(CustomCommandRespository customCommandRespository) {
        this.customCommandRespository = customCommandRespository;
    }

    public Customcommands addCustomCommand(CustomCommand customCommand) {
        return customCommandRespository.save(
                CustomCommandMapper.INSTANCE.customCommandToCustomCommandDocument(customCommand)
        );
    }
}
