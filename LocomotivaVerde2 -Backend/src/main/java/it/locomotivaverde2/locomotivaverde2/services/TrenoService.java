package it.locomotivaverde2.locomotivaverde2.services;

import it.locomotivaverde2.locomotivaverde2.entities.PrenotazioneEntity;
import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import it.locomotivaverde2.locomotivaverde2.repositories.TrenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TrenoService {

    @Autowired
    private TrenoRepository trenoRepository;

    //get all
    @Transactional(readOnly = true)
    public List<TrenoEntity> mostraTreni() {
        return trenoRepository.findAll();
    }

    //get one per id
    @Transactional(readOnly = true)
    public TrenoEntity trovaTreno(int id){
        return trenoRepository.findByIdIs(id);
    }

    //query origini
    @Transactional(readOnly = true)
    public List<String> cercaOrigini() {
        return trenoRepository.origini();
    }

    //query destinazioni
    @Transactional(readOnly = true)
    public List<String> cercaDestinazioni() {
        return trenoRepository.destinazioni();
    }

    //create
    @Transactional(readOnly = false)
    public void creaTreno(TrenoEntity treno){
        trenoRepository.save(treno);
    }

    //update
    @Transactional(readOnly = false)
    public void aggiornaTreno(int id,TrenoEntity nuovoTreno){
        //DEBUG
        System.out.println(nuovoTreno.getOrigine());
        System.out.println(nuovoTreno.getDestinazione());
        System.out.println(nuovoTreno.getCorsa());
        //FINE DEBUG
        TrenoEntity treno=trovaTreno(id);
        treno.setOrigine(nuovoTreno.getOrigine());
        treno.setDestinazione(nuovoTreno.getDestinazione());
        treno.setCorsa(nuovoTreno.getCorsa());
        treno.setPostidisponibili(nuovoTreno.getPostidisponibili());
        trenoRepository.save(treno);
    }

    //delete
    @Transactional(readOnly = false)
    public void eliminaTreno(int id){
        trenoRepository.deleteTrenoEntityByIdIs(id);
    }

    //query
    @Transactional(readOnly = true)
    public List<TrenoEntity> queryTreno(String orig, String dest){
        return trenoRepository.findTrenoEntitiesByOrigineIsAndAndDestinazioneIs(orig, dest);
    }

    @Transactional(readOnly = true)
    public List<Integer> getListaCorse() {
        return trenoRepository.getListaCorse();
    }

}
