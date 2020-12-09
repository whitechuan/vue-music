<template>
  <div>
    <el-container>
      <el-main>
        <div class="m-musician-types">
          <div class="" id="m-tag-alphabet">
            <a href="#" v-for="item in alphabet" :key="item">{{item}}</a>
          </div> 
          <div class="" id="m-tag-alphabet">
            <a href="#" v-for="item in alphabet" :key="item">{{item}}</a>
          </div> 
          <div class="" id="m-tag-alphabet">
            <a href="#" v-for="item in alphabet" :key="item">{{item}}</a>
          </div> 
          <div class="" id="m-tag-alphabet">
            <a href="#" v-for="item in alphabet" :key="item">{{item}}</a>
          </div> 
          <div></div> 
          <div></div> 
          <div></div> 
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </el-main>
      <el-footer> 尾 </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
   methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        index,
        alphabet:["全部","A","B","C","D","E","F","G","H","I","Z","K","L","M","N","O","P","Q","R","S","T","U","V","W","S","Y","Z","#"],
        selectElement:{
          limit:80,
          offset:-1,
          initial:-1,
          area:-1,
          type: -1
        },

      }
    },
    created () {
      
    }
};
</script>

<style lang="less">
.m-musician-types {
    background-color: #fbfbfd;
    margin-top: 20px;
}
#m-tag-alphabet {
  margin-left: 30px;
}
#m-tag-alphabet a{
    margin-right: 14px;
    margin-bottom: 8px;
}
 
 

</style>