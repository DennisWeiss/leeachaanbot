package com.weissdennis.leeachaanbot.mapper;

import com.weissdennis.leeachaanbot.model.CustomCommand;
import com.weissdennis.leeachaanbot.persistence.Customcommands;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomCommandMapper {

    CustomCommandMapper INSTANCE = Mappers.getMapper(CustomCommandMapper.class);

    Customcommands customCommandToCustomCommandDocument(CustomCommand customCommand);
}
