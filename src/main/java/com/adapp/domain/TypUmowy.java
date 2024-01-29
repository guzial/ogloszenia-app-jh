package com.adapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TypUmowy.
 */
@Entity
@Table(name = "typ_umowy")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TypUmowy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tekst")
    private String tekst;

    @JsonIgnoreProperties(value = { "seniority", "typUmowy", "wystawca", "tags" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "typUmowy")
    private Ogloszenie ogloszenie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TypUmowy id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTekst() {
        return this.tekst;
    }

    public TypUmowy tekst(String tekst) {
        this.setTekst(tekst);
        return this;
    }

    public void setTekst(String tekst) {
        this.tekst = tekst;
    }

    public Ogloszenie getOgloszenie() {
        return this.ogloszenie;
    }

    public void setOgloszenie(Ogloszenie ogloszenie) {
        if (this.ogloszenie != null) {
            this.ogloszenie.setTypUmowy(null);
        }
        if (ogloszenie != null) {
            ogloszenie.setTypUmowy(this);
        }
        this.ogloszenie = ogloszenie;
    }

    public TypUmowy ogloszenie(Ogloszenie ogloszenie) {
        this.setOgloszenie(ogloszenie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypUmowy)) {
            return false;
        }
        return getId() != null && getId().equals(((TypUmowy) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypUmowy{" +
            "id=" + getId() +
            ", tekst='" + getTekst() + "'" +
            "}";
    }
}
