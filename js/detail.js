/**
 * 详情模块 - 查看记忆的完整内容
 */

import { getMemories } from './storage.js';

const MOOD_EMOJI = {
  happy: '😊',
  calm: '😌',
  sad: '😢',
  angry: '😤',
  surprised: '😮',
  loved: '🥰'
};

/**
 * 初始化详情弹窗
 */
export function initDetail() {
  const overlay = document.getElementById('detail-overlay');
  const closeBtn = document.getElementById('detail-close');

  const closeDetail = () => {
    overlay.classList.remove('active');
  };

  closeBtn.addEventListener('click', closeDetail);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDetail();
  });

  // ESC 键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });
}

/**
 * 打开指定记忆的详情
 * @param {string} id - 记忆 ID
 */
export function openDetail(id) {
  const overlay = document.getElementById('detail-overlay');
  const container = document.getElementById('detail-content');
  const memories = getMemories();
  const memory = memories.find(m => m.id === id);

  if (!memory) {
    container.innerHTML = '<p style="color: var(--text-muted);">记忆未找到</p>';
    overlay.classList.add('active');
    return;
  }

  const moodEmoji = MOOD_EMOJI[memory.mood] || '😊';
  const dateStr = formatDateDetail(memory.date);

  let imageHtml = '';
  if (memory.photo) {
    imageHtml = `<img class="detail-image" src="${memory.photo}" alt="${escapeHtml(memory.title)}" />`;
  } else {
    imageHtml = `<div class="detail-no-image">🖼️</div>`;
  }

  container.innerHTML = `
    ${imageHtml}
    <div class="detail-header">
      <span class="detail-mood">${moodEmoji}</span>
      <span class="detail-title">${escapeHtml(memory.title)}</span>
    </div>
    <div class="detail-date">${dateStr}</div>
    <div class="detail-content">${escapeHtml(memory.content || '')}</div>
  `;

  overlay.classList.add('active');
}

function formatDateDetail(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const wd = weekdays[d.getDay()];
  return `${y}年${m}月${day}日 星期${wd}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}