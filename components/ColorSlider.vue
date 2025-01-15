<template>
  <div>
    <v-slider
      v-model="colorValue"
      min="0"
      max="255"
      step="1"
      label="文字色"
      style="width: 100%;"
    />
    <v-btn @click="changeTextColor" color="primary">文字色を変更</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorValue: 0, // スライダーで選ばれる色
    };
  },
  methods: {
    changeTextColor() {
      // ここで文字色を変更する処理
      document.body.style.color = `rgb(${this.colorValue}, ${this.colorValue}, ${this.colorValue})`;
    }
  }
};
</script>

<style scoped>
/* スライダーやボタンのデザイン調整 */
</style>
