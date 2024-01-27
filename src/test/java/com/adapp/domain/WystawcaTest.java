package com.adapp.domain;

import static com.adapp.domain.OgloszenieTestSamples.*;
import static com.adapp.domain.WystawcaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.adapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class WystawcaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Wystawca.class);
        Wystawca wystawca1 = getWystawcaSample1();
        Wystawca wystawca2 = new Wystawca();
        assertThat(wystawca1).isNotEqualTo(wystawca2);

        wystawca2.setId(wystawca1.getId());
        assertThat(wystawca1).isEqualTo(wystawca2);

        wystawca2 = getWystawcaSample2();
        assertThat(wystawca1).isNotEqualTo(wystawca2);
    }

    @Test
    void ogloszeniaTest() throws Exception {
        Wystawca wystawca = getWystawcaRandomSampleGenerator();
        Ogloszenie ogloszenieBack = getOgloszenieRandomSampleGenerator();

        wystawca.addOgloszenia(ogloszenieBack);
        assertThat(wystawca.getOgloszenias()).containsOnly(ogloszenieBack);
        assertThat(ogloszenieBack.getWystawca()).isEqualTo(wystawca);

        wystawca.removeOgloszenia(ogloszenieBack);
        assertThat(wystawca.getOgloszenias()).doesNotContain(ogloszenieBack);
        assertThat(ogloszenieBack.getWystawca()).isNull();

        wystawca.ogloszenias(new HashSet<>(Set.of(ogloszenieBack)));
        assertThat(wystawca.getOgloszenias()).containsOnly(ogloszenieBack);
        assertThat(ogloszenieBack.getWystawca()).isEqualTo(wystawca);

        wystawca.setOgloszenias(new HashSet<>());
        assertThat(wystawca.getOgloszenias()).doesNotContain(ogloszenieBack);
        assertThat(ogloszenieBack.getWystawca()).isNull();
    }
}
