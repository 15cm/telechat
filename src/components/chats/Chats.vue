<template>
  <div id="chats">
      <x-header :left-options="leftOptions">
        Chats
        <span slot="right"><a class="button_like" @click="toggleEdit">
          {{ !isEdit ? 'Edit' : 'Done' }}
        </a></span>
      </x-header>
      <div class="main">
        <cell-list type="2" :items="chats" :is-edit="isEdit"></cell-list>
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
  route: {
    data (transition) {
      return this.$http
              .get(`${this.$mServerHost}/api/users/${this.$auth.uid}`)
              .then(res => {
                return { chats: res.data.chats }
              })
    }
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
      chats: []
    }
  }
}
</script>

<style lang="less" scoped>
.chats {
  height: 100%;
  .main {
    height: ~'calc(100% - 110px)';
    position: relative;
    overflow-y: scroll;
  }
}
</style>
