<template>
  <v-app>
    <ucore-app-bar />
    <v-main>
      <!-- <section-hero/> -->
      <section id="hero">
        <v-img
          :min-height="minHeight"
          :src="require('@/assets/file4.png')"
          class="white--text"
          gradient="to right, rgba(5, 11, 31,.8), rgba(5, 11, 31,.8)"
        >
          <v-container class=" px-4 py-12">
            <v-responsive
              class="d-flex align-center py-4"
              height="100%"
              max-width="100%"
              width="100%"
            >
              <base-subheading
                class="text-center"
                :title="
                  'Hello, ' +
                    this.activatingAccountPersonalDetailsStateGetters[
                      'personalData'
                    ][0]['first_name'] +
                    ' Kindly Activate Account  .'
                "
                style="margin-top:-2%;margin-bottom:-2%;"
              />

              <v-card
                class="mx-auto my-12 text-center"
                max-width="400"
                style="
              padding-left: 2%;
              padding-right: 2%;
              padding-top: 2%;
              padding-bottom: 2%;
              height: 100%;
              text-align:center;
            "
              >
                <v-avatar class="text-center" color="primary" size="70">
                  <v-icon dark size="40">
                    mdi-lock-open
                  </v-icon>
                </v-avatar>

                <br />
                <span
                  style="margin-top:9%;margin-bottom:5%;text-align:right;color:#29AB87"
                  class="text-center"
                  >Sign in to start your session</span
                >
                <v-form
                  ref="form2"
                  v-model="form2Validation"                  
                >
                  <v-text-field
                    prepend-icon="mdi-key"
                    v-model="personalData['password']"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.passwordLength]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show = !show"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-key"
                    v-model="personalData['retypePassword']"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.confirmationOfPassword]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Re-type Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-btn
                    large                    
                    @click="activatingAccount"
                    color="success"
                    dark
                    rounded
                    class="mt-4"
                    style="margin-top:5%;"
                  >
                    <span
                      ><v-icon dark>
                        mdi-lock-open
                      </v-icon>
                      <span v-if="!activatingAccountStateGetter">Activate Account.</span>
                      <span v-else> <v-progress-circular
                    :width="3"      
                    indeterminate
                  ></v-progress-circular> Activating. </span>
                      
                    </span>
                  </v-btn>
                </v-form>
              </v-card>
            </v-responsive>
          </v-container>
        </v-img>
      </section>
      <section-partners />
      <section-all-covers />
      <section-how-it-works />
      <section-contact-us />
      <ucore-settings />
      <section-info />
    </v-main>
    <ucore-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ActivatingAccount",
  created() {
    console.log(
      this.activatingAccountPersonalDetailsStateGetters["personalData"][0][
        "first_name"
      ]
    );
    if (this.uuid !== null) {
      console.log("This is the UUID.");
      console.log(this.uuid);

      // ! posting the uuid to get the details of the user.
    }
  },
  props: ["uuid"],
  methods: {
    activatingAccount() {
      if (this.$refs.form2.validate()) {
        if (this.personalData.password == this.personalData.retypePassword) {
          console.log("Activate acc0unt now.");
          this.$store.commit("UPDATING_ACTIVATING_ACCOUNT_STATE",true);
        }
      }
    },
  },
  data() {
    return {
      useruuid: this.uuid,
      form2Validation: false,
      show1: false,
      show: false,
      password: "",
      personalData: [],
      rules: {
        required: (value) => !!value || "Required.",
        passwordLength: (value) =>
          value.length > 8 || "Password Must be more than 8 Characters.",
        confirmationOfPassword: (value) =>
          value === this.personalData.password || "Pasword Donot Match.",
      },
    };
  },
  provide: {
    theme: { isDark: true },
  },

  computed: {
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? "10vh" : "50vh";

      return `calc(${height} - ${this.$vuetify.application.top}px)`;
    },
    ...mapGetters(["activatingAccountPersonalDetailsStateGetters","activatingAccountStateGetter"]),
  },
};
</script>
