<script setup lang="ts">
import type { Todo } from '@/types/todo';
const props = defineProps<{
  todo: Todo;
}>();

const statu = props.todo.status === 'completed' ? true : false;

const emit = defineEmits<{
  // add 事件：接收一个字符串类型的参数 value
  toggle: [id: string];
  // update 事件：接收两个参数，id 为字符串类型，value 为字符串类型
  delete: [id: string];
}>();

function handleToggle() {
  emit('toggle', props.todo.id);
}

function handleDelete() {
  emit('delete', props.todo.id);
}
</script>

<template>
  <li class="todo-item" :class="{ completed: todo.status === 'completed' }">
    <el-checkbox
      v-model="statu"
      :label="todo.title"
      size="large"
      @change="handleToggle"
    />
    <el-button class="delete-btn" @click="handleDelete">删除</el-button>
  </li>
</template>
<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
.todo-item {
  margin: 0 10px 10px 10px;
  .delete-btn {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
