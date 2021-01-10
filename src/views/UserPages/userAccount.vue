<template>
  <v-app>
    <ucore-app-bar />
    <v-main>
      <h1 class="text-center">User Logged In.</h1>
      {{ userPurchasesStateGetter }}
      <section-partners />
      <section-all-covers />
      <section-how-it-works />
      <section-contact-us />
      <ucore-settings />
      <section-info />
    </v-main>
    <ucore-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
// import { HollowDotsSpinner } from "epic-spinners";
export default {
  name: "UserAccount",
  components: {
    // HollowDotsSpinner,
  },
  created() {
    this.$store.commit("UPDATING_USERS_NAME", localStorage.getItem("name"));
    this.$store.commit(
      "UPDATING_USERS_FIRST_NAME",
      localStorage.getItem("firstName")
    );
    this.$store.commit(
      "UPDATING_USERS_SECOND_NAME",
      localStorage.getItem("lastName")
    );
    this.$store.commit(
      "UPDATING_USERS_PHONE_NUMBER",
      localStorage.getItem("phoneNumber")
    );
    this.$store.commit(
      "UPDATING_USERS_EMAIL_ADDRESS",
      localStorage.getItem("emailAddress")
    );
  },
  props: [],
  methods: {},
  data() {
    return {};
  },
  provide: {
    theme: { isDark: true },
  },

  computed: {
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? "10vh" : "50vh";

      return `calc(${height} - ${this.$vuetify.application.top}px)`;
    },
    ...mapGetters(["userPurchasesStateGetter"]),
  },
};
</script>
