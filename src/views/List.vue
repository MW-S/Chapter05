<template>
  <div class="main"  id="list">
    <listIndex></listIndex>
  </div>
</template>

<script>
import listIndex from '@/components/ListTem.vue'

export default {
  map: 'list',
  components: {
    listIndex
  }
}
</script>

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
