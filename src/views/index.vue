<template>
  <div>
    <el-container>
      <!-- 头部轮播图 -->
      <el-header class="header m-margin-top">
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="item in imgUrls" :key="item">
            <img :src="item.imgSrc" alt="" srcset="" />
          </el-carousel-item>
        </el-carousel>
      </el-header>
      <!-- 
        主体：
          1.热门歌单
          2.推荐歌手
          3.各大榜单排名
          4.精选mv
       -->
      <el-main class="main m-margin-top">
        <!-- 热门歌单 -->
        <div class="hot-music m-bk">
          <div class="m-margin-bottom">
            <h2 class="title">热门歌单</h2>
            <div class="m-more">
              <a href="#">更多</a>
            </div>
          </div>
          <el-row :gutter="0">
            <el-col
              class="m-el-card-width m-el-padding-left-bottom"
              v-for="item in remomentPlayList"
              :key="item"
            >
              <el-card shadow="hover" class="m-height">
                <img :src="item.imgSrc" alt="" srcset="" />
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
        <!-- 推荐歌手 -->
        <div class="hot-musicians m-margin-top m-bk">
          <div class="m-margin-bottom">
            <h2 class="title">推荐歌手</h2>
            <div class="m-more">
              <a href="#">更多</a>
            </div>
          </div>
          <el-row :gutter="0">
            <el-col
              class="m-el-card-width m-el-padding-left-bottom"
              v-for="item in remomentSonger"
              :key="item"
            >
              <el-card class="m-height clearflex">
                <div class="m-circle">
                  <img :src="item.imgSrc" alt="" srcset="" />
                </div>
                <div class="m-font">
                  <p>{{ item.name }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <!-- 榜单排名 -->
        <div class="hot-topList m-margin-top m-bk">
          <div class="m-margin-bottom">
            <h2 class="title">Top</h2>
            <div class="m-more">
              <a href="#">更多</a>
            </div>
          </div>
          <el-row :gutter="0">
            <el-col
              class="m-el-card-width m-el-padding-left-bottom"
              v-for="item in topListSongs"
              :key="item"
            >
              <el-card shadow="hover" class="m-height-max">
                  <img :src="item.imgSrc" alt="" srcset="" />
                <div>
                  <el-table
                    :data="item.tracks.slice(0,5)"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    :stripe="true"
                  >
                    <el-table-column prop="name" :label="item.name" width="180" align="center">
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <!-- 脚注 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newest: [],
      imgUrls: [],
      remomentPlayList: [],
      remomentSonger: [],
      topList: [19723756, 3779629, 2884035, 3778678, 5213356842],
      topListSongs: [],
    };
  },
  methods: {
    getNewest() {
      this.axios.get("http://localhost:3000/album/newest").then((response) => {
        console.log(response);
        this.newest = response.data.albums;
        this.newest.forEach((element) => {
          let name = element.name;
          let imgSrc = element.blurPicUrl + "?param=660y340";
          let id = element.id;
          const picInfo = { name: name, imgSrc: imgSrc, id: id };
          this.imgUrls.push(picInfo);
        });
      });
    },
    getRemomentPlayList() {
      this.axios
        .get("http://localhost:3000/personalized?limit=10")
        .then((response) => {
          this.result = response.data.result;
          this.result.forEach((element) => {
            let name = element.name;
            let imgSrc = element.picUrl + "?param=230y230";
            let id = element.id;
            let playCount = element.playCount;
            const playInfo = {
              name: name,
              imgSrc: imgSrc,
              id: id,
              playCount: playCount,
            };
            this.remomentPlayList.push(playInfo);
          });
        });
    },
    getRemomentSonger() {
      this.axios
        .get("http://localhost:3000/top/artists?offset=0&limit=5")
        .then((response) => {
          this.result = response.data.artists;
          this.result.forEach((element) => {
            let name = element.name;
            let imgSrc = element.picUrl + "?param=200y200";
            let id = element.id;
            const artistsInfo = { name: name, imgSrc: imgSrc, id: id };
            this.remomentSonger.push(artistsInfo);
          });
        });
    },
    getRemomentTopList(id) {
      return this.axios
        .get("http://localhost:3000/top/list?id=" + id)
        .then((response) => {
          //console.log(response)
          let result = response.data.playlist;
          //console.log(result);
          let name = result.name;
          let imgSrc = result.coverImgUrl + "?param=230y130";
          let tracks = result.tracks;
          const topListSongInfo = {
            name: name,
            imgSrc: imgSrc,
            tracks: tracks,
          };
          //console.log(topListSongInfo);
          // this.topListSongs.push(topListSongInfo);
          return topListSongInfo;
        });
    },
    getRemomentTopListSong() {
      this.topList.forEach((element) => {
        //console.log(this.getRemomentTopList(element));
        this.getRemomentTopList(element).then((data) => {
          this.topListSongs.push(data);
          console.log(this.topListSongs);
        });
      });
    },
  },
  created() {
    this.getNewest();
    this.getRemomentPlayList();
    this.getRemomentSonger();
    this.getRemomentTopListSong();
  },
};
</script>

<style lang="less">
.header {
  height: 400px !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.main {
  background-color: #fff;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
.m-more {
  float: right;
}
.title {
  display: inline-block;
}
</style>