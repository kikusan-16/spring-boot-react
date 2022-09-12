package work.sehippocampus.app.domain.user.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    private String bio;

    private Boolean isAdmin;

    @Getter(AccessLevel.NONE)
    private static final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    @Getter(AccessLevel.NONE)
    private static final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");

    /*
     * getAuthorities, getPassword, getUsername,
     * isAccountNonExpired, isAccountNonLocked, isCredentialsNonExpired, isEnabled はUserDetailsで実装が必要
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getIsAdmin() ? ADMIN_ROLES : USER_ROLES;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
