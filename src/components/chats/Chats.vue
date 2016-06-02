<template>
  <div id="chats">
      <x-header :left-options="leftOptions">
        Chats
        <span slot="right"><a class="button_like" @click="toggleEdit">
          {{ !isEdit ? 'Edit' : 'Done' }}
        </a></span>
      </x-header>
      <cell-list type="2" class="below_header" :items="chats" :is-edit="isEdit"></cell-list>
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
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: false
      },
      isEdit: false,
      chats: [
        {
          contact: {
            name: 'Tom',
            id: '123',
            avatar: 'data:image/png;base64,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'
          },
          lastMsg: 'Hello',
          updatedTime: ''
        }
      ]
    }
  }
}
</script>
