<template>
<v-container class="text-center;">
  
  <div style="text-align:center;border:2px solid black;width:70%;" >
      <h1 width="70px"
      style=" font-size:35px; color:#4A4A60; font-family:Georgia, serif;"
    >A few Details are required to get the best policy for you  </h1>
    </div>

  <v-form ref="form" v-model="valid">        
    <br />
    <h5 class="text-center">1. Cover Amount.</h5>
    <v-col class="d-flex" md="6" offset-md="3">
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
      <!-- <template v-if="questions[i].type !== 'checkbox'">
        <h5 class="text-center" :key="i + 'checkBoxQusetionLargeScreen'">
          {{ i + 2 + "." }} {{ questions[i].question }}
        </h5>
      </template>-->

      <template v-if="questions[i].type == 'date'">
        <v-container :key="i + 'dateQusetionLargeScreen'">
          <v-row dense :key="i + 'dateQuestionRow'">
            <v-col md="2" offset-md="2">
              <h5
                class="text-center"
                :key="i + 'checkBoxQusetionLargeScreen'"
              >{{ i + 2 + "." }} {{ questions[i].question }}</h5>
              <v-text-field
                v-if="questions[i].required == 1"
                type="date"
                prepend-inner-icon="event"
                single-line
                outlined
                dense
                :rules="RequiredDateRules"
                validateOnBlur
                :error="principalMemberErrorMessageStatus"
                :error-messages="principalMemberErrorMessage"
                v-model="inputData[questions[i].name]"
              ></v-text-field>
              <v-text-field
                :error-messages="spouseErrorMessage"
                v-else
                dense
                type="date"
                prepend-inner-icon="event"
                single-line
                outlined
                v-model="inputData[questions[i].name]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-else-if="questions[i].type === 'number'">
        <v-row dense :key="i + 'numberQuestionRow'">
          <v-col md="2" offset-md="2">
            <h5
              class="text-center"
              :key="i + 'checkBoxQusetionLargeScreen'"
            >{{ i + 2 + "." }} {{ questions[i].question }}</h5>
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
        </v-row>
      </template>
      <template v-else-if="questions[i].type === 'checkbox'">
        <v-row :key="i + 'checkBoxQuestionRow'" align="center" justify="center">
          <v-col md="4" offset-md="2">
            <h5 class="text-center">{{ i + 2 + "." }} {{ questions[i].question }}</h5>
          </v-col>
          <v-col md="4">
            <v-checkbox v-model="inputData[questions[i].name]"></v-checkbox>
          </v-col>
        </v-row>
      </template>
    </template>

    <div style="text-align: right;">
      <v-btn type="submit" color="success" outlined @click.prevent="step1GoToStep2()">
        Next
        <v-icon>navigate_next</v-icon>
        <v-icon>arrow_forward_ios</v-icon>
      </v-btn>
    </div>
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
    ]),
  },
  props: ["questions"],
  methods: {
    step1GoToStep2() {
      if (this.$refs.form.validate()) {
        // ! after filling the table, store the data a state.

        // ! creating the status To prevent the posting of wrong data.

        var hasError = false;

        var dob_entry;
        var split_dob;
        var month;
        var day;
        var year;
        var ageValue;
        var condition1;
        var today_date;
        var today_year;
        var today_day;
        var today_month;
        var condition2;

        // ! validating the dates that have been provided by the users.
        if (this.inputData["principal_member_age"]) {
          dob_entry = this.inputData["principal_member_age"];
          split_dob = dob_entry.split("-");
          month = split_dob[1];
          day = split_dob[2];
          year = split_dob[0];
          ageValue = 0;
          condition1 = parseInt(month + day);

          today_date = new Date();
          today_year = today_date.getFullYear().toString();
          today_day = today_date.getDate().toString();
          today_month = (today_date.getMonth() + 1).toString();
          condition2 = parseInt(today_month + today_day);

          if (condition2 >= condition1) {
            ageValue = parseInt(today_year - parseInt(year));
          } else {
            ageValue = parseInt(today_year - parseInt(year) - 1);
          }

          if (ageValue < 19 || ageValue > 65) {
            this.principalMemberErrorMessage =
              "Age is not in Range  " +
              ageValue +
              " Member must be between 19 and 65.";
            hasError = true;
          }
        }

        if (this.inputData["spouse_age"]) {
          dob_entry = this.inputData["spouse_age"];
          split_dob = dob_entry.split("-");
          month = split_dob[1];
          day = split_dob[2];
          year = split_dob[0];
          ageValue = 0;
          condition1 = parseInt(month + day);

          today_date = new Date();
          today_year = today_date.getFullYear().toString();
          today_day = today_date.getDate().toString();
          today_month = (today_date.getMonth() + 1).toString();
          condition2 = parseInt(today_month + today_day);

          if (condition2 >= condition1) {
            ageValue = parseInt(today_year - parseInt(year));
          } else {
            ageValue = parseInt(today_year - parseInt(year) - 1);
          }

          if (ageValue < 19 || ageValue > 65) {
            this.spouseErrorMessage =
              "Age is not in Range  " +
              ageValue +
              " Member must be between 19 and 65.";
            hasError = true;
          }
        }

        if (!hasError) {
          this.$store.dispatch(
            "updatingTheInsuranceCoverDetails",
            this.inputData
          );

          // ! navigate to the next stepper page.
          this.$store.dispatch("nextStepInStepper", 2);
        }
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
  }),
};
</script>

<style></style>
