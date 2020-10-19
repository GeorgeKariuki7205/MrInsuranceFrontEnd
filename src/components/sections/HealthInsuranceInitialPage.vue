<template>
  <base-section id="theme-features" style="margin-top: -5%">
    <base-section-heading
      :title="navigationStateGetter[navigationCoverGetter]['cover']"
    ></base-section-heading>

    <!-- THIS SECTIONS IS USED TO DISPLAY THE SUB CATEGORIES. -->

    <v-container>
      <div style="margin-top: -4%; width: 80%">
        <v-row class="hidden-sm-and-down">
          <v-col
            v-for="(feature, i) in cover.subCategories"
            :key="i + 'subCategories'"
            @click="activateTheSubCategory(i)"
          >
            <base-avatar-card-insurance-sub-category
              v-if="navigationSubCategory === i"
              style="cursor: pointer"
              :dark="true"
              color="primary"
              align="center"
              :horizontal="true"
              :icon="feature.icon"
              :title="feature.name"
              :text="feature.description"
            ></base-avatar-card-insurance-sub-category>
            <base-avatar-card-insurance-sub-category
              v-else
              style="cursor: pointer"
              align="center"
              :horizontal="true"
              :icon="feature.icon"
              :title="feature.name"
              :text="feature.description"
            ></base-avatar-card-insurance-sub-category>
          </v-col>
        </v-row>
      </div>

      <div class="text-center hidden-sm-and-up">
        <template v-for="(feature, i) in cover.subCategories">
          <v-chip
            v-if="navigationSubCategory === i"
            :key="i + 'subCtaegoriesSmallcreen'"
            color="primary"
            @click="activateTheSubCategory(i)"
            class="ma-2"
          >
            <v-icon left>{{ feature.icon }}</v-icon>
            {{ feature.name }}
          </v-chip>
          <v-chip
            v-else
            :key="i + 'subCtaegoriesSmallcreenChip'"
            @click="activateTheSubCategory(i)"
            class="ma-2"
            color="primary"
            outlined
          >
            <v-icon left>{{ feature.icon }}</v-icon>
            {{ feature.name }}
          </v-chip>
        </template>
      </div>
      <base-title
        style="margin-top: -3.5%"
        @click="activateTheSubCategory()"
        class="text-center"
        :title="
          navigationStateGetter[navigationCoverGetter].subCategories[
            navigationSubCategory
          ].name
        "
      />

      <template>
        <!-- ! THIS SECTION IS USED TO INCREASE THE INTERACTIVITY OF THE APPLICATION. -->

        <v-container id="coverQuestions" class="text-center">
          <div :style="marginValue">
            <transition-group
              style="margin-top: 10%"
              name="custom-classes-transition2"
              enter-active-class="animate__animated animate__fadeInRight"
              leave-active-class="animate__animated animate__fadeOutLeft"
              @enter="enter"
              @leave="leave"
            >
              <template v-if="show">
                <v-divider key="{{'nama1'}}"></v-divider>
                <div key="{{'nama2'}}">
                  <v-avatar
                    size="60"
                    class="bounce-2 box"
                    style="margin-top: -2.5%"
                  >
                    <img
                      :src="require('@/assets/tie-svgrepo-com.svg')"
                      alt="John"
                    />
                  </v-avatar>
                </div>

                <h1
                  v-if="questionsStartValue == 0"
                  key="{{'nama3'}}"
                  style="
                    font-size: 35px;
                    color: #4a4a60;
                    font-family: Georgia, serif;
                  "
                >
                  Hey, I am Mr Insurance !!! I'll get you an awesmone quote on
                  <span style="color: black; text-decoration: underline">
                    {{
                      navigationStateGetter[navigationCoverGetter]
                        .subCategories[navigationSubCategory].name
                    }} </span
                  >, Ready To Go ???
                </h1>

                <h1
                  v-if="questionsStartValue == 1"
                  key="{{'nama3'}}"
                  style="
                    font-size: 35px;
                    color: #4a4a60;
                    font-family: Georgia, serif;
                  "
                >
                  <span
                    ><v-icon
                      @click="goingbackToFillDetails()"
                      style="cursor: pointer"
                      size="65"
                      >arrow_back_ios</v-icon
                    ></span
                  >
                  Hey
                  {{
                    personalDetailsGetter.firstName.charAt(0).toUpperCase() +
                    personalDetailsGetter.firstName.substr(1).toLowerCase()
                  }}, We did't Get Your Contact Info, Kindly Add Them.
                </h1>

                <template v-if="questionsStartValue >= 0">
                  <!-- Creating the Names Value Of The Person. -->
                  <v-form
                    key="{{'form'}}"
                    ref="form2"
                    v-model="form2Validation"
                  >
                    <template
                      v-if="
                        personalQuestions[questionsStartValue].name == 'name'
                      "
                    >
                      <h1
                        style="
                          font-size: 20px;
                          color: black;
                          font-family: Georgia, serif;
                        "
                        key="{{'nama4'}}"
                      >
                        Lets Get Your Name First.
                      </h1>
                      <v-row
                        key="{{'nama5'}}"
                        class="mt-2 text-center"
                        justify="center"
                        align="center"
                        dense
                      >
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            height="10"
                            :rules="nameRules"
                            v-model="personalData['firstName']"
                            dense
                            counter
                            label="Your First Name"
                            outlined
                            prepend-inner-icon="account_box"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            prepend-inner-icon="account_box"
                            counter
                            dense
                            label="Your Second Name"
                            v-model="personalData['secondName']"
                            outlined
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </template>

                    <template
                      v-if="
                        personalQuestions[questionsStartValue].name ==
                        'contactDetails'
                      "
                    >
                      <v-row
                        key="{{'nama5'}}"
                        class="mt-2 text-center"
                        justify="center"
                        align="center"
                        dense
                      >
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            :rules="emailRules"
                            counter
                            dense
                            required
                            v-model="personalData['email_address']"
                            label="Email Address"
                            outlined
                            prepend-inner-icon="email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            :rules="RequiredPhoneNumber"
                            :counter="10"
                            placeholder="07...."
                            required
                            dense
                            v-model="personalData['phoneNumber']"
                            label="Phone Number"
                            maxlength="10"
                            type="tel"
                            outlined
                            prepend-inner-icon="call"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </template>
                  </v-form>
                </template>
                <v-row key="{{'nama51'}}">
                  <v-col>
                    <v-btn
                      v-if="questionsStartValue == 0"
                      rounded
                      @click="tooglingVisibility"
                      color="error"
                      dark
                      x-large
                    >
                      <span>
                        Let's Get Startted
                        <v-icon color="yellow">fa-smile-wink</v-icon>
                      </span>
                    </v-btn>
                    <v-btn
                      v-if="questionsStartValue == 1"
                      href="#coverQuestions"
                      rounded
                      @click="tooglingVisibility"
                      color="error"
                      dark
                      x-large
                    >
                      <span>
                        Finally.
                        <v-icon color="yellow">fa-smile-wink</v-icon>
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <!-- !  THIS SECTION IS USED TO SHOW THE COVER RELARED QUESTIONS. -->
              <template v-if="showingCoverRelatedQuestions">
                <div key="nana"
                  class="text-center"
                  style="margin-left: auto; margin-right: auto; width: 90%"
                >
                <v-divider key="{{'nama1'}}"></v-divider>
                <div key="{{'nama2'}}">
                  <v-avatar size="70" class="bounce-2 box" style="margin-top: -2.5%">
                    <img :src="require('@/assets/tie-svgrepo-com.svg')" alt="John" />
                  </v-avatar>
                </div>
                <span
                    ><v-icon
                      @click="goingbackToFillDetails()"
                      style="cursor: pointer"
                      size="65"
                      >arrow_back_ios</v-icon
                    ></span>
                <h1
                  key="{{'nama3'}}"
                  class="d-inline"
                  style="font-size: 35px; color: #4a4a60; font-family: Georgia, serif"
                >
                   Hey
                  {{
                    personalData.firstName.charAt(0).toUpperCase() +
                    personalData.firstName.substr(1).toLowerCase()
                  }}
                  I can't Wait to get you the best deals for
                  <span style="color: black; text-decoration: underline">
                    {{
                      navigationStateGetter[navigationCoverGetter].subCategories[
                        navigationSubCategory
                      ].name
                    }} </span
                  >, I just need the details below,
                </h1>
                  <health-component-questions />
                </div>
              </template>

              <!-- ! THIS SECTION IS USED TO CREATE THE LOADER OF THE APPLICATION ONCE THE REQUET IS SENT. -->

              <template v-if="premiumsDataStatusGetter">
                <div key="loader" class="fill-height" style="margin-top: 2%">
                  <v-row align="center" justify="center">
                    <h2 style="color: #29ab87" class="text-center">
                      Mr Insurance Is Searching For The best policy For You
                    </h2>
                  </v-row>

                  <v-row align="center" justify="center">
                    <orbit-spinner
                      :animation-duration="1200"
                      :size="155"
                      color="#29ab87"
                    />
                  </v-row>
                  <v-row align="center" justify="center">
                    <h4 style="color: #29ab87">Just A Second</h4>
                    <hollow-dots-spinner
                      :animation-duration="1200"
                      :dot-size="8"
                      :dots-num="4"
                      color="#29ab87"
                    />
                  </v-row>
                </div>
              </template>

              <!-- ! THIS SECTION IS USED TO ENERATE THE IMPLEMENTATION OF THE RETURNED RESULTS.  -->
              <template v-else-if="insuranceCoversRetrieved">
                <div key="returnedInsurance" style="text-align: left">
                  <template v-if="premiumsDataGetter.length === 0">
                    <h2 class="text-center">
                      The Insurance Coer Selected is not availbale, kindly try
                      'Family Health'.
                    </h2>
                  </template>
                  <template v-else>
                    <v-divider key="{{'nama1'}}"></v-divider>
                    <div
                      style="text-align: center; margin-top: 1%"
                      key="{{'nama2'}}"
                    >
                      <v-avatar
                        size="70"
                        class="bounce-2 box"
                        style="margin-top: -2.5%"
                      >
                        <img
                          :src="require('@/assets/tie-svgrepo-com.svg')"
                          alt="John"
                        />
                      </v-avatar>
                    </div>
                    <h1
                      style="
                        font-size: 35px;
                        color: #4a4a60;
                        font-family: Georgia, serif;
                        text-align: center;
                      "
                    >
                      Hey
                      {{
                        personalDetailsGetter.firstName
                          .charAt(0)
                          .toUpperCase() +
                        personalDetailsGetter.firstName.substr(1).toLowerCase()
                      }},
                      <span style="color: black">{{
                        premiumsDataGetter.length
                      }}</span>
                      Premiums Found, For
                      <span
                        style="text-decoration: underline"
                        v-if="premiumsDataGetter[0].subCategory"
                      >
                        {{ premiumsDataGetter[0].subCategory }}
                      </span>
                      <!-- With Cover Amount Of Up To :
                      <span style="color: green; type: bold">
                        {{
                          premiumsDataGetter[0].coveredAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                      </span> -->
                    </h1>
                    <!-- <template
                      v-for="(premiumsData, index) in premiumsDataGetter"
                    >
                      <section-health-premium
                        :premium="premiumsData"
                        :key="index + 'premiumsDataGetter'"
                      />
                      <div
                        style="margin-top: 2%; margin-bottom: 4%"
                        :key="index + 'premiumsDataGetterSpacer'"
                      ></div>
                    </template> -->
                  </template>
                </div>
              </template>
            </transition-group>
          </div>
        </v-container>
      </template>
    </v-container>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
import { HollowDotsSpinner } from "epic-spinners";
import { OrbitSpinner } from "epic-spinners";
import router from "../../router";
import "animate.css";
export default {
  name: "SectionThemeFeatures",
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
    ]),
  },
  components: {
    HollowDotsSpinner,
    OrbitSpinner,
  },
  methods: {
    activateTheSubCategory(subCategory) {
      this.inputData = [];
      this.$store.dispatch("updatingTheSubCategoryCoverIndex", subCategory);
      this.$store.dispatch("updatingPremiumDataStatus", false);
      this.$store.dispatch("updatingPersonalDetails", null);
      this.$store.commit("UPDATING_PERSONAL_DETAILS_STATUS", false);
    },

    tooglingVisibility() {
      if (this.questionsStartValue > 1) {
        if (this.$refs.form2.validate()) {
          this.show = false;
          this.showingCoverRelatedQuestions = true;

          this.$store.dispatch("updatingPersonalDetails", this.personalData);
          console.log("Success in Validation.");
        }
      } else {
        if (this.$refs.form2.validate()) {
          console.log("Success in Validation.");
          this.questionsStartValue = this.questionsStartValue + 1;
          this.show = !this.show;
          this.$store.dispatch("updatingPersonalDetails", this.personalData);
        }
      }
    },

    enter() {
      var showData = this.show;
      console.log(showData);
    },
    leave() {
      if (this.questionsStartValue > 1) {
        if (this.premiumsDataStatusGetter === true) {
          this.showingCoverRelatedQuestions = false;
        } else {
          if (this.insuranceCoversRetrieved) {
            this.showingCoverRelatedQuestions = false;
          } else {
            this.show = false;
            this.showingCoverRelatedQuestions = true;
            this.marginValue =
              "margin-left: auto; margin-right: auto; margin-top:8%; width: 90%";

              console.log("Thses are the details of the user.");
              console.log(this.personalDetailsGetter);
          }
        }
      } else {
        this.show = true;
      }
    },
    step3GoToStep2() {
      this.$store.dispatch("nextStepInStepper", 2);
    },
    redirectToSmallScreen() {
      router.push("healthPremiumsMobileView");
    },
    goingbackToFillDetails() {
      if (this.show) {
        this.show = true
        this.questionsStartValue = this.questionsStartValue - 1;
      } else {
         this.showingCoverRelatedQuestions = false;
         this.show = true
        this.questionsStartValue = this.questionsStartValue - 1;
      }
      
    },
  },
  data: () => ({
    insuranceCoversRetrieved: false,
    questionsStartValue: 0,
    showingCoverRelatedQuestions: false,
    sentRequestForQuotes: false,
    cover: null,
    questions: null,
    subCategory: null,
    show: true,
    personalData: [],
    form2Validation: false,
    marginValue:
      "margin-left: auto; margin-right: auto; margin-top:0%; width: 90%",
    // ! this section is used to define the personal qusetions that will be used .
    personalQuestions: [
      {
        name: "name",
        rules: "nameRules",
      },
      {
        name: "contactDetails",
        rules: {
          email: "emailRules",
          phoneNumber: "RequiredPhoneNumber",
        },
      },
    ],
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
  created() {
    this.cover = this.navigationStateGetter[this.navigationCoverGetter];
    this.questions = this.navigationStateGetter[
      this.navigationCoverGetter
    ].subCategories[this.navigationSubCategory].questions;
    this.subCategory = this.navigationSubCategory;
  },

  // ! this sections is used to monitor if there is any change that happens to the change in the categories and subCategories.

  watch: {
    navigationCoverGetter: function () {
      this.cover = this.navigationStateGetter[this.navigationCoverGetter];
      this.questions = this.navigationStateGetter[
        this.navigationCoverGetter
      ].subCategories[this.navigationSubCategory].questions;
      this.subCategory = this.navigationSubCategory;
    },
    navigationSubCategory: function () {
      this.questions = this.navigationStateGetter[
        this.navigationCoverGetter
      ].subCategories[this.navigationSubCategory].questions;
      this.subCategory = this.navigationSubCategory;
    },
    premiumsDataStatusGetter: function () {
      if (this.premiumsDataStatusGetter === true) {
        // ! changing the value of the loading to false.
        this.showingCoverRelatedQuestions = false;
      } else if (this.premiumsDataStatusGetter === false) {
        this.showingCoverRelatedQuestions = false;
        this.insuranceCoversRetrieved = true;
      }
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
