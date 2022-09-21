package work.sehippocampus.app.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import work.sehippocampus.app.domain.user.entity.UserEntity;

@Component
@RequiredArgsConstructor
public class AuthenticationProvider {

    private final UserDetailsService userDetailsService;

    public Authentication getAuthentication(String username) {
        UserDetails userDetail = userDetailsService.loadUserByUsername(username);
        if (userDetail == null) return null;
        UserEntity userEntity = (UserEntity) userDetail;
        return new UsernamePasswordAuthenticationToken(userEntity, "", userDetail.getAuthorities());
    }
}
