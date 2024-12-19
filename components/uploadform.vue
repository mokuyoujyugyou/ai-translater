<template>
  <div
    class="drop-area"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    :class="{ 'drag-over': isDragOver }"
  >
  <v-file-input label="ファイルを選択してください"></v-file-input>
    <ul>
      <li v-for="file in files" :key="file.name">{{ file.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragOver: false,
      files: [], // ドロップされたファイルリスト
    };
  },
  methods: {
    onDragEnter() {
      this.isDragOver = true;
    },
    onDragOver() {
      this.isDragOver = true;
    },
    onDragLeave() {
      this.isDragOver = false;
    },
    onDrop(event) {
      this.isDragOver = false;
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length) {
        this.files = [...droppedFiles];
      }
    },
  },
};
</script>

<style scoped>
.drop-area {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: background-color 0.3s ease;
}
.drop-area.drag-over {
  background-color: #f0f8ff;
}
ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
}
li {
  font-size: 14px;
  color: #333;
}
</style>
