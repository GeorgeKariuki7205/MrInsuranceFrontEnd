<template>
  <v-container
    class="text-center"
    style="margin-left: auto; margin-right: auto"
  >
    <div
      class="text-center"
      style="margin-left: auto; margin-right: auto; width: 90%"
    >
      <v-divider key="{{'nama1'}}"></v-divider>
      <div key="{{'nama2'}}">
        <v-avatar size="70" class="bounce-2 box" style="margin-top: -2.5%">
          <img :src="require('@/assets/tie-svgrepo-com.svg')" alt="John" />
        </v-avatar>
      </div>
      <v-icon class="d-inline" size="65">arrow_back_ios</v-icon>
      <h1
        key="{{'nama3'}}"
        class="d-inline"
        style="font-size: 35px; color: #4a4a60; font-family: Georgia, serif"
      >
        <span></span> Hey
        {{
          personalDetailsGetter.firstName.charAt(0).toUpperCase() +
          personalDetailsGetter.firstName.substr(1).toLowerCase()
        }}, I can't Wait to get you the best deals for
        <span style="color: black; text-decoration: underline">
          {{
            navigationStateGetter[navigationCoverGetter].subCategories[
              navigationSubCategory
            ].name
          }} </span
        >, I just need the details below,
      </h1>
      <v-form
        ref="form"
        style="margin-left: auto; margin-right: auto"
        v-model="valid"
        @submit.prevent="coverSpecificQuestionsValidation()"
      >
        <br />

        <v-row dense align="center" justify="center">
          <v-col md="4" offset-md="1">
            <h5 class="text-center">
              <v-icon color="red" x-small>fa-asterisk</v-icon> 1. Cover Amount.
            </h5>
            <v-select
              :items="items"
              label="Cover Amount."
              outlined
              required
              dense
              prepend-inner-icon="monetization_on"
              :rules="RequiredNumber"
              v-model="inputData['cover_amount']"
            ></v-select>
          </v-col>
          <template v-for="(feature, i) in questions">
            <template v-if="questions[i].type == 'date'">
              <v-col
                cols="6"
                md="4"
                offset-md="1"
                :key="i + 'dateQusetionLargeScreen'"
              >
                <h5
                  v-if="questions[i].required == 1"
                  class="text-center"
                  :key="i + 'checkBoxQusetionLargeScreen'"
                >
                  <v-icon color="red" x-small>fa-asterisk</v-icon>
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>
                <h5
                  v-else
                  class="text-center"
                  :key="i + 'checkBoxQusetionLargeScreen'"
                >
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>

                <!-- ! CREATING A NEW WAY TO IMPLETEMT THE DATE. -->

                <v-row v-if="questions[i].required == 1">
                  <v-col>
                    <v-text-field
                      label="Day"
                      maxlength="2"
                      placeholder="DD"
                      outlined
                      dense
                      required
                      v-model="inputData[questions[i].name + 'day']"
                      :rules="dayRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    ><v-text-field
                      label="Month"
                      maxlength="2"
                      placeholder="MM"
                      outlined
                      dense
                      required
                      :rules="monthRules"
                      v-model="inputData[questions[i].name + 'month']"
                    ></v-text-field
                  ></v-col>
                  <v-col
                    ><v-text-field
                      label="Year"
                      maxlength="4"
                      placeholder="YYYY"
                      :rules="yearRules"
                      outlined
                      dense
                      required
                      v-model="inputData[questions[i].name + 'year']"
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row v-else>
                  <v-col
                    ><v-text-field
                      label="Day"
                      maxlength="2"
                      placeholder="DD"
                      dense
                      outlined
                      v-model="inputData[questions[i].name + 'day']"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    ><v-text-field
                      label="Month"
                      maxlength="2"
                      placeholder="MM"
                      outlined
                      dense
                      v-model="inputData[questions[i].name + 'month']"
                    ></v-text-field
                  ></v-col>
                  <v-col
                    ><v-text-field
                      label="Year"
                      maxlength="4"
                      placeholder="YYYY"
                      outlined
                      dense
                      v-model="inputData[questions[i].name + 'year']"
                    ></v-text-field
                  ></v-col>
                </v-row>
              </v-col>
            </template>
            <template v-else-if="questions[i].type === 'number'">
              <v-col
                class="6"
                md="4"
                offset-md="1"
                :key="i + 'numberQuestionRow'"
              >
                <h5
                  v-if="questions[i].required == 1"
                  class="text-center"
                  :key="i + 'checkBoxQusetionLargeScreen'"
                >
                  <v-icon color="red" x-small>fa-asterisk</v-icon>
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>

                <h5
                  class="text-center"
                  :key="i + 'checkBoxQusetionLargeScreen'"
                >
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>
                <v-text-field
                  v-if="questions[i].required == 1"
                  type="number"
                  prepend-inner-icon="child_care"
                  single-line
                  dense
                  outlined
                  value="0"
                  :rules="RequiredNumber"
                  v-model.number="inputData[questions[i].name]"
                ></v-text-field>
                <v-text-field
                  v-else
                  type="number"
                  dense
                  value="0"
                  prepend-inner-icon="child_care"
                  outlined
                  :rules="RequiredNumberOnly"
                  v-model="inputData[questions[i].name]"
                ></v-text-field>
              </v-col>
            </template>
          </template>
        </v-row>
        <v-btn
          type="submit"
          rounded
          color="error"
          @click.prevent="coverSpecificQuestionsValidation()"
          dark
          x-large
        >
          <span>
            Get Me Quotes .
            <v-icon color="yellow">fa-running</v-icon>
          </span>
        </v-btn>
      </v-form>
    </div>
  </v-container>
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
      "nextStepInStepperStateGetter",
      "personalDetailsGetter",
      "insuranceCoverDetailsGetter",
      "insuranceCoverDetailsGetter"
    ]),
  },
  props: ["questions"],
  methods: {
    coverSpecificQuestionsValidation() {      
      if (this.$refs.form.validate()) {
        // ! after filling the table, store the data a state.

        // ! creating the status To prevent the posting of wrong data.

        console.log(
          this.inputData["principal_member_ageday"] + " This is the Day."
        );
        // ! validating the dates that have been provided by the users.
        if (
          this.inputData["principal_member_ageday"] ||
          this.inputData["principal_member_agemonth"] ||
          this.inputData["principal_member_ageyear"]
        ) {
          this.inputData["principal_member_age"] =
            this.inputData["principal_member_ageyear"] +
            "-" +
            this.inputData["principal_member_agemonth"] +
            "-" +
            this.inputData["principal_member_ageday"];          
        }

        if (
          this.inputData["spouse_ageday"] ||
          this.inputData["spouse_agemonth"] ||
          this.inputData["spouse_ageyear"]
        ) {
          this.inputData["spouse_age"] =
            this.inputData["spouse_ageyear"] +
            "-" +
            this.inputData["spouse_agemonth"] +
            "-" +
            this.inputData["spouse_ageday"];
        }

        this.$store.dispatch(
          "updatingTheInsuranceCoverDetails",
          this.inputData
        );

        // ! updating the status of the loading to be true. 

        this.$store.dispatch("updatingPremiumDataStatus",true);
        
        // ! simultaneously call the function to end the request to get data.

        this.$store.dispatch("postingTheDataForCoverSearch");

        console.log("This is the data posted to get the new implementation.");
        console.log(this.insuranceCoverDetailsGetter);

      // ! create the preloader for the app.

      }
    },
  },
  data: () => ({
    inputData: [],
    principalMemberErrorMessage: null,
    principalMemberErrorMessageStatus: false,
    spouseErrorMessage: null,
    valid: false,
    items: [100000, 250000, 500000, 1000000],

    // ! the name rules.
    RequiredDateRules: [(v) => !!v || "Date is required"],
    RequiredNumber: [
      (v) => !!v || "Number is required",
      (v) => /^\d+$/.test(v) || "Number must be valid",
    ],
    RequiredNumberOnly: [(v) => /^\d+$/.test(v) || "Number must be valid"],
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

    //! creating the new rules to validate the dates.

    dayRules: [
      (v) => !!v || "Day is required",
      (v) => (v && v <= 31) || "The Day is not valid.",
      (v) => (v && v > 0) || "The Day is not valid.",
    ],
    monthRules: [
      (v) => !!v || "Month is required",
      (v) => (v && v <= 12) || "The Month is not valid.",
      (v) => (v && v > 0) || "The Month is not valid.",
    ],
    yearRules: [
      (v) => !!v || "Year is required",
      (v) => (v && v <= 2001) || "You are too young.",
      (v) => (v && v > 1955) || "You are too old.",
    ],
    // unrequireddayRules:[
    //   (v) => (v>0 && v <= 31 ) || "The Day is not valid.",
    //   (v) => (v>0 && v > 0 ) || "The Day is not valid.",
    // ],
    // unrequiredmonthRules:[
    //   (v) => (v>0 && v <= 12 ) || "The Month is not valid.",
    //   (v) => (v>0 && v > 0 ) || "The Month is not valid.",
    // ],
    // unrequiredyearRules:[
    //   (v) => (v>0 && v <= 2001 ) || "You are too young.",
    //   (v) => (v>0 && v > 1955 ) || "You are too old.",
    // ]
  }),
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.bounce-2 {
  animation-name: bounce-2;
  animation-timing-function: ease;
}
@keyframes bounce-2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.18);
  }
  100% {
    transform: scale(1);
  }
}

.box {
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: center;
}
</style>
