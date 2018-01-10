<template>
  <div class="dataListWrap">
    <ul v-if="classify==='live'" class="dataList dataLiveList" v-loading.fullscreen="loading">
      <li v-for="data in dataList">
        <a target="_blank" :href="data.url">
          <img :src="data.room_src" width="320" height="180" />
          <p>
            <span class="tit">
              {{data.room_name}}
            </span>
            <span class="hn">
              <i class="el-icon-view"></i>{{data.hn}}</span>
          </p>
        </a>
      </li>
    </ul>
    <ul v-if="classify==='game'" class="dataList dataGameList" v-loading.fullscreen="loading">
      <li v-for="data in dataList">
        <a target="_blank" :href="data.game_url">
          <img :src="data.game_src" width="220" height="305" />
          <p>
            <span class="tit">
              {{data.game_name}}
            </span>
          </p>
        </a>
      </li>
    </ul>
    <h3 v-show="loadingFinsh">已经没有更多的数据了</h3>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      dataList: [],
      pageIndex: 0,
      loading: true,
      loadingFinsh: false,
      classify: ''
    };
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    let classify = to.params.classify;
    next(vm => {
      vm.classify = classify;
      if (classify == 'live') {
        vm.getLiveData();
      }
      if (classify == 'game') {
        vm.getGameData();
      }
    });
  },
  mounted() {
    window.addEventListener('scroll', this._.debounce(this.scrollMethod, 300));
  },
  // 在当前路由改变，但是该组件被复用时调用
  beforeRouteUpdate(to, from, next) {
    let classify = to.params.classify;
    this.pageIndex = 0;
    this.dataList = [];
    if (classify == 'live') {
      this.getLiveData();
    }
    if (classify == 'game') this.getGameData();
    this.classify = classify;

    next();
  },
  methods: {
    scrollMethod() {
      const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH = document.documentElement.scrollTop || document.body.scrollTop;
      const classify = this.classify;
      if (viewH + scrollH >= sumH) {
        switch (classify) {
          case 'live':
            !this.loading && this.getLiveData();
            break;
          default:
        }
      }
    },
    getLiveData() {
      this.loading = true;
      const liveUrl = '/api/live/';
      const url = liveUrl + this.pageIndex;
      this.$ajax
        .get(url)
        .then(d => {
          this.dataList = [...this.dataList, ...d.data.data];
          setTimeout(() => {
            this.loading = false;
          }, 500);
          this.pageIndex++;
        })
        .catch(error => {
          this.loadingFinsh = true;
          this.loading = false;
        });
    },
    getGameData() {
      this.loading = true;
      const gameUrl = '/api/game';
      this.$ajax.get(gameUrl).then(d => {
        this.dataList = [...this.dataList, ...d.data.data];
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    getGameList() {
      //规则http://open.douyucdn.cn/api/RoomApi/live/LOL?limit=30&offset=99
      const liveUrl = '/api/live/';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
.dataListWrap {
  padding: 30px 0px;
  position: relative;
  overflow: auto;
  height: 100%;
}
.dataList {
  padding-bottom: 30px;
  overflow: auto;
  li {
    display: inline-block;
    margin: 10px 10px;
    > a {
      display: block;
      font-size: 0;
      border-radius: 6px;
      overflow: hidden;
      text-decoration: none;
    }
  }
  p {
    height: 30px;
    background: #f2f2f2;
    padding: 0 10px;
    font-size: 14px;
    color: #456;
    line-height: 30px;
    text-align: left;
  }
  .tit {
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .hn {
    float: right;
  }
  .el-icon-view {
    margin-right: 5px;
  }
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

.dataGameList {
  p {
    padding: 0px;
    text-align: center;
  }
}
</style>
