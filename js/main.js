/**
 * 入口模块 - 初始化所有功能
 */

import { renderTimeline } from './timeline.js';
import { initForm, openForm } from './memory-form.js';
import { initDetail, openDetail } from './detail.js';

function init() {
  // 初始化详情弹窗
  initDetail();

  // 初始化表单
  initForm(() => {
    // 保存成功后重新渲染
    renderTimeline(handleEdit, handleView);
  });

  // 首次渲染
  renderTimeline(handleEdit, handleView);
}

/**
 * 编辑记忆
 */
function handleEdit(id) {
  openForm(id, () => {
    renderTimeline(handleEdit, handleView);
  });
}

/**
 * 查看记忆详情
 */
function handleView(id) {
  openDetail(id);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);