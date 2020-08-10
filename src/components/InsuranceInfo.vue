<template>
  <base-info-card title="Insurance Covers.">
    <a
      v-for="feature in features"
      :key="feature"
      :text="feature"
      class="mb-8 grey--text body-1 d-block text-none"
      href="#"
      v-html="`&rsaquo; ${feature}`"
    />
  </base-info-card>
</template>

<script>
  export default {
    name: 'SectionFeaturesAlt',

    data: () => ({
      features: [
        'Health Insurance',
        'Life Insurance',
        'Motor Insurance',
        'Family Health',
        'Golf insurance',
      ],
    }),
  }
</script>
