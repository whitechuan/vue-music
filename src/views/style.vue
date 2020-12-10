<template>
  <div>
    <el-container>
      <el-main>
        <div class="m-musician-types">
          <div>
            <el-radio-group v-model="paramCategorySub.cat" @change="getCat">
              <el-radio-button disabled>语种</el-radio-button>
              <el-radio-button
                :label="item.name"
                v-for="(item, index) in cateLanguageList"
                :key="index"
                >{{ item.name }}</el-radio-button
              >
              <br />
              <el-radio-button disabled>风格</el-radio-button>
              <el-radio-button
                :label="item.name"
                v-for="(item, index) in cateStyleList"
                :key="index"
                >{{ item.name }}</el-radio-button
              >
              <br />
              <el-radio-button disabled>场景</el-radio-button>
              <el-radio-button
                :label="item.name"
                v-for="(item, index) in cateSceneList"
                :key="index"
                >{{ item.name }}</el-radio-button
              >
              <br />
              <el-radio-button disabled>情感</el-radio-button>
              <el-radio-button
                :label="item.name"
                v-for="(item, index) in cateEmotionList"
                :key="index"
                >{{ item.name }}</el-radio-button
              >
              <br />
              <el-radio-button disabled>主题</el-radio-button>
              <el-radio-button
                :label="item.name"
                v-for="(item, index) in cateThemeList"
                :key="index"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div>
          <el-row>
            <el-col
              class="m-el-card-width m-el-padding-left-bottom"
              v-for="item in playLists.list"
              :key="item"
            >
              <el-card shadow="hover" class="m-height">
                <img :src="item.coverImgUrl" alt="" srcset="" style="width:230px;"/>
                <p>
                  <a
                    :title="item.name"
                    :id="item.id"
                    :href="/song/ + item.id"
                    >{{ item.name }}</a
                  >
                </p>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="m-margin-top">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="paramCategorySub.offset"
              :page-size="20"
              layout="total, prev, pager, next"
              :total="playLists.total">
          </el-pagination>
        </div>
 
      </el-main>
      <el-footer> </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getCatList();
    this.getCat()
  },
  methods: {
    getCatList() {
      this.axios
        .get("http://localhost:3000/playlist/catlist")
        .then((response) => {
          console.log(response);
          this.categories = response.data.categories;
          this.sub = response.data.sub;
          this.handleCatList();
        });
    },
    handleCatList() {
      this.sub.forEach((element) => {
        switch (element.category) {
          case 0:
            this.cateLanguageList.push(element);
            break;
          case 1:
            this.cateStyleList.push(element);
            break;
          case 2:
            this.cateSceneList.push(element);
            break;
          case 3:
            this.cateEmotionList.push(element);
            break;
          case 4:
            this.cateThemeList.push(element);
            break;
        }
      });
      this.categorySub.cateLanguage = this.cateLanguageList;
      this.categorySub.cateStyle = this.cateStyleList;
      this.categorySub.cateScene = this.cateSceneList;
      this.categorySub.cateEmotion = this.cateEmotionList;
      this.categorySub.cateTheme = this.cateThemeList;
      console.log(this.categorySub);
    },
    getCat(obj) {
      console.log(obj);
      this.axios
        .get("http://localhost:3000/top/playlist", {
          params: {
            cat: this.paramCategorySub.cat,
            limit: this.paramCategorySub.limit,
            offest: this.paramCategorySub.offest,
            order: this.paramCategorySub.order,
          },
        })
        .then((response) => {
          console.log(response);
          this.playLists.list = response.data.playlists
          this.playLists.total = response.data.total
          this.playLists.id = response.data.id
        });
    },
  },
  data() {
    return {
      categories: {},
      sub: [],
      cateSubList: [],
      categorySub: {},
      cateLanguageList: [],
      cateStyleList: [],
      cateSceneList: [],
      cateEmotionList: [],
      cateThemeList: [],
      paramCategorySub: {
        cat: "",
        limit: 20,
        offset: 1,
        order: "new",
      },
      playLists: {
        list: [],
        total: 0,
        id: ''
      },
    };
  },
};
</script>

<style lang="less">
</style>