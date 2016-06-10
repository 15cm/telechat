<template>
  <div id="index">
    <router-view></router-view>
    <div class="div_tabbar_buttom">
      <tabbar class="tabbar_buttom">
        <tabbar-item >
          <div slot="icon">
            <img src="../assets/contacts.png" alt="">
          </div>
          <span slot="label">Contacts</span>
        </tabbar-item>
        <tabbar-item>
          <div slot="icon">
            <img src="../assets/chats.png" >
          </div>
          <span slot="label">Chats</span>
        </tabbar-item>
        <tabbar-item>
          <div slot="icon">
            <img src="../assets/settings.png" alt="">
          </div>
          <span slot="label">Settings</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from 'vux/components/tabbar'
import TabbarItem from 'vux/components/tabbar-item'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  // route: {
  //   activate () {
  //     this.$dispatch('on-item-click', '0')
  //   }
  // },
  events: {
    'on-item-click': function (index) {
      switch (index) {
        case '0': this.$router.go({ name: 'contacts' })
          break
        case '1': this.$router.go({ name: 'chats' })
          break
        case '2': this.$router.go({ name: 'settings' })
          break
      }
    }
  }
}
</script>

<style>
#index {
  height: 99%;
}
</style>
