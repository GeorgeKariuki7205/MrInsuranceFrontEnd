<template>
  <base-section id="features">
    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="covers in navigationStateGetter"
            :key="covers"
            cols="12"
            sm="4"
            md="3"            
          >
            <router-link class="text-decoration-none" to="/health">            
            <base-info-card
              align="center"
              dark              
              :covers="covers"
            />
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/mixins/heading";
export default {
  mixins: [Heading],
  name: "SectionFeatures",
  computed: {
    ...mapGetters(["navigationStateGetter"]),
  },
  methods: {},
  data: () => ({}),
};
</script>
