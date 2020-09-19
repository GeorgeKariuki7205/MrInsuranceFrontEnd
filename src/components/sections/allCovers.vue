<template>
  <base-section id="theme-features">
    <base-section-heading title="All Our Covers.">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in! Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          cols="12"
          md="6"
        >
          <base-avatar-card
            v-bind="feature"
            align="left"
            horizontal
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum veniam cum dolores ratione commodi beatae quas maxime, laboriosam excepturi solut!
          </base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionThemeFeatures',

    data: () => ({
      features: [
        {
          title: 'Health Insurance',
          icon: 'fa-hospital',
        },
        {
          title: 'Device Insurance',
          icon: 'fa-mobile-alt',
        },
        {          
          title: 'Motor Insurance',
          icon: 'fa-car',
        },
        {
          title: 'Golf Insurance',
          icon: 'fa-golf-ball',
        },
        {
          title: 'Family Health',
          icon: 'fa-users',
        },
        {
          title: 'Agricultural Insurance',
          icon: 'fa-seedling',
        },
      ],
    }),
  }
</script>
