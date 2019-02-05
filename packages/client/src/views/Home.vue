<template>
  <v-content class="pt-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <!-- Card -->
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Play</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-btn outline block raised @click="onJoinQueueClicked()">Join Queue</v-btn>

              <v-divider class="mt-4"/>
            </v-card-text>

            <v-card-actions class="px-3 pb-3">
              <v-btn small outline block @click="onCreateLobbyClicked()">Create Lobby</v-btn>
              <v-btn small outline block @click="onJoinLobbyClicked()">Join Lobby</v-btn>
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
  private onJoinQueueClicked() {
    // TODO: implement logic
  }

  private onCreateLobbyClicked() {
    // TODO: implement logic
  }

  private onJoinLobbyClicked() {
    // TODO: implement logic
  }
}
</script>

