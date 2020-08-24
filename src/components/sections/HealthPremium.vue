<template style="margin-bottom:2%">
  <v-card class="mx-auto" style="background-color: #fffbe6;">
    <v-list-item>
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
                payableAmountStateGetter[premium.uuid]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
              Ksh
      </v-btn>
      <v-btn color="primary" @click="snackbar = true" dark medium>
        <v-icon>add_shopping_cart</v-icon>Get Cover.</v-btn
      >
       <v-snackbar
                v-model="snackbar"
                app
                color="primary"
                top
                right
              >
                {{ text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
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
    <v-card-actions >
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
                    There are No Additional Coverr Related To This Premium.
                  </h2>
                </template>
                <template v-else>
                  <v-row align="center" justify="center">
                    <template
                      v-if="additionalCoversPremiumStateGetter === null"
                    >
                      <health-component-additional-covers-with-null-value
                        :premium="premium"
                      />
                    </template>
                    <template v-else>                      
                      <template v-for="(additionalCoversInObject,i) in additionalCoversPremiumStateGetter">
                        <template v-if="additionalCoversInObject.premiumUUID === premium.uuid">
                          <template v-for="(additional,index) in premium.additionalCovers">
                            <template v-if="additional.id ===additionalCoversInObject.additionalId">
                              <div :key="index + 'divForDescription' + i" class="ma-4">
                                <h2 style="color: black; text-align: center;">{{ additional.name }}</h2>
                                <h3 style="color: black; text-align: center;">Premuims For The{{ additional.name.toLowerCase() }}</h3>
                              </div>
                              <table :key="index + i">
                                <tr>
                                  <th>ID</th>
                                  <th>Limit</th>
                                  <th>Cost</th>
                                  <th>Action</th>
                                </tr>
                                <template v-for="(additionalPremium,index) in additional.additional_premia">
                                  <tr :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                      {{additionalPremium.limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") + " Ksh"}}
                                    </td>
                                    <td>
                                      {{additionalPremium.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") + " Ksh"}}
                                    </td>
                                    <template v-if="additionalPremium.id === additionalCoversInObject.additionalPremiumID">
                                      <td class="text-center">
                                        <v-btn @click="removingAdditionalCover(premium.uuid,additionalPremium.cost)" small outlined color="red" dark> Remove <v-icon>remove_circle</v-icon></v-btn>
                                      </td>
                                    </template>
                                    <template v-else>
                                      <p class="text-center" style="color:blue;">Not Available</p>
                                    </template>
                                  </tr>
                                </template>
                              </table>
                            </template>
                          </template>
                        </template>
                      </template>
                      <template v-for="(additionalNotSelected,i) in premium.additionalCovers">
                         <template v-for="(additionalCoverNotSelected,index) in otherAdditionalCovers">
                          <template v-if="additionalCoverNotSelected.id === additionalNotSelected.id">
                              <div :key="index + 'divForDescription' + i" class="ma-4">
                                <h2 style="color: black; text-align: center;">{{ additionalNotSelected.name }}</h2>
                                <h3 style="color: black; text-align: center;">Premuims For The{{ additionalNotSelected.name.toLowerCase() }}</h3>
                              </div>
                              <table :key="index + i">
                                <tr>
                                  <th>ID</th>
                                  <th>Limit</th>
                                  <th>Cost</th>
                                  <th>Action</th>
                                </tr>
                                <template v-for="(additionalPremiumNotelected,index) in additionalNotSelected.additional_premia">
                                  <tr :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                      {{additionalPremiumNotelected.limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") + " Ksh"}}
                                    </td>
                                    <td>
                                      {{additionalPremiumNotelected.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") + " Ksh"}}
                                    </td>
                                     <td>
                                        <v-btn
                                          small
                                          outlined
                                          color="primary"
                                          dark
                                          @click="addAdditionCover(additionalPremiumNotelected.id,additionalCoverNotSelected.id,premium.uuid,additionalPremiumNotelected.cost)"
                                        >
                                          Add To Cover.
                                          <v-icon>add_shopping_cart</v-icon>
                                        </v-btn>
                                      </td>                                    
                                  </tr>
                                </template>
                              </table>  
                          </template>
                      </template>
                      </template>
                     

                      <!-- THIS SECTION IS USED TO IMPLEMENT THE OTHER ADDITIONALS THAT ARE NOT COVERED PREVIOUSLY. -->

                      <template> </template>
                    </template>
                  </v-row>
                </template>
              </v-card-text>
            </v-card>
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
import { mapGetters } from "vuex";
export default {
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
  methods:{
     removingAdditionalCover(premiumUUID,cost){
        var obj = {};
        obj['premium'] = premiumUUID;
        obj['cost'] = cost;
        this.$store.dispatch("updateTheAdditionalCover",obj)
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
  data: () => ({
    show: false,
    otherAdditionalCovers: null,
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
    snackbar: false,
    text: 'You Want To Purchase The Cover.',  
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
    watch: {
    additionalCoversPremiumStateGetter: function() {      
      // ! this section is used to update the otherAdditionalCovers array.
      var newOtherAdditional = {};
      var count = 0;
      var count2 = 0;
        
        for (const prop in  this.premium.additionalCovers) {
            console.log(prop);
           ++count;
        }  

        for (const prop in  this.additionalCoversPremiumStateGetter) {
          console.log(prop);
           ++count2;
        }
      
        var qualifier = count-count2;
        var counter = 0;
        console.log("This is the counter." + qualifier);

      for (const additionalCover in this.premium.additionalCovers) {
              
              

              var checker = 0;

              for (const additionalCoverSelected in this.additionalCoversPremiumStateGetter) {
                
                if (this.premium.additionalCovers[additionalCover]['id'] !== this.additionalCoversPremiumStateGetter[additionalCoverSelected]['additionalId']) {
                  ++checker;
                }              
              }
              
              if (checker == qualifier) {                 
                newOtherAdditional[checker] =this.premium.additionalCovers[additionalCover]
              }

              counter+1;
      }

      this.otherAdditionalCovers = newOtherAdditional;
      
    },
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
