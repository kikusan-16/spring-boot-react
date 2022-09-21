package work.sehippocampus.app.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.sehippocampus.app.domain.user.dto.UserDto;
import work.sehippocampus.app.domain.user.service.UserJWTService;

import javax.validation.Valid;

@RestController
@RequestMapping("/login/jwt")
@RequiredArgsConstructor
public class UserJWTController {

    private final UserJWTService userJWTService;

    @PostMapping
    public UserDto login(@RequestBody @Valid UserDto.Login login) {
        return userJWTService.login(login);
    }
}
