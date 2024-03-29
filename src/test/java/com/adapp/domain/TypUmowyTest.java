package com.adapp.domain;

import static com.adapp.domain.OgloszenieTestSamples.*;
import static com.adapp.domain.TypUmowyTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.adapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypUmowyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypUmowy.class);
        TypUmowy typUmowy1 = getTypUmowySample1();
        TypUmowy typUmowy2 = new TypUmowy();
        assertThat(typUmowy1).isNotEqualTo(typUmowy2);

        typUmowy2.setId(typUmowy1.getId());
        assertThat(typUmowy1).isEqualTo(typUmowy2);

        typUmowy2 = getTypUmowySample2();
        assertThat(typUmowy1).isNotEqualTo(typUmowy2);
    }

    @Test
    void ogloszenieTest() throws Exception {
        TypUmowy typUmowy = getTypUmowyRandomSampleGenerator();
        Ogloszenie ogloszenieBack = getOgloszenieRandomSampleGenerator();

        typUmowy.setOgloszenie(ogloszenieBack);
        assertThat(typUmowy.getOgloszenie()).isEqualTo(ogloszenieBack);
        assertThat(ogloszenieBack.getTypUmowy()).isEqualTo(typUmowy);

        typUmowy.ogloszenie(null);
        assertThat(typUmowy.getOgloszenie()).isNull();
        assertThat(ogloszenieBack.getTypUmowy()).isNull();
    }
}
