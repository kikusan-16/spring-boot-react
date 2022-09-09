package work.sehippocampus.app.config;

import org.modelmapper.ModelMapper;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

}