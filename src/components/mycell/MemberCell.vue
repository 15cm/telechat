<template>
  <div class="member-cell">
    <cell :title="member.name"></cell>
  </div>
</template>

<script>
import Cell from 'vux/components/cell'
export default {
  components: {
    Cell
  },
  props: {
    member: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style>
@import '~vux/vux.css';
</style>
