<template>
  <div id="settings">
    <x-header :left-options="leftOptions">
      <span slot="right"><a class="clickable" @click="toggleEdit">Edit</a></span>
      Settings
    </x-header>
  </div>
</template>

<script>
import XHeader from 'vux/components/x-header'
export default {
  components: {
    XHeader
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
      isEdit: false
    }
  }
}
</script>
