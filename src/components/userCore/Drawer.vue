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
          <v-list-item to="/" color="primary">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Home </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader inset>Insurance Covers.</v-subheader>

          <v-list-group v-for="item in navigationStateGetters"
            :key="item" prepend-icon="local_hospital">
            <template v-slot:activator>
              <v-list-item-title>{{ item["cover"] }}</v-list-item-title>
            </template>


                
                <v-list-item v-for="item in item['subCategories']" :key="item" link>
                <v-list-item-title v-text="item"></v-list-item-title>                
              </v-list-item>                      
          </v-list-group>

           <v-list-item to="/about" color="primary">
            <v-list-item-icon>
              <v-icon>group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> About Us </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

           <v-list-item to="/contact-us" color="primary">
            <v-list-item-icon>
              <v-icon>call</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Contact Us </v-list-item-title>
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

  data: () => ({
    admins: [
      ["Management", "people_outline"],
      ["Settings", "settings"],
    ],
    cruds: [
      ["Create", "add"],
      ["Read", "insert_drive_file"],
      ["Update", "update"],
      ["Delete", "delete"],
    ],
  }),
  props: {
    navigationStateGetters: {
      type: Array,
      default: () => [],
    },    
  },
};
</script>
