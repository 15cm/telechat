<template>
  <div class="contacts" >
    <add :is-show.sync="isAdd"></add>
    <pop-up :show.sync="isMove">
      <checker default-item-class="group-item button_like" selected-item-class="group-item selected button_like" :value.sync="newGroupIndex">
        <checker-item v-for="group in groups" :value="$index">
          <h4>{{ group.name }}</h4>
        </checker-item>
      </checker>
    </pop-up>
    <x-header :left-options="leftOptions">
      <span slot=left>
        <a class="button_like" @click="toggleEdit" slot="left">
          {{ !isEdit ? 'Edit' : 'Done' }}
        </a>
      </span>
      <span slot="right">
        <a class="button_like" @click="togglePopUp" >
          <icon name="plus-circle" scale="1.3"></icon>
        </a>
      </span>
      Contacts
    </x-header>
    <!-- <search placeholder="Search for groups or contacts"></search> -->
    <div class="below_header">
    <group-panel v-for="group in groups" :group="group" :is-edit="isEdit">
      <span slot="edit" class="icon_before_panel button_like" @click="deleteGroup(group)" v-show="isEdit">
        <icon name="minus-circle"></icon>
      </span>
    </group-panel>
    </div>
  </div>

</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import XHeader from 'vux/components/x-header'
import Search from 'vux/components/search'
import GroupPanel from '../mypanel/GroupPanel'
import Add from './Add'
import PopUp from 'vux/components/popup'
import Checker from 'vux/components/checker'
import CheckerItem from 'vux/components/checker-item'
export default {
  components: {
    Icon,
    Search,
    GroupPanel,
    XHeader,
    Add,
    PopUp,
    Checker,
    CheckerItem
  },
  methods: {
    togglePopUp () {
      this.isAdd = !this.isAdd
    },
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    deleteGroup (group) {
      this.groups.$remove(group)
    }
  },
  events: {
    'on-move-member-group': function (member, oldGroup) {
      this.memberToMove = member
      this.isMove = true
      this.newGroupIndex = this.oldGroupIndex = this.groups.findIndex(group => group.id === oldGroup.id)
    },
    'on-item-click': function (groupIndex) {
      this.isMove = false
      if (groupIndex !== this.oldGroupIndex) {
        this.groups[this.oldGroupIndex].members.$remove(this.memberToMove)
        this.groups[groupIndex].members.push(this.memberToMove)
      }
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      leftOptions: {
        showBack: false
      },
      isEdit: false,
      isAdd: false,
      isMove: false,
      memberToMove: null,
      oldGroupIndex: null,
      newGroupIndex: null,
      groups: [
        {
          id: '1',
          name: 'default',
          members: [
            {
              id: '1',
              name: 'Sinker',
              avatar: 'src/assets/contacts.png'
            },
            {
              id: '2',
              name: 'Sinkerine'
            }
          ]
        },
        {
          id: '2',
          name: 'zju',
          members: [
            {
              id: '3',
              name: 'Narcissu'
            }
          ]
        },
        {
          id: '3',
          name: 'bgm',
          members: [
            {
              id: '4',
              name: '15cm'
            }
          ]
        },
        {
          id: '4',
          name: 'zju',
          members: [
            {
              id: '4',
              name: 'Narcissu'
            }
          ]
        },
        {
          id: '5',
          name: 'zju',
          members: [
            {
              id: '5',
              name: 'Narcissu'
            }
          ]
        },
        {
          id: '6',
          name: 'zju',
          members: [
            {
              id: '6',
              name: 'Narcissu'
            }
          ]
        },
        {
          id: '7',
          name: 'zju',
          members: [
            {
              id: '7',
              name: 'Narcissu'
            }
          ]
        },
        {
          id: '8',
          name: 'zju',
          members: [
            {
              id: '8',
              name: 'Narcissu'
            }
          ]
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group-item {
  display: block;
}
.group-item.selected {
  color: #5a80e3;
}
</style>
