import assert from 'node:assert/strict';
import { getCoreList, createCoreZip, createAllCoreZips } from '../index.mjs';

const cores = getCoreList();

assert.ok(cores.includes('fceumm'));
assert.ok(cores.length > 10);

// 测试获取core列表
console.log('=== 获取所有core列表 ===');
console.log(`找到 ${cores.length} 个 cores:`);
console.log(cores.slice(0, 5)); // 只显示前5个作为示例

// 测试为单个core创建zip
console.log('\n=== 为单个core创建zip ===');
if (cores.length > 0) {
    const testCore = cores[0];
    console.log(`正在为 ${testCore} 创建zip文件...`);
    try {
        await createCoreZip(testCore);
        console.log(`✅ ${testCore}.zip 创建成功`);
    } catch (error) {
        console.error(`❌ 创建 ${testCore}.zip 失败:`, error.message);
    }
}

// 测试为所有core创建zip
console.log('\n=== 为所有core创建zip ===');
console.log('注意：这将为所有core创建zip文件，可能需要一些时间...');
console.log('取消注释下面的代码来运行：');
console.log('await createAllCoreZips();');

// 取消注释下面的代码来为所有core创建zip
// await createAllCoreZips();
