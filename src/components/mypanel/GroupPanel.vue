<template>
  <div class="group-panel">
    <slot name="edit"></slot>
    <div class="panel_box button_like" v-bind:class="{'edit': isEdit}" @click="toggleIsOpen">
      <div class="panel_hd">
        <icon :name="isOpen ? 'caret-down' : 'caret-right'" scale="0.8" > </icon>
      </div>
        <div class="panel_bd">
          <h4>{{ group.name }}</h4>
        </div>
    </div>
    <!-- <div v-else class="panel_box button_like" v-bind:class="{'edit': isEdit}" @dblclick="toggleIsOpen">
      <div class="panel_hd">
        <icon :name="isOpen ? 'caret-down' : 'caret-right'" scale="0.8" > </icon>
      </div>
        <div class="panel_bd">
          <h4>{{ group.name }}</h4>
        </div>
    </div> -->
    <div class="panel-collapse" v-el:group-panel v-show="isOpen" transition="collapse">
      <div class="panel-body">
        <cell-list :items="group.members" :is-edit="isEdit">
        </cell-list>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import CellList from '../mylist/CellList'
export default {
  components: {
    Icon,
    CellList
  },
  props: {
    mobile: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    group: Object,
    isEdit: Boolean
  },
  ready () {
    console.log('ready')
    // this.$el.style.maxHeight = this.$el.offsetHeight + 'px'
  },
  methods: {
    toggleIsOpen () {
      this.isOpen = !this.isOpen
      this.$dispatch('group-panel-open', this)
      console.log('Is open: ' + this.isOpen)
    }
  },
  events: {
    'on-move-member': function (member) {
      this.$dispatch('on-move-member-group', member, this.group)
    }
  },
  transitions: {
    collapse: {
      afterEnter: function afterEnter (el) {
        el.style.maxHeight = ''
      },
      beforeLeave: function beforeLeave (el) {
        el.style.maxHeight = el.offsetHeight + 'px'
        // Recalculate DOM before the class gets added.
        return el.offsetHeight
      }
    }
  }
}
</script>

<style scope>
/*.group-panel {
  margin-top: 90px;
  margin-bottom: 90px;
}*/
.collapse-transition {
  transition: max-height .5s ease;
  overflow: hidden;
}

.collapse-enter, .collapse-leave {
  max-height: 0px !important;
}
</style>
