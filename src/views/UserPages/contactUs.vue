<template>

   <v-app>
    <ucore-app-bar/>
    <v-main>         
        <section-hero-alt :name="pageName"/>
        <section-keep-in-touch/>        
        <section-newsletter/>        
    </v-main>
    <ucore-footer/>
  </v-app>

</template>

<script>
export default {
      data: () => ({
      pageName:'Contact Us',      
    }),
}
</script>

<style>

</style>