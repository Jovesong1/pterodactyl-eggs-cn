#!/usr/bin/env node

/**
 * 这个脚本用于更新egg索引
 * 使用方法: node scripts/update-eggs.js
 */

console.log('开始更新egg索引...');
require('./generate-eggs-index');
console.log('更新完成！'); 