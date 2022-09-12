package work.sehippocampus.app.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.sehippocampus.app.domain.user.dto.UserDto;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AuthResultController {

    private final ModelMapper modelMapper;

    @GetMapping
    public UserDto user(@AuthenticationPrincipal UserDetails principal) {
        return modelMapper.map(principal, UserDto.class);
    }
}
