<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-section-heading style="text-color:white" title="Mr Insurance." />

      <base-title
        size="body-1"
        space="4"
        title="ALL YOUR INSURANCE NEEDS"
        weight="regular"
      />

      <base-body>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo pariatur quidem, quis modi iure nihil commodi suscipit, corporis dicta adipisci, voluptatum quia cupiditate. Nulla minus voluptatum nostrum deleniti, asperiores facere.
      </base-body>

      <base-btn
        class="mb-12"
        color="white"
        outlined
      >
        More Info
      </base-btn>
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseInfo',

    props: {
      title: String,
      dark: Boolean,
    },

    data: () => ({
      business: [
        {
          icon: 'mdi-map-marker-outline',
          title: 'Address',
          text: '121 Moi Avenue',
        },
        {
          icon: 'mdi-cellphone',
          title: 'Phone',
          text: '(+254) 3333333',
        },
        {
          icon: 'mdi-email',
          title: 'Email',
          text: 'mail@mail.com',
        },
      ],
    }),
  }
</script>
