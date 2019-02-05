<template>
  <div>
    <v-toolbar dense dark>
      <v-toolbar-title class="home" @click="$router.push({ name: 'home' })">Pong</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Buttons -->
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  private name: string = 'My Blog';
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>