
/**
 * 待办事项状态
 */
export type TodoStatus = "pending" | "completed" | "archived";

/**
 * 标签分类
 */
export type Tag = "work" | "life" | "study" | "other";

/**
 * 待办事项接口
 * 
 */
export interface Todo{
    id: string,
    title: string, //待办标题
    status: TodoStatus, //待办状态,类型为上面定义的 TodoStatus 联合类型
    createdAt: Date, //用于记录时间戳
    updatedAt: Date, //用于记录更新时间
    description?: string,
    dueDate?: Date, //截止日期
    category?: Tag, //分类用于后续扩展（例如工作、生活、学习）
}

/**
 * 创建待办事项所需数据传输对象
 * Omit: 从类型中剔除某些属性
 */
export type TodoCreateDTO = Omit<Todo,'id'|'createdAt'|'updatedAt'> 

/**
 * 更新代办事项
 */
export type TodoUpdateDTO = Partial<Pick<Todo,'title' | 'description' | 'status' | 'dueDate' | 'category'>>

/**
 * 列表摘要类型（只展示核心信息）
 */
export type TodoSummary = Pick<Todo,'id'|'title'|'status'>

/**
 * 以 ID 为键的待办字典（用于快速查找）
 */
export type TodoMap = Record<string,Todo>   