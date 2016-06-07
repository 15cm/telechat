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
      <add-group v-show="isEdit" :value.sync="newGroupName">
        <span slot="edit" class="icon_before_panel button_like" @click="addGroup()">
          <icon name="plus"></icon>
        </span>
      </add-group>
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
import AddGroup from './AddGroup'
export default {
  components: {
    Icon,
    Search,
    GroupPanel,
    XHeader,
    Add,
    PopUp,
    Checker,
    CheckerItem,
    AddGroup
  },
  route: {
    activate () {
      if (this.$auth.uid) {
        this.$socket.emit('login')
        this.refresh().then(res => {
          this.$set('groups', res.data.groups)
        }, res => {
          console.log(res)
        })
      }
    }
  },
  methods: {
    togglePopUp () {
      this.isAdd = !this.isAdd
    },
    toggleEdit () {
      if (this.isEdit) {
        this.updateGroups().then(res => {
          console.log(res)
          this.isEdit = !this.isEdit
        }, res => {
          console.log(res)
        })
      } else {
        this.isEdit = !this.isEdit
      }
    },
    refresh () {
      return this.$http.get(`${this.$mServerHost}/api/users/${this.$auth.uid}`)
    },
    deleteGroup (group) {
      this.groups.$remove(group)
    },
    updateGroups () {
      return this.$http.put(`${this.$mServerHost}/api/users/${this.$auth.uid}`, { groups: this.groups })
    },
    addGroup () {
      if (this.newGroupName) {
        this.groups.push({name: this.newGroupName, members: []})
        this.newGroupName = ''
      }
    }
  },
  events: {
    'on-move-member-group': function (member, oldGroup) {
      this.memberToMove = member
      this.isMove = true
      this.newGroupIndex = this.oldGroupIndex = this.groups.findIndex(group => group._id === oldGroup._id)
    },
    'on-item-click': function (groupIndex) {
      this.isMove = false
      if (groupIndex !== this.oldGroupIndex) {
        this.groups[this.oldGroupIndex].members.$remove(this.memberToMove)
        this.groups[groupIndex].members.push(this.memberToMove)
      }
    },
    'refresh': function () {
      this.refresh().then(res => {
      }, res => {
        console.log(res)
      })
    },
    'update-groups': function () {
      this.updateGroups().then(res => {
        this.groups = res.data.groups
      }, res => {
        console.log(res)
      })
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
      groups: [],
      newGroupName: ''
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
