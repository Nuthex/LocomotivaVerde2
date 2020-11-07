package it.locomotivaverde2.locomotivaverde2.repositories;

import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrenoRepository extends JpaRepository<TrenoEntity,Integer> {

    TrenoEntity findByIdIs(int id);

    List<TrenoEntity> findTrenoEntitiesByOrigineIsAndAndDestinazioneIs(String orig, String dest);

    @Query(value = "SELECT DISTINCT origine FROM treno", nativeQuery = true)
    List<String> origini();

    @Query(value = "SELECT DISTINCT destinazione FROM treno", nativeQuery = true)
    List<String> destinazioni();

    void deleteTrenoEntityByIdIs(int id);

    @Query(value = "SELECT corsa FROM treno", nativeQuery = true)
    List<Integer> getListaCorse();

    @Query(value = "SELECT id FROM treno", nativeQuery = true)
    List<Integer> getListaId();
}
