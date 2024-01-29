package com.adapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Seniority.
 */
@Entity
@Table(name = "seniority")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Seniority implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nazwa")
    private String nazwa;

    @JsonIgnoreProperties(value = { "seniority", "typUmowy", "wystawca", "tags" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "seniority")
    private Ogloszenie ogloszenie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Seniority id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return this.nazwa;
    }

    public Seniority nazwa(String nazwa) {
        this.setNazwa(nazwa);
        return this;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Ogloszenie getOgloszenie() {
        return this.ogloszenie;
    }

    public void setOgloszenie(Ogloszenie ogloszenie) {
        if (this.ogloszenie != null) {
            this.ogloszenie.setSeniority(null);
        }
        if (ogloszenie != null) {
            ogloszenie.setSeniority(this);
        }
        this.ogloszenie = ogloszenie;
    }

    public Seniority ogloszenie(Ogloszenie ogloszenie) {
        this.setOgloszenie(ogloszenie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Seniority)) {
            return false;
        }
        return getId() != null && getId().equals(((Seniority) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Seniority{" +
            "id=" + getId() +
            ", nazwa='" + getNazwa() + "'" +
            "}";
    }
}
