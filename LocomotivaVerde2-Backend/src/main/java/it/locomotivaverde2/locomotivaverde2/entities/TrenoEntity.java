package it.locomotivaverde2.locomotivaverde2.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "treno")
public class TrenoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "origine", nullable = false, length = 20)
    private String origine;

    @Basic
    @Column(name = "destinazione", nullable = false, length = 20)
    private String destinazione;

    @Basic
    @Column(name = "corsa", nullable = false, unique = true)
    private int corsa;

    @Basic
    @Column(name = "partenza", nullable = true)
    private Date partenza;

    @Basic
    @Column(name = "arrivo", nullable = true)
    private Date arrivo;

    @Basic
    @Column(name = "diretto", nullable = true)
    private boolean diretto;

    @Basic
    @Column(name = "postidisponibili", nullable = true)
    private int postidisponibili;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOrigine() {
        return origine;
    }

    public void setOrigine(String origine) {
        this.origine = origine;
    }

    public String getDestinazione() {
        return destinazione;
    }

    public void setDestinazione(String destinazione) {
        this.destinazione = destinazione;
    }

    public int getCorsa() {
        return corsa;
    }

    public void setCorsa(int corsa) {
        this.corsa = corsa;
    }

    public Date getPartenza() {
        return partenza;
    }

    public void setPartenza(Date partenza) {
        this.partenza = partenza;
    }

    public Date getArrivo() {
        return arrivo;
    }

    public void setArrivo(Date arrivo) {
        this.arrivo = arrivo;
    }

    public boolean isDiretto() {
        return diretto;
    }

    public void setDiretto(boolean diretto) {
        this.diretto = diretto;
    }

    public int getPostidisponibili() {
        return postidisponibili;
    }

    public void setPostidisponibili(int postidisponibili) {
        this.postidisponibili = postidisponibili;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrenoEntity that = (TrenoEntity) o;
        return id == that.id &&
                corsa == that.corsa &&
                diretto == that.diretto &&
                postidisponibili == that.postidisponibili &&
                Objects.equals(origine, that.origine) &&
                Objects.equals(destinazione, that.destinazione) &&
                Objects.equals(partenza, that.partenza) &&
                Objects.equals(arrivo, that.arrivo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, origine, destinazione, corsa, partenza, arrivo, diretto, postidisponibili);
    }
}