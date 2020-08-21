<template>
  <v-app>
    <ucore-app-bar />
    <v-main>
      <v-container>
        <v-btn @click="goback" text color="primary">
          <v-icon>arrow_back</v-icon> Go Back.
        </v-btn>

        <h2 style="text-decoration:underline;" class="text-center">
          <span v-if="premiumsDataGetter[0].subCategory">{{
            premiumsDataGetter[0].subCategory
          }}</span>
          Covers Retrieved For Cover Amount Of:
          <span style="color:green;type:bold;">{{
            premiumsDataGetter[0].coveredAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </h2>
        <h4 class="text-center">
          {{ premiumsDataGetter.length }} Premiums Found.
        </h4>

        <template class="mt-4" v-for="(premium, index) in premiumsDataGetter">
          <v-card
            style="background-color:#FFFBE6"
            class="mx-auto mt-4"
            :key="index"
          >
            <v-list-item>
              <!-- <v-list-item-avatar color="grey"></v-list-item-avatar> -->
              <v-list-item-avatar color="orange" size="50">
                <span class="white--text headline">CM</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline"
                  >Our Changing Planet</v-list-item-title
                >
                <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              Visit ten places on our planet that are undergoing the biggest
              changes today.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Cost BreakDown
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="show = !show">
                {{ show ? "Hide Premium Details" : "Show Premium Details" }}
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-tabs show-arrows centered icons-and-text>
                  <v-tab>
                    Additonal Covers.
                    <v-icon left>add_circle</v-icon>
                  </v-tab>
                  <v-tab active-class>
                    Benefits
                    <v-icon left>beach_access</v-icon>
                  </v-tab>
                  <v-tab>
                    What's Not Covered.
                    <v-icon left>error_outline</v-icon>
                  </v-tab>
                  <v-tab>
                    Waiting Periods.
                    <v-icon left>alarm</v-icon>
                  </v-tab>

                  <v-tab-item>
                    <!-- <v-container> -->
                    <v-card flat>
                      <v-card-text>
                        <!-- Additional Covers Implementations. -->
                        <h3 style="color:black" class="text-center">
                          Aditional Covers Related To The Insurance Premium.
                        </h3>
                        <template v-if="premium.additionalCovers.length < 1">
                          <h2 ma-4 class="text-center" style="color:black;">
                            There are No Additional Coverr Related To This
                            Premium.
                          </h2>
                        </template>
                        <template v-else>
                          <v-container>
                            <template
                              v-for="(additional,
                              index) in premium.additionalCovers"
                            >
                              <h2
                                :key="index"
                                style="color:black;text-align:center;"
                              >
                                {{ additional.name }}
                              </h2>

                              <h3
                                :key="index"
                                style="color:black;text-align:center;"
                              >
                                Premuims For The
                                {{ additional.name.toLowerCase() }}
                              </h3>
                              <v-row
                                :key="index"
                                align="center"
                                justify="center"
                                class="my-5"
                                my-4
                              >
                                <table :key="index">
                                  <tr>
                                    <th>ID</th>
                                    <th>Cover Limit</th>
                                    <th>Cost</th>
                                    <th>Purchase</th>
                                  </tr>
                                  <template
                                    v-for="(premium,
                                    index) in additional.additional_premia"
                                  >
                                    <tr :key="index">
                                      <td>{{ index + 1 }}</td>
                                      <td>
                                        {{
                                          premium.limit
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            ) + " Ksh"
                                        }}
                                      </td>
                                      <td>
                                        {{
                                          premium.cost
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            ) + " Ksh"
                                        }}
                                        <span>Per Individual</span>
                                      </td>
                                      <td>
                                        <v-btn small color="success" dark
                                          >Add To Cover.
                                          <v-icon
                                            >add_shopping_cart</v-icon
                                          ></v-btn
                                        >
                                      </td>
                                    </tr>
                                  </template>
                                </table>
                              </v-row>
                            </template>
                          </v-container>
                        </template>
                      </v-card-text>
                    </v-card>
                    <!-- </v-container> -->
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- <v-container> -->
                          <h3 style="color:black" class="text-center">
                            Insurance Cover Benefits
                          </h3>
                          <v-row
                            :key="index"
                            align="center"
                            justify="center"                            
                          >
                            <table :key="index">
                              <tr>
                                <th>ID</th>
                                <th>Benefit</th>
                                <th>Limit</th>
                              </tr>
                              <template
                                v-for="(coverBenefit,
                                index) in premium.coverBenefits"
                              >
                                <tr :key="index">
                                  <td>{{ index + 1 }}</td>
                                  <td>
                                    {{ coverBenefit.name }}
                                  </td>
                                  <td v-if="coverBenefit.type_of_benefit == 1">
                                    {{
                                      coverBenefit.amount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                        " Ksh"
                                    }}
                                  </td>
                                </tr>
                              </template>
                            </table>
                          </v-row>
                        <!-- </v-container> -->
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- <v-container ma-4> -->
                          <h3 style="color:black" class="text-center">
                            Conditions Not Covered.
                          </h3>
                          <v-row
                            :key="index"
                            align="center"
                            justify="center"                                                        
                          >
                            <table :key="index">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Benefit</th>
                                </tr>
                              </thead>

                              <template
                                v-for="(notCovered,
                                index) in premium.notCovered"
                              >
                                <tr :key="index">
                                  <td>{{ index + 1 }}</td>
                                  <td>
                                    {{ notCovered.name }}
                                  </td>
                                </tr>
                              </template>
                              <tfoot>
                                <tr>
                                  <th>ID</th>
                                  <th>Benefit</th>
                                </tr>
                              </tfoot>
                            </table>
                          </v-row>
                        <!-- </v-container> -->
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- <v-container> -->
                          <h4 style="color:black" class="text-center">
                            Insurance Cover Waiting Periods.
                          </h4>
                          <template v-if="premium.waitingPeriod.length < 1">
                            <h4 style="color:black" class="text-center">
                              No Waiting Periods.
                            </h4>
                          </template>
                          <template v-else>
                            <v-row
                              :key="index"
                              align="center"
                              justify="center"                              
                            >
                              <table :key="index">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Condition</th>
                                    <th>Waiting Period</th>
                                  </tr>
                                </thead>

                                <template
                                  v-for="(waitingPeriod,
                                  index) in premium.waitingPeriod"
                                >
                                  <tr :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                      {{ waitingPeriod.situation }}
                                    </td>
                                    <td>
                                      {{
                                        waitingPeriod.period_amount +
                                          waitingPeriod.period_time
                                      }}
                                    </td>
                                  </tr>
                                </template>
                              </table>
                            </v-row>
                          </template>
                        <!-- </v-container> -->
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-expand-transition>
          </v-card>
        </template>
      </v-container>

      <section-partners-offering-a-specific-insurance-cover />
      <section-how-it-works />
      <section-keep-in-touch />
      <section-newsletter />
      <section-info />
    </v-main>
    <ucore-footer />
  </v-app>
</template>

<script>
import router from "../../router";
import { mapGetters } from "vuex";
export default {
  methods: {
    goback() {
      router.go(-1);
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
    ]),
  },
  data: () => ({
    show: false,
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
