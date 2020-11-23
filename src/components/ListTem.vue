<template>
  <div>
    <div>
      <div style="display: flex;align-items: center;flex-direction: column;margin:20px;">
        <p>编程语言</p>
        <a  class="btn btn-default add" @click="sample_modal = !sample_modal , type = 0" >点击添加语言</a>
      </div>
      <div style="display: flex;box-shadow: 10px 10px 5px #bbb;background-color: darkgray;padding: 20px;">
        <div style="margin-right: 200px; padding-right: 30px; height: 300px;overflow-y: scroll;">
          <div>
            <input v-show="getType==false" v-model="param.id" placeholder="请输入ID进行查询"/>
            <input v-show="getType==true" v-model="param.name" placeholder="请输入名称进行查询"/>
            <a class="btn btn-default btn-sm" style="margin-left: 10px;width: 106px;" @click="getType = !getType">{{getType==true?'切换为ID查询':'切换为名称查询'}}</a>
          </div>
          <span>查询结果：</span>
          <ul>
            <div v-if="resList.length==0">
              <div v-if="getType===false && (param.id == undefined || param.id == '')">请输入序号进行查询</div>
              <div v-else-if="getType===true && (param.name == undefined || param.name == '')">请输入名称进行查询</div>
              <div v-else>数据不存在！</div>
            </div>
            <li v-else  v-for='(item,index) in resList' v-bind:key="index">
              <div>{{item}}</div>
              <a  class="btn btn-default btn-xs" @click="updateItem(index, item)">修改</a>
              <a  class="btn btn-default btn-xs" @click="delItem(index)">删除</a>
            </li>
          </ul>
        </div>
        <div style="height: 300px; padding-right: 100px; overflow-y: scroll;">
          <span>编程语言列表：</span>
          <ol>
            <li v-for='(item,index) in showList' v-bind:key="index">
              <div>{{item}}</div>
              <a  class="btn btn-default btn-xs" @click="updateItem(index, item)">修改</a>
              <a  class="btn btn-default btn-xs" @click="delItem(index)">删除</a>
            </li>
          </ol>
          <a v-show="$store.state.list.length>4" @click="showAll = !showAll" class="btn btn-default btn-info btn-sm">{{flag}}</a>
        </div>
      </div>
    </div>
   </div>
   <transition name="fade"><!-- transition不需要的话可以删掉 -->
      <div v-if="sample_modal">
        <div class="modal" v-on:click.self="sample_modal=false, name=0, upData.name=''">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style="display: flex;border-bottom: none">
                <h4 class="modal-title">{{type==0?'添加新的编程语言':'修改编程语言'}}</h4>
                <a  class="close" v-on:click="sample_modal=false, name=0, upData.name=''">×</a>
              </div>
              <div class="modal-body" style="padding: 0px 20px;">
                <input style="width: 100%" v-model="upData.name"/>
              </div>
              <div style="text-align: center;margin: 15px 10px 0px;font-size: x-large;color: red;"  v-show="name == -1">{{type==0 ? '新增语言不得为空' : '修改语言不得为空'}}</div>
              <div class="modal-footer" style="border-top: none;padding: 0px 20px 10px;">
                <a @click="type==0?addItem():updateConfirmItem()" class="btn btn-primary">{{type==0?'添加语言':'修改'}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'ListItem',
  data () {
    return {
      getType: false, //  获取查询类型 false为ID查询，true为名称查询
      name: 0, // 修改后的语言是否为空，若为-1则为空
      sample_modal: false, // 是否显示模态框
      type: 0, //   模态框的弹出类型 0为增添语言，1为修改语言
      upData: {
        id: undefined,
        name: ''
      }, //   用于寄存修改数据的对象
      param: { //   用于查询的对象
        id: '',
        name: ''
      },
      showAll: false// 标记数据是否需要完全显示的属性
    }
  },
  methods: {
    addItem: function () {
      if (this.upData.name === undefined || this.upData.name === '' || this.upData.name == null) {
        this.name = -1
        return null
      }
      this.$store.dispatch('add', this.upData.name)
      this.sample_modal = false
      this.name = 0
      this.upData.name = ''
      alert('添加成功！')
    },
    delItem: function (index) {
      this.$store.dispatch('del', index)
    },
    updateItem: function (index, name) {
      this.type = 1
      this.sample_modal = true
      this.upData.id = index
      this.upData.name = name
    },
    updateConfirmItem: function () {
      if (this.upData.name === undefined || this.upData.name === '' || this.upData.name == null) {
        this.name = -1
        return null
      }
      this.$store.dispatch('update', this.upData)
      this.sample_modal = false
      this.name = 0
      this.upData.name = ''
      this.upData.id = undefined
      alert('修改成功！')
    },
    getItemById: function (index) {
      var res = this.$store.state.list[index]
      return res
    },
    getItemByName: function (param) {
      var res = []
      this.$store.state.list.forEach(function (val, index, arr) {
        if (val.indexOf(param) !== -1) {
          res.push(val)
        }
      })
      return res
    }
  },
  computed: {
    showList: function () {
      if (this.showAll === false) {
        var showList = []
        if (this.$store.state.list.length > 4) { // 一开始显示前4个数据
          for (var i = 0; i < 4; i++) {
            showList.push(this.$store.state.list[i])
          }
        } else {
          showList = this.$store.state.list
        }
        return showList
      } else {
        return this.$store.state.list
      }
    },
    resList: function () {
      if (this.getType === false && (this.param.id === undefined || this.param.id === null || this.param.id === '')) {
        return []
      } else if (this.getType === true && (this.param.name === undefined || this.param.name === null || this.param.name === '')) { return [] }
      var res = this.getType === false ? this.getItemById(parseInt(this.param.id) - 1) : this.getItemByName(this.param.name)
      return res === undefined ? [] : (this.getType === false ? [res] : res)
    },
    flag: function () {
      if (this.showAll === false) {
        return '单击展开'
      } else {
        return '单击收起'
      }
    }
  },
  beforeCreate () {
    console.log(this.$route)
    var co = this.$route.query.choice
    console.log(co)
    this.$root.$data.choice = co
  }
}
</script>

<style>
  .status {
    color: red
  }
  /* 让模态框显示 */
   .modal {
    display: block;
  }
  .close {
    right: 20px;
    position: absolute;
  }
  /* 如果不使用vue的transition的话可以不设置 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
