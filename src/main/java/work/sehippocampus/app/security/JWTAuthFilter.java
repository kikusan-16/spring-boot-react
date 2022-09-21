package work.sehippocampus.app.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthFilter extends GenericFilter {
    private final JWTUtils jwtUtils;
    private final AuthenticationProvider authenticationProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String authHeader = ((HttpServletRequest) request).getHeader(HttpHeaders.AUTHORIZATION);
        String jwt = jwtUtils.resolveToken(authHeader);
        if (jwt != null && jwtUtils.validateToken(jwt)) {
            String username = jwtUtils.getSub(jwt);
            Authentication authentication = authenticationProvider.getAuthentication(username);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
