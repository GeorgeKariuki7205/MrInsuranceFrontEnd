<template>
  <base-section id="theme-features">
    <base-section-heading
      :title="navigationStateGetter[navigationCoverGetter]['cover']"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
      Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
      quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>

    <v-container>
      <v-row justify="center" align="center">
        <v-col
          v-for="(feature, i) in cover.subCategories"
          :key="i"
          cols="12"
          md="3"
        >
          {{ feature.name }}
          <base-avatar-card> </base-avatar-card>
        </v-col>
      </v-row>
      <base-title
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
      <template>
        <v-stepper class="hidden-sm-and-down" v-model="e1">
          <v-stepper-header style="backgrouns-color:red;">
            <v-stepper-step editable :complete="e1 > 1" step="1"
              >Add Cover Specific Details.</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step editable :complete="e1 > 2" step="2">
              Add Personal Details.
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="3"
              >Insurance Estimates.</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-container>
                <h3 class="text-center">Insurance Cover Specific Details.</h3>
                <template v-for="(feature, i) in questions">
                  <template v-if="questions[i].type == 'date'">
                    <v-row :key="i" cols="12">
                      <v-col md-1 class="md-2">{{ i + 1 }}</v-col>
                      <v-col md-2 class="md-4">{{
                        questions[i].question
                      }}</v-col>
                      <v-col md-2 class="md-4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Picker in menu"
                              prepend-icon="event"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-else-if="questions[i].type === 'number'">
                    <v-row :key="i" cols="12">
                      <v-col md-1 class="md-2">{{ i + 1 }}</v-col>
                      <v-col md-2 class="md-4">{{
                        questions[i].question
                      }}</v-col>
                      <v-col md-2 class="md-4">
                        <v-text-field dense type="number"></v-text-field
                      ></v-col>
                    </v-row>
                  </template>
                  <template v-else-if="questions[i].type == 'checkbox'">
                    <v-row :key="i" cols="12">
                      <v-col md-1 class="md-2">{{ i + 1 }}</v-col>
                      <v-col md-2 class="md-4">{{
                        questions[i].question
                      }}</v-col>
                      <v-col md-2 class="md-4">
                     <v-checkbox v-model="checkbox1" ></v-checkbox></v-col>
                    </v-row>
                  </template>
                </template>
              </v-container>

              <div class="pull-right">
                <v-btn color="primary" @click="e1 = 2">
                  Continue
                </v-btn>

                <v-btn text>Cancel</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn color="primary" @click="e1 = 3">
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn color="primary" @click="e1 = 1">
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>

      <template>
        <v-stepper class="hidden-sm-and-up" v-model="e6" vertical>
          <v-stepper-step editable :complete="e6 > 1" step="1">
            Select an app
            <small>Summarize if needed</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step editable :complete="e6 > 2" step="2"
            >Configure analytics for this app</v-stepper-step
          >

          <v-stepper-content step="2">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step editable :complete="e6 > 3" step="3"
            >Select an ad format and name ad unit</v-stepper-step
          >

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step editable step="4"
            >View setup instructions</v-stepper-step
          >
          <v-stepper-content step="4">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper>
      </template>
    </v-container>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SectionThemeFeatures",
  computed: {
    ...mapGetters([
      "navigationCoverGetter",
      "navigationStateGetter",
      "navigationSubCategory",
    ]),
  },
  data: () => ({
    cover: null,
    questions: null,
    subCategory: null,
    e1: 1,
    e6: 1,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
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
input[type=number] {
-moz-appearance: textfield;
}
  </style>
