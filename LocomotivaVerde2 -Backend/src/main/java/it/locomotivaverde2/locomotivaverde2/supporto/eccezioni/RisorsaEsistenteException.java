package it.locomotivaverde2.locomotivaverde2.supporto.eccezioni;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class RisorsaEsistenteException extends Exception {

    public RisorsaEsistenteException(String message){
        super(message);
    }
}
