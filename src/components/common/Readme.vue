<template>
  <div class="install-body">
    <h2 id="toc_0">一、说明</h2>

    <p>由于<code>zanProxy</code>默认不修改系统代理设置，所以在 chrome 上使用代理功能时需要依赖第三方 chrome 插件。</p>
    <p><code>zanProxy</code>依赖 openssl 生成证书，使用 proxy 前请先安装 openssl (版本建议在 0.9.8 以上)。</p>

    <h2 id="toc_1">二、chrome 插件安装</h2>

  </div>

</template>

<script>
import qrcode from "qrcode-js";

export default {
  name: "app",
  data() {
    var certUrl =
      "http://" +
      location.hostname +
      ":" +
      (location.port || 80) +
      "/utils/rootCA.crt";
    return {
      url: certUrl,
      imgUrl: qrcode.toDataURL(certUrl, 4)
    };
  }
};
</script>

<style>
.install-body {
  margin: -50px;
  padding: 50px;
  font-size: 14px;
  line-height: 1.8;
  background-color: #fff;

  &__qrcode {
    display: block;
    margin-left: -15px;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 400;
    margin: 20px 0 10px;
    color: rgba(51, 51, 51, 0.9);
  }

  h1 {
    margin: 0;
    font-size: 32px;
    font-family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  }

  h2 {
    color: #333;
    font-size: 24px;
    margin-top: 30px;

    &:first-of-type {
      margin-top: 10px;
    }
  }

  h4 {
    font-size: 18px;
  }

  code {
    margin: 2px;
    color: #455a64;
    padding: 2px 7px;
    font-size: 13px;
    overflow-x: auto;
    font-weight: 400;
    line-height: 22px;
    border-radius: 3px;
    margin-bottom: 25px;
    position: relative;
    word-break: break-all;
    white-space: pre-wrap;
    background-color: #f5f7fa;
    font-family: Source Code Pro, Monaco, Inconsolata, monospace;
  }

  ol {
    padding-left: 20px;
  }

  a {
    color: #3498db;
    text-decoration: none;
  }

  .quick-start {
    font-size: 14px;
    margin-left: 15px;
  }
}
</style>
