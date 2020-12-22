<template>
  <v-app>
    <v-app-bar flat color="white" dark app>
      <v-btn @click="goback" text color="primary">
        <v-icon>arrow_back</v-icon>
        Go Back.
      </v-btn>      
    </v-app-bar>
    <v-main>
      <v-container>
        <h2 style="text-decoration: underline;" class="text-center">
          <span v-if="premiumsDataGetter[0].subCategory">
            {{ premiumsDataGetter[0].subCategory }}
          </span>
          Covers Retrieved For Cover Amount Of:
          <span style="color: green; type: bold;">
            {{
              premiumsDataGetter[0].coveredAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </span>
        </h2>
        <h4 class="text-center">
          {{ premiumsDataGetter.length }} Premiums Found.
        </h4>

        <template class="mt-4" v-for="(premium, index) in premiumsDataGetter">
          <insurance-component-health-premium-card
            :premium="premium"
            :key="index + 'premium'"
          />
        </template>
      </v-container>

      <section-partners-offering-a-specific-insurance-cover />
      <section-how-it-works />
      <section-keep-in-touch />
      <section-newsletter />
      <ucore-settings/>
      <section-info />
    </v-main>
    <ucore-footer />
  </v-app>
</template>

<script>
import router from "../../router";
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default {
  methods: {
    generateUUID() {
      return uuidv4();
    },
    addAdditionCover(additionalPremiumID) {
      // ! creating the object to hold the additional Cover details.
      var obj = {};
      obj["additionalId"] = this.additionalId;
      obj["premiumUUID"] = this.premiumUUID;
      obj["additionalPremiumID"] = additionalPremiumID;
      this.$store.dispatch("activatingAdditionalCovers", obj);
    },
    goback() {
      router.go(-1);
    },
    showCostBreakDown() {
      this.show = false;
      this.costBreakDown = !this.costBreakDown;
    },
    showMoreDetails() {
      this.show = !this.show;
      this.costBreakDown = false;
    },
  },
  computed: {
    ...mapGetters([
      "navigationCoverGetter",
      "navigationStateGetter",
      "navigationSubCategory",
      "personalDetailsStatusGetter",
      "premiumsDataGetter",
      "premiumsDataStatusGetter",
      "financialBreakdownStateGetter",
      "payableAmountStateGetter",
      "additionalCoversPremiumStateGetter",
    ]),
  },
  data: () => ({
    show: false,
    costBreakDown: false,
    morebenefits: true,
  }),
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
