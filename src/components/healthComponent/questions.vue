<template>
  <v-form ref="form" v-model="valid">
    <h3 class="text-center">Insurance Cover Specific Details.</h3>
    <br />
    <h5 class="text-center">1. Cover Amount.</h5>
    <v-col class="d-flex" md="6" offset-md="3">
      <v-select
        :items="items"
        label="Cover Amount."
        outlined
        required
        prepend-inner-icon="monetization_on"
        :rules="RequiredNumber"
        v-model="inputData['cover_amount']"
      ></v-select>
    </v-col>
    <template v-for="(feature, i) in questions">
      <template v-if="questions[i].type !== 'checkbox'">
        <h5 class="text-center" :key="i + 'checkBoxQusetionLargeScreen'">
          {{ i + 2 + "." }} {{ questions[i].question }}
        </h5>
      </template>

      <template v-if="questions[i].type == 'date'">
        <v-container :key="i + 'dateQusetionLargeScreen'">
          <v-row dense :key="i + 'dateQuestionRow'">
            <v-col md="6" offset-md="3">
              <v-text-field
                v-if="questions[i].required == 1"
                type="date"
                prepend-inner-icon="event"
                single-line
                outlined
                :rules="RequiredDateRules"
                validateOnBlur
                :error="principalMemberErrorMessageStatus"
                :error-messages="principalMemberErrorMessage"
                v-model="inputData[questions[i].name]"
              ></v-text-field>
              <v-text-field
                :error-messages="spouseErrorMessage"
                v-else
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
          <v-col md="6" offset-md="3">
            <v-text-field
              v-if="questions[i].required == 1"
              type="number"
              prepend-inner-icon="child_care"
              single-line
              outlined
              value="0"
              :rules="RequiredNumber"
              v-model.number="inputData[questions[i].name]"
            ></v-text-field>
            <v-text-field
              v-else
              type="number"
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
            <h5 class="text-center">
              {{ i + 2 + "." }} {{ questions[i].question }}
            </h5>
          </v-col>
          <v-col md="4">
            <v-checkbox v-model="inputData[questions[i].name]"></v-checkbox>
          </v-col>
        </v-row>
      </template>
    </template>

    <div style="text-align: right;">
      <v-btn
        type="submit"
        color="success"
        outlined
        @click.prevent="step1GoToStep2()"
      >
        Next
        <v-icon>navigate_next</v-icon>
        <v-icon>arrow_forward_ios</v-icon>
      </v-btn>
    </div>
  </v-form>
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

        // ! validating the dates that have been provided by the users.
        if (this.inputData["principal_member_age"]) {
          var dob_entry = this.inputData["principal_member_age"];
          var split_dob = dob_entry.split("-");
          var month = split_dob[1];
          var day = split_dob[2];
          var year = split_dob[0];
          var ageValue = 0;
          var condition1 = parseInt(month + day);

          var today_date = new Date();
          var today_year = today_date.getFullYear().toString();
          var today_day = today_date.getDate().toString();
          var today_month = (today_date.getMonth() + 1).toString();
          var condition2 = parseInt(today_month + today_day);

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
          var dob_entry = this.inputData["spouse_age"];
          var split_dob = dob_entry.split("-");
          var month = split_dob[1];
          var day = split_dob[2];
          var year = split_dob[0];
          var ageValue = 0;
          var condition1 = parseInt(month + day);

          var today_date = new Date();
          var today_year = today_date.getFullYear().toString();
          var today_day = today_date.getDate().toString();
          var today_month = (today_date.getMonth() + 1).toString();
          var condition2 = parseInt(today_month + today_day);

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
