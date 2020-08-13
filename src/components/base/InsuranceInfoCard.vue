<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0">
      <v-row
        :justify="justify"
        no-gutters
      >
        <v-col          
          :class="`text-${align}`"
          cols="12"
          class="mb-4"
        >
          <base-icon :color="color">
            local_hospital
          </base-icon>
        </v-col>

        <v-col
          v-if="covers.cover"
          :cols="callout ? 9 : 12"
        >          
          <base-title
            :title="covers.cover"
            class="text-uppercase"
            space="1"
          />

          <base-divider :color="color" />

          <base-body
           
            :text="covers.description"
            space="6"
          >
            <slot />
          </base-body>
        </v-col>

        <v-col
          v-if="callout"
          cols="2"
        >
          <div
            class="display-3 grey--text text--lighten-4 font-weight-bold pr-8"
            v-text="callout"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
  // Mixins
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseInfoCard',

    mixins: [Heading],

    props: {
      dark: Boolean,
      callout: String,
      color: {
        type: String,
        default: 'primary',
      },      
      covers: {      
      default: () => [],
    },
    },
  }
</script>
