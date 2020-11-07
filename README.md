# LocomotivaVerde2
La mia prima web app! [ PostgreSQL - Spring Boot - Angular ]
---
## Descrizione:
Questa è la mia prima web app funzionante, realizzata per un esame universitario.
L' idea è quella di realizzare una piccola pagina riguardante un servizio di trasporto ferroviario, con la possibilità di:
  -Visualizzare le corse che vanno da città "x" a città "y"
  -Prenotare un posto per la corsa "z"
  -Creare, visualizzare, aggiornare ed eliminare un treno ed i suoi relativi dati. (CRUD Operations)
  -Scegliere un utente specifico per eseguire la prenotazione
  -Simulare un meccanismo di login (privo di protezione)
  -Come per i treni creare, visualizzare, aggiornare ed eliminare un utente "k" a scelta
  -Visualizzare lo storico delle prenotazioni
  -Visualizzare la lista delle prenotazioni dell'utente "k" la cui email è "j"
  -Visualizzare la lista delle prenotazioni per la corsa "z"
---
## Strumenti:
La web app è stata realizzata con:
  -PostgreSQL
  -Spring Boot (IDE IntelliJ Idea)
  -Angular (IDE Visual Studio Code)
---
## Struttura:
Parliamo di una Single Page App (SPA), che presenta nell header un logo e due bottoni "Home" e "Gestione".

SEZIONE HOME:
Nella home abbiamo la possibilità di selezionare uno degli utenti disponibili nel db preso per email, eseguire il login,
cercare un treno che vada da città "x" a città "y" e prenotare la relativa corsa.
Sono stati implementati meccanismi per evitare che si effettui una prenotazione se nessun utente è stato selezionato o se
i posti disponibili sono pari a zero. Il tutto è contornato da vari dialog che chiedono conferma ed informano l'utente su
eventuali problemi.
facendo click su prenota, verrà scalato automaticamente il contatore dei posti disponibili della relativa corsa.
NOTA:
Non sono implementati meccanismi di locking, ma si è fatto uso solo della notazione @Transactional.

SEZIONE GESTIONE:
Si è fatto uso di Nested Routes che riportano a:
  -Gestione Treni 
  -Gestione Utenti
  -Gestione Prenotazioni
  
  GESTIONE TRENI:
  Qui abbiamo la possibiltà di visualizzare tutti i treni disponibili, di aggiornarne alcuni campi ed eventualmente di
  eliminare una corsa, e di creare un nuovo treno.
  Attenzione durante la creazione perchè alcuni campi devono essere obbligatoriamente specificati o non possono sussistere
  duplicati.
  
  GESTIONE UTENTI:
  Simile alla gestione treni.
  
  GESTIONE PENOTAZIONI:
  Lista dello storico mostra tutte le prenotazioni, sono stati inseriti due bottoni mostra e nascondi da sfruttare in casi 
  in cui la lista sia troppo lunga, di default la visualizzazzione è posta a false.
  Vi è la possibilità poi di vedere le prenotazioni per utente preso per email o per treno preso per numero corsa.
  NOTA:
  Elencare gli utenti per come è stato fatto non è un ottima idea poichè per una lista di ad esempio mille utenti, la selezione 
  risulterebbe difficile.
  
La web app proposta è distaccata dall'idea di una vera e propia web app che potrebbe essere effettivamente utilizzata, ma è
stata realizzata a scopo di apprendimento e test delle varie funzionalità che spring ed angular offrono.
(Il design infatti è assente e si è fatto uso di  poche e semplici linee di codice scss).
