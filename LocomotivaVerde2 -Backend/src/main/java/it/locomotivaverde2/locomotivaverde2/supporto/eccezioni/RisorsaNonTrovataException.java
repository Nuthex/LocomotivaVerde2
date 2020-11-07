package it.locomotivaverde2.locomotivaverde2.supporto.eccezioni;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RisorsaNonTrovataException extends Exception {

    public RisorsaNonTrovataException(String message){
        super(message);
    }
}
