<template>
  <div class="blogCont">
    <header>木兮的网络博客: <a href="#">首页</a>&gt;<a href="#">文章</a>&gt;<a href="#">技术分享</a></header>
    <main>
        <h1>跨域资源共享 CORS 详解</h1>
        <div class="paper-about"></div>
        <div class="paper-main">
            fdsafd <br><br><br><br><br><br><br><br><br><br><br><br>6gfd
        </div>
        <div class="paper-comment"></div>
        <div class="paper-want-say"></div>
    </main>
    <footer>
        &copy;{{new Date().getFullYear()}}
        &nbsp;<a href="#">我的邮件</a>
        |&nbsp;<a href="#">微博</a>
        |&nbsp;<a href="#">GitHub</a></footer>
  </div>
</template>
<script>
export default {
  name: 'blogCont',
  data() {
    return {
    };
  },
};
</script>

<style lang="less">
body {
    background: rgba(49, 148, 255, 0.04);
}
</style>
<style scoped lang="less">
.blogCont {
    max-width: 800px;
    margin: auto;
    header {
        height: 60px;
        margin-top: 10px;
        font-size: 20px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
    }
    footer {
        height: 50px;
        line-height: 50px;
        text-align: right;
        border-top: 1px solid #ddd;
    }
}
</style>
