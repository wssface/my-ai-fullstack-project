import type { Todo, TodoCreateDTO, TodoUpdateDTO } from '@shared-types/todo';
import { request } from '@/utils/tool.ts';
const API_BASE = 'http://localhost:3001/api';

/**
 * 公开方法
 *
 */
/**
 * 获取所有待办事项的函数
 * 该函数从存储中读取所有待办事项并返回
 * @returns {Todo[]} 返回一个包含所有待办事项的数组
 */
export async function getAllTodos(): Promise<Todo[]> {
  return request<Todo[]>(`${API_BASE}/todos`);
}

/**
 * 根据ID获取待办事项
 * @param id - 待办事项的唯一标识符
 * @returns 返回匹配的待办事项对象，如果未找到则返回null
 */
export async function getTodoById(id: string): Promise<Todo | null> {
  return request<Todo | null>(`${API_BASE}/todos/${id}`);
}

/**
 * 创建一个新的待办事项
 * @param todo - 待创建的待办事项数据，类型为TodoCreateDTO
 * @returns 返回创建后的完整待办事项对象，包含生成的id和时间戳
 */
export async function createTodo(todo: TodoCreateDTO): Promise<Todo> {
  const param = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };
  return request<Todo>(`${API_BASE}/todos`, param);
}

export async function updateTodo(
  id: string,
  todo: TodoUpdateDTO,
): Promise<Todo | null> {
  const param = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };
  return request<Todo | null>(`${API_BASE}/todos/${id}`, param);
}

/**
 * 从存储中删除指定ID的待办事项
 * @param {string} id - 要删除的待办事项的ID
 * @returns {boolean} - 如果删除成功返回true，如果没有找到对应的待办事项返回false
 */
export async function deleteTodo(id: string): Promise<boolean> {
  const param = {
    method: 'DELETE',
  };
  return request<boolean>(`${API_BASE}/todos/${id}`, param);
}

/**
 * 切换待办完成状态（pending <-> completed）
 * 注意：archived 状态不参与切换
 */
export async function toggleTodoStatus(
  id: string,
  todo: TodoUpdateDTO,
): Promise<Todo[] | null> {
  const param = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };
  return request<Todo[] | null>(`${API_BASE}/todos/${id}`, param);
}
