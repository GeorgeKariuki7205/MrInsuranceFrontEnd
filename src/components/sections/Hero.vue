<template>
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
          <base-heading class="text-center" title="Mr Insurance, Live Your Best." />
          <section-insurance-covers />
          <div
            :class="
              $vuetify.breakpoint.smAndDown
                ? 'flex-column align-start'
                : 'align-center'
            "
            class="d-flex flex-wrap"
          >
            <base-btn>
              Show More
            </base-btn>

            <span class="font-weight-bold ml-6 mr-4 my-4">or</span>

            <base-btn :ripple="false" class="pa-1" height="auto" text>
              Get In Touch With Out Staff Now
            </base-btn>
          </div>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script>
export default {
  name: "SectionHero",

  provide: {
    theme: { isDark: true },
  },

  computed: {
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? "10vh" : "50vh";

      return `calc(${height} - ${this.$vuetify.application.top}px)`;
    },
  },
  data: () => ({    
  }),
};
</script>
