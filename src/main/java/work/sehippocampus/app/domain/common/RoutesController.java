package work.sehippocampus.app.domain.common;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RoutesController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
