<template>
  <div class="chat-window">
    <x-header :left-options="leftOptions">
      Chatting
    </x-header>
    <div class="message below_header">
      <cell-list :items="msgs" type="3">
      </cell-list>
    </div>
  </div>
</template>

<script>
import CellList from '../mylist/CellList'
import XHeader from 'vux-components/x-header'
export default {
  components: {
    CellList,
    XHeader
  },
  ready () {
    this.socket = window.socket
    this.socket.on('recvMsg', msg => {
      this.msgs.push(msg)
    })
  },
  data () {
    return {
      leftOptions: {
        showBack: true
      },
      socket: {},
      msgs: [
        {
          userId: 1,
          userName: 'Bob',
          content: 'test1'
        },
        {
          userID: 2,
          userName: 'Tom',
          content: 'test2'
        }
      ]
    }
  }
}
</script>
