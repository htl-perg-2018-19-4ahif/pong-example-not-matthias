<template>
  <v-content class="pt-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <!-- Card -->
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>New Lobby</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-text-field prepend-icon="mdi-account" label="Name" type="text" v-model="name"></v-text-field>
              <!-- <v-text-field prepend-icon="mdi-lock" label="Password" type="text" v-model="name"></v-text-field> -->
            </v-card-text>

            <v-card-actions class="pt-0 px-3 pb-3">
              <v-btn small outline block @click="onCreateLobbyClicked()">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private name: string = '';

  private onCreateLobbyClicked() {
    // TODO: implement logic
  }
}
</script>

