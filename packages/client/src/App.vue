<template>
  <v-app>
    <v-content>
      <Header/>

      <router-view/>

      <Footer/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: { Header, Footer }
})
export default class App extends Vue {}
</script>
