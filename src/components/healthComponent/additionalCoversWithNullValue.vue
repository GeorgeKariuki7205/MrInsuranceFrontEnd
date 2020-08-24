<template>

  <v-row align="center" justify="center">      
    <template v-for="(additional, index) in premium.additionalCovers">
      <div :key="index +'additionalCovers'" class="ma-4">
        <h2
          :key="index + 'additionalCoversHeading'"
          style="color: black; text-align: center;"
        >
          {{ additional.name }}
        </h2>

        <h3
          :key="index + 'HeadingForPremiums'"
          style="color: black; text-align: center;"
        >
          Premuims For The
          {{ additional.name.toLowerCase() }}
        </h3>
      </div>
      <table :key="index + 'additionalCoversTable'">
        <tr>
          <th>ID</th>
          <th>Cover Limit</th>
          <th>Cost</th>
          <th>Purchase</th>
        </tr>
        <template
          v-for="(additionalPremium, index) in additional.additional_premia"
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
                  @click="addAdditionCover(additionalPremium.id,additional.id,premium.uuid,additionalPremium.cost)"
                >
                  Add To Cover.
                  <v-icon>add_shopping_cart</v-icon>
                </v-btn>
              </td>            
          </tr>
        </template>
      </table>
    </template>
  </v-row>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  props: ["premium"],
  methods: {
    generateUUID() {
      return uuidv4();
    },
    addAdditionCover(additionalPremiumID,additionalId,premiumUUID,cost) {
      // ! creating the object to hold the additional Cover details.
      var obj = {};
      obj["additionalId"] = additionalId;
      obj["premiumUUID"] = premiumUUID;
      obj["additionalPremiumID"] = additionalPremiumID;
      this.$store.dispatch("activatingAdditionalCovers", obj);

      // ! on click, update the cost that is involved in the addition of the 
      var amountsPayableUpdatDetails = {};
      amountsPayableUpdatDetails['premiumUUId'] = premiumUUID;
      amountsPayableUpdatDetails["cost"] = cost;      

      this.$store.dispatch("updatePayableAmount",amountsPayableUpdatDetails);
      
    },
  },
};
</script>

<style></style>
