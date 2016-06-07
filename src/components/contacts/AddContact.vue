<template>
  <div class="add-contact">
    <pop-up :show.sync="isShow" height="100%">
      <x-header :left-options="leftOptions" >
        <a class="button_like" @click="cancel" slot="left">Cancel</a>
        New Contact
        <a class="button_like" @click="done" slot="right">Done</a>
      </x-header>
      <search placeholder="用关键字搜索联系人":value.sync="searchText" :results="searchResult" class="below_header">
      </search>
      <cell-list type="4" :items="selectedUsers">
      </cell-list>
        <alert
          :show.sync="showTop"
          :duration="3000"
          type="danger"
          width="400px"
          placement="top"
          dismissable>
            <p>您已添加了此用户</p>
        </alert>
    </pop-up>
  </div>
</template>

<script>
import PopUp from 'vux/components/popup'
import XHeader from 'vux/components/x-header'
import Search from '../mysearch/Search'
import { alert } from 'vue-strap'
import CellList from '../mylist/CellList'
import MemberCell from '../mycell/MemberCell'
export default {
  components: {
    PopUp,
    XHeader,
    Search,
    alert,
    CellList,
    MemberCell
  },
  props: {
    isShow: Boolean
  },
  methods: {
    destroy () {
      this.selectedUsers = []
      this.searchText = ''
      this.isShow = !this.isShow
    },
    cancel () {
      this.destroy()
    },
    done () {
      var selectedUserIds = []
      for (let user of this.selectedUsers) {
        selectedUserIds.push(user._id)
      }
      console.log(selectedUserIds)
      this.$http.post(`${this.$mServerHost}/api/users/addcontacts/${this.$auth.uid}`, { ids: selectedUserIds }).then(res => {
        console.log(res.data)
        this.$dispatch('update-refresh-groups')
        this.destroy()
      }, res => {
        console.log(res)
      })
    }
  },
  events: {
    'result-click': function (user) {
      console.log(this.selectedUsers)
      console.log(this.showTop)
      if (this.selectedUsers.find(x => x._id === user._id)) {
        this.showTop = !this.showTop
      } else {
        this.selectedUsers.push(user)
      }
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: false,
        preventGoBack: true
      },
      searchResult: [],
      searchText: '',
      selectedUsers: [],
      showTop: false
    }
  },
  watch: {
    'searchText': function (val) {
      if (val.length > 0) {
        this.$http.get(`${this.$mServerHost}/api/users/search/${val}`)
        .then(res => {
          // console.log(this.searchResult)
          // console.log(res.data)
          this.searchResult.length = res.data.length
          for (let i in res.data) {
            res.data[i].title = res.data[i].email
            this.searchResult.$set(i, res.data[i])
          }
        }, res => {
          console.log(res)
        })
      }
    }
  }
}
</script>
