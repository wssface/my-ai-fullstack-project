<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Todo, TodoCreateDTO } from '@/types/todo';
import {
  getAllTodos,
  createTodo,
  deleteTodo,
  toggleTodoStatus,
} from '@/services/todoService';
import AddTodo from '@/components/AddTodo.vue';
import TodoList from '@/components/TodoList.vue';
const todos = ref<Todo[]>([]);
const loading = ref(false);
onMounted(async () => {
  todos.value = await getAllTodos();
  loading.value = false;
});

async function handleAdd(newTitle: string) {
  if (!newTitle.trim()) return;
  loading.value = true;
  const todo: TodoCreateDTO = {
    title: newTitle,
    status: 'pending',
  };
  const data = await createTodo(todo);
  loading.value = false;
  todos.value.push(data);
}

async function handleToggle(id: string) {
  const todoData = todos.value.find((t) => t.id === id);
  if (!todoData) return;
  loading.value = true;
  const statu = todoData.status === 'pending' ? 'completed' : 'pending';
  todoData.status = statu;
  const data = await toggleTodoStatus(id, todoData);
  if (!data) return;
  loading.value = false;
  todos.value = data;
}

async function handleDelete(id: string) {
  loading.value = true;
  const sucess = await deleteTodo(id);
  loading.value = false;
  if (sucess) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }
}
</script>

<template>
  <div v-loading="loading">
    <AddTodo @add="handleAdd"></AddTodo>
    <TodoList
      :todos="todos"
      @toggle="handleToggle"
      @delete="handleDelete"
    ></TodoList>
    <router-view></router-view>
  </div>
</template>
<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
