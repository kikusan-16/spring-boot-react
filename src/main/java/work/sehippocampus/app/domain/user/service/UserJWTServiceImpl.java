package work.sehippocampus.app.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import work.sehippocampus.app.security.JWTUtils;
import work.sehippocampus.app.domain.user.dto.UserDto;
import work.sehippocampus.app.domain.user.entity.UserEntity;
import work.sehippocampus.app.domain.user.repository.UserRepository;
import work.sehippocampus.app.exception.AppError;
import work.sehippocampus.app.exception.AppException;

@Service
@RequiredArgsConstructor
public class UserJWTServiceImpl implements UserJWTService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

    private final JWTUtils jwtUtils;



    @Override
    public UserDto login(UserDto.Login login) {
        UserEntity userEntity = userRepository.findByEmail(login.getEmail())
                .filter(user -> passwordEncoder.matches(login.getPassword(), user.getPassword()))
                .orElseThrow(() -> new AppException(AppError.LOGIN_INFO_INVALID));
        UserDto userDto = modelMapper.map(userEntity, UserDto.class);
        userDto.setToken(jwtUtils.encode(userEntity.getUsername()));
        return userDto;

    }
}
