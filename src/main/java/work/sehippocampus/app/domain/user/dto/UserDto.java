package work.sehippocampus.app.domain.user.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private String id;

    private String token;

    private String name;

    private String email;

    private String bio;


    private Collection<? extends GrantedAuthority> authorities;

    public String getUsername() {
        return getEmail();
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Login {
        @NotNull
        @Email
        private String email;

        @NotBlank
        @Size(min = 8, max = 32)
        private String password;
    }

}
