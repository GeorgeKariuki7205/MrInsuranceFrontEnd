<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    bottom
    left
    max-width="90%"
    min-width="275"
    offset-x
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-card
        id="settings"
        class="py-2 px-4"
        color="primary"
        dark
        flat
        style="position: fixed; top: 164px; right: -35px;"
        width="100"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon large>
          fa-phone
        </v-icon>
      </v-card>
    </template>

    <v-card class="py-2">
      <base-title align="center" title="Get A Call From Us Now ..." space="0" />

      <v-card-text>
        <v-container class="text-center">
          <p>Your Name:</p>
          <v-text-field dense placeholder="Your Name" outlined></v-text-field>
          <p>Your Email Address:</p>
          <v-text-field dense
            placeholder="Your Email Address:"
            outlined
          ></v-text-field>
          <p>Your Phone Number:</p>
          <v-text-field dense
            placeholder="Your Phone Number:"
            outlined
          ></v-text-field>

          <p>Insurance Cover Interested In:</p>
          <v-select    dense        
            label="Insurance Cover Interested In:"
            outlined
          ></v-select>

          <v-btn rounded color="primary" large class="text-center" dark>
            <span> <v-icon>fa-phone-volume</v-icon> Request For Call.</span>
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "HomeSettings",

  data() {
    return {
      colors: [this.$vuetify.theme.themes.light.primary, "#9368e9", "#F4511E"],
      menu: false,
    };
  },
};
</script>
