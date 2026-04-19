export class ApiError extends Error {
  /**
   * 构造函数，用于创建ApiError实例
   * @param message - 错误信息字符串
   */
  status: number;
  constructor(statu: number, message: string) {
    // 调用父类构造函数，传入错误信息
    super(message);
    // 设置错误名称为'ApiError'
    this.name = 'ApiError';
    this.status = statu;
  }
}

export async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const res = await fetch(url, options);
    // 检查响应状态码
    if (!res.ok) {
      // res.ok为true表示请求成功，为false表示请求失败
      let errorMes = `请求失败，（${res.status}）`;
      try {
        const errorData = await res.json();
        errorMes = errorData.error || errorMes;
      } catch (e) {
        console.log(e);
      }
      throw new ApiError(res.status, errorMes);
    }

    // 检查状态码是否为204（无内容）
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (e) {
    // 捕获fetch请求中的错误,instanceof判断是否为TypeError并且错误信息中包含'fetch'
    if (e instanceof TypeError && e.message.includes('fetch')) {
      //在 catch 块中重新抛出错误时，必须使用 cause 属性保留原始错误信息，否则会丢失原始错误的堆栈和上下文。
      throw new Error('网络错误，请检查网络连接', { cause: e });
    }
    throw e;
  }
}
