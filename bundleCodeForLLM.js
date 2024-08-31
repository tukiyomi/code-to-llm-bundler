import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.join(__dirname, 'src');
const outputFile = 'bundled_code_for_llm.txt';
const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const excludedDirs = ['components/ui', 'lib'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 指定されたディレクトリ内のすべてのファイルを再帰的に読み取ります。
 * @param {string} dir - 読み取るディレクトリのパス
 * @returns {Promise<string[]>} ファイルパスの配列
 */
async function readDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? readDir(res) : res;
  }));
  return files.flat();
}

/**
 * ファイルが許可された拡張子を持ち、除外されたディレクトリに含まれていないかチェックします。
 * @param {string} filePath - チェックするファイルのパス
 * @returns {boolean} ファイルが許可されているかどうか
 */
function isAllowedFile(filePath) {
  const ext = path.extname(filePath);
  const relativePath = path.relative(sourceDir, filePath);
  return allowedExtensions.includes(ext) && !excludedDirs.some(dir => relativePath.startsWith(dir));
}

/**
 * ユーザーに質問を投げかけ、回答を待ちます。
 * @param {string} query - ユーザーへの質問
 * @returns {Promise<boolean>} ユーザーの回答（YまたはEnterでtrue、それ以外でfalse）
 */
function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.trim() === '');
    });
  });
}

/**
 * 選択されたファイルの内容を1つのファイルにまとめます。
 */
async function combineFiles() {
  try {
    const files = await readDir(sourceDir);
    const allowedFiles = files.filter(isAllowedFile);

    let combinedContent = '';
    for (const file of allowedFiles) {
      const relativePath = path.relative(sourceDir, file);
      const shouldInclude = await askQuestion(`Include ${relativePath}? (Y/n): `);
      if (shouldInclude) {
        const content = await fs.readFile(file, 'utf8');
        combinedContent += `---\n// ${relativePath}\n${content}\n\n`;
      }
    }

    await fs.writeFile(outputFile, combinedContent);
    console.log(`Combined files written to ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

combineFiles();
