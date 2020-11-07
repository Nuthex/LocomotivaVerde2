package it.locomotivaverde2.locomotivaverde2.controllers;

import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import it.locomotivaverde2.locomotivaverde2.entities.UtenteEntity;
import it.locomotivaverde2.locomotivaverde2.services.UtenteService;
import it.locomotivaverde2.locomotivaverde2.supporto.ResponseMessage;
import it.locomotivaverde2.locomotivaverde2.supporto.eccezioni.RisorsaEsistenteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utenti")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @GetMapping("/listautenti")
    public List<UtenteEntity> getAll() {
        return utenteService.listaUtenti();
    }

    @PostMapping("/listautenti")
    public ResponseEntity create(@RequestBody @Validated UtenteEntity utente) {
        try {
            utenteService.creaUtente(utente);
        } catch (RisorsaEsistenteException e) {
            return new ResponseEntity<>(new ResponseMessage("Errore email già esistente!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Utente creato correttamente!"), HttpStatus.OK);
    }

    @GetMapping("/listanomi")
    public List<String> getListaNomi() {
        return utenteService.getListaNomi();
    }

    @GetMapping("/{nome}/cercautente")
    public UtenteEntity getUtentePerNome(@PathVariable("nome")String nome){
        return utenteService.getUtentePerNome(nome);
    }

    @GetMapping("/listaemail")
    public List<String> getListaEmail() {
        return utenteService.getListaEmail();
    }

    @GetMapping("/{email}/cercautenteemail")
    public UtenteEntity getUtentePerEmail(@PathVariable("email")String email){
        return utenteService.getUtentePerEmail(email);
    }

    //DELETE CON HTTP RESPONSE
    @RequestMapping(value="/{id}/elimina", method = RequestMethod.POST)
    public ResponseEntity delete(@PathVariable("id") int id){
        try {
            utenteService.eliminaUtente(id);
        }  catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'eliminazione!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Eliminato con successo!"), HttpStatus.OK);
    }

    //UPDATE CON HTTP RESPONSE
    @RequestMapping(value="/{id}/aggiorna", method = RequestMethod.POST)
    public ResponseEntity update(@PathVariable("id") int id, @RequestBody UtenteEntity nuovoUtente){
        try{
            utenteService.aggiornaUtente(id, nuovoUtente);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'aggiornamento!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Aggiornato con successo!"), HttpStatus.OK);
    }

}
