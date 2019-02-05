import Vue from 'vue';

declare module 'vue/types/vue' {
  export interface Vue {
    $socket: SocketIOClient.Socket;
  }
}
