package work.sehippocampus.app.domain.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.sehippocampus.app.domain.user.dto.UserDto;
import work.sehippocampus.app.domain.user.entity.UserEntity;
import work.sehippocampus.app.exception.AppError;
import work.sehippocampus.app.exception.AppException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final ObjectMapper objectMapper;

    private final ModelMapper modelMapper;

    @GetMapping
    public String user(@AuthenticationPrincipal UserEntity principal, @AuthenticationPrincipal OAuth2User user) throws JsonProcessingException {

        if (principal != null) {
            return objectMapper.writeValueAsString(modelMapper.map(principal, UserDto.class));
        } else if (user != null) {
            return objectMapper.writeValueAsString(user);
        } else {
            throw new AppException(AppError.ACCOUNT_NOT_FOUNT);
        }
    }
}
