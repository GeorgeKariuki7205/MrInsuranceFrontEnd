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
        <v-stepper class="hidden-sm-and-down" v-model="nextStepInStepperStateGetter">
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
              </v-container>
              <div class="text-center">
                <v-btn
                  style="text-align: right;"
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
      <v-stepper class="hidden-md-and-up" v-model="nextStepInStepperStateGetter" vertical>
        <v-stepper-step :editable="personalDetailsStatusGetter" :complete="nextStepInStepperStateGetter > 1" step="1">
          Add Insurance Specific Questions.
        </v-stepper-step>

        <v-stepper-content step="1">
            <health-component-questions :questions="questions"/>
        </v-stepper-content>

        <v-stepper-step :editable="personalDetailsStatusGetter" :complete="nextStepInStepperStateGetter > 2" step="2">
          Add Personal Details.
        </v-stepper-step>

        <v-stepper-content step="2">
                <health-component-personal-questions/>           
        </v-stepper-content>

        <v-stepper-step :complete="nextStepInStepperStateGetter > 3" step="3">
          Insurance Cover Estimates.
        </v-stepper-step>

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
            <template v-if="premiumsDataGetter.length > 0">
              <h2 class="text-center" style="color: black;">
                {{ premiumsDataGetter.length }} Premiums Found.
              </h2>

              <v-row align="center" justify="center">
                <v-btn
                  @click="redirectToSmallScreen()"
                  outlined
                  medium
                  color="success"
                  dark
                >
                  Redirect To Better View.
                  <v-icon>redo</v-icon>
                </v-btn>
              </v-row>
            </template>
            <template v-else>
              <h2 class="text-center" style="color: red;">
                {{ premiumsDataGetter.length }} Premiums Found.
              </h2>
              <h3 style="color: black;" class="text-center">
                Try Another Search...
              </h3>
            </template>
          </v-container>

          <div class="text-center">
            <v-btn
              style="text-align: right;"
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
import { mapGetters } from 'vuex'
import { HollowDotsSpinner } from 'epic-spinners'
import { OrbitSpinner } from 'epic-spinners'
import router from '../../router'
export default {
  name: 'SectionThemeFeatures',
  computed: {
    ...mapGetters([
      'navigationCoverGetter',
      'navigationStateGetter',
      'navigationSubCategory',
      'personalDetailsStatusGetter',
      'premiumsDataGetter',
      'premiumsDataStatusGetter',
      'nextStepInStepperStateGetter'
    ]),
  },
  components: {
    HollowDotsSpinner,
    OrbitSpinner,
  },
  methods: {
    activateTheSubCategory(subCategory) {
      this.inputData = []
      this.$store.dispatch('updatingTheSubCategoryCoverIndex', subCategory)
    },

    
    step3GoToStep2() {      
      this.$store.dispatch("nextStepInStepper",2);
    },   
    redirectToSmallScreen() {
      router.push('healthPremiumsMobileView')
    },
  },
  data: () => ({
    cover: null,
    questions: null,
    subCategory: null,                    
  }),
  created() {
    this.cover = this.navigationStateGetter[this.navigationCoverGetter]
    this.questions = this.navigationStateGetter[
      this.navigationCoverGetter
    ].subCategories[this.navigationSubCategory].questions
    this.subCategory = this.navigationSubCategory
  },

  // ! this sections is used to monitor if there is any change that happens to the change in the categories and subCategories.

  watch: {
    navigationCoverGetter: function () {
      this.cover = this.navigationStateGetter[this.navigationCoverGetter]
    },
    navigationSubCategory: function () {
      this.questions = this.navigationStateGetter[
        this.navigationCoverGetter
      ].subCategories[this.navigationSubCategory].questions
      this.subCategory = this.navigationSubCategory
    },
  },
}
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
