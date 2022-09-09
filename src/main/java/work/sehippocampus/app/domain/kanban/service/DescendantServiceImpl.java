package work.sehippocampus.app.domain.kanban.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import work.sehippocampus.app.domain.kanban.entity.DescendantEntity;
import work.sehippocampus.app.domain.kanban.form.DescendantForm;
import work.sehippocampus.app.domain.kanban.repository.DescendantRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DescendantServiceImpl implements DescendantService {
    private final ModelMapper modelMapper;
    private final DescendantRepository descendantRepository;

    public List<DescendantEntity> getDescendants() {
        return descendantRepository.findAll();
    }

    @Override
    public List<DescendantEntity> upsertDescendants(List<DescendantForm> forms) {
        List<DescendantEntity> entities = modelMapper.map(forms,
                // ListのマッピングにTypeToken無名クラスを使用
                new TypeToken<List<DescendantEntity>>() { }.getType()
                );
        return descendantRepository.saveAll(entities);
    }
}
