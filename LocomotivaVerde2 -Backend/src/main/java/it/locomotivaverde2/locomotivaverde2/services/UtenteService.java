package it.locomotivaverde2.locomotivaverde2.services;

import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import it.locomotivaverde2.locomotivaverde2.entities.UtenteEntity;
import it.locomotivaverde2.locomotivaverde2.repositories.UtenteRepository;
import it.locomotivaverde2.locomotivaverde2.supporto.eccezioni.RisorsaEsistenteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Transactional(readOnly = true)
    public List<UtenteEntity> listaUtenti() {
        return utenteRepository.findAll();
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public void creaUtente(UtenteEntity utente) throws RisorsaEsistenteException {
        if ( utenteRepository.existsByEmail(utente.getEmail()) ) {
            throw new RisorsaEsistenteException("Errore, l'email è gia presente nel db!");
        }
        utenteRepository.save(utente);
    }

    @Transactional(readOnly = true)
    public List<String> getListaNomi() {
        return utenteRepository.getListaNomi();
    }

    @Transactional(readOnly = true)
    public UtenteEntity getUtentePerNome(String nome){
        return utenteRepository.findByNomeIs(nome);
    }

    @Transactional(readOnly = true)
    public List<String> getListaEmail() {
        return utenteRepository.getListaEmail();
    }

    @Transactional(readOnly = true)
    public UtenteEntity getUtentePerEmail(String email){
        return utenteRepository.findByEmailIs(email);
    }

    //delete
    @Transactional(readOnly = false)
    public void eliminaUtente(int id){
        utenteRepository.deleteUtenteEntityByIdIs(id);
    }

    //update
    @Transactional(readOnly = false)
    public void aggiornaUtente(int id, UtenteEntity nuovoUtente){
        UtenteEntity utente=utenteRepository.findUtenteEntityByIdIs(id);
        utente.setNome(nuovoUtente.getNome());
        utente.setCognome(nuovoUtente.getCognome());
        utente.setEmail(nuovoUtente.getEmail());
        utenteRepository.save(utente);
    }

}
