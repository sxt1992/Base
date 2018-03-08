<template>
  <div class="blogCont">
    <header><em>木兮的网络博客&nbsp;: </em><a href="#">首页</a>&gt;<a href="#">文章</a>&gt;<a href="#">技术分享</a></header>
    <main>
      <h1>跨域资源共享 CORS 详解</h1>
      <div class="paper-about">
        <div class="paper-about-left">
          <span><i>&#xf213;</i><em>woodxi</em></span>
          <span><i>&#xf3f4;</i><em>Oct 06, 2017</em></span>
        </div>
        <div class="paper-about-right">
          <span><i>&#xf11a;</i><em>评论(100)</em></span>
          <span><i>&#xf133;</i><em>浏览(100)</em></span>
          <span class="paper-about-dz"><i>&#xf251;</i><em>点赞(100)</em></span>
        </div>
      </div>
      <div class="paper-main" v-highlight>
        <!-- test -->
        <pre><code class="javascript">function init(){
  $scope.req.getArticle();
  $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
  });
}</code></pre>
<pre><code>
  function quick_sort($arr){
      $length = count($arr);
      if($length <= 1) {
          return $arr;
      }
      $base_num = $arr[0];
      $left_array = array();
      $right_array = array();
      for($i=1; $i<$length; $i++) {
          if($base_num > $arr[$i]) {
              $left_array[] = $arr[$i];
          } else {
              $right_array[] = $arr[$i];
          }
      }
      $left_array = quick_sort($left_array);
      $right_array = quick_sort($right_array);
      //合并
      return array_merge($left_array, array($base_num), $right_array);;
  }
  $arr=array(2,1,0,3,9,10,59,41,78,56,45,47,12,15,45,11);
  $rs=quick_sort($arr);
  echo '&lt;pre&gt;';
  print_R($rs);die;
</code></pre>
        <div>冒泡排序：最简单的一种算法，如果第一次接触程序的同学，就会有一些疑惑，为什么那么写。我举例子说明一下：就比如你有两个瓶子，分别是A瓶，B瓶，瓶子里都装满了水，你想把这AB两瓶水做一个交换，在生活中，你一定会找来第三个空瓶子C，把刚才A瓶的水，倒进那个空瓶子C，此时你就可以完成A瓶和B瓶的交换</div>
        <div>冒泡排序：最简单的一种算法，如果第一次接触程序的同学，就会有一些疑惑，为什么那么写。我举例子说明一下：就比如你有两个瓶子，分别是A瓶，B瓶，瓶子里都装满了水，你想把这AB两瓶水做一个交换，在生活中，你一定会找来第三个空瓶子C，把刚才A瓶的水，倒进那个空瓶子C，此时你就可以完成A瓶和B瓶的交换</div>
        <div>冒泡排序：最简单的一种算法，如果第一次接触程序的同学，就会有一些疑惑，为什么那么写。我举例子说明一下：就比如你有两个瓶子，分别是A瓶，B瓶，瓶子里都装满了水，你想把这AB两瓶水做一个交换，在生活中，你一定会找来第三个空瓶子C，把刚才A瓶的水，倒进那个空瓶子C，此时你就可以完成A瓶和B瓶的交换</div>
        <div>fdsaf</div>
        <!-- 77777 -->
      </div>
      <dl class="paper-label">
        <dt>标签:</dt>
        <dd v-for="item in ['javascript', 'java', 'php', 'node', 'html',   'javascript', 'java', 'php', 'node', 'html','javascript', 'java', 'php', 'node', 'html','javascript', 'java', 'php', 'node', 'html','javascript', 'java', 'php', 'node', 'html']">{{item}}</dd>
      </dl>
      <div class="paper-comment">
        <div class="paper-comment-title">
          <em>评论</em>
          <span>32条评论</span>
        </div>
        <ul class="paper-comment-cont">
          <li>
            <b>伯格</b>说：
            <div class="paper-comment-cont-main">
              不对啊！前一个文章里您是这么说的。
            “同源政策规定，AJAX请求只能发给同源的网址，否则就报错。”
            按您的说法，跨域了就直接报错了，怎么会发出去呢？
            而且我自己实验了一下，我们公司的接口都是可以跨域的，访问方法和平时发送ajax请求没区别。
            所以是不是所谓跨域不能请求ajax指的是，后端通过Access-Control-Allow-Origin来限制跨域请求，而不是浏览器限制你发送ajax跨域请求？
            </div>
            <div class="comment-cont-opt">2017年9月22日 17:37&nbsp;|&nbsp;<b @click="gotoSection">回复</b></div>
          </li>
          <li>
            <b>伯格</b>说：
            <div class="paper-comment-cont-main">
              不对啊！前一个文章里您是这么说的。
            “同源政策规定，AJAX请求只能发给同源的网址，否则就报错。”
            按您的说法，跨域了就直接报错了，怎么会发出去呢？
            而且我自己实验了一下，我们公司的接口都是可以跨域的，访问方法和平时发送ajax请求没区别。
            所以是不是所谓跨域不能请求ajax指的是，后端通过Access-Control-Allow-Origin来限制跨域请求，而不是浏览器限制你发送ajax跨域请求？
            </div>
            <div class="comment-cont-opt">2017年9月22日 17:37&nbsp;|&nbsp;<b @click="gotoSection">回复</b></div>
          </li>
          <li>
            <b>伯格</b>说：
            <div class="paper-comment-cont-main">
              不对啊！前一个文章里您是这么说的。
            “同源政策规定，AJAX请求只能发给同源的网址，否则就报错。”
            按您的说法，跨域了就直接报错了，怎么会发出去呢？
            而且我自己实验了一下，我们公司的接口都是可以跨域的，访问方法和平时发送ajax请求没区别。
            所以是不是所谓跨域不能请求ajax指的是，后端通过Access-Control-Allow-Origin来限制跨域请求，而不是浏览器限制你发送ajax跨域请求？
            </div>
            <div class="comment-cont-opt">2017年9月22日 17:37&nbsp;|&nbsp;<b @click="gotoSection">回复</b></div>
          </li>
        </ul>
      </div>
      <div class="paper-want-say">
        <h2>我想留言</h2>
        <p class="cont-section">
          <em>留言<br><span><b>md</b>语法</span></em>
          <textarea ref="contSection">fsdafds556</textarea>
        </p>
        <p>
          <em>名字</em>
          <input type="text" value="fsa">
        </p>
        <p>
          <em>邮件</em>
          <input type="text" value="fsa">
        </p>
        <p>
          <label for="remember"><em>记住个人信息</em></label>
          <input type="checkbox" id="remember">
        </p>
        <b>发表观点</b>
      </div>
    </main>
    <footer>
      &copy;{{new Date().getFullYear()}}
      <a href="#">我的邮件</a>
      |<a href="#">微博</a>
      |<a href="#">GitHub</a>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'blogCont',
  data() {
    return {
    };
  },
  methods: {
    gotoSection() {
      const start = window.pageYOffset;
      const end = this.$refs.contSection.offsetTop;
      const d = (end - start) / 20;

      let i = 1;
      const st = cb => (requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(cb, 16));
      let targ = start + (d * i);
      const interVal = () => {
        window.scrollTo(0, targ);
        i += 1;
        targ = start + (d * i);
        if (targ < end) {
          st(interVal);
        } else {
          this.$refs.contSection.focus();
        }
      };
      interVal();
    },
  },
};
</script>

<style lang="less">
body {
    background: rgba(49, 148, 255, 0.04);
}
</style>
<style scoped lang="less">
a {
  text-decoration: none;
  &:hover, &:active {
    text-decoration: underline;
  }
}
.blogCont {
    max-width: 800px;
    margin: auto;
    header {
        height: 60px;
        margin-top: 10px;
        border-bottom: 1px solid #ddd;

        em {
          display: inline-block;
          height: 60px;
          margin-right: 20px;
          color: #57a3f3;
          font-size: 20px;
          line-height: 60px;
          text-shadow: 0 1px #82b8f1,
                     1px 2px #47c4ca,
                     0 3px #2e4828,
                     0 4px #396d62,
                     1px 5px #3b7542;
        }
        a {
          margin-left: 6px;
          margin-right: 8px;
          color: #0fa9d2;
        }
    }
    main {
      &>h1 {
        margin: 0;
        padding: 24px 0 6px;
        font-weight: 100;
        font-size: 24px;
        word-wrap: break-word;
        word-break: break-all;
      }
      .paper-about {
        height: 36px;
        overflow: hidden;

        font-size: 0;
        span {
          display: inline-block;
          margin: 6px;
          font-size: 14px;

          i {
            margin-right: 6px;
            font-family: fontIcons;
          }
          &.paper-about-dz {
            cursor: pointer;

            &:hover {
              color: #0fa9d2;
            }
          }
        }
        .paper-about-left {
          float: left;
        }
        .paper-about-right {
          float: right;
        }
      }
      .paper-main {}
      .paper-label {
        margin: 16px 0 0;
        dt {
          display: inline-block;
          color: #2d8cf0;
          font-size: 16px;
        }
        dd {
          display: inline-block;
          margin: 2px 6px;
          padding: 0 7px;
          color: #63809e;
          font-size: 12px;
          border: 1px solid #bcdafa;
          border-radius: 100px;
          cursor: pointer;
        }
      }
      .paper-comment {
        margin-top: 30px;
        .paper-comment-title {
          height: 38px;

          em {
            float: left;
            width: 80px;
            height: 37px;
            color: #2d8cf0;
            font-size: 16px;
            line-height: 37px;
            border: 1px solid #bcdafa;
            border-bottom: none;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            text-align: center;
          }
          span {
            float: right;
            width: 720px;
            height: 37px;
            padding-right: 12px;
            color: #2d8cf0;
            line-height: 37px;
            border-bottom: 1px solid #bcdafa;
            text-align: right;
          }
        }
        .paper-comment-cont {

          li {
            padding: 30px 20px 40px;
            border-bottom: 1px dashed #ccc;
            &>b {
              margin-right: 6px;
              font-weight: bold;
              font-size: 16px;
            }
            .paper-comment-cont-main {
              padding: 6px 16px 0;
              word-wrap: break-word;
              word-break: break-all;
              * {
                word-wrap: break-word;
                word-break: break-all;
              }
            }
            .comment-cont-opt {
              float: right;
              b {
                color: #0fa9d2;
                cursor: pointer;

                &:hover, &:active {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
      .paper-want-say {
        padding-bottom: 30px;
        &>h2 {
          margin: 0;
          margin-bottom: 30px;
          padding: 32px 0 20px;
          font-weight: 100;
          font-size: 24px;
          border-bottom: 1px solid #bcdafa;
        }
        p {
          margin-bottom: 16px;
          font-size: 0;

          em {
            display: inline-block;
            width: 50px;
            margin-right: 12px;
            font-size: 16px;
            vertical-align: middle;
          }
          textarea, input {
            display: inline-block;
            width: 260px;
            height: 36px;
            padding: 0 8px;
            color: #1f67c1;
            font-size: 14px;
            border: 1px solid #ccc;
            vertical-align: middle;
          }
          textarea {
            width: 560px;
            height: 160px;
            padding: 6px 8px;
          }
          &.cont-section {
            em {
              span {
                font-size: 12px;
                b {
                  margin-right: 2px;
                  padding: 1px 2px;
                  color: #3d5db1;
                  border-radius: 3px;
                  background: rgba(208, 47, 176, 0.54);
                }
              }
            }
          }
          label[for=remember] {
            em {
              width: auto;
              margin-right: 2px;
              font-size: 12px;
              cursor: pointer;
            }
          }
          #remember {
            cursor: pointer;
          }
        }
        &>b {
          display: block;
          width: 240px;
          height: 36px;
          font-size: 18px;
          line-height: 34px;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          user-select: none;
          cursor: pointer;

          &:hover{
            box-shadow: 0 0 3px inset;
          }
          &:active{
            font-size: 19px;
            box-shadow: 0 0 4px inset;

          }
        }
      }
    }
    footer {
        height: 50px;
        line-height: 50px;
        text-align: right;
        border-top: 1px solid #ddd;

        a {
          margin: 6px;
          color: #0fa9d2;
        }
    }
}
</style>
