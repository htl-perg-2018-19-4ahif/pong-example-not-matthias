<template>
  <v-content class="pt-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <!-- Card -->
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Lobbies</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-btn icon @click="onLobbyRefreshClicked()">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text class="pt-4 px-4 pb-3">
              <v-data-table
                :headers="headers"
                :items="lobbies"
                :rows-per-page-items="perPage"
                :pagination.sync="pagination"
                hide-actions
                hide-headers
                class="elevation-1"
              >
                <!-- Items -->
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right hidden-sm-and-down">{{ props.item.createdBy }}</td>
                  <td class="text-xs-right">{{ props.item.slots }}</td>
                  <td class="text-xs-right">
                    <div>
                      <v-btn icon small @click="onEditLobbyClicked()">
                        <!-- TODO: Only show if the current person is the creator -->
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon small @click="onDeleteLobbyClicked()">
                        <!-- TODO: Only show if the current person is the creator -->
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn icon small @click="onJoinLobbyClicked()">
                        <v-icon>mdi-play</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </template>
              </v-data-table>

              <div class="text-xs-center pt-3">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
              </div>
            </v-card-text>
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
  private perPage: number[] = [5];
  private pagination = {
    descending: false,
    page: 1,
    rowsPerPage: 5,
    sortBy: '',
    totalItems: 0
  };

  private headers = [
    { text: 'Name', value: 'name', sortable: false },
    { text: 'Created by', value: 'createdBy', sortable: false },
    { text: 'Slots free', value: 'slots', sortable: false },
    { text: 'Actions', sortable: false }
  ];

  private lobbies = [
    {
      name: 'Lobby 1',
      createdBy: 'not',
      slots: '1/2'
    },
    {
      name: 'Lobby 1',
      createdBy: 'not-matthias',
      slots: '1/2'
    },
    {
      name: 'Lobby 1',
      createdBy: 'not-matthias',
      slots: '1/2'
    },
    {
      name: 'Lobby 1',
      createdBy: 'not-matthias',
      slots: '1/2'
    },
    {
      name: 'Lobby 1',
      createdBy: 'not-matthias',
      slots: '1/2'
    },
    {
      name: 'Lobby 1',
      createdBy: 'not-matthias',
      slots: '1/2'
    }
  ];

  private mounted() {
    // TODO: load lobbies
  }

  get pages() {
    if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
      return 0;
    }

    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }

  private onLobbyRefreshClicked() {
    // TODO: implement logic
  }
  private onEditLobbyClicked() {
    // TODO: implement logic
  }

  private onDeleteLobbyClicked() {
    // TODO: implement logic
  }

  private onJoinLobbyClicked() {
    // TODO: implement logic
  }
}
</script>

