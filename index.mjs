import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path'
import archiver from 'archiver';
import { createWriteStream } from 'fs';
const __dirname = import.meta.dirname;

function getCoreList() {
    let output = []
    const files = readdirSync(join(__dirname, 'retroarch'));
    for (let file of files) {
        if (file.includes('_libretro.js')) {
            output.push(file.replace('_libretro.js', ''));
        }
    }
    return output;
}

async function createCoreZip(coreName) {
    const retroarchDir = join(__dirname, 'retroarch');
    const jsFile = join(retroarchDir, `${coreName}_libretro.js`);
    const wasmFile = join(retroarchDir, `${coreName}_libretro.wasm`);
    const zipFile = join(__dirname, 'retroarch', `${coreName}.zip`);
    
    return new Promise((resolve, reject) => {
        const output = createWriteStream(zipFile);
        const archive = archiver('zip', {
            zlib: { level: 9 } // 设置压缩级别
        });
        
        output.on('close', () => {
            console.log(`已创建 ${coreName}.zip`);
            resolve(zipFile);
        });
        
        archive.on('error', (err) => {
            reject(err);
        });
        
        archive.pipe(output);
        
        // 添加 .js 文件
        archive.file(jsFile, { name: `${coreName}_libretro.js` });
        
        // 添加 .wasm 文件
        archive.file(wasmFile, { name: `${coreName}_libretro.wasm` });
        
        archive.finalize();
    });
}

async function createAllCoreZips() {
    const cores = getCoreList();
    console.log(`找到 ${cores.length} 个 cores`);
    
    for (const core of cores) {
        try {
            await createCoreZip(core);
        } catch (error) {
            console.error(`创建 ${core}.zip 时出错:`, error.message);
        }
    }
    
    console.log('所有 core zip 文件创建完成');
}

export { getCoreList, createCoreZip, createAllCoreZips };
