/**
 * 时间线渲染模块 - 渲染记忆卡片列表
 */

import { getMemories, deleteMemory } from './storage.js';

const MOOD_EMOJI = {
  happy: '😊',
  calm: '😌',
  sad: '😢',
  angry: '😤',
  surprised: '😮',
  loved: '🥰'
};

const MOOD_NAMES = {
  happy: '开心',
  calm: '平静',
  sad: '难过',
  angry: '生气',
  surprised: '惊喜',
  loved: '心动'
};

/**
 * 格式化日期为中文格式
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {string}
 */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}年${m}月${day}日`;
}

/**
 * 渲染所有记忆卡片
 * @param {Function} onEdit - 编辑回调
 * @param {Function} onView - 查看详情回调
 */
export function renderTimeline(onEdit, onView) {
  const timeline = document.getElementById('timeline');
  const emptyState = document.getElementById('empty-state');
  const memories = getMemories();

  // 移除旧卡片（保留 empty-state）
  const cards = timeline.querySelectorAll('.memory-card');
  cards.forEach(c => c.remove());

  if (memories.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  memories.forEach((memory, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.id = memory.id;

    // Photo
    let photoHtml = '';
    if (memory.photo) {
      photoHtml = `<img class="card-image" src="${memory.photo}" alt="${memory.title}" />`;
    } else {
      photoHtml = `<div class="card-image-placeholder">🖼️</div>`;
    }

    card.innerHTML = `
      <div class="card-body">
        ${photoHtml}
        <div class="card-date">${formatDate(memory.date)}</div>
        <div class="card-header">
          <span class="card-mood">${MOOD_EMOJI[memory.mood] || '😊'}</span>
          <span class="card-title">${escapeHtml(memory.title)}</span>
        </div>
        <div class="card-content">${escapeHtml(memory.content || '')}</div>
        <div class="card-actions">
          <button class="card-action-btn edit-btn" data-id="${memory.id}">✏️ 编辑</button>
          <button class="card-action-btn delete delete-btn" data-id="${memory.id}">🗑️ 删除</button>
        </div>
      </div>
    `;

    // 点击卡片查看详情
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-actions')) return;
      onView(memory.id);
    });

    // 编辑按钮
    card.querySelector('.edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      onEdit(memory.id);
    });

    // 删除按钮
    card.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`确定要删除「${memory.title}」吗？`)) {
        deleteMemory(memory.id);
        renderTimeline(onEdit, onView);
      }
    });

    timeline.appendChild(card);
  });
}

/**
 * 简单的 HTML 转义
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}