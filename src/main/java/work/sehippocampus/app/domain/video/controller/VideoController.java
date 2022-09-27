package work.sehippocampus.app.domain.video.controller;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.sehippocampus.app.domain.video.entity.VideoEntity;
import work.sehippocampus.app.domain.video.service.VideoService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/video")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping
    public VideoEntity uploadFile(@RequestParam("file")MultipartFile file) {
        return videoService.store(file);
    }

    @GetMapping(value = "/{id}")
    public Resource getFile(@PathVariable String id) {
        return videoService.getFileById(id);
    }

    @GetMapping("/list")
    public List<VideoEntity> getFileList() {
        return videoService.getFileList();
    }

    @ExceptionHandler(IOException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public Object exceptionHandler(IOException e, HttpServletRequest request) {
        if (StringUtils.containsIgnoreCase(ExceptionUtils.getRootCauseMessage(e), "Broken pipe")) {
            return null;        // socket is closed, cannot return any response
        } else {
            return new HttpEntity<>(e.getMessage());  //(3)
        }
    }
}
