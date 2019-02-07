<template>
  <v-content class="pt-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <!-- Card -->
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                label="Username"
                v-model="username"
                type="text"
                required
              ></v-text-field>

              <!-- <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
              ></v-text-field>-->
            </v-card-text>

            <v-card-actions class="px-3 pb-3">
              <v-spacer/>
              <v-btn small outline @click="onLoginClicked()">Login</v-btn>
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
export default class Login extends Vue {
  private username: string = '';

  /**
   * Register handlers
   */
  private created() {
    this.$socket.on('logged_in', this.onLogin);
    this.$socket.on('username_existing', this.onUsernameExisting);
    this.$socket.on('invalid_username', this.onInvalidUsername);
  }

  /**
   * Check if already logged in
   */
  private mounted() {
    if (this.$store.getters.loggedIn) this.$router.push({ name: 'home' });
  }

  /**
   * Button handler for the login button
   */
  private onLoginClicked() {
    this.$socket.emit('login', { name: this.username });
  }

  //
  // Server reponse handlers
  //
  private onLogin() {
    this.$store.dispatch('login', this.username);

    // Go to the homepage
    this.$router.push({ name: 'home' });
  }

  private onUsernameExisting() {
    // TODO: show proper error message
    alert('Username already existing.');
  }

  private onInvalidUsername() {
    // TODO: show proper error message
    alert('Invalid username.');
  }
}
</script>
