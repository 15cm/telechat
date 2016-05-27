<template>
  <div class="add-contact">
    <pop-up :show.sync="isShow" height="100%">
      <x-header :left-options="leftOptions">
        <a class="clickable" @click="cancel" slot="left">Cancel</a>
        New Contact
        <a class="clickable" @click="done" slot="right">Done</a>
      </x-header>
    </pop-up>
  </div>
</template>

<script>
import PopUp from 'vux/components/popup'
import XHeader from 'vux/components/x-header'
export default {
  components: {
    PopUp,
    XHeader
  },
  props: {
    isShow: Boolean
  },
  methods: {
    cancel () {
      this.isShow = !this.isShow
    },
    done () {
      this.isShow = !this.isShow
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: false,
        preventGoBack: true
      }
    }
  }
}
</script>
