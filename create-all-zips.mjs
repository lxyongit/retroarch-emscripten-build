#!/usr/bin/env node

import { createAllCoreZips } from './index.mjs';

console.log('🚀 开始为所有 RetroArch cores 创建 zip 文件...');
console.log('这可能需要几分钟时间，请耐心等待...\n');

try {
    await createAllCoreZips();
    console.log('\n🎉 所有 zip 文件创建完成！');
} catch (error) {
    console.error('\n❌ 创建过程中出现错误:', error.message);
    process.exit(1);
} 