package work.sehippocampus.app.domain.user.service;

import work.sehippocampus.app.domain.user.dto.UserDto;

public interface UserJWTService {

    UserDto login(final UserDto.Login login);

}
