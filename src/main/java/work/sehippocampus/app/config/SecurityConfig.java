package work.sehippocampus.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
 */
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // フィルター
        http.authorizeRequests(auth -> auth
                    .mvcMatchers("/oauth2").authenticated() // 認証必要
                    .mvcMatchers("/api/user/**").hasRole("USER")
                    .anyRequest().permitAll()) // 認証不要

            .csrf(csrf -> csrf // デフォルトでPOST, PUT, DELETE, PATCHがcsrf有効になる
                    .disable() // 解除
                    // .ignoringAntMatchers("/api/**") // pathを指定して解除
                    // CookieでcsrfTokenを管理 -> XSRF-TOKENを取得, RequestヘッダーにX-XSRF-TOKENとして入力する
                    // .csrfTokenRepository(new CookieCsrfTokenRepository())
            )
            .formLogin() // /loginを有効にする デフォルト設定
            .and()
            .logout() // /logoutを有効にする デフォルト設定
            .and()
            .oauth2Login(); // oauth2Login機能を利用する -> デフォルト設定とapplication.ymlに設定

        http.cors(); // CorsFilterの設定を使用

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);

        return new CorsFilter(configSource);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}