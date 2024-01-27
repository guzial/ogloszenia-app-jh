package com.adapp.domain;

import static com.adapp.domain.GrupaTagowTestSamples.*;
import static com.adapp.domain.TagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.adapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GrupaTagowTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrupaTagow.class);
        GrupaTagow grupaTagow1 = getGrupaTagowSample1();
        GrupaTagow grupaTagow2 = new GrupaTagow();
        assertThat(grupaTagow1).isNotEqualTo(grupaTagow2);

        grupaTagow2.setId(grupaTagow1.getId());
        assertThat(grupaTagow1).isEqualTo(grupaTagow2);

        grupaTagow2 = getGrupaTagowSample2();
        assertThat(grupaTagow1).isNotEqualTo(grupaTagow2);
    }

    @Test
    void tagTest() throws Exception {
        GrupaTagow grupaTagow = getGrupaTagowRandomSampleGenerator();
        Tag tagBack = getTagRandomSampleGenerator();

        grupaTagow.setTag(tagBack);
        assertThat(grupaTagow.getTag()).isEqualTo(tagBack);
        assertThat(tagBack.getGrupaTagow()).isEqualTo(grupaTagow);

        grupaTagow.tag(null);
        assertThat(grupaTagow.getTag()).isNull();
        assertThat(tagBack.getGrupaTagow()).isNull();
    }
}
