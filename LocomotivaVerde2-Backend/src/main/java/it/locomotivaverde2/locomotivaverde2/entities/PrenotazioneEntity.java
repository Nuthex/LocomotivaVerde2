package it.locomotivaverde2.locomotivaverde2.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "prenotazione")
public class PrenotazioneEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;


    @Basic
    @Column(name = "compratore", nullable = false)
    private int compratore;

    @Basic
    @Column(name = "email", nullable = false, length = 30)
    private String email;

    @Basic
    @Column(name = "treno", nullable = false)
    private int treno;

    @Basic
    @Column(name = "corsa", nullable = false)
    private int corsa;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCompratore() {
        return compratore;
    }

    public void setCompratore(int compratore) {
        this.compratore = compratore;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTreno() {
        return treno;
    }

    public void setTreno(int treno) {
        this.treno = treno;
    }

    public int getCorsa() {
        return corsa;
    }

    public void setCorsa(int corsa) {
        this.corsa = corsa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PrenotazioneEntity that = (PrenotazioneEntity) o;
        return id == that.id &&
                compratore == that.compratore &&
                treno == that.treno &&
                corsa == that.corsa &&
                Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, compratore, email, treno, corsa);
    }
}
