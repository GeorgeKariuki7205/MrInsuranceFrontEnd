<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      light
      color="#29AB87"
      elevation="1"
      height="80"
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <base-img
        :src="require('@/assets/tie-svgrepo-com.svg')"
        class="hidden-sm-and-up"
        contain
        max-width="52"
        max-height="80"
        height="100%"
        width="100%"
      />
      <base-img
        :src="require('@/assets/tie-svgrepo-com.svg')"
        class="hidden-sm-and-down"
        contain
        max-width="128"
        max-height="80"
        width="100%"
        height="100%"
      />
      <h1 style="font-family:'cursive';">Mr Insurance</h1>
      <v-spacer />

      <div color="#29AB87">
        <v-tabs
          background-color="#29AB87"
          class="hidden-sm-and-down icons-and-text"
          optional
        >
          <v-tabs-slider color="black"></v-tabs-slider>
          <v-tab
            to="/"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            <v-icon>home</v-icon>
            <v-spacer></v-spacer>
            Home
          </v-tab>
          <template v-for="(item, coverIndex) in navigationStateGetter">
            <v-menu
              v-if="item.subCategories"
              openOnHover
              offsetY
              :key="coverIndex"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  class="align-self-center mr-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left> {{ item["icon"] }}</v-icon>
                  {{ item["cover"] }}                  
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list background-color="primary" dense class="grey lighten-3">
                <v-subheader>{{ item["cover"] }}</v-subheader>
                <v-list-item
                  v-for="(item, index) in item['subCategories']"
                  :key="index"
                  @click="clickedSubCategory(index, coverIndex)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-tab
              :key="coverIndex"
              v-else
              active-class="text--primary"
              class="font-weight-bold"
              min-width="96"
              text
            >
              <v-icon left=""> {{ item["icon"] }}</v-icon>
              <v-spacer></v-spacer>
              {{ item["cover"] }}
            </v-tab>
          </template>
          <v-tab
            to="/about"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            <v-icon>group</v-icon>
            <v-spacer></v-spacer>
            About
          </v-tab>
          <v-tab
            to="/contact-us"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            <v-icon>call</v-icon>
            <v-spacer></v-spacer>
            Contact Us
          </v-tab>
        </v-tabs>
      </div>
    </v-app-bar>

    <home-drawer
      v-model="drawer"
      :navigationStateGetters="navigationStateGetter"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../../router";
export default {
  name: "HomeAppBar",

  components: {
    HomeDrawer: () => import("./Drawer"),
  },
  computed: {
    ...mapGetters(["navigationStateGetter", "navigationCoverGetter"]),
  },
  methods: {
    clickedSubCategory(subCategoryId, coverIndex) {      
      // ! this method is used to update the the cover and the subcategory ids.

      this.$store.dispatch("updatingTheCoverIndex", coverIndex);
      this.$store.dispatch("updatingTheSubCategoryCoverIndex", subCategoryId);

      //! after update, redirect to the proper page.
      router.push({
        name: this.navigationStateGetter[this.navigationCoverGetter].route_name,
      });
    },
  },
  data: () => ({
    drawer: false,
  }),
};
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

  .v-tab
    &::before
      display: none
</style>
