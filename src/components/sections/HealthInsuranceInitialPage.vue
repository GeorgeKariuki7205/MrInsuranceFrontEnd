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
      <v-row class="hidden-sm-and-down" justify="center" align="center">
        <v-col
          v-for="(feature, i) in cover.subCategories"
          :key="i"
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
            :key="i"
            color="primary"
            @click="activateTheSubCategory(i)"
            class="ma-2"
          >
            <v-icon left>{{ feature.icon }}</v-icon>
            {{ feature.name }}
          </v-chip>
          <v-chip
            v-else
            :key="i"
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
              <h3 class="text-center">Insurance Cover Specific Details.</h3>
              <template v-for="(feature, i) in questions">
                <template v-if="questions[i].type == 'date'">
                  <h5 class="text-center" :key="i">
                    {{ i + 1 + "." }} {{ questions[i].question }}
                  </h5>
                  <v-container :key="i">
                    <v-row dense :key="i">
                      <v-col md="6" offset-md="3">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Date"
                              prepend-icon="event"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1900-01-01"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
                <template v-else-if="questions[i].type === 'number'">
                  <h5 class="text-center" :key="i">
                    {{ i + 1 + "." }} {{ questions[i].question }}
                  </h5>
                  <v-row dense :key="i">
                    <v-col md="6" offset-md="3">
                      <v-text-field
                        type="number"
                        prepend-icon="child_care"
                        single-line
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                <template v-else-if="questions[i].type == 'checkbox'">
                  <v-row :key="i" align="center" justify="center">
                    <v-col md="4" offset-md="2">
                      <h5 class="text-center" :key="i">
                        {{ i + 1 + "." }} {{ questions[i].question }}
                      </h5>
                    </v-col>
                    <v-col md="4">
                      <v-checkbox></v-checkbox>
                    </v-col>
                  </v-row>
                </template>
              </template>

              <div style="text-align:right">
                <v-btn color="success" outlined @click="e1 = 2">
                  Next <v-icon>navigate_next</v-icon>
                  <v-icon>arrow_forward_ios</v-icon>
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <h3 class="text-center">Personal Details.</h3>
              <v-row dense>                  
                  <v-col md="6" offset-md="3">
                  <h5>1. Name: </h5>               
                
                  <v-text-field                    
                    placeholder="Name"
                    outlined
                  ></v-text-field> 
                  </v-col>                                                                                
              </v-row>
               <v-row dense>                  
                  <v-col md="6" offset-md="3">
                  <h5>2. Email Address: </h5>               
                
                  <v-text-field                    
                    placeholder="Name"
                    outlined
                  ></v-text-field> 
                  </v-col>                                                                   
              </v-row>

               <v-row dense>                  
                  <v-col md="6" offset-md="3">
                  <h5>3. Phone Number: </h5>               
                
                  <v-text-field                    
                    placeholder="Name"
                    outlined
                  ></v-text-field> 
                  </v-col>                                                                   
              </v-row>
              <div>
                <v-btn class="float-right" style="text-align:right" color="success" outlined="" @click="e1 = 3">
                Generate Estimates. <v-icon>navigate_next</v-icon>
                  <v-icon>arrow_forward_ios</v-icon>
              </v-btn>

              <v-btn class="float-left" style="text-align:right" color="red" outlined="" @click="e1 = 3">
               <v-icon>arrow_back_ios</v-icon>
                  <v-icon>arrow_back_ios</v-icon>
                  Go Back. 
              </v-btn>
              
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
             
             <trinity-rings-spinner
              :animation-duration="1000"
              :size="166"
              color="#3AB290"
            />

             <div class="text-center">                
              <v-btn style="text-align:right" color="red" outlined="" @click="e1 = 3">
               <v-icon>arrow_back_ios</v-icon>
                  <v-icon>arrow_back_ios</v-icon>
                  Go Back. 
              </v-btn>
              
              </div>
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
            
                         <h3 class="text-center">Insurance Cover Specific Details.</h3>
              <template v-for="(feature, i) in questions">
                <template v-if="questions[i].type == 'date'">
                  <h5 class="text-center" :key="i">
                    {{ i + 1 + "." }} {{ questions[i].question }}
                  </h5>
                  <v-container :key="i">
                    <v-row dense >
                      <v-col>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Date"
                              prepend-inner-icon="event"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1900-01-01"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
                <template v-else-if="questions[i].type === 'number'">
                  <h5 class="text-center" :key="i">
                    {{ i + 1 + "." }} {{ questions[i].question }}
                  </h5>
                  <v-row dense :key="i">
                    <v-col>
                      <v-text-field
                        type="number"
                        prepend-inner-icon="child_care"
                        single-line
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                <template v-else-if="questions[i].type == 'checkbox'">
                  <v-row :key="i" align="center" justify="center">
                    <v-col md="4" offset-md="2">
                      <h5 class="text-center" :key="i">
                        {{ i + 1 + "." }} {{ questions[i].question }}
                      </h5>
                    </v-col>
                    <v-col md="4">
                      <v-checkbox></v-checkbox>
                    </v-col>
                  </v-row>
                </template>
              </template>

              <div style="text-align:right">
                <v-btn color="success" outlined @click="e6 = 2">
                  Next <v-icon>navigate_next</v-icon>
                  <v-icon>arrow_forward_ios</v-icon>
                </v-btn>
              </div>
          </v-stepper-content>

          <v-stepper-step editable :complete="e6 > 2" step="2"
            >Configure analytics for this app</v-stepper-step
          >

          <v-stepper-content step="2">
                          <h3 class="text-center">Personal Details.</h3>
              <v-row dense>                  
                  <v-col md="6" offset-md="3">
                  <h5>1. Name: </h5>               
                
                  <v-text-field                    
                    placeholder="Name"
                    outlined
                  ></v-text-field> 
                  </v-col>                                                                                
              </v-row>
               <v-row dense>                  
                  <v-col md="6" offset-md="3">
                  <h5>2. Email Address: </h5>               
                
                  <v-text-field                    
                    placeholder="Name"
                    outlined
                  ></v-text-field> 
                  </v-col>                                                                   
              </v-row>

               <v-row dense>                  
                  <v-col md="6" offset-md="3">
                  <h5>3. Phone Number: </h5>               
                
                  <v-text-field                    
                    placeholder="Name"
                    outlined
                  ></v-text-field> 
                  </v-col>                                                                   
              </v-row>
              <div>
                <v-btn class="float-right" style="text-align:right" color="success" outlined="" @click="e6 = 3">
                Generate Estimates. <v-icon>navigate_next</v-icon>
                  <v-icon>arrow_forward_ios</v-icon>
              </v-btn>

              <v-btn class="float-left" style="text-align:right" color="red" outlined="" @click="e1 = 3">
               <v-icon>arrow_back_ios</v-icon>
                  <v-icon>arrow_back_ios</v-icon>
                  Go Back. 
              </v-btn>
              
              </div>
          </v-stepper-content>

          <v-stepper-step editable :complete="e6 > 3" step="3"
            >Select an ad format and name ad unit</v-stepper-step
          >

          <v-stepper-content step="3">
            <trinity-rings-spinner
              :animation-duration="1000"
              :size="166"
              color="#3AB290"
            />

             <div class="text-center">                
              <v-btn style="text-align:right" color="red" outlined="" @click="e6 = 3">
               <v-icon>arrow_back_ios</v-icon>
                  <v-icon>arrow_back_ios</v-icon>
                  Go Back. 
              </v-btn>
              
              </div>
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
import { TrinityRingsSpinner } from 'epic-spinners'
export default {
  name: "SectionThemeFeatures",
  computed: {
    ...mapGetters([
      "navigationCoverGetter",
      "navigationStateGetter",
      "navigationSubCategory",
    ]),
  },
  components:{
    TrinityRingsSpinner,
  },
  methods: {
    activateTheSubCategory(subCategory) {
      this.$store.dispatch("updatingTheSubCategoryCoverIndex", subCategory);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  data: () => ({
    cover: null,
    questions: null,
    subCategory: null,
    e1: 1,
    e6: 1,
    date1: null,
    date2: null,
    menu1: false,
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
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
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
