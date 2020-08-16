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
          <v-subheader>Insurance Covers.</v-subheader>

          <div
            v-for="(item, coverIndex) in navigationStateGetters"
            :key="coverIndex"
          >
            <v-list-group
              v-if="item['subCategories']"
              :prepend-icon="item.icon"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ item["cover"] }}</v-list-item-title>
              </template>
              <v-list-item
                v-for="(item, index) in item['subCategories']"
                :key="index"
                link
                @click="clickedSubCategory(index, coverIndex)"
              >
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else color="primary">
              <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ item["cover"] }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

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
import { mapGetters } from "vuex";
import router from "../../router";
export default {
  name: "HomeDrawer",
  computed: {
    ...mapGetters(["navigationStateGetter", "navigationCoverGetter"]),
  },
  methods: {
    clickedSubCategory(subCategoryId, coverIndex) {
      console.log(subCategoryId + " This is the cover Id  " + coverIndex);
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
