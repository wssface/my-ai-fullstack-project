import express from 'express'//express是一个用于构建web应用程序的框架
import cors from 'cors'//cors是一个用于处理跨域请求的中间件
import fs from 'fs/promises' //fs/promises是Node.js中的一个模块，它提供了一些用于处理文件和目录的异步API
import path from 'path'
import type { Todo, TodoCreateDTO, TodoUpdateDTO } from '@shared-types/todo'

// 创建应用对象
const app = express()
const PORT = 3001
//path.resolve从当前文件所在目录开始解析路径
const DATA_FILE = path.resolve(__dirname, '../data/todos.json') //获取当前文件所在目录下的data文件夹中的todos.json文件
app.use(cors()).use(express.json())

// 读取数据
/**
 * 异步读取待办事项列表
 * @returns {Promise<Todo[]>} 返回一个Promise，解析为Todo对象数组
 */
async function readTodos():Promise<Todo[]>{
    try{
        const data = await fs.readFile(DATA_FILE,'utf-8') //读取文件内容
        const dataJson =JSON.parse(data) as Todo[]//将文件内容解析为JSON对象
        const newtodos = dataJson.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
            dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined  // 使用 null 而不是 undefined
        }))
        return newtodos
    }catch(e){
        return []
    }
}

/**
 * 将待办事项列表写入文件
 * @param todos - 待写入的待办事项数组
 * @returns Promise<void> - 异步操作，无返回值
 */
async function writeTodos(todos: Todo[]): Promise<void>{
    // 使用fs.writeFile将待办事项数组以JSON格式写入文件
    // DATA_FILE是目标文件路径
    // JSON.stringify(todos, null, 2)将数组转换为格式化的JSON字符串，缩进为2个空格
    // JSON.stringify的第二个参数用于替换值，第三个参数用于缩进
    // 当传入 null 时，表示不过滤任何属性，包含所有属性
    //表示生成的 JSON 文件会使用 2 个空格进行缩进，使其更易读
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2))
}

// 获取待办事项列表
app.get('/api/todos', async (req, res) => {
    const todos = await readTodos()
    res.status(201).json(todos) // 返回状态码201和待办事项列表
})

// 通过id查询单个详情
app.get('/api/todos/:id',async (req,res)=>{
    const {id} = req.params
    const dto = req.body as TodoUpdateDTO
    const todos = await readTodos()
    const todo = todos.find(todo => todo.id === id)
    if(!todo){
        return res.status(404).json({message: 'Todo not found'})
    }
    return res.status(201).json(todo)
})

// req.body是请求体，req.params是请求参数
// 请求体是客户端发送给服务器的数据，可以是JSON、XML、表单数据等
// 传参给路由，可以获取到请求参数
app.post('/api/todos', async (req, res) => {
    const dto = req.body as TodoCreateDTO
    if(!dto.title){
        return res.status(400).json({message: 'Title is required'})
    }
    const todos = await readTodos()
    const newTodo: Todo = {
        ...dto,
        id: crypto.randomUUID(), // 生成一个随机的UUID作为id
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    todos.push(newTodo) // 将新的待办事项添加到数组中
    await writeTodos(todos)
    res.status(201).json(newTodo) // 返回新的待办事项以及状态码201
})

// 更新待办事项
app.put('/api/todos/:id', async (req, res) => {
    const {id} = req.params
    const dto = req.body as TodoUpdateDTO
    const todos = await readTodos()
    const index = todos.findIndex(todo => todo.id === id)
    if(index === -1){
        return res.status(404).json({message: 'Todo not found'})
    }
   
    const updatedata: Todo = {
        ...todos[index],
        ...dto,
        updatedAt: new Date(),
    }
    todos[index] = updatedata
    await writeTodos(todos)
    res.status(201).json(todos)
})

app.delete('/api/todos/:id', async (req, res) => {
    const {id}= req.params
    const todos = await readTodos()
    const filterd = todos.filter(todo => todo.id === id)
    if(filterd.length === todos.length){
        return res.status(404).json({message: 'Todo not found'})
    }
    await writeTodos(filterd)
    res.status(201).json({message: 'sucess'})
})

//监听端口，启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;//导出app对象，以便在其他文件中使用