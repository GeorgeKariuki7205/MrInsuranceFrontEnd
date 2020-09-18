<template>
  <base-section id="features">
    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col
            v-for="(covers,index) in navigationStateGetter"
            :key="index"
            cols="12"
            sm="4"
            md="3"            
          >            
            <a @click="clicked(covers)" target="_blank" rel="noopener noreferrer">
              <base-insurance-info-card
              align="center"
              dark              
              :covers="covers"              
            />
            </a>                        
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
import router from '../../router'
import Heading from "@/mixins/heading";
export default {
  mixins: [Heading],
  name: "SectionFeatures",
  computed: {
    ...mapGetters(["navigationStateGetter"]),
  },
  methods: {
    clicked(data){
      var index = this.navigationStateGetter.indexOf(data);
      console.log("I have Been Clicked."+index);
      router.push({ name: data.route_name})
      this.$store.dispatch("updatingTheCoverIndex",index);

    }
  },
  data: () => ({}),
};
</script>
