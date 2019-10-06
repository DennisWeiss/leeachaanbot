package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecuredConfigService {

    private final ConfigRepository configRepository;

    @Autowired
    public SecuredConfigService(ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public Configs getConfig() {
        List<Configs> configs = configRepository.findAll();
        return configs.size() > 0 ? configs.get(0) : null;
    }

    public Configs updateConfig(Configs config) {
        return configRepository.save(config);
    }

}
