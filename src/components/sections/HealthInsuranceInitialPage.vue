<template>
  <base-section id="theme-features" style="margin-top:-5%;">
    <base-section-heading :title="navigationStateGetter[navigationCoverGetter]['cover']"></base-section-heading>

    <!-- THIS SECTIONS IS USED TO DISPLAY THE SUB CATEGORIES. -->

    <v-container id="coverQuestions" style="margin-top:0%;">
      <div style="margin-top:-4%;">
        <v-row class="hidden-sm-and-down" justify="center" align="center">
          <v-col
            v-for="(feature, i) in cover.subCategories"
            :key="i + 'subCategories'"
            cols="12"
            md="3"
            @click="activateTheSubCategory(i)"
          >
            <base-avatar-card-insurance-sub-category
              v-if="navigationSubCategory === i"
              style="cursor: pointer;"
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
              style="cursor: pointer;"
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
        style="margin-top:-3.5%"
        @click="activateTheSubCategory()"
        class="text-center"
        :title="
          navigationStateGetter[navigationCoverGetter].subCategories[
            navigationSubCategory
          ].name
        "
      />

      <!-- THIS SECTION IS USED TO DEFINE THE QUESTIONS FOR THE LARGE SCREEN. -->

      <template>
        <!-- <v-stepper class="hidden-sm-and-down" v-model="nextStepInStepperStateGetter">
          <v-stepper-header style="backgrouns-color: red;">
            <v-stepper-step
              :editable="personalDetailsStatusGetter"
              :complete="nextStepInStepperStateGetter > 1"
              step="1"
            >
              Add Cover Specific Details.
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :editable="personalDetailsStatusGetter"
              :complete="nextStepInStepperStateGetter > 2"
              step="2"
            >
              Add Personal Details.
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Insurance Estimates.</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">                            
              
              <health-component-questions :questions="questions"/>

            </v-stepper-content>


            <v-stepper-content step="2">

             <health-component-personal-questions/>              
             
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-container
                v-if="!premiumsDataStatusGetter"
                class="fill-height"
                style="margin-top: 2%;"
              >
                <v-row align="center" justify="center">
                  <h2 style="color: #29ab87;" class="text-center">
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
                  <h4 style="color: #29ab87;">Just A Second</h4>
                  <hollow-dots-spinner
                    :animation-duration="1200"
                    :dot-size="8"
                    :dots-num="4"
                    color="#29ab87"
                  />
                </v-row>
              </v-container>

              <v-container v-else>
                <template v-if="premiumsDataGetter.length === 0">
                  <h2 class="text-center">The Insurance Coer Selected is not availbale, kindly try 'Family Health'.</h2>
                </template>
                <template v-else>                
                <h3 style="text-decoration: underline;" class="text-center">
                  <span v-if="premiumsDataGetter[0].subCategory">
                    {{ premiumsDataGetter[0].subCategory }}
                  </span>
                  Covers Retrieved For Cover Amount Of:
                  <span style="color: green; type: bold;">
                    {{
                      premiumsDataGetter[0].coveredAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }}
                  </span>
                </h3>
                <h4 style="margin-bottom: 2%; margin-left: 2%;">
                  {{ premiumsDataGetter.length }} Premiums Found.
                </h4>
                <v-container>
                  <template v-for="(premiumsData, index) in premiumsDataGetter">
                    <section-health-premium
                      :premium="premiumsData"
                      :key="index + 'premiumsDataGetter'"
                    />
                    <div
                      style="margin-top: 2%; margin-bottom: 4%;"
                      :key="index + 'premiumsDataGetterSpacer'"
                    ></div>
                  </template>
                </v-container>
                </template>
              </v-container>
              <div class="text-center">
                <v-btn
                  style="text-align: right;"
                  color="red"
                  outlined=""
                  @click="step3GoToStep2()"
                >
                  <v-icon>mdi-arrow_back_ios</v-icon>
                  <v-icon>mdi-arrow_back_ios</v-icon>
                  Go Back.
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>-->

        <!-- ! THIS SECTION IS USED TO INCREASE THE INTERACTIVITY OF THE APPLICATION. -->

        <v-container class="text-center">
          <template>
            <transition-group
              name="custom-classes-transition2"
              enter-active-class="animate__animated animate__fadeInRight"
              leave-active-class="animate__animated animate__fadeOutLeft"
              @enter="enter"
              @leave="leave"
            >
              <template v-if="show">
                <v-divider key="{{'nama1'}}"></v-divider>
                <div key="{{'nama2'}}">
                  <v-avatar size="60" class="bounce-2 box" style="margin-top:-2.5%;">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                  </v-avatar>
                </div>

                <h1
                  key="{{'nama3'}}"
                  style=" font-size:35px; color:#4A4A60; font-family:Georgia, serif;"
                >
                  Mmmmh !!! It Seem you are interested in
                  <span
                    style="color:black;text-decoration:underline;"
                  >
                    {{
                    navigationStateGetter[navigationCoverGetter]
                    .subCategories[navigationSubCategory].name
                    }}
                  </span>,
                </h1>
                <h1
                  style=" font-size:35px; color:#4A4A60; font-family:Georgia, serif;"
                  key="{{'nama45'}}"
                >Ready to go ??</h1>

                <template v-if="questionsStartValue >= 0">
                  <!-- Creating the Names Value Of The Person. -->
                  <v-form key="{{'form'}}" ref="form2" v-model="form2Validation">
                    <template v-if="personalQuestions[questionsStartValue].name == 'name'">
                      <h1
                        style=" font-size:20px;color:black; font-family:Georgia, serif;"
                        key="{{'nama4'}}"
                      >Lets Get Your Name First.</h1>
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
                      <h1
                        style="color:black; font-size:20px; font-family:Georgia, serif;"
                        key="{{'nama4'}}"
                      >We did't Get Your Contact Info, Kindly Add Them.</h1>
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
                    
                    <v-btn v-if="questionsStartValue == 0" rounded @click="tooglingVisibility" color="error" dark x-large>
                      <span>
                        Let's Get Startted
                        <v-icon color="yellow">fa-smile-wink</v-icon>
                      </span>
                    </v-btn>
                    <v-btn v-if="questionsStartValue == 1" href="#coverQuestions"  rounded @click="tooglingVisibility" color="error" dark x-large>
                      <span>
                        Finally.
                        <v-icon color="yellow">fa-smile-wink</v-icon>
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <!-- !  THIS SECTION IS USED TO SHOW THE COVER RELARED QUESTIONS. -->
              <template v-if="showingCoverRelatedQuestions" >
                <div key="nanna">                 
                  <health-component-questions :questions="questions"/>
                </div>
              </template>
            </transition-group>
          </template>
        </v-container>
      </template>
    </v-container>

    <!-- THIS SECTION IS USED TO DEFINE THE QUESTIONS FOR THE SMALL SCREEN. -->
    <template>
      <v-stepper class="hidden-md-and-up" v-model="nextStepInStepperStateGetter" vertical>
        <v-stepper-step
          :editable="personalDetailsStatusGetter"
          :complete="nextStepInStepperStateGetter > 1"
          step="1"
        >Add Insurance Specific Questions.</v-stepper-step>

        <v-stepper-content step="1">
          <health-component-questions :questions="questions" />
        </v-stepper-content>

        <v-stepper-step
          :editable="personalDetailsStatusGetter"
          :complete="nextStepInStepperStateGetter > 2"
          step="2"
        >Add Personal Details.</v-stepper-step>

        <v-stepper-content step="2">
          <health-component-personal-questions />
        </v-stepper-content>

        <v-stepper-step
          :complete="nextStepInStepperStateGetter > 3"
          step="3"
        >Insurance Cover Estimates.</v-stepper-step>

        <v-stepper-content step="3">
          <v-container v-if="!premiumsDataStatusGetter" class="fill-height" style="margin-top: 2%;">
            <v-row align="center" justify="center">
              <h2
                style="color: #29ab87;"
                class="text-center"
              >Mr Insurance Is Searching For The best policy For You</h2>
            </v-row>

            <v-row align="center" justify="center">
              <orbit-spinner :animation-duration="1200" :size="155" color="#29ab87" />
            </v-row>
            <v-row align="center" justify="center">
              <h4 style="color: #29ab87;">Just A Second</h4>
              <hollow-dots-spinner
                :animation-duration="1200"
                :dot-size="8"
                :dots-num="4"
                color="#29ab87"
              />
            </v-row>
          </v-container>
          <v-container v-else>
            <template v-if="premiumsDataGetter.length > 0">
              <h2
                class="text-center"
                style="color: black;"
              >{{ premiumsDataGetter.length }} Premiums Found.</h2>

              <v-row align="center" justify="center">
                <v-btn @click="redirectToSmallScreen()" outlined medium color="success" dark>
                  Redirect To Better View.
                  <v-icon>mdi-redo</v-icon>
                </v-btn>
              </v-row>
            </template>
            <template v-else>
              <h2
                class="text-center"
                style="color: red;"
              >{{ premiumsDataGetter.length }} Premiums Found.</h2>
              <h3 style="color: black;" class="text-center">Try Another Search...</h3>
            </template>
          </v-container>

          <div class="text-center">
            <v-btn style="text-align: right;" color="red" outlined @click="step3GoToStep2()">
              <v-icon>mdi-arrow_back_ios</v-icon>
              <v-icon>mdi-arrow_back_ios</v-icon>Go Back.
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
    </template>
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
      this.$store.dispatch("nextStepInStepper", 1);
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
      if (this.questionsStartValue > 1) {
        this.show = false;
        this.showingCoverRelatedQuestions = true;        
      } else {
        this.show = true;
      }
    },
    leave() {
      if (this.questionsStartValue > 1) {
        this.show = false;
        this.showingCoverRelatedQuestions = true;        
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
  },
  data: () => ({
    questionsStartValue: 0,
    showingCoverRelatedQuestions: false,
    cover: null,
    questions: null,
    subCategory: null,
    show: true,
    personalData: [],
    form2Validation: false,
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
    },
    navigationSubCategory: function () {
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
