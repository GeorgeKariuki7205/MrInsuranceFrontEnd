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
      <h1 style="font-family: 'cursive'">Mr Insurance</h1>
      <v-spacer />

      <div color="#29AB87">
        <v-tabs
          background-color="#29AB87"
          class="hidden-sm-and-down icons-and-text"
          optional
        >
          <v-tabs-slider color="black"></v-tabs-slider>

          <!-- ! HOME TAB. -->

          <v-tab
            to="/"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            <v-icon>mdi-home</v-icon>
            <v-spacer></v-spacer>
            Home
          </v-tab>

          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-tab
                to="#"
                active-class="text--primary"
                class="font-weight-bold"
                min-width="96"
                text
                v-bind="attrs"
                v-on="on"
              >
                <span>
                  All Insurance Covers
                  <v-icon right>fa-caret-down</v-icon></span
                >
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

          <v-tab
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            <v-icon>mdi-gavel</v-icon>
            <v-spacer></v-spacer>
            Make A Claim.
          </v-tab>
          <v-tab
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            <v-icon>ring_volume</v-icon>
            <v-spacer></v-spacer>
            Request A Call
          </v-tab>
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
            <v-icon>phone_enabled</v-icon>
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
