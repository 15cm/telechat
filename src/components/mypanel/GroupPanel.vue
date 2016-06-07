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
        <div class="after_panel_bd">
          <h5>({{ group.members.length }})</h5>
        </div>
    </div>
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
    isOpen: {
      type: Boolean,
      default: false
    },
    group: Object,
    isEdit: Boolean
  },
  methods: {
    toggleIsOpen () {
      this.isOpen = !this.isOpen
      // this.$dispatch('group-panel-open', this)
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

.after_panel_bd {
  margin-left: 5px;
}
</style>
