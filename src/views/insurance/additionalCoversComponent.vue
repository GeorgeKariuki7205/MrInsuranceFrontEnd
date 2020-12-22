<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";

import { v4 as uuidv4 } from "uuid";

export default {
  props: ["additional", "additionalId", "premiumUUID"],
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
};
</script>

<style></style>
