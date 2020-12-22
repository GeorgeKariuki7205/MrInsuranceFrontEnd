<template>
  <div>
    <template v-for="(additional, index) in premium.additionalCovers">
      <div :key="index + 'additionalCovers'" class="ma-4">
        <h2
          :key="index + 'additionalCoversHeading'"
          style="color: black; text-align: center"
        >
          {{ additional.name }}
        </h2>

        <h3
          :key="index + 'HeadingForPremiums'"
          style="color: black; text-align: center"
        >
          Premuims For
          {{ additional.name.toLowerCase() }}
        </h3>
      </div>
      <v-row :key="index + 'additionalCoversTable'">
        <v-col md="8" offset-md="2">
          <v-simple-table>
            <thead>
              <tr v-if="premium.cover.name === 'Motor Insurance'">
                <th>ID</th>
                <th>Rate</th>
                <th>Cost</th>
                <th>Purchase</th>
              </tr>
              <tr v-else>
                <th>ID</th>
                <th>Cover Limit</th>
                <th>Cost</th>
                <th>Purchase</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="premium.cover.name === 'Motor Insurance'">
                <template v-if="additional.rate">
                  <tr :key="index + 'TableRow'">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ additional.rate }}
                    </td>
                    <td>
                      {{ (additional.rate * premium.vehicleCost) / 100 }}
                    </td>
                    <td>
                      <v-btn
                        small
                        outlined
                        color="primary"
                        dark
                        @click="
                          addAdditionCover(
                            additional.insurance_cover_id,
                            additional.id,
                            premium.uuid,
                            (additional.rate * premium.vehicleCost) / 100,
                            additional.name.toLowerCase()
                          )
                        "
                      >
                        Add To Cover.
                        <v-icon>add_shopping_cart</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </template>
              <template v-else>
                <template
                  v-for="(additionalPremium,
                  index) in additional.additional_premia"
                >
                  <tr :key="index + 'TableRow'">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{
                        additionalPremium.limit
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Ksh"
                      }}
                    </td>
                    <td>
                      {{
                        additionalPremium.cost
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Ksh"
                      }}
                      <span>Per Individual</span>
                    </td>
                    <td>
                      <v-btn
                        small
                        outlined
                        color="primary"
                        dark
                        @click="
                          addAdditionCover(
                            additionalPremium.id,
                            additional.id,
                            premium.uuid,
                            additionalPremium.cost,
                            additional.name.toLowerCase()
                          )
                        "
                      >
                        Add To Cover.
                        <v-icon>add_shopping_cart</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  props: ["premium"],
  data: () => ({
    snackbar: false,
    text: "You Want To Purchase The Cover.",
  }),
  methods: {
    generateUUID() {
      return uuidv4();
    },
    addAdditionCover(
      additionalPremiumID,
      additionalId,
      premiumUUID,
      cost,
      name
    ) {
      var snackBarObj = {};
      snackBarObj["status"] = true;
      snackBarObj["name"] = name;
      snackBarObj["cost"] = cost;

      this.$store.dispatch(
        "updatingStatusOfAdditionalCoverSnackbar",
        snackBarObj
      );

      // ! creating the object to hold the additional Cover details.
      var obj = {};
      obj["additionalId"] = additionalId;
      obj["premiumUUID"] = premiumUUID;
      obj["additionalPremiumID"] = additionalPremiumID;
      this.$store.dispatch("activatingAdditionalCovers", obj);

      // ! on click, update the cost that is involved in the addition of the
      var amountsPayableUpdatDetails = {};
      amountsPayableUpdatDetails["premiumUUId"] = premiumUUID;
      amountsPayableUpdatDetails["cost"] = cost;

      this.$store.dispatch("updatePayableAmount", amountsPayableUpdatDetails);

      var addObj = {};
      addObj["uuid"] = premiumUUID;
      addObj["additionId"] = additionalId;
      addObj["name"] = name;
      addObj["description"] = "";
      addObj["value"] =
        cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
      addObj["activity"] = "add";
      this.$store.dispatch("updatingTheFinancialBreakDown", addObj);
    },
  },
};
</script>

<style></style>
