/**
 * 表单模块 - 新增/编辑记忆的弹窗交互
 */

import { saveMemory, updateMemory, getMemories, generateId } from './storage.js';

const MOOD_LIST = ['happy', 'calm', 'sad', 'angry', 'surprised', 'loved'];
let currentPhoto = null; // base64 图片数据
let isEditing = false;

/**
 * 初始化表单模块
 * @param {Function} onSaved - 保存成功后的回调
 */
export function initForm(onSaved) {
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('memory-form');
  const btnAdd = document.getElementById('btn-add-memory');
  const btnCancel = document.getElementById('btn-cancel');
  const btnClose = document.getElementById('modal-close');
  const photoUpload = document.getElementById('photo-upload');
  const photoInput = document.getElementById('photo-input');
  const moodBtns = document.querySelectorAll('.mood-btn');
  const contentTextarea = document.getElementById('memory-content');
  const charCount = document.getElementById('char-count');

  // 打开新增表单
  btnAdd.addEventListener('click', () => openForm(null, onSaved));

  // 关闭表单
  const closeForm = () => {
    overlay.classList.remove('active');
    form.reset();
    resetPhoto();
    currentPhoto = null;
    isEditing = false;
    document.getElementById('edit-id').value = '';
    document.getElementById('modal-title').textContent = '记录此刻';
    // 重置心情
    moodBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.mood-btn[data-mood="happy"]').classList.add('active');
    document.getElementById('memory-mood').value = 'happy';
    charCount.textContent = '0';
  };

  btnCancel.addEventListener('click', closeForm);
  btnClose.addEventListener('click', closeForm);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeForm();
  });

  // 照片上传
  photoUpload.addEventListener('click', () => photoInput.click());
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentPhoto = ev.target.result;
      document.getElementById('preview-img').src = currentPhoto;
      document.getElementById('photo-preview').style.display = 'block';
      document.getElementById('photo-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  // 心情选择
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('memory-mood').value = btn.dataset.mood;
    });
  });

  // 字数统计
  contentTextarea.addEventListener('input', () => {
    charCount.textContent = contentTextarea.value.length;
  });

  // 提交表单
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-id').value || generateId();
    const date = document.getElementById('memory-date').value;
    const title = document.getElementById('memory-title').value.trim();
    const mood = document.getElementById('memory-mood').value;
    const content = document.getElementById('memory-content').value.trim();

    const memory = { id, date, title, mood, content, photo: currentPhoto };

    if (isEditing) {
      updateMemory(memory);
    } else {
      saveMemory(memory);
    }

    closeForm();
    if (onSaved) onSaved();
  });
}

/**
 * 打开表单（新增或编辑）
 * @param {string|null} editId - 编辑时传入记忆 ID
 * @param {Function} onSaved
 */
export function openForm(editId, onSaved) {
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('memory-form');
  const moodBtns = document.querySelectorAll('.mood-btn');

  if (editId) {
    // 编辑模式
    isEditing = true;
    document.getElementById('modal-title').textContent = '编辑记忆';
    const memories = getMemories();
    const memory = memories.find(m => m.id === editId);
    if (!memory) return;

    document.getElementById('edit-id').value = memory.id;
    document.getElementById('memory-date').value = memory.date;
    document.getElementById('memory-title').value = memory.title;
    document.getElementById('memory-content').value = memory.content;
    document.getElementById('char-count').textContent = memory.content.length;

    // 心情
    moodBtns.forEach(b => b.classList.remove('active'));
    const moodBtn = document.querySelector(`.mood-btn[data-mood="${memory.mood}"]`);
    if (moodBtn) moodBtn.classList.add('active');
    document.getElementById('memory-mood').value = memory.mood;

    // 照片
    currentPhoto = memory.photo;
    if (memory.photo) {
      document.getElementById('preview-img').src = memory.photo;
      document.getElementById('photo-preview').style.display = 'block';
      document.getElementById('photo-placeholder').style.display = 'none';
    } else {
      resetPhoto();
    }
  } else {
    // 新增模式
    form.reset();
    resetPhoto();
    currentPhoto = null;
    document.getElementById('edit-id').value = '';
    document.getElementById('modal-title').textContent = '记录此刻';
    document.getElementById('char-count').textContent = '0';
    // 设置默认日期为今天
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('memory-date').value = today;
    // 默认心情
    moodBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.mood-btn[data-mood="happy"]').classList.add('active');
    document.getElementById('memory-mood').value = 'happy';
  }

  overlay.classList.add('active');
}

/**
 * 重置照片上传区域
 */
function resetPhoto() {
  document.getElementById('photo-preview').style.display = 'none';
  document.getElementById('photo-placeholder').style.display = 'flex';
  document.getElementById('preview-img').src = '';
  document.getElementById('photo-input').value = '';
}