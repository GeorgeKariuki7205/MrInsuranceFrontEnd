<template>
  <v-form
    @submit.prevent="movingFromStep2ToStep1()"
    ref="form2"
    v-model="form2Validation"
  >
    <h3 class="text-center">Personal Details.</h3>
    <v-row dense>
      <v-col md="2" offset-md="2">
        <h5>1. Name:</h5>
        <br />
        <v-text-field
          :rules="nameRules"
          counter
          required
          v-model="personalData['name']"
          label="Name"
          outlined
          prepend-inner-icon="account_box"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col md="2" offset-md="2">
        <h5>2. Email Address:</h5>
        <br />
        <v-text-field
          :rules="emailRules"
          counter
          required
          v-model="personalData['email_address']"
          label="Email Address"
          outlined
          prepend-inner-icon="email"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col md="2" offset-md="2">
        <h5>3. Phone Number:</h5>
        <br />
        <v-text-field
          :rules="RequiredPhoneNumber"
          :counter="10"
          placeholder="07...."
          required
          v-model="personalData['phoneNumber']"
          label="Phone Number"
          maxlength="10"
          type="tel"
          outlined
          prepend-inner-icon="call"
        ></v-text-field>
      </v-col>
    </v-row>

    <div>
      <v-btn
        class="float-right"
        style="text-align: right;"
        color="success"
        outlined
        @click="movingFromStep2ToStep3()"
      >
        Generate Estimates.
        <v-icon>navigate_next</v-icon>
        <v-icon>arrow_forward_ios</v-icon>
      </v-btn>

      <v-btn
        class="float-left"
        style="text-align: right;"
        color="red"
        outlined
        @click="movingFromStep2ToStep1()"
      >
        <v-icon>arrow_back_ios</v-icon>
        <v-icon>arrow_back_ios</v-icon>
        Go Back.
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  methods: {
    movingFromStep2ToStep1() {
      this.$store.dispatch("nextStepInStepper", 1);
    },
    movingFromStep2ToStep3() {
      if (this.$refs.form2.validate()) {
        this.$store.dispatch("updatingPersonalDetails", this.personalData);
        this.$store.dispatch("postingTheDataForCoverSearch");
        this.$store.dispatch("updatingPremiumDataStatus", false);
        this.$store.dispatch("nextStepInStepper", 3);
      }
    },
  },
  data: () => ({
    personalData: [],
    form2Validation: false,
    // ! the name rules.
    RequiredDateRules: [(v) => !!v || "Date is required"],
    RequiredNumber: [
      (v) => !!v || "Number is required",
      (v) => /^\d+$/.test(v) || "Number must be valid",
    ],
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
};
</script>

<style></style>
