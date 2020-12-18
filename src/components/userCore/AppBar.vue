<template>
  <div>
    <v-app-bar id="home-app-bar" app color="#29AB87" height="71%" elevation="1">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <base-img
        :src="require('@/assets/tie-svgrepo-com.svg')"
        class="hidden-sm-and-up"
        contain
        max-width="52"
        height="100%"
        width="100%"
      />
      <base-img
        :src="require('@/assets/tie-svgrepo-com.svg')"
        class="hidden-sm-and-down"
        contain
        max-width="128"
        width="100%"
        height="100%"
      />
      <h1 style="font-family: 'cursive'">Mr Insurance</h1>
      <v-spacer />

      <div color="#29AB87">
        <v-tabs
          background-color="#29AB87"
          class="hidden-sm-and-down"
          optional
          centered
          style="font-size:9px;"
          icons-and-text
          color="white"
        >
          <v-tabs-slider color="white"></v-tabs-slider>

          <!-- ! HOME TAB. -->

          <v-tab
            to="/"
            class="font-weight-bold"
            text
            style="font-size:10px;"
            dark
          >
            Home
            <v-icon>fa-home</v-icon>
          </v-tab>

          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-tab
                to="#"
                class="font-weight-bold"
                text
                v-bind="attrs"
                v-on="on"
                style="font-size:10px;"
              >
                <span>
                  All Insurance Covers
                  <v-icon right>fa-caret-down</v-icon></span
                >
                <v-icon>fa-umbrella</v-icon>
              </v-tab>
            </template>

            <div style="background-color: white" width="100%">
              <h2 class="text-center pa-2">
                These are All Insurance Covers We Have.
              </h2>
              <v-row style="background-color: white">
                <template v-for="(item, coverIndex) in navigationStateGetter">
                  <template v-if="item.subCategories">
                    <v-col :key="coverIndex">
                      <v-list shaped style="background-color: white">
                        <v-subheader>{{ item["cover"] }}</v-subheader>
                        <v-list-item
                          v-for="(item, index) in item['subCategories']"
                          :key="index"
                          @click="clickedSubCategory(index, coverIndex)"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              <span>
                                <v-icon left=""> {{ item["icon"] }}</v-icon>
                                {{ item["name"] }}
                              </span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </template>
                  <template v-else>
                    <v-col :key="coverIndex">
                      <v-list shaped style="background-color: white">
                        <v-subheader>{{ item["cover"] }}</v-subheader>
                        <v-list-item @click="clickedSubCategory(0, 0)">
                          <v-list-item-title>
                            <span>
                              <v-icon left=""> {{ item["icon"] }}</v-icon>
                              {{ item["cover"] }}
                            </span>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </div>
          </v-menu>

          <v-tab class="font-weight-bold" text style="font-size:10px;">
            Make A Claim.
            <v-icon>mdi-gavel</v-icon>
          </v-tab>
          <v-tab class="font-weight-bold" text style="font-size:10px;">
            Request A Call
            <v-icon>ring_volume</v-icon>
          </v-tab>
          <v-tab
            to="/about"
            class="font-weight-bold"
            text
            style="font-size:10px;"
          >
            About
            <v-icon>group</v-icon>
          </v-tab>

          <v-tab
            to="/contact-us"
            class="font-weight-bold"
            text
            style="font-size:10px;"
          >
            Contact Us
            <v-icon>phone_enabled</v-icon>
          </v-tab>
          <v-tab
            background-color="success"
            class="font-weight-bold"
            text
            style="font-size:10px;"
          >
            LogIn
            <v-icon>fa-sign-in-alt</v-icon>
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
      this.$store.dispatch("updatatingupdatingSubCategoryAndCoverState", true);

      //! after update, redirect to the proper page.
      router.push({
        // name: this.navigationStateGetter[this.navigationCoverGetter].route_name,
        name: "InsuranceCover",
      });
    },
  },
  data: () => ({
    drawer: false,
    menu: false,
    showMenu: false,
    items: [
      { title: "Click Me Click Me Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2 Click Me2 Click Me2 " },
    ],
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
