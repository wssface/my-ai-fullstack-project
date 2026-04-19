<script lang="ts" setup>
import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem.vue';
defineProps<{ todos: Todo[] }>();

const emit = defineEmits<{
  // add 事件：接收一个字符串类型的参数 value
  toggle: [id: string];
  // update 事件：接收两个参数，id 为字符串类型，value 为字符串类型
  delete: [id: string];
}>();
</script>

<template>
  <ul>
    <TodoItem
      v-for="item in todos"
      :key="item.id"
      :todo="item"
      @delete="(id) => emit('delete', id)"
      @toggle="(id) => emit('toggle', id)"
    ></TodoItem>
  </ul>
</template>
