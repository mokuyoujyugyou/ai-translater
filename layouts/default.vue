<template>
  <v-app>
    <v-main>
      <v-toolbar-title>Voice Wand</v-toolbar-title>
      <v-container>
        <v-row>
          <v-divider></v-divider>
          <v-col>
            <v-file-input label="ファイルを選択してください"></v-file-input>
            <v-btn class="Dlbtn">ダウンロード </v-btn>
            <v-switch></v-switch>
            <v-btn>対応形式</v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <v-card class="gry-bg">
              <v-card-title>字幕と音声ファイルが表示されます</v-card-title>
            </v-card>
            <p>怒り：赤 喜び：黄色 悲しみ：青</p>
          </v-col>
        </v-row>
      </v-container> </v-main
    >>
  </v-app>
</template>

<script setup></script>
<style>
  .Dlbtn {
    background-color: #d3cfcf; /* 灰色*/
  }
  .gry-bg {
    background-color: #d9d9d9; /* 灰色*/
  }
  .custom-vertical-divider {
    border-left: 2px solid #000; /* 左に垂直線 */
    height: 100%; /* 高さを調整 */
    margin: 0 20px; /* 左右にスペースを追加 */
  }
</style>
