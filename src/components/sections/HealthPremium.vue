<template style="margin-bottom:2%">
  <v-card class="mx-auto" style="background-color: #eeeeee">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h3>
            Company :
            <span style="color: green"> {{ premium.company.name }} </span>
          </h3>
        </v-list-item-title>
      </v-list-item-content>
      <!-- <v-list-item-content>
        <v-list-item
          >Cover Limit:
          {{
            premium.coveredAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</v-list-item
        >
      </v-list-item-content> -->
      <v-spacer></v-spacer>
      {{ premium.uuid }}
      <h3 class="mx-auto error--text">
        Payable:
        {{
          payableAmountStateGetter[premium.uuid]
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
        Ksh
      </h3>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col md="2" class="text-center">
            <h3 style="color: green">
              <span> {{ premium.company.name }} </span>
            </h3>
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.7"
              max-height="100px"
              max-width="100px"
              class="text-center;"
            ></v-img>
          </v-col>
          <v-col md="6">
            <h2 style="color: black" class="text-center">Benefits</h2>
            <template v-if="this.premium.coverBenefits.length > 0">
              <v-row align-content="center">
                <template
                  v-for="(coverBenefit, index) in this.premium.coverBenefits"
                >
                  <!-- GETTING ONLY SIX OF THE RELATED BENEFIT TO PREVENT THE OVER CROWDING. -->
                  <v-col
                    class="mb-n8 mx-auto"
                    v-if="index <= 5"
                    align="center"
                    justify="center"
                    :key="index + 'Column'"
                    md="4"
                  >
                    <p
                      class="font-weight-black text-center"
                      style="color: black"
                    >
                      {{
                        coverBenefit.name.charAt(0).toUpperCase() +
                        coverBenefit.name.substr(1).toLowerCase()
                      }}
                    </p>
                    <p style="color: black" class="text-center">
                      {{
                        coverBenefit.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}
                      /=Ksh
                    </p>
                  </v-col>
                </template>
              </v-row>
            </template>
          </v-col>
          <v-col md="4">
            <h2 style="color: black" class="text-center">Cost Break Down.</h2>

            <!-- THIS IS THE SECTION THAT IS USED TO IMPLEMENT THE COST BREAKDOWN OF THE INSURANCE COVER. -->
            <div style="text-align: center">
              <table>
                <tr>
                  <th style="color: black">Name</th>
                  <th style="color: black">Desciption</th>
                  <th style="color: black">Value</th>
                </tr>
                <template
                  v-for="(financialBreakdown,
                  indexFinancialBreakdown) in financialBreakdownStateGetter[
                    premium.uuid
                  ]"
                >
                  <tr :key="indexFinancialBreakdown + 'tableRow'">
                    <td>{{ financialBreakdown.name }}</td>
                    <td>{{ financialBreakdown.description }}</td>
                    <td>{{ financialBreakdown.value }}</td>
                  </tr>
                </template>
                <tr>
                  <td><b>Total</b></td>
                  <td></td>
                  <td>
                    {{
                      payableAmountStateGetter[premium.uuid]
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                    Ksh
                  </td>
                </tr>
              </table>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="bounce-2 box" color="primary" text @click="show = !show">
        <v-icon v-if="!show">expand_more</v-icon>
        <v-icon v-else> expand_less</v-icon>
        {{ show ? "Close Insurance Details. " : "Show Insurance Details." }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="error" @click="show = !show" dark medium>
        <v-icon>add</v-icon>Add More Benefits</v-btn
      >
      <v-btn
        large
        outlined
        color="error"
        medium
        dark
        @click="checkingOutCover()"
      >
        <v-icon>shopping_cart</v-icon>
        Checkout Cover.
      </v-btn>

      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="800" scrollable>
            <v-card>
              <v-card-title class="headline" style="backgroung-color: red">
                <h5 style="text-align: center; overflow-wrap: anywhere">
                  Hey
                  {{
                    personalDetailsGetter.firstName.charAt(0).toUpperCase() +
                    personalDetailsGetter.firstName.substr(1).toLowerCase()
                  }}, Kindly Confirm The Details Below To Purchase The Cover:
                </h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div>
                  <transition-group
                    style="margin-top: 10%"
                    name="custom-classes-transition2"
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutLeft"
                  >
                    <!-- THE DIV IS USED TO IDENTIFY THE DETAILS OF THE UER AND ALSO THE PERSONAL AND THE INSURANCE COVER DETAILS. -->
                    <div
                      key="firstDivInTransitionGroup"
                      v-if="!visibilityOfPaymentOption"
                    >
                      <div>
                        <!-- THIS IS THE SECTION THAT IS USED TO ADD THE DEATILS TO BE CONFIRMED:  -->
                        <div class="ma-4" style="margin-bottom: 10%">
                          <h2
                            class="float-left"
                            style="color: black; display: inline"
                          >
                            1. Personal Details:
                          </h2>
                          <v-btn
                            v-if="
                              !editingPersonalDetailsOnPurchasingModalGetter
                            "
                            @click="
                              activatingEditingPersonalDetailsInCheckingOutCover()
                            "
                            small
                            text
                            style="color: green; align: right"
                          >
                            <v-icon size="18" color="green">edit</v-icon>
                            <span style="font-size: 12px"
                              >Edit Personal Details</span
                            >
                          </v-btn>
                          <v-btn
                            v-if="editingPersonalDetailsOnPurchasingModalGetter"
                            @click="savingEditedPersonalDeailsOnCheckOutCover()"
                            small
                            text
                            style="color: red"
                          >
                            <v-icon size="18" color="red">save</v-icon>
                            <span style="font-size: 12px"
                              >Save Personal Details</span
                            >
                          </v-btn>
                          <v-snackbar
                            v-model="snackbar"
                            app
                            color="green"
                            top
                            centered
                            multi-line
                          >
                            <p>
                              <v-icon>check_circle</v-icon> Saved Succesfully.
                            </p>
                          </v-snackbar>
                          <span style="clear: all" class="float-none"></span>
                          <span
                            style="display: block"
                            class="float-none"
                          ></span>
                        </div>

                        <!-- CONFIRMING THE PERSONAL DETAILS OF THE USER. -->
                        <div class="ma-8" style="clear: all; display: block">
                          <h4
                            class="ml-8"
                            style="color: black; display: inline-block"
                          >
                            <b>First Names: </b>
                          </h4>

                          <h5
                            style="display: inline-block"
                            v-if="
                              !editingPersonalDetailsOnPurchasingModalGetter
                            "
                            class="ml-4"
                          >
                            {{
                              personalDetailsGetter.firstName
                                .charAt(0)
                                .toUpperCase() +
                              personalDetailsGetter.firstName
                                .substr(1)
                                .toLowerCase()
                            }}
                          </h5>
                          <v-text-field
                            v-if="editingPersonalDetailsOnPurchasingModalGetter"
                            style="display: inline-block"
                            class="ml-4"
                            height="10"
                            :rules="nameRules"
                            v-model="firstNameVModel"
                            dense
                            counter
                            label="Your First Name"
                            outlined
                            prepend-inner-icon="account_box"
                            :value="firstNameVModel"
                          ></v-text-field>
                          <span style="display: block"></span>
                          <h4
                            style="color: black; display: inline-block"
                            class="ml-8"
                          >
                            <b>Second Name: </b>
                          </h4>
                          <h5
                            style="display: inline-block"
                            class="ml-4"
                            v-if="
                              !editingPersonalDetailsOnPurchasingModalGetter
                            "
                          >
                            {{
                              personalDetailsGetter.secondName
                                .charAt(0)
                                .toUpperCase() +
                              personalDetailsGetter.secondName
                                .substr(1)
                                .toLowerCase()
                            }}
                          </h5>
                          <v-text-field
                            v-if="editingPersonalDetailsOnPurchasingModalGetter"
                            style="display: inline-block"
                            class="ml-4"
                            prepend-inner-icon="account_box"
                            counter
                            dense
                            label="Your Second Name"
                            v-model="secondNameVModel"
                            outlined
                            :rules="nameRules"
                            :value="secondNameVModel"
                          ></v-text-field>
                          <span style="display: block"></span>
                          <h4
                            style="color: black; display: inline-block"
                            class="ml-8"
                          >
                            <b>Email Address: </b>
                          </h4>
                          <h5
                            style="display: inline-block"
                            class="ml-4"
                            v-if="
                              !editingPersonalDetailsOnPurchasingModalGetter
                            "
                          >
                            {{ personalDetailsGetter.email_address }}
                          </h5>
                          <v-text-field
                            style="display: inline-block"
                            v-if="editingPersonalDetailsOnPurchasingModalGetter"
                            class="ml-4"
                            :rules="emailRules"
                            counter
                            dense
                            required
                            v-model="emailAddresVModel"
                            label="Email Address"
                            outlined
                            prepend-inner-icon="email"
                            :value="emailAddresVModel"
                          ></v-text-field>
                          <span style="display: block"></span>
                          <h4
                            style="color: black; display: inline-block"
                            class="ml-8"
                          >
                            <b>Phone Number: </b>
                          </h4>
                          <h5
                            style="display: inline-block"
                            class="ml-4"
                            v-if="
                              !editingPersonalDetailsOnPurchasingModalGetter
                            "
                          >
                            {{ personalDetailsGetter.phoneNumber }}
                          </h5>
                          <v-text-field
                            v-if="editingPersonalDetailsOnPurchasingModalGetter"
                            style="display: inline-block"
                            class="ml-4"
                            :rules="RequiredPhoneNumber"
                            :counter="10"
                            required
                            dense
                            v-model="phoneNumberVModel"
                            label="Phone Number"
                            maxlength="10"
                            type="tel"
                            outlined
                            prepend-inner-icon="call"
                            :value="phoneNumberVModel"
                          ></v-text-field>
                        </div>
                      </div>
                      <div>
                        <h2 style="color: black">
                          2. Insurance Cover Details:
                        </h2>

                        <span style="display: block"></span>
                        <h4
                          style="color: black; display: inline-block"
                          class="ml-8"
                        >
                          <b>1. Cover: </b>
                        </h4>
                        <h5 style="display: inline-block" class="ml-4">
                          {{ this.premium.cover.name }}
                        </h5>

                        <span style="display: block"></span>
                        <h4
                          style="color: black; display: inline-block"
                          class="ml-8"
                        >
                          <b>2. Insurance SubCategory: </b>
                        </h4>
                        <h5 style="display: inline-block" class="ml-4">
                          {{ this.premium.subCategory }}
                        </h5>

                        <span style="display: block"></span>
                        <h4
                          style="color: black; display: inline-block"
                          class="ml-8"
                        >
                          <b>3. Company : </b>
                        </h4>
                        <h5 style="display: inline-block" class="ml-4">
                          {{ this.premium.company.name }}
                        </h5>

                        <span style="display: block"></span>
                        <h4 style="color: black" class="ml-8">
                          <b>4.Cost Breakdwown : </b>
                        </h4>
                        <div style="text-align: center">
                          <table>
                            <tr>
                              <th style="color: black">Name</th>
                              <th style="color: black">Desciption</th>
                              <th style="color: black">Value</th>
                            </tr>
                            <template
                              v-for="(financialBreakdown,
                              indexFinancialBreakdown) in financialBreakdownStateGetter[
                                premium.uuid
                              ]"
                            >
                              <tr :key="indexFinancialBreakdown + 'tableRow'">
                                <td>{{ financialBreakdown.name }}</td>
                                <td>{{ financialBreakdown.description }}</td>
                                <td>{{ financialBreakdown.value }}</td>
                              </tr>
                            </template>
                            <tr>
                              <td><b>Total</b></td>
                              <td></td>
                              <td>
                                {{
                                  payableAmountStateGetter[premium.uuid]
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                                Ksh
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>

                    <!-- THE DIV BELOW IS USED TO DEFINE THE PAYMENTS SECTION OF THE INSURANCE COVER BY MPESA:  -->
                    <div
                      v-else
                      key="secondDivInPayemntTransition"
                      class="ma-4 text-center"
                      style="text-align: center"
                    >
                      <h2 style="color: black" class="text-center">
                        Payments In This Platform Are Processed Via MPESA.
                      </h2>
                      <h2></h2>
                      <h2 style="color: blue">
                        MPESA DETAILS: AMOUNT:
                        {{
                          payableAmountStateGetter[premium.uuid]
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                        Ksh
                      </h2>
                      <h3 style="color: black" class="text-center">
                        Kindly Make Sure Your Phone With A Safaricom Line Is
                        Next To You, We will be sending an STK Push Request To
                        Complete This Transaction.
                      </h3>

                      <v-btn class="mt-8" outlined x-large color="success">
                        Send MPESA STK PUSH TO :
                        {{ personalDetailsGetter.phoneNumber }}
                        <v-icon>send</v-icon></v-btn
                      >
                    </div>
                  </transition-group>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="red darken-1" large text @click="dialog = false">
                  <v-icon>close</v-icon> Close
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  large
                  text
                  @click="proceedToPayments()"
                >
                  PROCEED TO PAYMENT. <v-icon>arrow_forward_ios</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card-actions>
    <v-expand-transition style="background-color: red">
      <div class="basil" v-show="show">
        <!-- <v-card color="basil" v-show="show" flat> -->
        <v-divider></v-divider>
        <v-tabs style="background-color: red" centered icons-and-text>
          <v-tab>
            Additonal Benefits.
            <v-icon left>add_circle</v-icon>
          </v-tab>
          <v-tab active-class>
            Premium Benefits
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
                <!-- ! THIS IS THE SNACK BAR THAT IS USED FOR THE ADDITION OF THE ADDITINAL COVERS TO AN INSURANCE PREMOIM.! -->
                <v-snackbar
                  v-model="additionalCoverSnackBarGetter.status"
                  app
                  color="success"
                  top
                  centered
                  multi-line
                >
                  <p>
                    <v-icon>check_circle</v-icon> You Have Added The Additional
                    Cover: <b>{{ additionalCoverSnackBarGetter.name }}</b> At A
                    Cost Of: <b>{{ additionalCoverSnackBarGetter.cost }}</b>
                  </p>
                </v-snackbar>

                <v-snackbar
                  v-model="removingCoverSnackBarGetter.status"
                  app
                  color="orange"
                  top
                  centered
                  multi-line
                >
                  <p>
                    <v-icon>cancel</v-icon>
                    You Have Removed The Additional Cover:
                    <b>{{ removingCoverSnackBarGetter.name }}</b>
                  </p>
                </v-snackbar>

                <!-- Additional Covers Implementations. -->
                <h3 style="color: black" class="text-center">
                  Aditional Covers Related To The Insurance Premium.

                  <template v-if="additionalCoversPremiumStateGetter">
                  </template>
                  <template v-else> No additional selected. </template>
                </h3>
                <template v-if="premium.additionalCovers.length < 1">
                  <h2
                    class="text-center ma-4"
                    style="color: blue; font-family: 'Times New Roman'"
                  >
                    There are No Additional Coverr Related To This Premium.
                  </h2>
                </template>
                <template v-else>
                  <v-row align="center" justify="center">
                    <template
                      v-if="
                        additionalCoversPremiumStateGetter[premium.uuid] ===
                        null
                      "
                    >
                      <health-component-additional-covers-with-null-value
                        :premium="premium"
                      />
                    </template>
                    <template v-else>
                      <template>
                        <template
                          v-for="(additionalCoversInObject,
                          indexOne) in additionalCoversPremiumStateGetter[
                            premium.uuid
                          ]"
                        >
                          <template
                            v-if="
                              additionalCoversInObject.premiumUUID ===
                              premium.uuid
                            "
                          >
                            <template
                              v-for="(additional,
                              index) in premium.additionalCovers"
                            >
                              <template
                                v-if="
                                  additional.id ===
                                  additionalCoversInObject.additionalId
                                "
                              >
                                <div
                                  :key="index + indexOne + index + 'div'"
                                  class="ma-4"
                                >
                                  <h2 style="color: black; text-align: center">
                                    {{ additional.name }}
                                  </h2>
                                  <h3 style="color: black; text-align: center">
                                    Premuims For The{{
                                      additional.name.toLowerCase()
                                    }}
                                  </h3>
                                </div>
                                <table
                                  :key="index + indexOne + index + 'table'"
                                >
                                  <tr
                                    v-if="
                                      premium.cover.name === 'Motor Insurance'
                                    "
                                  >
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
                                  <template
                                    v-if="
                                      premium.cover.name === 'Motor Insurance'
                                    "
                                  >
                                    <template v-if="additional.rate">
                                      <tr :key="index + 'TableRow'">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{ additional.rate }}
                                        </td>
                                        <td>
                                          {{
                                            (additional.rate *
                                              premium.vehicleCost) /
                                            100
                                          }}
                                        </td>
                                        <td>
                                          <v-btn
                                            @click="
                                              removingAdditionalCover(
                                                premium.uuid,
                                                (additional.rate *
                                                  premium.vehicleCost) /
                                                  100,
                                                additional.id,
                                                additional.name.toLowerCase()
                                              )
                                            "
                                            small
                                            outlined
                                            color="red"
                                            dark
                                          >
                                            Remove
                                            <v-icon
                                              >remove_circle</v-icon
                                            ></v-btn
                                          >
                                        </td>
                                      </tr>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <template
                                      v-for="(additionalPremium,
                                      index) in additional.additional_premia"
                                    >
                                      <tr :key="index + 'tableRow'">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                          {{
                                            additionalPremium.limit
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              ) + " Ksh"
                                          }}
                                        </td>
                                        <td>
                                          {{
                                            additionalPremium.cost
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              ) + " Ksh"
                                          }}
                                        </td>
                                        <template
                                          v-if="
                                            additionalPremium.id ===
                                            additionalCoversInObject.additionalPremiumID
                                          "
                                        >
                                          <td class="text-center">
                                            <v-btn
                                              @click="
                                                removingAdditionalCover(
                                                  premium.uuid,
                                                  additionalPremium.cost,
                                                  additional.id,
                                                  additional.name
                                                )
                                              "
                                              small
                                              outlined
                                              color="red"
                                              dark
                                            >
                                              Remove
                                              <v-icon
                                                >remove_circle</v-icon
                                              ></v-btn
                                            >
                                          </td>
                                        </template>
                                        <template v-else>
                                          <p
                                            class="text-center"
                                            style="color: blue"
                                          >
                                            Not Available
                                          </p>
                                        </template>
                                      </tr>
                                    </template>
                                  </template>
                                </table>
                              </template>
                            </template>
                          </template>
                        </template>
                        <template
                          v-for="(additionalNotSelected,
                          index) in insurancePremiumAdditionalCoversGetter[
                            premium.uuid
                          ]"
                        >
                          <!-- {{ additionalNotSelected }} -->
                          <div :key="index + 'divNotSelected'" class="ma-4">
                            <h2 style="color: black; text-align: center">
                              {{ additionalNotSelected.name }}
                            </h2>
                            <h3 style="color: black; text-align: center">
                              Premuims For
                              {{ additionalNotSelected.name.toLowerCase() }}
                            </h3>
                          </div>
                          <table :key="index + 'tableNotSelected'">
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

                            <template
                              v-if="premium.cover.name === 'Motor Insurance'"
                            >
                              <tr>
                                <td>1</td>
                                <td>{{ additionalNotSelected.rate }}</td>
                                <td>
                                  {{(additionalNotSelected.rate *
                                            premium.vehicleCost) /
                                          100, }}
                                </td>
                                <td>
                                  <v-btn
                                    small
                                    outlined
                                    color="primary"
                                    dark
                                    @click="
                                      addAdditionCover(
                                        additionalNotSelected.insurance_cover_id,
                                        additionalNotSelected.id,
                                        premium.uuid,
                                        (additionalNotSelected.rate *
                                          premium.vehicleCost) /
                                          100,
                                        additionalNotSelected.name.toLowerCase()
                                      )
                                    "
                                  >
                                    Add To Cover.
                                    <v-icon>add_shopping_cart</v-icon>
                                  </v-btn>
                                </td>
                              </tr>
                            </template>
                            <template v-else>
                              <template
                                v-for="(additionalPremiumNotelected,
                                index) in additionalNotSelected.additional_premia"
                              >
                                <tr :key="index + 'rowNotSelected'">
                                  <td>{{ index + 1 }}</td>
                                  <td>
                                    {{
                                      additionalPremiumNotelected.limit
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " Ksh"
                                    }}
                                  </td>
                                  <td>
                                    {{
                                      additionalPremiumNotelected.cost
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      " Ksh"
                                    }}
                                  </td>
                                  <td>
                                    <v-btn
                                      small
                                      outlined
                                      color="primary"
                                      dark
                                      @click="
                                        addAdditionCover(
                                          additionalPremiumNotelected.id,
                                          additionalNotSelected.id,
                                          premium.uuid,
                                          additionalPremiumNotelected.cost,
                                          additionalNotSelected.name.toLowerCase()
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
                          </table>
                        </template>
                      </template>
                      <!-- LOOPING THROUGH THE SELECTED ADDITIONAL COVERS. -->
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
                  <h3 style="color: black" class="text-center">
                    Insurance Cover Benefits
                  </h3>
                  <v-row align="center" justify="center" class="my-5" my-4>
                    <table>
                      <tr>
                        <th>ID</th>
                        <th>Benefit</th>
                        <th>Limit</th>
                      </tr>
                      <template
                        v-for="(coverBenefit, index) in this.premium
                          .coverBenefits"
                      >
                        <tr :key="index + 'coverBenefitsTr'">
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
                <template v-if="!this.premium.notCovered">
                  <p>Everything is covered.</p>
                </template>
                <v-container v-else ma-4>
                  <h3 style="color: black" class="text-center">
                    Conditions Not Covered.
                  </h3>
                  <v-row align="center" justify="center" class="my-5" my-4>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Benefit</th>
                        </tr>
                      </thead>

                      <template
                        v-for="(notCovered, index) in premium.notCovered"
                      >
                        <tr :key="index + 'notCoveredTr'">
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
                <template></template>
                <v-container ma-4>
                  <h4 style="color: black" class="text-center">
                    Insurance Cover Waiting Periods.
                  </h4>
                  <template v-if="this.premium.waitingPeriod">
                    <template v-if="this.premium.waitingPeriod.length < 1">
                      <h4
                        style="color: black; text-align: center"
                        class="text-center"
                      >
                        No Waiting Periods.
                      </h4>
                    </template>
                    <template v-else>
                      <v-row align="center" justify="center" class="my-5" my-4>
                        <table>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Condition</th>
                              <th>Waiting Period</th>
                            </tr>
                          </thead>

                          <template
                            v-for="(waitingPeriod, index) in this.premium
                              .waitingPeriod"
                          >
                            <tr :key="index + 'waitingPeriod'">
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
                  </template>
                  <template v-else>
                    <h2 style="color: black; text-align: center">
                      There Are No Waiting Period.
                    </h2>
                  </template>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
      <!-- </v-card> -->
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import "animate.css";
export default {
  computed: {
    ...mapGetters([
      "navigationCoverGetter",
      "navigationStateGetter",
      "navigationSubCategory",
      "personalDetailsStatusGetter",
      "premiumsDataGetter",
      "personalDetailsGetter",
      "premiumsDataStatusGetter",
      "financialBreakdownStateGetter",
      "payableAmountStateGetter",
      "additionalCoversPremiumStateGetter",
      "insurancePremiumAdditionalCoversGetter",
      "additionalCoverSnackBarGetter",
      "removingCoverSnackBarGetter",
      "personalDetailsGetter",
      "editingPersonalDetailsOnPurchasingModalGetter",
    ]),
  },
  methods: {
    removingAdditionalCover(premiumUUID, cost, additionalId, name) {
      var snackBarObj = {};
      snackBarObj["status"] = true;
      snackBarObj["name"] = name;
      snackBarObj["cost"] = cost;

      this.$store.dispatch("updatingStatusOfRemovalCoverSnackbar", snackBarObj);

      var obj = {};
      obj["premium"] = premiumUUID;
      obj["cost"] = cost;
      obj["additionalId"] = additionalId;
      obj["value"] = cost;
      this.$store.dispatch("updateTheAdditionalCover", obj);

      var removeObj = {};
      removeObj["uuid"] = premiumUUID;
      removeObj["additionId"] = additionalId;
      removeObj["name"] = name;
      removeObj["description"] = "";
      removeObj["value"] =
        cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
      removeObj["activity"] = "remove";
      this.$store.dispatch("updatingTheFinancialBreakDown", removeObj);
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

      console.log("This is the ID of the premium Gotten: " + name);
      // ! creating the object to hold the additional Cover details.
      var obj = {};
      obj["additionalId"] = additionalId;
      obj["premiumUUID"] = premiumUUID;
      obj["additionalPremiumID"] = additionalPremiumID;
      obj["value"] = cost;

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
    checkingOutCover() {
      this.dialog = true;
      this.firstNameVModel = this.personalDetailsGetter["firstName"];
      this.secondNameVModel = this.personalDetailsGetter["secondName"];
      this.phoneNumberVModel = this.personalDetailsGetter["phoneNumber"];
      this.emailAddresVModel = this.personalDetailsGetter["email_address"];
    },

    activatingEditingPersonalDetailsInCheckingOutCover() {
      this.$store.dispatch(
        "editingPersonalDetailsOnPurchasingModalSetTrueAction"
      );
    },
    savingEditedPersonalDeailsOnCheckOutCover() {
      var personalDetailsEdited = {};
      personalDetailsEdited["phoneNumber"] = this.phoneNumberVModel;
      personalDetailsEdited["email_address"] = this.emailAddresVModel;
      personalDetailsEdited["firstName"] = this.firstNameVModel;
      personalDetailsEdited["secondName"] = this.secondNameVModel;
      this.$store.dispatch("updatingPersonalDetails", personalDetailsEdited);
      this.$store.commit("UPDATING_EDITING_PERONAL_DETAILS_ON_PURCHASE", false);
      this.snackbar = true;
    },
    proceedToPayments() {
      this.visibilityOfPaymentOption = true;
    },
  },
  data: () => ({
    countingThePremiumUUID: 0,
    snackbar: false,
    dialog: false,
    show: false,
    otherAdditionalCovers: null,
    visibilityOfPaymentOption: false,
    morebenefits: true,
    firstNameVModel: null,
    secondNameVModel: null,
    phoneNumberVModel: null,
    emailAddresVModel: null,
    headers: [
      {
        text: "Item",
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Amount", value: "value" },
    ],
    data: null,
    personalData: [],
    RequiredPhoneNumber: [
      (v) => !!v || "Phone Number is required",
      (v) =>
        (v && v.length <= 10) || "Phone Number must be less than 10 characters",

      (v) =>
        /^0(7(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/.test(v) ||
        "Phone Number must be valid",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be less than 3 characters",
    ],
  }),
  props: ["premium"],
  // created() {
  //   var financialBreakdownCounter = 0;
  //   if (this.premium.cover.id == 1) {
  //     // ! after the creation of the component, create the array that will hold the
  //     // ! data to be looped as the financial breakdown.
  //     var financialBreakDownArray = [];

  //     var principal_memberDetails = {};
  //     principal_memberDetails["uuid"] = "Principal Member";
  //     principal_memberDetails["additionId"] = "Principal Member";
  //     principal_memberDetails["name"] = "Principal Member";
  //     principal_memberDetails["description"] = " ' ' ";
  //     principal_memberDetails["value"] =
  //       this.premium.financialBreakDown.principal_member
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";

  //     financialBreakDownArray[
  //       financialBreakdownCounter
  //     ] = principal_memberDetails;
  //     if (this.premium.financialBreakDown.spouse) {
  //       var spouse_details = {};
  //       spouse_details["uuid"] = "Spouse";
  //       spouse_details["additionId"] = "Spouse";
  //       spouse_details["name"] = "Spouse";
  //       spouse_details["value"] =
  //         this.premium.financialBreakDown.spouse
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
  //       spouse_details["description"] = " ' ' ";
  //       financialBreakDownArray[financialBreakdownCounter + 1] = spouse_details;
  //     }

  //     if (this.premium.financialBreakDown.dependents) {
  //       var dependents_details = {};
  //       dependents_details["uuid"] = "Children";
  //       dependents_details["additionId"] = "Children";
  //       dependents_details["name"] = "Children";
  //       dependents_details["value"] =
  //         (
  //           this.premium.financialBreakDown.dependents.dependant *
  //           parseInt(
  //             this.premium.financialBreakDown.dependents.number_of_dependents
  //           )
  //         )
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
  //       dependents_details["description"] =
  //         this.premium.financialBreakDown.dependents.number_of_dependents +
  //         " Dependants Each  " +
  //         this.premium.financialBreakDown.dependents.dependant
  //           .toString()
  //           .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
  //         "Ksh";
  //       financialBreakDownArray[
  //         financialBreakdownCounter + 1
  //       ] = dependents_details;
  //     }
  //     this.$store.dispatch(
  //       "updatingFinancialBreakdown",
  //       financialBreakDownArray,this.premium.uuid
  //     );

  //   } else if (this.premium.cover.id == 2) {
  //     var financial_break_down_array = [];
  //     var motor_insurance_details = {};
  //     motor_insurance_details["uuid"] = this.premium.subCategory;
  //     motor_insurance_details["additionId"] = this.premium.subCategory;
  //     motor_insurance_details["name"] = this.premium.subCategory;
  //     motor_insurance_details["value"] =
  //       this.premium.amountPayable
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Ksh";
  //     motor_insurance_details["description"] = " ";
  //     financial_break_down_array[0] = motor_insurance_details;
  //     this.$store.dispatch(
  //       "updatingFinancialBreakdown",
  //       financial_break_down_array
  //     );
  //   }

  // },
  watch: {},
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}

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
