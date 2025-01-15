<template>
  <div
    class="upload-area"
    @dragover.prevent
    @drop="handleDrop"
    style="border: 2px dashed #cccccc; padding: 20px; text-align: center; margin: 20px; border-radius: 10px;"
  >
    <p>ここに音声または動画ファイルをドラッグしてください</p>
    <input type="file" @change="onFileChange" style="display: none" ref="fileInput" accept="audio/*,video/*" />
    <v-btn @click="triggerFileInput" color="primary">ファイルを選択</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileUpload(files[0]); // ドロップされたファイルを直接処理
      }
    },
    async handleFileUpload(file) {
      if (!file) {
        alert('ファイルが選択されていません');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/v1/translate', {
          method: 'POST',
          body: formData, // FormData で送信
        });

        if (!response.ok) {
          throw new Error('ファイル処理中にエラーが発生しました');
        }

        const data = await response.json();
        console.log('翻訳結果:', data);

        // 親コンポーネントに結果を渡す
        this.$emit('upload-success', data.entries);
      } catch (error) {
        console.error('アップロードエラー:', error.message);
        alert('エラーが発生しました。もう一度試してください。');
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.handleFileUpload(file); // 選択されたファイルを処理
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.upload-area {
  border: 2px dashed #cccccc;
  padding: 20px;
  text-align: center;
  margin: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.upload-area p {
  font-size: 16px;
  color: #666666;
}

.upload-area .v-btn {
  margin-top: 10px;
}
</style>
