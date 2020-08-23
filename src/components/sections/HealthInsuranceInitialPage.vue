<template>
  <base-section id="theme-features">
    <base-section-heading
      :title="navigationStateGetter[navigationCoverGetter]['cover']"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
      Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
      quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>

    <!-- THIS SECTIONS IS USED TO DISPLAY THE SUB CATEGORIES. -->

    <v-container>
      <v-row class="hidden-sm-and-down" justify="center" align="center">
        <v-col
          v-for="(feature, i) in cover.subCategories"
          :key="i+'subCategories'"
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
          >
          </base-avatar-card-insurance-sub-category>
          <base-avatar-card-insurance-sub-category
            v-else
            style="cursor: pointer;"
            align="center"
            :horizontal="true"
            :icon="feature.icon"
            :title="feature.name"
            :text="feature.description"
          >
          </base-avatar-card-insurance-sub-category>
        </v-col>
      </v-row>
      <div class="text-center hidden-sm-and-up">
        <template v-for="(feature, i) in cover.subCategories">
          <v-chip
            v-if="navigationSubCategory === i"
            :key="i+'subCtaegoriesSmallcreen'"
            color="primary"
            @click="activateTheSubCategory(i)"
            class="ma-2"
          >
            <v-icon left>{{ feature.icon }}</v-icon>
            {{ feature.name }}
          </v-chip>
          <v-chip
            v-else
            :key="i+'subCtaegoriesSmallcreenChip'"
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
        @click="activateTheSubCategory()"
        class="text-center"
        :title="
          navigationStateGetter[navigationCoverGetter].subCategories[
            navigationSubCategory
          ].name
        "
      />
      <h3 class="text-center">
        Complete The Three Easy Steps Below To Get Your Estimates.
      </h3>

      <!-- THIS SECTION IS USED TO DEFINE THE QUESTIONS FOR THE LARGE SCREEN. -->

      <template>
        <v-stepper class="hidden-sm-and-down" v-model="e1">
          <v-stepper-header style="backgrouns-color:red;">
            <v-stepper-step
              :editable="personalDetailsStatusGetter"
              :complete="e1 > 1"
              step="1"
            >
              Add Cover Specific Details.
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :editable="personalDetailsStatusGetter"
              :complete="e1 > 2"
              step="2"
            >
              Add Personal Details.
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Insurance Estimates.</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h3 class="text-center">Insurance Cover Specific Details.</h3>
              <br />
              <h5 class="text-center">1. Cover Amount.</h5>
              <v-form ref="form" v-model="valid">
                <v-col class="d-flex" md="6" offset-md="3">
                  <v-select
                    :items="items"
                    label="Cover Amount."
                    outlined
                    required
                    prepend-icon="monetization_on"
                    :rules="RequiredNumber"
                    v-model="inputData['cover_amount']"
                  ></v-select>
                </v-col>
                <template v-for="(feature, i) in questions">
                  <template v-if="questions[i].type !== 'checkbox'">
                    <h5 class="text-center" :key="i+'checkBoxQusetionLargeScreen'">
                      {{ i + 2 + "." }} {{ questions[i].question }}
                    </h5>
                  </template>

                  <template v-if="questions[i].type == 'date'">
                    <v-container :key="i+'dateQusetionLargeScreen'">
                      <v-row dense :key="i+'dateQuestionRow'">
                        <v-col md="6" offset-md="3">
                          <v-text-field
                            v-if="questions[i].required == 1"
                            type="date"
                            prepend-icon="event"
                            single-line
                            outlined
                            :rules="RequiredDateRules"
                            validateOnBlur
                            v-model="inputData[questions[i].name]"
                          ></v-text-field>
                          <v-text-field
                            v-else
                            type="date"
                            prepend-icon="event"
                            single-line
                            outlined
                            v-model="inputData[questions[i].name]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                  <template v-else-if="questions[i].type === 'number'">
                    <v-row dense :key="i+'numberQuestionRow'">
                      <v-col md="6" offset-md="3">
                        <v-text-field
                          v-if="questions[i].required == 1"
                          type="number"
                          prepend-icon="child_care"
                          single-line
                          outlined
                          :rules="RequiredNumber"
                          v-model="inputData[questions[i].name]"
                        ></v-text-field>
                        <v-text-field
                          v-else
                          type="number"
                          prepend-icon="child_care"
                          single-line
                          outlined
                          v-model="inputData[questions[i].name]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-else-if="questions[i].type === 'checkbox'">
                    <v-row :key="i+'checkBoxQuestionRow'" align="center" justify="center">
                      <v-col md="4" offset-md="2">
                        <h5 class="text-center">
                          {{ i + 2 + "." }} {{ questions[i].question }}
                        </h5>
                      </v-col>
                      <v-col md="4">
                        <v-checkbox
                          v-model="inputData[questions[i].name]"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </template>
                </template>

                <div style="text-align:right">
                  <v-btn color="success" outlined @click="step1GoToStep2()">
                    Next <v-icon>navigate_next</v-icon>
                    <v-icon>arrow_forward_ios</v-icon>
                  </v-btn>
                </div>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="2">
              <h3 class="text-center">Personal Details.</h3>
              <!-- <v-form ref="form2" v-model="form2Validation"> -->
              <v-form ref="form2" v-model="form2Validation">
                <v-row dense>
                  <v-col md="6" offset-md="3">
                    <h5>1. Name:</h5>
                    <br />
                    <v-text-field
                      :rules="nameRules"
                      counter
                      required
                      v-model="personalData['name']"
                      label="Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col md="6" offset-md="3">
                    <h5>2. Email Address:</h5>
                    <br />
                    <v-text-field
                      :rules="emailRules"
                      counter
                      required
                      v-model="personalData['email_address']"
                      label="Email Address"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col md="6" offset-md="3">
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
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div>
                  <v-btn
                    class="float-right"
                    style="text-align:right"
                    color="success"
                    outlined
                    @click="movingFromStep2ToStep3()"
                  >
                    Generate Estimates. <v-icon>navigate_next</v-icon>
                    <v-icon>arrow_forward_ios</v-icon>
                  </v-btn>

                  <v-btn
                    class="float-left"
                    style="text-align:right"
                    color="red"
                    outlined=""
                    @click="movingFromStep2ToStep1()"
                  >
                    <v-icon>arrow_back_ios</v-icon>
                    <v-icon>arrow_back_ios</v-icon>
                    Go Back.
                  </v-btn>
                </div>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-container
                v-if="!premiumsDataStatusGetter"
                class="fill-height"
                style="margin-top:2%">
                <v-row align="center" justify="center">
                  <h2 style="color:#29ab87;" class="text-center">
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
                  <h4 style="color:#29ab87;">Just A Second</h4>
                  <hollow-dots-spinner
                    :animation-duration="1200"
                    :dot-size="8"
                    :dots-num="4"
                    color="#29ab87"
                  />
                </v-row>
              </v-container>

              <v-container v-else>
                <h3 style="text-decoration:underline;" class="text-center">
                 <span v-if="premiumsDataGetter[0].subCategory">{{premiumsDataGetter[0].subCategory}}</span> Covers Retrieved For Cover Amount Of:
                 <span style="color:green;type:bold;">{{ premiumsDataGetter[0].coveredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> 
                </h3>
                <h4 style="margin-bottom:2%;margin-left:2%;">
                  {{ premiumsDataGetter.length }} Premiums Found.
                </h4>
                <v-container>
                  <template v-for="(premiumsData, index) in premiumsDataGetter">
                  <section-health-premium
                    :premium="premiumsData"
                    :key="index+'premiumsDataGetter'"
                  />
                  <div
                    style="margin-top:2%;margin-bottom:4%;"
                    :key="index+'premiumsDataGetterSpacer'"
                  ></div>
                </template>
                </v-container>
                
              </v-container>              
              <div class="text-center">
                <v-btn
                  style="text-align:right"
                  color="red"
                  outlined=""
                  @click="step3GoToStep2()"
                >
                  <v-icon>arrow_back_ios</v-icon>
                  <v-icon>arrow_back_ios</v-icon>
                  Go Back.
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
    </v-container>

    <!-- THIS SECTION IS USED TO DEFINE THE QUESTIONS FOR THE SMALL SCREEN. -->

    <template>
      <v-stepper class="hidden-md-and-up" v-model="e6" vertical>
        <v-stepper-step editable :complete="e6 > 1" step="1">
          Add Insurance Specific Questions.
        </v-stepper-step>

        <v-stepper-content step="1">
          <h3 class="text-center">Insurance Cover Specific Details.</h3>
          <br />
          <h5 class="text-center">1. Cover Amount.</h5>
          <v-form ref="form" v-model="valid">
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
                <h5 class="text-center" :key="i+'notCheckBoxQusetion'">
                  {{ i + 2 + "." }} {{ questions[i].question }}
                </h5>
              </template>

              <template v-if="questions[i].type == 'date'">
                <v-container :key="i+'dateQuestionSmallScreen'">
                  <v-row dense :key="i+'dateQuestionSmallScreenRow'">
                    <v-col md="6" offset-md="3">
                      <v-text-field
                        v-if="questions[i].required == 1"
                        type="date"
                        prepend-inner-icon="event"
                        single-line
                        outlined
                        :rules="RequiredDateRules"
                        validateOnBlur
                        v-model="inputData[questions[i].name]"
                      ></v-text-field>
                      <v-text-field
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
                <v-row dense :key="i+'numberQuestionSmallScreenRow'">
                  <v-col md="6" offset-md="3">
                    <v-text-field
                      v-if="questions[i].required == 1"
                      type="number"
                      prepend-inner-icon="child_care"
                      single-line
                      outlined
                      :rules="RequiredNumber"
                      v-model="inputData[questions[i].name]"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      type="number"
                      prepend-inner-icon="child_care"
                      single-line
                      outlined
                      v-model="inputData[questions[i].name]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
              <template v-else-if="questions[i].type === 'checkbox'">
                <v-row :key="i+'checkBoxQuestionSmallScreenRow'" align="center" justify="center">
                  <v-col md="4" offset-md="2">
                    <h5 class="text-center">
                      {{ i + 2 + "." }} {{ questions[i].question }}
                    </h5>
                  </v-col>
                  <v-col md="4">
                    <v-checkbox
                      v-model="inputData[questions[i].name]"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </template>
            </template>

            <div style="text-align:right">
              <v-btn color="success" outlined @click="step1GoToStep2()">
                Next <v-icon>navigate_next</v-icon>
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 2" step="2"
          >Add Personal Details.</v-stepper-step
        >

        <v-stepper-content step="2">
          <h3 class="text-center">Personal Details.</h3>
          <!-- <v-form ref="form2" v-model="form2Validation"> -->
          <v-form ref="form2" v-model="form2Validation">
            <v-row dense>
              <v-col md="6" offset-md="3">
                <h5>1. Name:</h5>
                <br />
                <v-text-field
                  :rules="nameRules"
                  counter
                  required
                  v-model="personalData['name']"
                  label="Name"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col md="6" offset-md="3">
                <h5>2. Email Address:</h5>
                <br />
                <v-text-field
                  :rules="emailRules"
                  counter
                  required
                  v-model="personalData['email_address']"
                  label="Email Address"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col md="6" offset-md="3">
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
                ></v-text-field>
              </v-col>
            </v-row>

            <div>
              <v-btn
                class="float-right"
                style="text-align:right"
                color="success"
                outlined
                @click="movingFromStep2ToStep3()"
              >
                Generate Estimates. <v-icon>navigate_next</v-icon>
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn>

              <v-btn
                class="float-left"
                style="text-align:right"
                color="red"
                outlined=""
                @click="movingFromStep2ToStep1()"
              >
                <v-icon>arrow_back_ios</v-icon>
                <v-icon>arrow_back_ios</v-icon>
                Go Back.
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 3" step="3"
          >Insurance Cover Estimates.</v-stepper-step
        >

        <v-stepper-content step="3">         
          <v-container
                v-if="!premiumsDataStatusGetter"
                class="fill-height"
                style="margin-top:2%">
                <v-row align="center" justify="center">
                  <h2 style="color:#29ab87;" class="text-center">
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
                  <h4 style="color:#29ab87;">Just A Second</h4>
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
                    <h2 class="text-center" style="color:black;" > {{ premiumsDataGetter.length }} Premiums Found. </h2>

                    <v-row align="center" justify="center">
                        <v-btn @click="redirectToSmallScreen()" outlined  medium color="success" dark> Redirect To Better View. <v-icon>redo</v-icon> </v-btn>
                    </v-row>
                </template>
                <template v-else>
                    <h2 class="text-center" style="color:red;" > {{ premiumsDataGetter.length }} Premiums Found. </h2>
                    <h3 style="color:black;" class="text-center"> Try Another Search...</h3>
                </template>
               
                
              </v-container>              

          <div class="text-center">
            <v-btn
              style="text-align:right"
              color="red"
              outlined=""
              @click="step3GoToStep2()"
            >
              <v-icon>arrow_back_ios</v-icon>
              <v-icon>arrow_back_ios</v-icon>
              Go Back.
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
import router from '../../router'
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
    },
    step1GoToStep2() {
      if (this.$refs.form.validate()) {
        // ! after filling the table, store the data a state.

        this.$store.dispatch(
          "updatingTheInsuranceCoverDetails",
          this.inputData
        );

        // ! navigate to the next stepper page.      
        this.e1 = 2;
        this.e6 = 2;
      }
    },
    movingFromStep2ToStep1() {
      this.e1 = 1;
      this.e6 = 1;
    },
    step3GoToStep2() {
      this.e1 = 2;
      this.e6 = 2;
    },
    movingFromStep2ToStep3() {
      if (this.$refs.form2.validate()) {
        this.$store.dispatch("updatingPersonalDetails", this.personalData);
        this.$store.dispatch("postingTheDataForCoverSearch");
        this.$store.dispatch("updatingPremiumDataStatus", false);
        this.e1 = 3;
        this.e6 = 3;
      }
    },
    redirectToSmallScreen(){
        router.push('healthPremiumsMobileView');
    },
  },
  data: () => ({
    cover: null,
    questions: null,
    subCategory: null,

    e1: 1,
    e6: 1,
    valid: false,
    items: [100000, 250000, 500000, 1000000],
    inputData: [],
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
      (v) => v.length <= 10 || "Phone Number must have 10 characters",
      (v) =>
        /^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/.test(v) ||
        "Phone Number must be valid",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length >= 3 || "Name Must Be More Than 3 characters",
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
    navigationCoverGetter: function() {
      this.cover = this.navigationStateGetter[this.navigationCoverGetter];
    },
    navigationSubCategory: function() {
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
</style>
