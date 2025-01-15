<template>
  <v-btn @click="downloadFile" color="secondary">
    ダウンロード
  </v-btn>
</template>

<script>
export default {
  methods: {
    downloadFile() {
      const data = new Blob(["ダウンロードするデータ"], { type: 'text/plain' });
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
};
</script>

<style scoped>
/* ダウンロードボタンのデザイン調整 */
</style>
