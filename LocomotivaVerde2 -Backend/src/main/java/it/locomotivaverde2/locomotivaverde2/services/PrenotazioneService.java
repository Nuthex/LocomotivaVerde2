package it.locomotivaverde2.locomotivaverde2.services;

import it.locomotivaverde2.locomotivaverde2.entities.PrenotazioneEntity;
import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import it.locomotivaverde2.locomotivaverde2.repositories.PrenotazioneRepository;
import it.locomotivaverde2.locomotivaverde2.repositories.TrenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PrenotazioneService {

    @Autowired
    private PrenotazioneRepository prenotazioneRepository;

    @Autowired
    private TrenoRepository trenoRepository;

    @Transactional(readOnly = true)
    public List<PrenotazioneEntity> listaPrenotazioni() {
        return prenotazioneRepository.findAll();
    }

    @Transactional(readOnly = false)
    public void aggiungiPrenotazione(PrenotazioneEntity prenotazione)throws Exception {
        prenotazioneRepository.save(prenotazione);
        int idTreno = prenotazione.getTreno();
        TrenoEntity treno = trenoRepository.findByIdIs(idTreno);
        if(treno.getPostidisponibili()==0){
          throw new Exception("Posti terminati!");
        }else {
            treno.setPostidisponibili(treno.getPostidisponibili() - 1);
        }
    }

    //get one per id
    @Transactional(readOnly = true)
    public PrenotazioneEntity trovaPrenotazione(int id){
        return prenotazioneRepository.findByIdIs(id);
    }

    //delete
    @Transactional(readOnly = false)
    public void eliminaPrenotazione(int id){
        //DEBUG
        System.out.println(id);
        //FINE DEBUG
        PrenotazioneEntity prenotazione=prenotazioneRepository.findByIdIs(id);
        int idTreno=prenotazione.getTreno();

        boolean trovato=false;
        List<Integer> listaIdTreni=trenoRepository.getListaId();
        System.out.println(listaIdTreni);
        for(int i : listaIdTreni){
            if(i==idTreno)
                trovato=true;
        }
        if(trovato) {
            TrenoEntity treno = trenoRepository.findByIdIs(idTreno);
            prenotazioneRepository.deletePrenotazioneEntityByIdIs(id);
            //DEBUG
            System.out.println(treno);
            System.out.println(treno.getPostidisponibili());
            //FINE DEBUG
            treno.setPostidisponibili(treno.getPostidisponibili() + 1);
            //DEBUG
            System.out.println(treno.getPostidisponibili());
            //FINE DEBUG
        }else{
            prenotazioneRepository.deletePrenotazioneEntityByIdIs(id);
        }
    }

    //query
    @Transactional(readOnly = true)
    public List<PrenotazioneEntity> queryPrenotazioniPerEmail(String email){
        return prenotazioneRepository.findPrenotazioneEntitiesByEmailIs(email);
    }

    //query
    @Transactional(readOnly = true)
    public List<PrenotazioneEntity> queryPrenotazioniPerCorsaTreno(int corsa){
        return prenotazioneRepository.findPrenotazioneEntitiesByCorsaIs(corsa);
    }

}
