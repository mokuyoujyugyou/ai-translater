<template>
  <v-app>
    <v-main>
      <!-- 横線 (x: 0, y: 92) -->
      <v-divider class="horizontal-line" />

      <!-- 画面最上部中央に配置されたテキスト -->
      <v-row>
        <v-col cols="12" class="text-center">
          <p class="header-text">Voice Wand</p>
        </v-col>
      </v-row>

      <!-- アップロードエリアと右側コンテンツ -->
      <v-row>
        <v-col class="left-column" cols="4">
          <!-- 左側コンテンツ -->
          <v-container class="upload-container">
            <!-- アップロードエリア -->
            <div class="upload-area" @dragover.prevent="handleDragOver" @drop="handleDrop" @dragleave="handleDragLeave"
              :class="{ 'drag-active': isDragActive }"
              style="border: 2px dashed #cccccc; padding: 20px; text-align: center; margin: 20px; border-radius: 10px;">
              <p>ここに音声または動画ファイルをドラッグしてください</p>
              <input type="file" @change="onFileChange" style="display: none" ref="fileInput"
                accept="audio/*,video/*" />
              <v-btn @click="triggerFileInput" color="primary">ファイルを選択</v-btn>
            </div>

            <!-- 横並びのダウンロードボタンとトグルボタン -->
            <v-row class="action-row" align="center">
              <v-btn class="download-button" style="top: 10px;">ダウンロード</v-btn>
              <v-switch v-model="toggle" inset class="toggle-switch" label="感情に色を付ける" :color="toggle ? 'green' : 'grey'"
                hide-details />
            </v-row>

            <!-- ヘルプボタン -->
            <v-btn @click="showHelp" class="help-btn">ヘルプ</v-btn>

            <!-- ヘルプメッセージ -->
            <v-dialog v-model="helpVisible" max-width="400px">
              <v-card>
                <v-card-title>
                  <span>ヘルプ</span>
                  <v-btn @click="closeHelp" icon style="position: absolute; right: 10px; top: 10px; font-size: 24px;">
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

        <!-- 右側: 翻訳結果エリア -->
        <v-col class="right-column" cols="8">
          <v-container>
            <!-- 音声生成フォームと翻訳結果 -->
            <div v-if="translationResults.length > 0" class="translation-results-container">
              <h3>翻訳結果:</h3>
              <ul>
                <li v-for="(result, index) in translationResults" :key="index">
                  <p><strong>原文:</strong> {{ formatWords(result.origin_sentence.words) }}</p>
                  <p><strong>翻訳文:</strong> {{ formatWords(result.translated_sentence.words) }}</p>
                </li>
              </ul>

              <!-- 音声生成フォーム -->
              <div>
                <h3>音声生成:</h3>
                <form @submit.prevent="generateVoice">
                  <label>文章:</label>
                  <input v-model="text" type="text" placeholder="読み上げ文章" required />
                  <label>キャラクター:</label>
                  <select v-model="character">
                    <option value="ayase_ririse">綾瀬リリセ</option>
                  </select>
                  <label>感情:</label>
                  <select v-model="emotion">
                    <option value="happy=50">喜び (50%)</option>
                    <option value="sad=50">悲しみ (50%)</option>
                    <option value="angry=50">怒り (50%)</option>
                  </select>
                  <v-btn type="submit">音声生成</v-btn>
                </form>
              </div>

              <!-- 音声再生プレーヤ -->
              <div v-if="audioUrl" class="media-player-container">
                <h3>再生:</h3>
                <audio controls>
                  <source :src="audioUrl" type="audio/wav" />
                  お使いのブラウザはオーディオ要素をサポートしていません。
                </audio>
              </div>
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
      text: '',
      character: 'ayase_ririse',
      emotion: 'happy=50',
      audioUrl: null,
      toggle: false,
      helpVisible: false,
      translationResults: [],
      isDragActive: false, // ドラッグ中かどうかを管理
    };
  },
  methods: {
    async generateVoice() {
      const formData = new FormData();
      formData.append('text', this.text);
      formData.append('character', this.character);
      formData.append('emotion', this.emotion);

      try {
        const response = await fetch('/api/v1/voice_gen', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('音声生成中にエラーが発生しました。');
        }

        const blob = await response.blob();
        this.audioUrl = URL.createObjectURL(blob); // 生成された音声ファイルを再生
      } catch (error) {
        console.error(error.message);
        alert('エラーが発生しました。もう一度試してください。');
      }
    },
    showHelp() {
      this.helpVisible = true;
    },
    closeHelp() {
      this.helpVisible = false;
    },
    handleDragOver(event) {
      event.preventDefault();
      this.isDragActive = true; // ドラッグ中の見た目を変更
    },
    handleDragLeave() {
      this.isDragActive = false; // ドラッグが終了したらリセット
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragActive = false; // ドロップ後リセット
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.handleFileUpload(file);
      }
    },
    async handleFileUpload(file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/v1/translate', {
          method: 'POST',
          headers: {
            // FormDataではContent-Typeを自動設定
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('アップロード中にエラーが発生しました。');
        }

        const data = await response.json();
        this.translationResults = data.entries.map((entry) => entry.translated_sentence);
      } catch (error) {
        console.error(error.message);
        alert('エラーが発生しました。もう一度試してください。');
      }
    },
    formatWords(words) {
      return words.map((word) => word.text).join(' ');
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
  width: 1800px;
  height: 0;
  background-color: #000000;
  left: 0;
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

/* アップロードエリア */
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 150px;
  /* 横線の下に配置 */
}

.upload-area {
  background-color: #D9D9D9;
  border-radius: 54px;
  border: 1px solid #000;
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
}

/* アップロードテキスト */
.upload-text {
  font-family: Inter;
  font-size: 24px;
  color: #000;
}

/* ダウンロードボタン */
.download-button {
  width: 180px;
  height: 75px;
  background-color: #d9d9d9;
  /* ダウンロード不可能時 */
  color: #ffffff;
  border-radius: 100px;
  border: 1px solid #000000;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  letter-spacing: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 20px;
  /* ボタン間のスペース */
}

/* トグルスイッチ */
.toggle-switch {
  font-family: Inter, sans-serif;
  margin-left: 20px;
}

.translation-results-container {
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #cccccc;
}

.translation-results-placeholder {
  text-align: center;
  color: #888888;
  font-style: italic;
}
</style>
