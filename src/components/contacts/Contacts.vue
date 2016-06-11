  <template>
  <div class="contacts" >
    <add-contact :is-show.sync="isAdd"></add-contact>
    <pop-up :show.sync="isMove">
      <checker default-item-class="group-item button_like" selected-item-class="group-item selected button_like" :value.sync="newGroupIndex">
        <checker-item v-for="group in groups" :value="$index">
          <h4>{{ group.name }}</h4>
        </checker-item>
      </checker>
    </pop-up>
    <toast :show.sync="showSuccess" :time="2000" type="success">
      <p>修改完成</p>
    </toast>
    <toast :show.sync="showWarn" :time="2000" type="warn">
      <p>取消修改</p>
    </toast>
    <x-header :left-options="leftOptions">
      <span slot=left>
        <a class="button_like" @click="!isEdit ? toggleEdit() : editDone()" slot="left">
          {{ !isEdit ? '编辑' : '确认' }}
        </a>
      </span>
      <span slot="right" @click="!isEdit ? togglePopUp() : editCancel()">
        <a class="button_like"  >
          <icon v-show="!isEdit" name="plus-circle" scale="1.3"></icon>
          <a class="button_like" v-show="isEdit" slot="left">
            取消
          </a>
        </a>
      </span>
      联系人
    </x-header>
    <div class="main">
      <spinner class="spinner-center" v-if="isSpinning"></spinner>
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
import AddContact from './AddContact'
import PopUp from 'vux/components/popup'
import Checker from 'vux/components/checker'
import CheckerItem from 'vux/components/checker-item'
import AddGroup from './AddGroup'
import Toast from 'vux/components/toast'
import Spinner from 'vux/components/spinner'
export default {
  components: {
    Icon,
    Search,
    GroupPanel,
    XHeader,
    AddContact,
    PopUp,
    Checker,
    CheckerItem,
    AddGroup,
    Toast,
    Spinner
  },
  route: {
    activate () {
      if (this.$auth.uid) {
        this.$socket.emit('login')
        this.refreshGroups()
      }
    }
  },
  methods: {
    togglePopUp () {
      this.isAdd = !this.isAdd
    },
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    editDone () {
      this.updateGroups().then(() => {
        this.showSuccess = !this.showSuccess
        this.toggleEdit()
      })
    },
    editCancel () {
      this.refreshGroups().then(() => {
        this.showWarn = !this.showWarn
        this.toggleEdit()
      })
    },
    refreshGroups () {
      this.isSpinning = true
      return this.$http.get(`${this.$mServerHost}/api/users/${this.$auth.uid}`)
              .then(res => {
                this.$set('groups', res.data.groups)
                this.isSpinning = false
              }, res => {
                console.log(res)
              })
    },
    deleteGroup (group) {
      this.groups.$remove(group)
    },
    updateGroups () {
      this.isSpinning = true
      return this.$http.put(`${this.$mServerHost}/api/users/${this.$auth.uid}`, { groups: this.groups }).then(res => {
        this.isSpinning = false
        return res
      }, res => {
        console.log(res)
      })
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
    'update-refresh-groups': function (newUser) {
      this.$set('groups', newUser.groups)
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
      newGroupName: '',
      showSuccess: false,
      showWarn: false,
      isSpinning: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.group-item {
  display: block;
}
.group-item.selected {
  color: #5a80e3;
}
.contacts {
  height: 100%;
  .main {
    height: ~'calc(100% - 110px)';
    position: relative;
    overflow-y: scroll;
  }
}
</style>
