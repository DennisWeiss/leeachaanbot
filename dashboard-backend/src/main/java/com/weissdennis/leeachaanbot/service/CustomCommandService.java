package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.mapper.CustomCommandMapper;
import com.weissdennis.leeachaanbot.model.CustomCommand;
import com.weissdennis.leeachaanbot.persistence.CustomCommandRespository;
import com.weissdennis.leeachaanbot.persistence.Customcommands;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomCommandService {

    private final CustomCommandRespository customCommandRespository;

    @Autowired
    public CustomCommandService(CustomCommandRespository customCommandRespository) {
        this.customCommandRespository = customCommandRespository;
    }

    public List<Customcommands> getAllCustomCommands() {
        return customCommandRespository.findAll();
    }

    public Customcommands getCustomCommand(String id) {
        return customCommandRespository.findById(id).orElse(null);
    }

    public Customcommands updateCustomCommand(Customcommands customCommand) {
        Optional<Customcommands> customCommandToUpdateOptional = customCommandRespository.findById(customCommand.get_id());
        if (customCommandToUpdateOptional.isPresent()) {
            return customCommandRespository.save(customCommand);
        }
        return null;
    }

    public Customcommands addCustomCommand(CustomCommand customCommand) {
        return customCommandRespository.save(
                CustomCommandMapper.INSTANCE.customCommandToCustomCommandDocument(customCommand)
        );
    }

    public boolean deleteCustomCommand(String id) {
        Optional<Customcommands> customCommandOptional = customCommandRespository.findById(id);
        if (customCommandOptional.isPresent()) {
            customCommandRespository.deleteById(id);
            return true;
        }
        return false;
    }
}
