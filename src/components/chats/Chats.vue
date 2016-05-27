<template>
  <div id="chats">
    <div class="main-board" >
      <x-header :left-options="leftOptions">
        Chats
        <span slot="right"><a class="clickable" @click="toggleEdit">Edit</a></span>
      </x-header>
      <search placeholder="Search for users"></search>
      <cell-list type="2" :list="chatList"></cell-list>
    </div>
  </div>
</template>

<script>
import XHeader from 'vux/components/x-header'
import Icon from 'vue-awesome/dist/vue-awesome'
import Search from 'vux/components/search'
import CellList from '../mylist/CellList'
export default {
  components: {
    XHeader,
    Icon,
    Search,
    CellList
  },
  methods: {
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    toggleChatting () {
      this.isChatting = !this.isChatting
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: false
      },
      isEdit: false,
      isChatting: false,
      chatList: [
        {
          user: 'Tom',
          lastMessage: 'Hello',
          updatedTime: ''
        }
      ]
    }
  }
}
</script>
