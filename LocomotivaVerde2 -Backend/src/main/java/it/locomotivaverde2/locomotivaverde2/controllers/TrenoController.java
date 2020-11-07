package it.locomotivaverde2.locomotivaverde2.controllers;

import it.locomotivaverde2.locomotivaverde2.entities.PrenotazioneEntity;
import it.locomotivaverde2.locomotivaverde2.entities.TrenoEntity;
import it.locomotivaverde2.locomotivaverde2.services.TrenoService;
import it.locomotivaverde2.locomotivaverde2.supporto.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/treni")
public class TrenoController {

    @Autowired
    private TrenoService trenoService;

    @GetMapping("/listatreni")
    public List<TrenoEntity> getAll() {
        return trenoService.mostraTreni();
    }

    @GetMapping("/{id}/treno")
    public TrenoEntity getOne(@PathVariable("id") int id) {
        return  trenoService.trovaTreno(id);
    }

    @GetMapping("/citta/origini")
    public List<String> getOrigins() {
        return trenoService.cercaOrigini();
    }

    @GetMapping("/citta/destinazioni")
    public List<String> getDestinations() {
        return trenoService.cercaDestinazioni();
    }

    //CREATE CON HTTP RESPONSE
    @PostMapping("/listatreni")
    public ResponseEntity create(@RequestBody @Validated TrenoEntity treno) {
        try {
            trenoService.creaTreno(treno);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante la creazione! " +
                    "[Possibili campi richiesti nulli../ " +
                    "Problema validazione dei campi..]"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Creato con successo!"), HttpStatus.OK);
    }

    //UPDATE CON HTTP RESPONSE
    @RequestMapping(value="/{id}/aggiorna", method = RequestMethod.POST)
    public ResponseEntity update(@PathVariable("id") int id, @RequestBody TrenoEntity nuovoTreno){
        try{
            //DEBUG
            System.out.println(nuovoTreno.getOrigine());
            System.out.println(nuovoTreno.getDestinazione());
            System.out.println(nuovoTreno.getCorsa());
            //FINE DEBUG
            trenoService.aggiornaTreno(id, nuovoTreno);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'aggiornamento!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Aggiornato con successo!"), HttpStatus.OK);
    }

    //DELETE CON HTTP RESPONSE
    @RequestMapping(value="/{id}/elimina", method = RequestMethod.POST)
    public ResponseEntity delete(@PathVariable("id") int id){
        try {
            trenoService.eliminaTreno(id);
        }  catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'eliminazione!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Eliminato con successo!"), HttpStatus.OK);
    }

    //QUERY
    @GetMapping("/query/{orig}/{dest}")
    public List<TrenoEntity> query(@PathVariable("orig") String orig, @PathVariable("dest") String dest) {
        return trenoService.queryTreno(orig,dest);
    }

    @GetMapping("/listacorse")
    public List<Integer> getListaCorse() {
        return trenoService.getListaCorse();
    }

}
