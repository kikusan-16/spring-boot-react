package work.sehippocampus.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    /**
     * アプリケーション起動
     * @param args 実行引数
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
