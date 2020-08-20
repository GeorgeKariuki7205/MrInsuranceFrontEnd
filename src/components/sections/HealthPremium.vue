<template style="margin-bottom:2%">
  <v-card class="mx-auto">
    <v-list-item style="background-color:#F0F0F0;">
      <v-list-item-content>
        <v-list-item-title>
          <h3>
            Company :
            <span style="color:green"> {{ premium.company.name }} </span>
          </h3>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item
          >Cover Limit:
          {{
            premium.coveredAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</v-list-item
        >
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-btn text color="success darken-4">
        Payable:
        {{
          premium.payableCash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
        /=
      </v-btn>
      <v-btn color="primary" dark medium>
        <v-icon>add_shopping_cart</v-icon>Get Cover.</v-btn
      >
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col md="4" class="text-center">
            <h4 style="color:black" class="text-center">Company :</h4>
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.7"
              max-height="100px"
              max-width="100px"
              class="text-center;"
            ></v-img>
            <h3 style="color:black">
              <span style="color:green"> {{ premium.company.name }} </span>
            </h3>
          </v-col>
          <v-col md="4">
            <h4 style="color:black" class="text-center">Benefits</h4>
            <template v-if="premium.coverBenefits.length > 0">
              <ol type="number">
                <template
                  v-for="(coverBenefit, index) in premium.coverBenefits"
                >
                  <li v-if="index <= 4 && morebenefits" :key="index">
                    {{ coverBenefit.name }}
                  </li>
                  <template v-if="!morebenefits">
                    <li :key="index">
                      {{ coverBenefit.name }}
                    </li>
                  </template>
                </template>
                <template class="text-center;">
                  <a
                    @click="morebenefits = !morebenefits"
                    style="text-decoration:null;text-align:center;color:orange"
                  >
                  <span v-if="morebenefits">Click To View More.</span>
                    <span v-else>Click To View Less.</span>
                    </a
                  >
                </template>
              </ol>            
            </template>
          </v-col>
          <v-col md="4" class="text-center">
            <h4 style="color:black" class="text-center">Cost Break Down.</h4>

            <!-- THIS IS THE SECTION THAT IS USED TO IMPLEMENT THE COST BREAKDOWN OF THE INSURANCE COVER. -->
            <div style="text-align:center;">
              <v-data-table
    :headers="headers"
    :items="data"    
    hide-default-footer  
  ></v-data-table>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions style="background-color:#F0F0F0;">
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="show = !show">
        {{ show ? "Show Less" : "Show More" }}
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div class="basil" v-show="show">
        <v-divider></v-divider>
        <v-tabs centered icons-and-text>
          <v-tab>
            Additonal Covers.
            <v-icon left>add_circle</v-icon>
          </v-tab>
          <v-tab active-class>
            Benefits
            <v-icon left>beach_access</v-icon>
          </v-tab>
          <v-tab>
            What's Not Covered.
            <v-icon left>error_outline</v-icon>
          </v-tab>
          <v-tab>
            Waiting Periods.
            <v-icon left>alarm</v-icon>
          </v-tab>

          <v-tab-item>
            <v-container>
              <v-card flat>
                <v-card-text>
                  <p>
                    Sed aliquam ultrices mauris. Donec posuere vulputate arcu.
                    Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
                  </p>

                  <p>
                    Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                    lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                    non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse
                    non nisl sit amet velit hendrerit rutrum.
                  </p>

                  <p class="mb-0">
                    Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                    Pellentesque libero tortor, tincidunt et, tincidunt eget,
                    semper nec, quam. Phasellus blandit leo ut odio.
                  </p>
                </v-card-text>
              </v-card>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                  egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                  id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                  aliquam libero, non adipiscing dolor urna a orci. Curabitur
                  ligula sapien, tincidunt non, euismod vitae, posuere
                  imperdiet, leo. Nunc sed turpis.
                </p>

                <p>
                  Suspendisse feugiat. Suspendisse faucibus, nunc et
                  pellentesque egestas, lacus ante convallis tellus, vitae
                  iaculis lacus elit id tortor. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In hac habitasse platea dictumst. Fusce ac
                  felis sit amet ligula pharetra condimentum.
                </p>

                <p>
                  Sed consequat, leo eget bibendum sodales, augue velit cursus
                  nunc, quis gravida magna mi a libero. Nam commodo suscipit
                  quam. In consectetuer turpis ut velit. Sed cursus turpis vitae
                  tortor. Aliquam eu nunc.
                </p>

                <p>
                  Etiam ut purus mattis mauris sodales aliquam. Ut varius
                  tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce
                  fermentum odio nec arcu.
                </p>

                <p class="mb-0">
                  Donec venenatis vulputate lorem. Aenean viverra rhoncus pede.
                  In dui magna, posuere eget, vestibulum et, tempor auctor,
                  justo. Fusce commodo aliquam arcu. Suspendisse enim turpis,
                  dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
    morebenefits: true,
    headers: [
          {
            text: 'Individual',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Amount', value: 'value' },
          { text: 'Description', value: 'description' },                        
        ],
        data:[
          {
              name: 'Geothe',
              value:12,
              description:'description',
          }
          
        ]

    // ! health benefits table definition.
  }),
  props: ["premium"],
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
