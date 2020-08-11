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
      <h1  style="font-family:'cursive';">Mr Insurance</h1>
      <v-spacer />

      <div color="#29AB87">
        <v-tabs background-color="#29AB87" class="hidden-sm-and-down icons-and-text" optional>
          <v-tab
            
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
            <v-icon>{{icons[i]}}</v-icon>
            <v-spacer></v-spacer>
           {{ name }}
            
          </v-tab>
        </v-tabs>
      </div>

      
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" :icons="icons"/>
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

    items: [
      "Home",
      "About",
      "Contact",
    ],
    icons:[
      "home",
      "group",
      "call"
    ]         
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
