package it.locomotivaverde2.locomotivaverde2.controllers;

import it.locomotivaverde2.locomotivaverde2.entities.PrenotazioneEntity;
import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import it.locomotivaverde2.locomotivaverde2.services.PrenotazioneService;
import it.locomotivaverde2.locomotivaverde2.supporto.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prenotazioni")
public class PrenotazioneController {

    @Autowired
    private PrenotazioneService prenotazioneService;

    @GetMapping("/listaprenotazioni")
    public List<PrenotazioneEntity> getAll(){
        return  prenotazioneService.listaPrenotazioni();
    }

    @PostMapping("/listaprenotazioni")
    public ResponseEntity create(@RequestBody @Validated PrenotazioneEntity prenotazione) {
        try {
            prenotazioneService.aggiungiPrenotazione(prenotazione);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante la prenotazione! " +
                    "[Utente non selezionato../ " +
                    "Posti insufficienti..]"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Prenotato con successo!"), HttpStatus.OK);
    }

    @GetMapping("/{id}/prenotazione")
    public PrenotazioneEntity getOne(@PathVariable("id") int id) {
        return  prenotazioneService.trovaPrenotazione(id);
    }

    //DELETE CON HTTP RESPONSE
    @RequestMapping(value="/{id}/elimina", method = RequestMethod.POST)
    public ResponseEntity delete(@PathVariable("id") int id){
        try {
            prenotazioneService.eliminaPrenotazione(id);
        }  catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'eliminazione!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Eliminato con successo!"), HttpStatus.OK);
    }

    //QUERY
    @GetMapping("/query/{email}/emailutente")
    public List<PrenotazioneEntity> query(@PathVariable("email") String email) {
        return prenotazioneService.queryPrenotazioniPerEmail(email);
    }

    //QUERY
    @GetMapping("/query/{corsa}/trenocorsa")
    public List<PrenotazioneEntity> query(@PathVariable("corsa") int corsa) {
        return prenotazioneService.queryPrenotazioniPerCorsaTreno(corsa);
    }
}
