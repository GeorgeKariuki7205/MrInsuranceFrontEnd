<template>
  <base-section id="theme-features">
    <base-section-heading title="Health Insurance">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in! Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          cols="12"
          md="3"
        >
          <base-avatar-card
            v-bind="feature"
            align="left"
            horizontal
          >            
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
          title: 'Family Health',
          icon: 'local_hospital',
          color: 'primary',
          dark: true,
        },
        {
          title: 'Elders Health',
          icon: 'mdi-cellphone',
        },
        {          
          title: 'Children Health',
          icon: 'directions_car',
        },
        {
          title: 'Golf Insurance',
          icon: 'golf_course',
        },        
      ],
    }),
  }
</script>
