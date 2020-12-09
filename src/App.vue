<template>
  <div id="app">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#8fb2c9"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >

      <el-menu-item> 
        <h3>Ant-music</h3>
      </el-menu-item>
      <el-menu-item index="/"> 首页 </el-menu-item>
      <el-menu-item index="/musicians"> 歌手分类 </el-menu-item>
      <el-menu-item index="/style"> 歌单 </el-menu-item>
      <el-menu-item index="/order"> Top榜 </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
        
    };
  }
};
</script>

<style lang="less" scoped>
</style>>
