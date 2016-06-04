<template>
  <div class="message">
    <cell-list :items="msgs" type="3">
    </cell-list>
  </div>
</template>

<script>
import CellList from '../mylist/CellList'
export default {
  components: {
    CellList
  },
  data () {
    return {
      msgs: [
        {
          userId: 1,
          userName: 'Bob',
          content: 'test1'
        },
        {
          userID: 2,
          userName: 'Tom',
          content: 'test2'
        }
      ]
    }
  }
}
</script>
