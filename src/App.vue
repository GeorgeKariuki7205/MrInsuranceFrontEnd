<template>
  <v-app>
    <transition
      v-if="navigationViewGetter"
      name="custom-classes-transition2"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <router-view></router-view>
    </transition>
    <div v-else>
      <v-container class="fill-height" style="margin-top:10%">
        <v-row align="center" justify="center">
          <h2 style="color:#29ab87;">Getting Mr Insurance Ready.</h2>
        </v-row>

        <v-row align="center" justify="center">
          <atom-spinner
            :animation-duration="1000"
            :size="150"
            :color="'#29ab87'"
          />
        </v-row>
        <v-row align="center" justify="center">
          <h4 style="color:#29ab87;">Just A Second</h4>
          <hollow-dots-spinner
            :animation-duration="1000"
            :dot-size="10"
            :dots-num="4"
            color="#29ab87"
          />
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { AtomSpinner } from "epic-spinners";
import { HollowDotsSpinner } from "epic-spinners";
import { mapGetters } from "vuex";
// import User from '../src/Classes/User'
import "animate.css";
export default {
  name: "App",

  components: {
    AtomSpinner,
    HollowDotsSpinner,
  },
  computed: {
    ...mapGetters(["navigationViewGetter"]),
  },
  created() {
    // ! immedietly the application is run, get all the navigation components
    // const UserInstance = new User();
    // User.sampleFunction();
    var obj = {};    
    console.log(localStorage.getItem('name') + '  This is the name.');    
    if (this.$route.name ==='ActivatingAccount') {
      obj['status'] = true;
      obj['uuid'] = this.$route.params.uuid;
      this.$store.dispatch("getAllNavigationComponents",obj);
      console.log("This is the param.",this.$route.params);
    } else {
      this.$store.dispatch("getAllNavigationComponents",false);
    }
    
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 5s ease;
}
</style>
