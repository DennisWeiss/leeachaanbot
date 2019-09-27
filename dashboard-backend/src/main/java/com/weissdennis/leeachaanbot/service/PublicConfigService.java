package com.weissdennis.leeachaanbot.service;

import com.weissdennis.leeachaanbot.model.PublicConfig;
import com.weissdennis.leeachaanbot.persistence.ConfigRepository;
import com.weissdennis.leeachaanbot.persistence.Configs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublicConfigService {

    private final ConfigRepository configRepository;

    @Autowired
    public PublicConfigService(ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public PublicConfig getConfig() {
        Configs config = configRepository.findAll().get(0);

        PublicConfig publicConfig = new PublicConfig();
        publicConfig.setBotUsername(config.getBotUsername());
        publicConfig.setBroadcasterChannelName(config.getBroadcasterChannelName());
        publicConfig.setCurrency(config.getCurrency());
        publicConfig.setDonationCurrency(config.getDonationCurrency());
        publicConfig.setExcludedUsers(config.getExcludedUsers());

        return publicConfig;
    }
}
