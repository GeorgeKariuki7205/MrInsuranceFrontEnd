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
            <h2 style="color: black" class="text-center">Cost Break Down. 2</h2>

            <!-- THIS IS THE SECTION THAT IS USED TO IMPLEMENT THE COST BREAKDOWN OF THE INSURANCE COVER. -->
            <div style="text-align: center">
              <v-simple-table style="background-color:#EEEEEE;">
                <thead>
                  <tr>
                    <th style="color: black">Name</th>
                    <th style="color: black">Desciption</th>
                    <th style="color: black">Value</th>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
              </v-simple-table>
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
          <v-dialog v-model="dialog" persistent max-width="950" scrollable>
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
                      <v-row>
                        <v-col md="6">
                          <v-card
                            style="padding-left: 5%; padding-right: 5%; padding-bottom: 5%;height: 100%;background-color:#F0FFFF"
                          >
                            <v-card-title
                              class="text-center justify-center"
                              style="width:100%;"
                            >
                              <b>1. Personal Details:</b>
                            </v-card-title>
                            <v-card-subtitle
                              style="color: black; text-align: center"
                            >
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
                                v-if="
                                  editingPersonalDetailsOnPurchasingModalGetter
                                "
                                @click="
                                  savingEditedPersonalDeailsOnCheckOutCover()
                                "
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
                                  <v-icon>check_circle</v-icon> Saved
                                  Succesfully.
                                </p>
                              </v-snackbar>
                            </v-card-subtitle>

                            <!-- CONFIRMING THE PERSONAL DETAILS OF THE USER. -->
                            <v-simple-table style="background-color:#F0FFFF">
                              <tbody>
                                <tr>
                                  <td>First Name:</td>
                                  <td>
                                    <b
                                      v-if="
                                        !editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                    >
                                      {{
                                        personalDetailsGetter.firstName
                                          .charAt(0)
                                          .toUpperCase() +
                                          personalDetailsGetter.firstName
                                            .substr(1)
                                            .toLowerCase()
                                      }}
                                    </b>
                                    <v-text-field
                                      style="margin-top:8px;margin-bottom:-20px"
                                      v-if="
                                        editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                      :rules="nameRules"
                                      v-model="firstNameVModel"
                                      dense
                                      label="Your First Name"
                                      outlined
                                      prepend-inner-icon="account_box"
                                      :value="firstNameVModel"
                                    ></v-text-field>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Second Name:
                                  </td>
                                  <td>
                                    <b
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
                                    </b>
                                    <v-text-field
                                      style="margin-top:8px;margin-bottom:-20px"
                                      v-if="
                                        editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                      prepend-inner-icon="account_box"
                                      dense
                                      label="Your Second Name"
                                      v-model="secondNameVModel"
                                      outlined
                                      :rules="nameRules"
                                      :value="secondNameVModel"
                                    ></v-text-field>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Email Address:
                                  </td>
                                  <td>
                                    <b
                                      v-if="
                                        !editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                    >
                                      {{ personalDetailsGetter.email_address }}
                                    </b>
                                    <v-text-field
                                      style="margin-top:8px;margin-bottom:-20px"
                                      v-if="
                                        editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                      :rules="emailRules"
                                      dense
                                      required
                                      v-model="emailAddresVModel"
                                      label="Email Address"
                                      outlined
                                      prepend-inner-icon="email"
                                      :value="emailAddresVModel"
                                    ></v-text-field>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Phone Number:
                                  </td>
                                  <td>
                                    <b
                                      v-if="
                                        !editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                    >
                                      {{ personalDetailsGetter.phoneNumber }}
                                    </b>
                                    <v-text-field
                                      style="margin-top:8px;margin-bottom:-20px"
                                      v-if="
                                        editingPersonalDetailsOnPurchasingModalGetter
                                      "
                                      :rules="RequiredPhoneNumber"
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
                                  </td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-card>
                        </v-col>
                        <v-col md="6">
                          <v-card
                            style="padding-left: 5%; padding-right: 5%; padding-bottom: 5%;height: 100%;background-color:#F0FFF0;"
                          >
                            <v-card-title
                              class="text-center justify-center"
                              style="width:100%;"
                            >
                              <b>2. Insurance Cover Details:</b>
                            </v-card-title>
                            <v-simple-table style="background-color:#F0FFF0;">
                              <tbody>
                                <tr>
                                  <td>
                                    Cover:
                                  </td>
                                  <td>
                                    <b>{{ this.premium.cover.name }}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Insurance SubCategory:
                                  </td>
                                  <td>
                                    <b> {{ this.premium.subCategory }}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Company</td>
                                  <td>
                                    <b> {{ this.premium.company.name }}</b>
                                  </td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-card>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col md="8" offset-md="2">
                          <v-card
                            style="padding-left: 5%; padding-right: 5%; padding-bottom: 5%;height: 100%;background-color:#FFFAFA;"
                          >
                            <v-card-title
                              class="text-center justify-center"
                              style="width:100%;"
                            >
                              <b>3. Financial Breakdown.</b>
                            </v-card-title>
                            <v-simple-table style="background-color:#FFFAFA;">
                              <thead>
                                <tr>
                                  <th style="color: black">Name</th>
                                  <th style="color: black">Desciption</th>
                                  <th style="color: black">Cost</th>
                                </tr>
                              </thead>
                              <tbody>
                                <template
                                  v-for="(financialBreakdown,
                                  indexFinancialBreakdown) in financialBreakdownStateGetter[
                                    premium.uuid
                                  ]"
                                >
                                  <tr
                                    :key="indexFinancialBreakdown + 'tableRow'"
                                  >
                                    <td>{{ financialBreakdown.name }}</td>
                                    <td>
                                      {{ financialBreakdown.description }}
                                    </td>
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
                              </tbody>
                            </v-simple-table>
                          </v-card>
                        </v-col>
                      </v-row>
                    </div>

                    <!-- THE DIV BELOW IS USED TO DEFINE THE PAYMENTS SECTION OF THE INSURANCE COVER BY MPESA:  -->
                    <div
                      v-else
                      key="secondDivInPayemntTransition"
                      class="ma-4 text-center"
                      style="text-align: center"
                    >
                    <div v-if="!paymentProcessedSuccesfullyGetter">
                      <h2 style="color: black" class="text-center">
                        Payments In This Platform Are Processed Via MPESA.
                      </h2>                      
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

                      <v-btn
                        @click="
                          sendingPaymentRequestToBackEnd(
                            payableAmountStateGetter[premium.uuid],
                            premium.insuranceCoverID
                          )
                        "
                        class="mt-8"
                        outlined
                        x-large
                        color="success"
                      >
                        <span v-if="sendingRequestForPaymentInitialStateGetter"
                          >Send MPESA STK PUSH TO :</span
                        >
                        <span v-else>RESEND MPESA STK PUSH TO :</span>
                        {{ personalDetailsGetter.phoneNumber }}
                        <v-icon>send</v-icon></v-btn
                      >

                      <div
                        style="text-align:center;"
                        v-if="sendingPaymentRequestStatusGetter"
                      >
                        <!-- <orbit-spinner
                        :animation-duration="1200"
                        :size="100"
                        color="#29AB87"
                      /> -->
                        <div
                          key="loader"
                          class="fill-height"
                          style="margin-top: 2%"
                        >
                          <v-row align="center" justify="center">
                            <h2
                              style="color: #29ab87"
                              class="text-center"
                              v-if="sendingRequestForPaymentInitialStateGetter"
                            >
                              Mr Insurance Is Sending A request To your
                              Safaricom MPESA Line to complete Payment, Keep
                              Your Phone Close.
                            </h2>
                            <h2
                              style="color: orange"
                              class="text-center"
                              v-else-if="sendingPaymentRequestSuccessfulGetter"
                            >
                              Safaricom Has Succesfuly Sent You An STK PUSH to
                              your phoneNumber, Kindly confirm the detail and
                              continue to payment.
                            </h2>
                            <h2
                              style="color: red"
                              class="text-center"
                              v-else-if="
                                sendingRequestForPaymentNotSuccessfulGetter
                              "
                            >
                              The Request To Your Safaricom Line Has Failed,
                              Kindly Try Again.
                            </h2>
                          </v-row>

                          <v-row
                            align="center"
                            justify="center"
                            v-if="sendingRequestForPaymentInitialStateGetter"
                          >
                            <orbit-spinner
                              :animation-duration="1200"
                              :size="155"
                              color="#29ab87"
                            />
                          </v-row>
                          <v-row
                            align="center"
                            justify="center"
                            v-if="sendingPaymentRequestSuccessfulGetter"
                          >
                            <orbit-spinner
                              :animation-duration="1200"
                              :size="155"
                              color="orange"
                            />
                          </v-row>
                          <v-row
                            align="center"
                            justify="center"
                            v-if="sendingPaymentRequestSuccessfulGetter"
                          >
                            <h3 style="color: orange">
                              Waiting For You To Complete Tranaction.
                            </h3>
                            <hollow-dots-spinner
                              :animation-duration="1200"
                              :dot-size="8"
                              :dots-num="4"
                              color="orange"
                            />
                          </v-row>
                          <v-row
                            align="center"
                            justify="center"
                            v-if="sendingRequestForPaymentInitialStateGetter"
                          >
                            <h3 style="color: #29ab87">Just A Second</h3>
                            <hollow-dots-spinner
                              :animation-duration="1200"
                              :dot-size="8"
                              :dots-num="4"
                              color="#29ab87"
                            />
                          </v-row>
                        </div>
                      </div>
</div>
                      <div
                        v-else
                        class="text-center"
                      >
                        <v-rating
                          v-model="rating"
                          background-color="purple lighten-3"
                          color="purple"
                          large
                        ></v-rating>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="red darken-1"
                  large
                  text
                  @click="dialog = false"
                  v-if="!visibilityOfPaymentOption"
                >
                  <v-icon>close</v-icon> Close
                </v-btn>
                <v-btn
                  v-else
                  large
                  @click="proceedToPayments()"
                  text
                  color="blue darken-1"
                >
                  <v-icon>arrow_back</v-icon> Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!visibilityOfPaymentOption"
                  color="green darken-1"
                  large
                  text
                  @click="proceedToPayments()"
                >
                  PROCEED TO PAYMENT. <v-icon>arrow_forward_ios</v-icon>
                </v-btn>
                <v-btn
                  color="red darken-1"
                  large
                  text
                  @click="dialog = false"
                  v-else
                >
                  <v-icon>close</v-icon> Close
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
                    There are No Additional Covers Related To This Premium.
                  </h2>
                </template>
                <template v-else>
                  <template
                    v-if="
                      additionalCoversPremiumStateGetter[premium.uuid] === null
                    "
                  >
                    <insurance-component-additional-covers-with-null-value
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
                              <v-row :key="index + indexOne + index + 'table'">
                                <v-col md="8" offset-md="2">
                                  <v-simple-table>
                                    <thead>
                                      <tr
                                        v-if="
                                          premium.cover.name ===
                                            'Motor Insurance'
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
                                    </thead>
                                    <tbody>
                                      <template
                                        v-if="
                                          premium.cover.name ===
                                            'Motor Insurance'
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
                                    </tbody>
                                  </v-simple-table>
                                </v-col>
                              </v-row>
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
                        <v-row :key="index + 'tableNotSelected'">
                          <v-col md="8" offset-md="2">
                            <v-simple-table>
                              <thead>
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
                              </thead>
                              <tbody>
                                <template
                                  v-if="
                                    premium.cover.name === 'Motor Insurance'
                                  "
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
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            ) + " Ksh"
                                        }}
                                      </td>
                                      <td>
                                        {{
                                          additionalPremiumNotelected.cost
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            ) + " Ksh"
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
                              </tbody>
                            </v-simple-table>
                          </v-col>
                        </v-row>
                      </template>
                    </template>
                    <!-- LOOPING THROUGH THE SELECTED ADDITIONAL COVERS. -->
                  </template>
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
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Benefit</th>
                          <th>Limit</th>
                        </tr>
                      </thead>
                      <tbody>
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
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                  " Ksh"
                              }}
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </v-simple-table>
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
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
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
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Benefit</th>
                        </tr>
                      </tfoot>
                    </v-simple-table>
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
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Condition</th>
                              <th>Waiting Period</th>
                            </tr>
                          </thead>
                          <tbody>
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
                          </tbody>
                        </v-simple-table>
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
import { OrbitSpinner } from "epic-spinners";
import { HollowDotsSpinner } from "epic-spinners";
import Pusher from "pusher-js";
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
      "sendingPaymentRequestStatusGetter",
      "sendingPaymentRequestSuccessfulGetter",
      "sendingRequestForPaymentInitialStateGetter",
      "sendingRequestForPaymentNotSuccessfulGetter",
      "paymentDetailsGetterGetter",
      "paymentProcessedSuccesfullyGetter",
    ]),
  },
  components: {
    OrbitSpinner,
    HollowDotsSpinner,
  },
  methods: {
    sendingPaymentRequestToBackEnd(cost, insuranceCoverID) {
      var obj = {};
      obj["cost"] = cost;
      obj["insuranceCoverID"] = insuranceCoverID;
      this.$store.dispatch("sendingPaymentRequest", obj);
    },
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
      this.$store.commit("UPDATING_PAYMENT_PROCESSED_SUCCESSFULLY", false);
      this.dialog = true;
      this.visibilityOfPaymentOption = false;
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
      this.visibilityOfPaymentOption = !this.visibilityOfPaymentOption;
    },
  },
  data: () => ({
    rating: 4,
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
        /^0((7|1)(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/.test(v) ||
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

  created() {
    const self = this;
    var pusher = new Pusher("5654eeba7564603af3b2", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("PremiumPaymentChannel");
    channel.bind("PaymentEvent", function(data) {
      if (
        self.paymentDetailsGetterGetter["CheckoutRequestID"] ===
          data.content.Body.stkCallback.CheckoutRequestID &&
        self.paymentDetailsGetterGetter["MerchantRequestID"] ===
          data.content.Body.stkCallback.MerchantRequestID
      ) {
        self.$store.commit("UPDATING_SENDING_PAYMENTS_REQUEST_STATUS", false);
        self.$store.commit("UPDATING_PAYMENT_PROCCESSED_SUCCESSFULLY", true);
      }
    });
  },

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
</style>
