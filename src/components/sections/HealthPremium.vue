<template style="margin-bottom:2%">
  <v-card class="mx-auto">
    <v-list-item style="background-color:#F0F0F0;">
      <v-list-item-content>
        <v-list-item-title>
          <h3>
            Company :
            <span style="color:green"> {{ premium.company.name }} </span>
          </h3>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item
          >Cover Limit:
          {{
            premium.coveredAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</v-list-item
        >
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-btn text color="success darken-4">
        Payable:
        {{
          premium.payableCash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
        Ksh
      </v-btn>
      <v-btn color="primary" dark medium>
        <v-icon>add_shopping_cart</v-icon>Get Cover.</v-btn
      >
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col md="4" class="text-center">
            <h4 style="color:black" class="text-center">Company :</h4>
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.7"
              max-height="100px"
              max-width="100px"
              class="text-center;"
            ></v-img>
            <h3 style="color:black">
              <span style="color:green"> {{ premium.company.name }} </span>
            </h3>
          </v-col>
          <v-col md="4">
            <h4 style="color:black" class="text-center">Benefits</h4>
            <template v-if="premium.coverBenefits.length > 0">
              <ol type="number">
                <template
                  v-for="(coverBenefit, index) in premium.coverBenefits"
                >
                  <li v-if="index <= 4 && morebenefits" :key="index+'coverBenefit'">
                    {{ coverBenefit.name }}
                  </li>
                  <template v-if="!morebenefits">
                    <li :key="index+'coverBenefitsList'">
                      {{ coverBenefit.name }}
                    </li>
                  </template>
                </template>
                <template class="text-center;">
                  <a
                    @click="morebenefits = !morebenefits"
                    style="text-decoration:null;text-align:center;color:orange"
                  >
                    <span v-if="morebenefits">Click To View More.</span>
                    <span v-else>Click To View Less.</span>
                  </a>
                </template>
              </ol>
            </template>
          </v-col>
          <v-col md="4" class="text-center">
            <h4 style="color:black" class="text-center">Cost Break Down.</h4>

            <!-- THIS IS THE SECTION THAT IS USED TO IMPLEMENT THE COST BREAKDOWN OF THE INSURANCE COVER. -->
            <div style="text-align:center;">
              <v-data-table
                :headers="headers"
                :items="data"
                hide-default-footer
              ></v-data-table>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions style="background-color:#F0F0F0;">
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="show = !show">
        {{ show ? "Show Less" : "Show More" }}
      </v-btn>
    </v-card-actions>
    <v-expand-transition style="background-color:red;">
      <div class="basil" style="background-color:red;" v-show="show">
        <v-divider></v-divider>
        <v-tabs centered icons-and-text>
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
            <v-container>
              <v-card flat>
                <v-card-text>
                  <!-- Additional Covers Implementations. -->
                  <h3 style="color:black" class="text-center">
                    Aditional Covers Related To The Insurance Premium.
                  </h3>
                  <template v-if="premium.additionalCovers.length < 1">
                    <h2 ma-4 class="text-center" style="color:black;">
                      There are No Additional Coverr Related To This Premium.
                    </h2>
                  </template>
                  <template v-else>
                    <v-container>
                      <template
                        v-for="(additional, index) in premium.additionalCovers"
                      >
                        <h2 :key="index+'additionalCovers'" style="color:black;text-align:center;">
                          {{ additional.name }}
                        </h2>

                        <h3 :key="index+'additionalCoversName'" style="color:black;text-align:center;">
                          Premuims For The {{ additional.name.toLowerCase() }}
                        </h3>
                        <v-row
                          :key="index+'additionalCoversRow'"
                          align="center"
                          justify="center"
                          class="my-5"
                          my-4
                        >
                          <table :key="index+'additionalCoversTable'">
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
                              <tr :key="index+'additionalPremium'">
                                <td>{{ index + 1 }}</td>
                                <td>
                                  {{
                                    premium.limit
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " Ksh"
                                  }}
                                </td>
                                <td>
                                  {{
                                    premium.cost
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " Ksh"
                                  }}
                                  <span>Per Individual</span>
                                </td>
                                <td>
                                  <v-btn small color="success" dark
                                    >Add To Cover.
                                    <v-icon>add_shopping_cart</v-icon></v-btn
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
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-container ma-4>
                  <h3 style="color:black" class="text-center">
                    Insurance Cover Benefits
                  </h3>
                  <v-row                    
                    align="center"
                    justify="center"
                    class="my-5"
                    my-4
                  >
                    <table>
                      <tr>
                        <th>ID</th>
                        <th>Benefit</th>
                        <th>Limit</th>
                      </tr>
                      <template
                        v-for="(coverBenefit, index) in premium.coverBenefits"
                      >
                        <tr :key="index+'coverBenefitsTr'">
                          <td>{{ index + 1 }}</td>
                          <td>
                            {{ coverBenefit.name }}
                          </td>
                          <td v-if="coverBenefit.type_of_benefit == 1">
                            {{
                              coverBenefit.amount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Ksh"
                            }}
                          </td>
                        </tr>
                      </template>
                    </table>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-container ma-4>
                  <h3 style="color:black" class="text-center">
                    Conditions Not Covered.
                  </h3>
                  <v-row                    
                    align="center"
                    justify="center"
                    class="my-5"
                    my-4
                  >
                    <table >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Benefit</th>
                        </tr>
                      </thead>

                      <template
                        v-for="(notCovered, index) in premium.notCovered"
                      >
                        <tr :key="index+'notCoveredTr'">
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
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-container ma-4>
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
                      align="center"
                      justify="center"
                      class="my-5"
                      my-4
                    >
                      <table>
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
                          <tr :key="index+'waitingPeriod'">
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
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
    morebenefits: true,
    headers: [
      {
        text: "Individual",
        align: "start",
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Amount", value: "value" },
    ],
    data: null,

    // ! health benefits table definition.
  }),
  props: ["premium"],
  created() {
    // ! after the creation of the component, create the array that will hold the
    // ! data to be looped as the financial breakdown.
    var financialBreakDownArray = [];

    var principal_memberDetails = {};
    principal_memberDetails["name"] = "Principal Member";
    principal_memberDetails["description"] = " ' ' ";
    principal_memberDetails["value"] =
      this.premium.financialBreakDown.principal_member
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";

    if (this.premium.financialBreakDown.spouse) {
      var spouse_details = {};
      spouse_details["name"] = "Spouse";
      spouse_details["value"] =
        this.premium.financialBreakDown.spouse
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
      spouse_details["description"] = " ' ' ";
      financialBreakDownArray[1] = spouse_details;
    }

    if (this.premium.financialBreakDown.dependents) {
      var dependents_details = {};
      dependents_details["name"] = "Children";
      dependents_details["value"] =
        (
          this.premium.financialBreakDown.dependents.dependant *
          parseInt(
            this.premium.financialBreakDown.dependents.number_of_dependents
          )
        )
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
      dependents_details["description"] =
        this.premium.financialBreakDown.dependents.number_of_dependents +
        " Dependants Each  " +
        this.premium.financialBreakDown.dependents.dependant
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "Ksh";
      financialBreakDownArray[2] = dependents_details;
    }

    financialBreakDownArray[0] = principal_memberDetails;
    this.data = financialBreakDownArray;
    console.log("This is the data that is being passed to the Data array.");
    console.log(this.data);
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
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
