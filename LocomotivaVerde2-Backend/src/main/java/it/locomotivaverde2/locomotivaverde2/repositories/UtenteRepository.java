package it.locomotivaverde2.locomotivaverde2.repositories;

import it.locomotivaverde2.locomotivaverde2.entities.UtenteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtenteRepository extends JpaRepository<UtenteEntity, Integer> {

    boolean existsByEmail(String email);

    @Query(value = "SELECT nome FROM utente", nativeQuery = true)
    List<String> getListaNomi();

    UtenteEntity findByNomeIs(String nome);

    @Query(value = "SELECT email FROM utente", nativeQuery = true)
    List<String> getListaEmail();

    UtenteEntity findByEmailIs(String email);

    void deleteUtenteEntityByIdIs(int id);

    UtenteEntity findUtenteEntityByIdIs(int id);
}
