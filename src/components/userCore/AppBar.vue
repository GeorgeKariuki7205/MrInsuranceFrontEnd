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
            color="red"
            v-for="(name, i) in items"
            :key="i"
            :to="{ name }"
            :exact="name === 'Home'"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
            white--text
          >
            <v-icon>{{ icons[i] }}</v-icon>
            <v-spacer></v-spacer>
            {{ name }}
          </v-tab>
          <v-menu openOnHover offsetX>
            <template v-slot:activator="{ on, attrs }">              
                <v-btn
                  text
                  class="align-self-center mr-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>local_hospital</v-icon>
                  Health
                  <!-- <span> </span> -->
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>                              
            </template>

            <v-list background-color="primary" dense class="grey lighten-3">
              <v-list-item
                v-for="item in more"
                :key="item"
                @click="addItem(item)"
              >
                <!-- {{ item }} -->
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </div>
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" :icons="icons" />
  </div>
</template>

<script>
export default {
  name: "HomeAppBar",

  components: {
    HomeDrawer: () => import("./Drawer"),
  },

  data: () => ({
    drawer: false,
    more: ["Audience1", "Audience 1", "Audience 1", "Audience 1", "Audience 1"],
    items: ["Home", "About", "Contact"],
    icons: ["home", "group", "call"],
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
