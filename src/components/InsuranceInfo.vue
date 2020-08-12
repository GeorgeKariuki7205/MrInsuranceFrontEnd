<template>
<div>
  <base-info-card title="Insurance Covers.">    
  </base-info-card>
      <v-list background-color="transparent">
      <!-- <v-list-item-group background-color="transparent">        
        <v-list color="transparent">          
          <v-list-group v-for="item in navigationStateGetter"
            :key="item" prepend-icon="local_hospital">
            <template v-slot:activator>
              <v-list-item-title>{{ item["cover"] }}</v-list-item-title>
            </template>                
                <v-list-item v-for="item in item['subCategories']" :key="item" link>
                <v-list-item-title v-text="item"></v-list-item-title>                
              </v-list-item>                      
          </v-list-group>           
        </v-list>
        <v-divider></v-divider>
      </v-list-item-group> -->
                <div v-for="(item, index) in navigationStateGetter" :key="index">
            <v-list-group
              v-if="item['subCategories']"
              prepend-icon="local_hospital"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ item["cover"] }}</v-list-item-title>
              </template>
              <v-list-item
                v-for="item in item['subCategories']"
                :key="item"
                link
              >
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else color="primary">
              <v-list-item-icon>
                <v-icon>email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ item["cover"] }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
    </v-list>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SectionFeaturesAlt",
  computed: {
    ...mapGetters(["navigationStateGetter"]),
  },
  data: () => ({
    features: [
      "Health Insurance",
      "Life Insurance",
      "Motor Insurance",
      "Family Health",
      "Golf insurance",
    ],
  }),
};
</script>
