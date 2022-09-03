package work.sehippocampus.app.domain.common;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RoutesController {

    /**
     * SPA index
     *
     * @return public index.html
     */
    @GetMapping("/{path:[^\\\\.]*}")
    public String any() {
        // NOTE: https://www.hypertextcandy.com/create-react-app-on-spring-boot
        // NOTE: https://stackoverflow.com/questions/40769200/configure-spring-boot-for-spa-frontend
        return "forward:/index.html";
    }
}
