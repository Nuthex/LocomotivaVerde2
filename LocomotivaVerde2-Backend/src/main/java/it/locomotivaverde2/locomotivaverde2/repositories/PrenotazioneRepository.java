package it.locomotivaverde2.locomotivaverde2.repositories;

import it.locomotivaverde2.locomotivaverde2.entities.PrenotazioneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrenotazioneRepository extends JpaRepository<PrenotazioneEntity, Integer> {

    void deletePrenotazioneEntityByIdIs(int id);

    @Query(value = "SELECT * FROM prenotazione WHERE id = ?1", nativeQuery = true)
    PrenotazioneEntity findByIdIs(int id);

    List<PrenotazioneEntity> findPrenotazioneEntitiesByEmailIs(String email);

    List<PrenotazioneEntity> findPrenotazioneEntitiesByCorsaIs(int corsa);
}
