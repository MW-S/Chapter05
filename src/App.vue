<template>
  <div id="nav">
    <!--代码-->
    <div class="navbar navbar-default" role="navigation">
      <div class="navbar-header">
        <!-- .navbar-toggle样式用于toggle收缩的内容，即nav-collapse collapse样式所在元素 -->
        <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- 确保无论是宽屏还是窄屏，navbar-brand都显示 -->
        <a class="navbar-brand">{{title}}</a>
      </div>
      <!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon-bar图标，当点击icon-bar图标时，再展开。屏幕大于768px时，默认显示。 -->
      <div class="collapse navbar-collapse navbar-responsive-collapse">
        <ul class="nav navbar-nav">
          <li id="indexTab" @click="choiceTab('indexBool')" :class="choice=='indexBool'?'active':''">
             <router-link to="/?choice=indexBool">网站首页</router-link>
          </li>
         <li id="tabTab" @click="choiceTab('listBool')" :class="choice=='listBool'?'active':''">
             <router-link to="/list?choice=listBool">列表页面</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view />
</template>

<style lang="less">
  #app {
    margin-top: 30px;
  }
</style>
<style lang="css">
  .main {
    height: 500px;
    box-shadow: 10px 10px 5px #bbb;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main div p {
    font-size: 30px;
  }
</style>

<script>
export default {
  data () {
    return {
      title: 'Vue3.0实验五',
      menu: {
        listBool: {
          field: 'listBool',
          name: '列表页面',
          path: '?listBool=true'
        }
      },
      choice: 'indexBool'
    }
  },
  methods: {
    choiceTab (param) {
      console.log(this.$data.choice)
      this.$data.choice = param
      console.log(this.$data.choice)
      // return param
    }
  }
}
</script>
