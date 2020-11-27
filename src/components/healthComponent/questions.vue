<template>
  <v-container
    class="text-center"
    style="margin-left: auto; margin-right: auto"
  >          
      <v-form
        ref="form"
        style="margin-left: auto; margin-right: auto"
        v-model="valid"
        @submit.prevent="coverSpecificQuestionsValidation()"
      >
        <br />

        <v-row dense align="center" justify="center">
          <v-col md="4" offset-md="1" v-if="cover.id === 1">
            <h5 class="text-center">
              <v-icon color="red" x-small>fa-asterisk</v-icon> 1. Cover Amount.
              {{ cover.id }}
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
                  v-else
                  class="text-center"
                  :key="i + 'checkBoxQusetionLargeScreen'"
                >
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>
                <v-text-field
                  v-if="questions[i].required == 1"
                  type="number"
                  single-line
                  dense
                  outlined
                  value="0"
                  allowDecimalPadding                  
                  :rules="RequiredNumber"
                  v-model="inputData[questions[i].name]"
                ></v-text-field>
                <v-text-field
                  v-else
                  type="number"
                  dense
                  value="0"
                  outlined
                  :rules="RequiredNumberOnly"
                  v-model="inputData[questions[i].name]"
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="questions[i].type === 'select'">
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
                  v-else
                  class="text-center"
                  :key="i + 'checkBoxQusetionLargeScreen'"
                >
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>
                <v-select
                  v-if="questions[i].required == 1"
                  :key="i + 'numberQuestionRow'"
                  :items="questions[i].selectValues"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  outlined
                  dense
                  :rules="RequiredSelect"
                  v-model="inputData[questions[i].name]"
                ></v-select>
                
                <v-select
                  v-else
                  :key="i + 'numberQuestionRow'"
                  :items="questions[i].selectValues"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  outlined
                  dense
                  v-model="inputData[questions[i].name]"
                ></v-select>                
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
      "insuranceCoverDetailsGetter",
    ]),
  },

  methods: {
    coverSpecificQuestionsValidation() {
      if (this.$refs.form.validate()) {
        // ! after filling the table, store the data a state.

        // ! creating the status To prevent the posting of wrong data.
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

        this.$store.dispatch("updatingPremiumDataStatus", true);

        // ! simultaneously call the function to end the request to get data.
        console.log(this.inputData);
        this.$store.dispatch("postingTheDataForCoverSearch");
      }
    },
  },
  created() {
    (this.firstName = this.personalDetailsGetter.firstName),
      (this.cover = this.navigationStateGetter[this.navigationCoverGetter]);
    this.questions = this.navigationStateGetter[
      this.navigationCoverGetter
    ].subCategories[this.navigationSubCategory].questions;
    this.subCategory = this.navigationSubCategory;

    // console.log("These are te details of the user.");
    // console.log(this.personalDetailsGetter);
  },
  data: () => ({
    questions: null,
    firstName: null,
    inputData: [],
    cover: null,
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
    RequiredSelect: [(v) => !!v || "Kindly Select One."],
    RequiredNumberOnly: [(v) => /^\d+$/.test(v) || "Number must be valid"],
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

  // ! watching the change in the ubCategory.
  watch: {
    navigationSubCategory: function () {
      console.log("I have changed the navigationSubCategory.");
      this.questions = this.navigationStateGetter[
        this.navigationCoverGetter
      ].subCategories[this.navigationSubCategory].questions;
      this.subCategory = this.navigationSubCategory;
    },
    navigationCoverGetter: function () {
      this.cover = this.navigationStateGetter[this.navigationCoverGetter];
       this.questions = this.navigationStateGetter[
        this.navigationCoverGetter
      ].subCategories[this.navigationSubCategory].questions;
      this.subCategory = this.navigationSubCategory;
    },
  },
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
