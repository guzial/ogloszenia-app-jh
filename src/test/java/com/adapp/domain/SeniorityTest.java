package com.adapp.domain;

import static com.adapp.domain.OgloszenieTestSamples.*;
import static com.adapp.domain.SeniorityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.adapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SeniorityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seniority.class);
        Seniority seniority1 = getSenioritySample1();
        Seniority seniority2 = new Seniority();
        assertThat(seniority1).isNotEqualTo(seniority2);

        seniority2.setId(seniority1.getId());
        assertThat(seniority1).isEqualTo(seniority2);

        seniority2 = getSenioritySample2();
        assertThat(seniority1).isNotEqualTo(seniority2);
    }

    @Test
    void ogloszenieTest() throws Exception {
        Seniority seniority = getSeniorityRandomSampleGenerator();
        Ogloszenie ogloszenieBack = getOgloszenieRandomSampleGenerator();

        seniority.setOgloszenie(ogloszenieBack);
        assertThat(seniority.getOgloszenie()).isEqualTo(ogloszenieBack);
        assertThat(ogloszenieBack.getSeniority()).isEqualTo(seniority);

        seniority.ogloszenie(null);
        assertThat(seniority.getOgloszenie()).isNull();
        assertThat(ogloszenieBack.getSeniority()).isNull();
    }
}
