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
      <v-list-group
        prepend-icon="account_circle"        
      >
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
          
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(crud, i) in cruds"
            :key="i"
            @click="xxx"
          >
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list-group>    
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
        ['Management', 'people_outline'],
        ['Settings', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
    }),
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
