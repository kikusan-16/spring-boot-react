package work.sehippocampus.app.domain.video.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import work.sehippocampus.app.domain.video.entity.VideoEntity;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, String> {
}
