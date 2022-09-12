package work.sehippocampus.app.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String id;

    private String name;

    private String email;

    private String bio;

    private Collection<? extends GrantedAuthority> authorities;

    private Boolean accountNonExpired;

    private Boolean accountNonLocked;

    private Boolean credentialsNonExpired;

    private Boolean isEnabled;

    public String getUsername() {
        return getEmail();
    }

}
