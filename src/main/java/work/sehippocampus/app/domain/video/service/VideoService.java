package work.sehippocampus.app.domain.video.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;
import work.sehippocampus.app.domain.video.entity.VideoEntity;

import java.util.List;

public interface VideoService {

    VideoEntity store(MultipartFile file);

    ByteArrayResource getFileById(String id);

    List<VideoEntity> getFileList();
}