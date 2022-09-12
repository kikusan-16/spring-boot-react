package work.sehippocampus.app.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import work.sehippocampus.app.domain.user.entity.UserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT u FROM UserEntity u WHERE u.name = :name OR u.email = :email")
    List<UserEntity> findByNameOrEmail(@Param("name") String name, @Param("email") String email);

    Optional<UserEntity> findByEmail(String email);
}
