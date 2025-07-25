import { createWriteStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createPartFromBase64, createUserContent, GoogleGenAI } from '@google/genai';
import { ExitPromptError } from '@inquirer/core';
import { input, password } from '@inquirer/prompts';
import CliProgress from 'cli-progress';
import consola from 'consola';
import exampleAudio from './example.mp3';
import prompt from './gen.prompt.md' with { type: 'text' };

class CliError extends Error {}

async function ensureApiAvailable(ai: GoogleGenAI) {
  try {
    await ai.models.list();
  } catch (e) {
    consola.error(e);
    throw new CliError('Google API 不可用，请检查代理和 API Key');
  }
}

async function main() {
  const dir = await input({
    message: '谱面目录',
    default: './chart',
    async validate(v) {
      try {
        const s = await stat(path.resolve(v, 'track.mp3'));
        return s.isFile() || '目录下缺少文件 track.mp3';
      } catch {
        return '目录下缺少文件 track.mp3';
      }
    },
  });
  let apiKey = await password({
    message: process.env.GOOGLE_API_KEY ? 'Google API Key (ENV configured)' : 'Google API Key',
    mask: '*',
    validate: v => !!v || !!process.env.GOOGLE_API_KEY,
  });
  apiKey ||= process.env.GOOGLE_API_KEY || '';

  const ai = new GoogleGenAI({ apiKey });
  await ensureApiAvailable(ai);

  const bar = new CliProgress.SingleBar({
    format: '迪拉熊折寿中……(+{value})',
  }, CliProgress.Presets.shades_classic);

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-pro',
    contents: [
      createUserContent([
        { text: prompt },
        createPartFromBase64(await readFile(path.resolve(import.meta.dirname, exampleAudio), 'base64'), 'audio/mp3'),
        createPartFromBase64(await readFile(path.resolve(dir, 'track.mp3'), 'base64'), 'audio/mp3'),
      ]),
    ],
    config: {
      thinkingConfig: {
        thinkingBudget: 128,
      },
    },
  });
  bar.start(Infinity, 0);

  const out = createWriteStream(path.resolve(dir, 'maidata.txt'));
  for await (const chunk of response) {
    out.write(chunk.text);
    bar.increment(chunk.text!.length);
  }
  bar.stop();
  out.end();

  consola.success('已生成谱面');
}

main().catch((e) => {
  if (e instanceof CliError) {
    consola.fatal(e.message);
  } else if (e instanceof ExitPromptError) {
    consola.info('操作取消');
    process.exit(130);
  } else {
    consola.fatal('未知错误：%o', e);
  }
  process.exit(1);
});
