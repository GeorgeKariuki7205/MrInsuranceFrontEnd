<template>
  <v-navigation-drawer
    color="white"
    fixed
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >    
    <v-list nav app>
      <v-list-item-group active-class="primary--text text--accent-4">
        <v-list-item two-line>
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/men/81.jpg" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Mr Insurance</v-list-item-title>
        <v-list-item-subtitle>Insure Yourself Now.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list color="white" shaped>
      <v-list-item
       v-for="(name, i) in items"
        :key="i"
        :to="{ name }"
        :exact="name === 'Home'"
        color="primary"
      >
      <v-list-item-icon>
                <v-icon>{{icons[i]}}</v-icon>
              </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "HomeDrawer",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    icons: {
      type: Array,
      default: () => [],
    },
    
  },
};
</script>
