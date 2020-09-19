<template>
  <div>
    <base-info-card title="Insurance Covers."> </base-info-card>
    <v-list background-color="transparent">
      <div v-for="(item, index) in navigationStateGetter" :key="index">
        <v-list-group
          v-if="item['subCategories']"
          :prepend-icon="item['icon']"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item["cover"] }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(item, index) in item['subCategories']"
            :key="index"
            link
          >
            <v-list-item-title> <span> <v-icon>{{'fa-'+item.icon}}</v-icon> {{item.name}} </span> </v-list-item-title>
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
