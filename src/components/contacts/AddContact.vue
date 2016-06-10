<template>
  <div class="add-contact">
    <pop-up :show.sync="isShow" height="100%">
    <toast :show.sync="showWarn" :time="1000" type="warn">
      <p>您已经添加过此用户</p>
    </toast>
      <x-header :left-options="leftOptions" >
        <a class="button_like" @click="cancel" slot="left">取消</a>
        添加联系人
        <a class="button_like" @click="done" slot="right">确认</a>
      </x-header>
      <search placeholder="用关键字搜索联系人":value.sync="searchText" :results="searchResult" class="below_header">
      </search>
      <cell-list type="4" :items="selectedUsers">
      </cell-list>
    </pop-up>
  </div>
</template>

<script>
import PopUp from 'vux/components/popup'
import XHeader from 'vux/components/x-header'
import Search from '../mysearch/Search'
import CellList from '../mylist/CellList'
import MemberCell from '../mycell/MemberCell'
import Toast from 'vux/components/toast'
export default {
  components: {
    PopUp,
    XHeader,
    Search,
    CellList,
    MemberCell,
    Toast
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
      this.$http.post(`${this.$mServerHost}/api/users/addcontacts/${this.$auth.uid}`, { ids: selectedUserIds }).then(res => {
        this.$dispatch('update-refresh-groups', res.data)
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
      showWarn: false
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
