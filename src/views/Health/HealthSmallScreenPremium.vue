<template>
  <v-app>
    <v-app-bar color="white" dark app>
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
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }}
          </span>
        </h2>
        <h4 class="text-center">
          {{ premiumsDataGetter.length }} Premiums Found.
        </h4>

        <template class="mt-4" v-for="(premium, index) in premiumsDataGetter">
          <v-card
            style="background-color: #fffbe6;"
            class="mx-auto mt-4"
            :key="index"
          >
            <v-list-item>
              <v-list-item-avatar color="orange" size="50">
                <span class="white--text headline">CM</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ premium['company']['name'] }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Cover Limit:
                  {{
                    premium.coveredAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }}
                  {{ 'Ksh' }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-text>
              <!-- THIS SECTION IS USED TO DISPLAY THE AMOUNT THAT IS PAYABLE. -->
              <div>
                <v-row>
                  <v-col>
                    <h4 class="float-left" style="color: green;">
                      Payable:
                      {{
                        payableAmountStateGetter[premium.uuid]
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }}
                      Ksh
                    </h4>
                  </v-col>
                  <v-col>
                    <v-btn
                      outlined
                      color="primary"
                      class="float-right"
                      dark
                      medium
                    >
                      <v-icon>add_shopping_cart</v-icon>
                      Get Cover.
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <div class="float-none">
                <h3 class="text-center ma-4" style="color: black;">
                  Premium Benefits.
                </h3>
              </div>

              <template v-if="premium.coverBenefits.length > 0">
                <ol type="number">
                  <template
                    v-for="(coverBenefit, index) in premium.coverBenefits"
                  >
                    <li v-if="index <= 3 && morebenefits" :key="index">
                      {{ coverBenefit.name }}
                    </li>
                    <template v-if="!morebenefits">
                      <li :key="index">{{ coverBenefit.name }}</li>
                    </template>
                  </template>
                  <template class="text-center;">
                    <a
                      @click="morebenefits = !morebenefits"
                      style="
                        text-decoration: null;
                        text-align: center;
                        color: orange;
                      "
                    >
                      <span v-if="morebenefits">Click To View More.</span>
                      <span v-else>Click To View Less.</span>
                    </a>
                  </template>
                </ol>
              </template>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                @click="showCostBreakDown()"
                text
                color="deep-purple accent-4"
              >
                Cost Details
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="showMoreDetails()">
                {{ show ? 'Hide Premium Details' : 'Show Premium Details' }}
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
                    <v-card flat>
                      <v-card-text>
                        <!-- Additional Covers Implementations. -->
                        <h3 style="color: black;" class="text-center">
                          Aditional Covers Related To The Insurance Premium.
                        </h3>
                        <template v-if="premium.additionalCovers.length < 1">
                          <h2
                            class="text-center ma-4"
                            style="color: blue; font-family: 'Times New Roman';"
                          >
                            There are No Additional Coverr Related To This
                            Premium.
                          </h2>
                        </template>
                        <template v-else>
                          <!-- <h2>We Have Premiums.</h2> -->
                          <!-- {{additionalCoversPremiumStateGetter['8185d29e-80a3-4f43-9274-7432f38fe502']}} -->
                          <template
                            v-if="additionalCoversPremiumStateGetter === null"
                          >
                            <v-row align="center" justify="center">
                              <template
                                v-for="(additional,
                                index) in premium.additionalCovers"
                              >
                                <div :key="index + generateUUID()" class="ma-4">
                                  <h2
                                    :key="index + generateUUID()"
                                    style="color: black; text-align: center;"
                                  >
                                    {{ additional.name }}
                                  </h2>

                                  <h3
                                    :key="index + generateUUID()"
                                    style="color: black; text-align: center;"
                                  >
                                    Premuims For The
                                    {{ additional.name.toLowerCase() }}
                                  </h3>
                                </div>

                                <template
                                  v-for="(additional,
                                  index) in premium.additionalCovers"
                                >
                                  <table :key="index + generateUUID">
                                    <tr>
                                      <th>ID</th>
                                      <th>Cover Limit</th>
                                      <th>Cost</th>
                                      <th>Purchase</th>
                                    </tr>
                                    <template
                                      v-for="(additionalPremium,
                                      index) in additional.additional_premia"
                                    >
                                      <tr :key="index + generateUUID">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{
                                            additionalPremium.limit
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ',',
                                              ) + ' Ksh'
                                          }}
                                        </td>
                                        <td>
                                          {{
                                            additionalPremium.cost
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ',',
                                              ) + ' Ksh'
                                          }}
                                          <span>Per Individual</span>
                                        </td>

                                        <!-- THIS SECTION  IS USED TO IMPLEMENT THE ADD TO COVER, SO AS TO ACTIVATE OR DEACTIVATE THE BUTTON BASED ON SELECTION. -->
                                        <template
                                          v-if="
                                            additionalCoversPremiumStateGetter ===
                                            null
                                          "
                                        >
                                          <td>
                                            <v-btn
                                              small
                                              outlined
                                              color="primary"
                                              dark
                                              @click="
                                                addAdditionCover(
                                                  additionalPremium.id,
                                                )
                                              "
                                            >
                                              Add To Cover.
                                              <v-icon>add_shopping_cart</v-icon>
                                            </v-btn>
                                          </td>
                                        </template>
                                      </tr>
                                    </template>
                                  </table>
                                </template>
                              </template>
                            </v-row>
                          </template>
                          <template v-else>
                            <p>
                              additionalCoversPremiumStateGetter id not null.
                            </p>
                          </template>
                        </template>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- <v-container> -->
                        <h3 style="color: black;" class="text-center">
                          Insurance Cover Benefits
                        </h3>
                        <v-row :key="index" align="center" justify="center">
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
                                <td>{{ coverBenefit.name }}</td>
                                <td v-if="coverBenefit.type_of_benefit == 1">
                                  {{
                                    coverBenefit.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                                    ' Ksh'
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
                        <h3 style="color: black;" class="text-center">
                          Conditions Not Covered.
                        </h3>
                        <v-row :key="index" align="center" justify="center">
                          <table :key="index">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Benefit</th>
                              </tr>
                            </thead>

                            <template
                              v-for="(notCovered, index) in premium.notCovered"
                            >
                              <tr :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ notCovered.name }}</td>
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
                        <h4 style="color: black;" class="text-center">
                          Insurance Cover Waiting Periods.
                        </h4>
                        <template v-if="premium.waitingPeriod.length < 1">
                          <h4 style="color: black;" class="text-center">
                            No Waiting Periods.
                          </h4>
                        </template>
                        <template v-else>
                          <v-row :key="index" align="center" justify="center">
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
                                  <td>{{ waitingPeriod.situation }}</td>
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
            <v-expand-transition class="my-4 mb-4">
              <div
                v-show="costBreakDown"
                class="mb-4"
                style="margin-bottom: 2%;"
              >
                <h4 class="text-center mb-2">Financial BreakDown.</h4>
                <v-row align="center" justify="center">
                  <table style="margin-bottom: 2%;">
                    <tr>
                      <th>Member</th>
                      <th>Decsription</th>
                      <th>Cost</th>
                    </tr>
                    <template
                      v-for="(financial,
                      index) in financialBreakdownStateGetter[premium.uuid]"
                    >
                      <tr :key="index">
                        <td>{{ financial.name }}</td>
                        <td>{{ financial.description }}</td>
                        <td>{{ financial.value }}</td>
                      </tr>
                    </template>
                  </table>
                </v-row>
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
import router from '../../router'
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
  methods: {
    generateUUID() {
      return uuidv4()
    },
    addAdditionCover(additionalPremiumID) {
      // ! creating the object to hold the additional Cover details.
      var obj = {}
      obj['additionalId'] = this.additionalId
      obj['premiumUUID'] = this.premiumUUID
      obj['additionalPremiumID'] = additionalPremiumID
      this.$store.dispatch('activatingAdditionalCovers', obj)
    },
    goback() {
      router.go(-1)
    },
    showCostBreakDown() {
      this.show = false
      this.costBreakDown = !this.costBreakDown
    },
    showMoreDetails() {
      this.show = !this.show
      this.costBreakDown = false
    },
  },
  computed: {
    ...mapGetters([
      'navigationCoverGetter',
      'navigationStateGetter',
      'navigationSubCategory',
      'personalDetailsStatusGetter',
      'premiumsDataGetter',
      'premiumsDataStatusGetter',
      'financialBreakdownStateGetter',
      'payableAmountStateGetter',
      'additionalCoversPremiumStateGetter',
    ]),
  },
  data: () => ({
    show: false,
    costBreakDown: false,
    morebenefits: true,
  }),
}
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
