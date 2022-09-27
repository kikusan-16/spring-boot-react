package work.sehippocampus.app.domain.video.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import work.sehippocampus.app.domain.video.entity.VideoEntity;
import work.sehippocampus.app.domain.video.repository.VideoRepository;
import work.sehippocampus.app.exception.AppError;
import work.sehippocampus.app.exception.AppException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;

    public VideoEntity store(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            VideoEntity video = new VideoEntity(null, fileName, file.getContentType(), file.getBytes());
            return videoRepository.save(video);
        } catch (IOException e) {
            throw new AppException(AppError.IO_ERROR);
        }
    }

    public ByteArrayResource getFileById(String id) {

        Optional<VideoEntity> fileOptional = videoRepository.findById(id);

        if (fileOptional.isPresent()) {
            return new ByteArrayResource(fileOptional.get().getData());
        } else {
            throw new AppException(AppError.VIDEO_NOT_FOUND);
        }
    }

    public List<VideoEntity> getFileList() {
        return videoRepository.findAll().stream().collect(Collectors.toList());
    }

}
