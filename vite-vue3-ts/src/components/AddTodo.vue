<script setup lang="ts">
import { ref } from 'vue';

const newTitle = ref('');

// 定义组件的事件发射器,用于触发父组件的方法
// 使用 defineEmits 定义组件可以触发的事件，并指定事件参数的类型
const emit = defineEmits<{
  // add 事件：接收一个字符串类型的参数 value
  add: [value: string];
  // update 事件：接收两个参数，id 为字符串类型，value 为字符串类型
  update: [id: string, value: string];
}>();

function handleAdd() {
  const val = newTitle.value.trim();
  if (!val) return;
  emit('add', val);
  newTitle.value = '';
}
</script>

<template>
  <el-row class="add-todo" justify="space-around">
    <el-col :span="1"></el-col>
    <el-col :span="15"
      ><el-input v-model="newTitle" placeholder="Please input"
    /></el-col>
    <el-col :span="2"><el-button @click="handleAdd">添加</el-button></el-col>
  </el-row>
</template>
<style scoped>
.add-todo {
  margin: 20px;
}
</style>
