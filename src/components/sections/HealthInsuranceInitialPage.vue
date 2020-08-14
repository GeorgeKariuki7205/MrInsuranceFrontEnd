<template>
  <base-section id="theme-features">
    <base-section-heading title="Health Insurance">
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
       <base-subhaeding title="Health Insurance"/>
       <base-title class="text-center"
            title="Health Insurance"            
          />
            Compllete The Three Easy Steps Below To Get Your Estimates.
      <template>
         <v-stepper class="hidden-sm-and-down" v-model="e1">
        <v-stepper-header style="backgrouns-color:red;">
          <v-stepper-step editable :complete="e1 > 1" step="1"
            >Name of step 1</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step editable :complete="e1 > 2" step="2"
            >
           <span><v-icon>email</v-icon>Name of step 2</span>             
            </v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step editable step="3">Name of step 3</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">



            <template v-for="(feature, i) in questions">
              <template v-if="questions[i].type == 'date'">
                {{ questions[i].question }}
                {{ questions[i].type }}
                <p :key="i">{{ "This is the date." }}</p>
              </template>
              <template v-else-if="questions[i].type === 'number'">
                {{ questions[i].question }}
                {{ questions[i].type }}
                <p :key="i">{{ "This is the number." }}</p>
              </template>
              <template v-else-if="questions[i].type == 'checkbox'">
                {{ questions[i].question }}
                {{ questions[i].type }}
                <p :key="i">{{ "This is the checkbox." }}</p>
              </template>
            </template>

            <v-btn color="primary" @click="e1 = 2">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
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
     
      <template >
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

          <v-stepper-step editable  :complete="e6 > 2" step="2"
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

          <v-stepper-step  editable step="4">View setup instructions</v-stepper-step>
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
    ...mapGetters(["navigationCoverGetter", "navigationStateGetter"]),
  },
  data: () => ({
    cover: null,
    questions: 0,
    subCategory: null,
    e1: 1,
    e6: 1,
  }),
  created() {
    this.cover = this.navigationStateGetter[this.navigationCoverGetter];
    this.questions = this.cover.subCategories[0].questions;
  },
};
</script>
