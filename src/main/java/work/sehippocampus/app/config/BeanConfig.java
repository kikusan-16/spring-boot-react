package work.sehippocampus.app.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import work.sehippocampus.app.security.JWTUtils;

@Configuration
public class BeanConfig {

    @Bean
    public WebProperties.Resources resources() {
        return new WebProperties.Resources();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public JWTUtils getJwtUtils(
            @Value("${app.jwt.auth.sign-key}") String signKey,
            @Value("${app.jwt.auth.valid-time}") Long validTime
    ) throws Exception {
        if (signKey.length() < 32) {
            throw new Exception("signKey must have length at least 32");
        }
        return new JWTUtils(signKey, validTime);
    }

}