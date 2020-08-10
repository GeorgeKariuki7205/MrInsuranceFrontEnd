<template>
  <base-info-card title="Our Partners">
    <v-row dense>
      <v-col
        v-for="n in 6"
        :key="n"
        cols="auto"
      >
        <base-img
           :src="require(`@/assets/logo-${n}.png`)"
          color="grey lighten-1"
          width="96"
          tile
        />
      </v-col>
    </v-row>
  </base-info-card>
</template>

<script>
  export default {
    name: 'Instagram',
  }
</script>
