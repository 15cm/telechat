<template>
  <div id="chats">
    <toast :show.sync="showSuccess" :time="1000" type="success">
      <p>修改完成</p>
    </toast>
    <toast :show.sync="showWarn" :time="1000" type="warn">
      <p>取消修改</p>
    </toast>
      <x-header :left-options="leftOptions">
        聊天记录
        <span slot="right"><a v-show="isEdit"class="button_like" @click="editCancel">取消</a></span>
        <span slot="left"><a class="button_like" @click="!isEdit ? toggleEdit() : editDone()">
          {{ !isEdit ? '编辑' : '确认' }}
        </a></span>
      </x-header>
      <div class="main">
        <spinner class="spinner-center" v-if="isSpinning"></spinner>
        <cell-list type="2" :items="chats" :is-edit="isEdit"></cell-list>
      </div>
  </div>
</template>

<script>
import XHeader from 'vux/components/x-header'
import Icon from 'vue-awesome/dist/vue-awesome'
import Search from 'vux/components/search'
import CellList from '../mylist/CellList'
import Toast from 'vux/components/toast'
import Spinner from 'vux/components/spinner'
export default {
  components: {
    XHeader,
    Icon,
    Search,
    CellList,
    Toast,
    Spinner
  },
  route: {
    data (transition) {
      this.isSpinning = true
      this.refreshChats().then(()=>{
        this.isSpinning = false
        transition.next()
      })
    }
  },
  methods: {
    refreshChats () {
      this.isSpinning = true
      return this.$http
              .get(`${this.$mServerHost}/api/users/${this.$auth.uid}`)
              .then(res => {
                this.$set('chats',res.data.chats)
                this.isSpinning = false
              }, res=> {
                console.log(res)
              })
    },
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    editDone () {
      this.isSpinning = true
      this.$http.put(`${this.$mServerHost}/api/users/${this.$auth.uid}`, {
        chats: this.chats
      }).then(res => {
        this.showSuccess = !this.showSuccess
        this.toggleEdit()
        this.isSpinning = false
      })
    },
    editCancel () {
      this.refreshChats().then(() => {
        this.showWarn = !this.showWarn
        this.toggleEdit()
      })
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: false
      },
      isEdit: false,
      chats: [],
      showSuccess: false,
      showWarn: false,
      isSpinning: false
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
