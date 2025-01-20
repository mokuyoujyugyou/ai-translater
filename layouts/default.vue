<template>
  <v-app>
    <v-main>
      <!-- 横線 -->
      <v-divider class="horizontal-line" />

      <!-- 画面最上部中央に配置されたテキスト -->
      <v-row>
        <v-col cols="12" class="text-center">
          <p class="header-text">Voice Wand</p>
        </v-col>
      </v-row>

      <!-- アップロードシステム全体を横線の下に配置 -->
      <v-row class="upload-system-row">
        <v-col class="left-column" cols="4">
          <!-- アップロードエリア -->
          <v-container class="upload-container">
            <div class="upload-area">
              <p class="upload-text">ここにファイルをドラッグしてください</p>
            </div>
            <v-row class="action-row" align="center">
              <v-btn class="download-button">ダウンロード</v-btn>
              <v-switch
                v-model="toggle"
                inset
                class="toggle-switch"
                label="感情に色を付ける"
                :color="toggle ? 'green' : 'grey'"
                hide-details
              />
            </v-row>
            <!-- ヘルプボタン -->
            <v-btn @click="showHelp" class="help-btn">ヘルプ</v-btn>
            <v-dialog v-model="helpVisible" max-width="400px">
              <v-card>
                <v-card-title>
                  <span>ヘルプ</span>
                  <v-btn
                    @click="closeHelp"
                    icon
                    style="position: absolute; right: 10px; top: 10px; font-size: 24px;"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <ul>
                    <li>1. サイズ上限：500MB</li>
                    <li>2. 対応ファイル：動画・音声</li>
                    <li>3. 時間：１５分以内</li>
                    <li>4. ※英語音声のみ対応</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-container>
        </v-col>

        <!-- 右側コンテンツ -->
        <v-col class="right-column" cols="8">
          <v-container>
            <!-- 正方形を中央に配置 -->
            <div class="square-box">
              <p>1234</p>
            </div>
            <!-- 正方形の下に感情テキストを横並びに配置 -->
            <div class="emotion-text-container">
              <p class="emotion-text anger">怒り</p>
              <p class="emotion-text joy">喜び</p>
              <p class="emotion-text sadness">悲しみ</p>
            </div>
          </v-container>
        </v-col>
      </v-row>

      <!-- 縦線 -->
      <v-divider class="vertical-line" vertical />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
      helpVisible: false,
    };
  },
  methods: {
    showHelp() {
      this.helpVisible = true;
    },
    closeHelp() {
      this.helpVisible = false;
    },
  },
};
</script>

<style scoped>
/* ヘッダーのテキスト（Voice Wand） */
.header-text {
  font-family: Freehand, sans-serif;
  font-size: 64px;
  color: #000000;
  position: absolute;
  top: -13px;
  left: 590px;
  text-align: center;
}

/* 横線 */
.horizontal-line {
  position: absolute;
  top: 92px;
  width: 100%;
  height: 1px;
  background-color: #000000;
}

/* 縦線 */
.vertical-line {
  position: absolute;
  top: 92px;
  left: 425px;
  height: 100%;
  width: 1px;
  background-color: #000000;
}

/* アップロードシステム全体のスタイル */
.upload-system-row {
  margin: 30px; /* 横線の下に全体を配置するマージン */
}

.upload-container {
  text-align: center;
}

.upload-area {
  width: 288px;
  height: 259px;
  background-color: #f5f5f5;
  margin: 50pt;
  border: 1px dashed #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.action-row {
  margin-top: 10px;
}

.help-btn {
  margin-top: 10px; /* ダウンロードボタンの下に配置 */
}

/* 正方形ボックス */
.square-box {
  width: 910px;
  height: 550px;
  background-color: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 0; /* 横線の下に余白を追加 */
  border: 1px solid #000000;
  border-radius: 10px;
}

/* 正方形の下に感情テキストを横並びに配置 */
.emotion-text-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 正方形ボックスの下に間隔を追加 */
}

.emotion-text {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin: 0 10px; /* テキスト間にスペースを追加 */
}

.anger {
  color: #BA0D10; /* 赤色（怒り） */
}

.joy {
  color: #657F0A; /* 黄色（喜び） */
}

.sadness {
  color: #675FCF; /* 青色（悲しみ） */
}
</style>
