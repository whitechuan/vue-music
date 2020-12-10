<template>
  <div>
    <el-container>
      <el-main>
        <div class="m-musician-types">
          <div>
            <el-radio-group
              v-model="selectElement.initialNum"
              @change="getInitial"
            >
              <el-radio-button
                :label="index - 1"
                v-for="(item, index) in initial"
                :key="index"
                >{{ item }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div>
            <el-radio-group v-model="selectElement.type" @change="getType">
              <el-radio-button
                :label="index - 1"
                v-for="(item, index) in type"
                :key="index"
                >{{ item }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div>
            <el-radio-group v-model="selectElement.areaNum" @change="getArea">
              <el-radio-button
                :label="index - 1"
                v-for="(item, index) in area"
                :key="index"
                >{{ item }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div>
          <el-card
            class="box-card"
            v-if="selectElement.offsetNum == 1"
          >
            <div
              v-for="(songer, index) in artistsList.slice(0, 10)"
              :key="index"
              class="m-inline-block"
            >
              <div class="m-circle">
                <img
                  :src="songer.picUrl"
                  alt=""
                  srcset=""
                  style="width: 200px; height: 200px"
                />
              </div>
              <div class="m-font">
                <p>{{ songer.name }}</p>
              </div>
            </div>
            <div>
              <el-row>
                <el-col
                  class="m-el-card-width m-el-padding-left-bottom"
                  v-for="item in artistsList.slice(10, 80)"
                  :key="item"
                  >{{item.name}}
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card
            class="box-card"
            v-if="selectElement.offsetNum != 1"
          >
            <div>
              <el-row>
                <el-col
                  class="m-el-card-width m-el-padding-left-bottom"
                  v-for="item in artistsList.slice(0, 80)"
                  :key="item"
                  >{{item.name}}
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="880"
        >
        </el-pagination>
      </el-main>
      <el-footer> 尾 </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.selectElement.offsetNum = val
      this.selectElement.offset = (val-1)*this.selectElement.limit
      this.getSonger()
    },
    getType(obj) {
      console.log(obj);
      console.log(this.selectElement.type);
      this.getSonger();
    },
    getInitial(obj) {
      switch (obj) {
        case -1:
          this.selectElement.initial = "-1";
          break;
        case 0:
          this.selectElement.initial = "a";
          break;
        case 1:
          this.selectElement.initial = "b";
          break;
        case 2:
          this.selectElement.initial = "c";
          break;
        case 3:
          this.selectElement.initial = "d";
          break;
        case 4:
          this.selectElement.initial = "e";
          break;
        case 5:
          this.selectElement.initial = "f";
          break;
        case 6:
          this.selectElement.initial = "g";
          break;
        case 7:
          this.selectElement.initial = "h";
          break;
        case 8:
          this.selectElement.initial = "i";
          break;
        case 9:
          this.selectElement.initial = "j";
          break;
        case 10:
          this.selectElement.initial = "k";
          break;
        case 11:
          this.selectElement.initial = "l";
          break;
        case 12:
          this.selectElement.initial = "m";
          break;
        case 13:
          this.selectElement.initial = "n";
          break;
        case 14:
          this.selectElement.initial = "o";
          break;
        case 15:
          this.selectElement.initial = "p";
          break;
        case 16:
          this.selectElement.initial = "q";
          break;
        case 17:
          this.selectElement.initial = "r";
          break;
        case 18:
          this.selectElement.initial = "s";
          break;
        case 19:
          this.selectElement.initial = "t";
          break;
        case 20:
          this.selectElement.initial = "u";
          break;
        case 21:
          this.selectElement.initial = "v";
          break;
        case 22:
          this.selectElement.initial = "w";
          break;
        case 23:
          this.selectElement.initial = "x";
          break;
        case 24:
          this.selectElement.initial = "y";
          break;
        case 25:
          this.selectElement.initial = "z";
          break;
        case 26:
          this.selectElement.initial = "0";
          break;
      }
      this.getSonger();
    },
    getArea(obj) {
      /* -1: 全部 - -1
          7  华语 - 0
          96 欧美 - 1
          8: 日本 - 2
          16 韩国 - 3
          0: 其他 - 4
      */
      switch (obj) {
        case -1:
          this.selectElement.area = "-1";
          break;
        case 0:
          this.selectElement.area = "7";
          break;
        case 1:
          this.selectElement.area = "96";
          break;
        case 2:
          this.selectElement.area = "8";
          break;
        case 3:
          this.selectElement.area = "16";
          break;
        case 4:
          this.selectElement.area = "0";
          break;
      }
      console.log(obj);
      console.log(this.selectElement.area);
      this.getSonger();
    },
    getSonger() {
      this.axios
        .get("http://localhost:3000/artist/list", {
          params: {
            initial: this.selectElement.initial,
            area: this.selectElement.area,
            type: this.selectElement.type,
            limit: this.selectElement.limit,
            offset: this.selectElement.offset,
          },
        })
        .then((response) => {
          console.log(response);
          this.artistsList = response.data.artists;
        });
    },
  },
  data() {
    return {
      initial: [
        "全部",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "S",
        "Y",
        "Z",
        "#",
      ],
      area: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      type: ["全部", "男歌手", "女歌手", "乐队"],
      selectElement: {
        limit: 80,
        offset: 0,
        offsetNum: 1,
        initialNum: -1,
        areaNum: -1,
        initial: -1,
        area: -1,
        type: -1,
      },
      artistsList: [],
    };
  },
  created() {
    this.getSonger();
  },
};
</script>

<style lang="less">
.m-musician-types {
  background-color: #fbfbfd;
  margin-top: 20px;
}

#m-tag-alphabet {
  font-size: 18px;
  font-weight: bold;
}
.el-radio-button,
.el-radio-button__inner {
  display: inline-block;
  position: relative;
  outline: 0;
  margin: 12px 0px;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-left: none;
  border-radius: 4px 0 0 4px;
  box-shadow: none !important;
}
.el-radio-button__inner {
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  background: #fff;
  border: 0px solid #ffffff !important;
  font-weight: 500;
  border-left: 0;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 12px 16px !important;
  font-size: 14px;
  border-radius: 0;
}
/* ========m-inline-block========= */
.m-inline-block {
  display: inline-block;
  margin: 18px 24px;
}
</style>