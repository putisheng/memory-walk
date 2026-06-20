/**
 * 存储模块 - 管理 localStorage 中记忆数据的读写
 */

const STORAGE_KEY = 'memory-walk-data';

/**
 * 获取所有记忆
 * @returns {Array} 按日期排序的记忆数组
 */
export function getMemories() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const memories = JSON.parse(data);
    return memories.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (e) {
    console.error('读取记忆失败:', e);
    return [];
  }
}

/**
 * 保存一条新记忆
 * @param {Object} memory - 记忆对象
 * @param {string} memory.id - 唯一 ID
 * @param {string} memory.date - 日期 YYYY-MM-DD
 * @param {string} memory.title - 标题
 * @param {string} memory.mood - 心情标识
 * @param {string} memory.content - 文字内容
 * @param {string|null} memory.photo - base64 图片数据
 */
export function saveMemory(memory) {
  const memories = getMemories();
  memories.push(memory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

/**
 * 更新一条已有记忆
 * @param {Object} updated - 更新后的记忆对象
 */
export function updateMemory(updated) {
  let memories = getMemories();
  const index = memories.findIndex(m => m.id === updated.id);
  if (index !== -1) {
    memories[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  }
}

/**
 * 删除一条记忆
 * @param {string} id - 要删除的记忆 ID
 */
export function deleteMemory(id) {
  let memories = getMemories();
  memories = memories.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

/**
 * 生成唯一 ID
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}