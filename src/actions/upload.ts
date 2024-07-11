import * as ci from 'miniprogram-ci';
import * as core from '@actions/core';
import { onProgressUpdate } from '../utils/context';
import type { ActionContext } from '../types';
import * as os from 'os';
import * as path from 'path';

async function upload(context: ActionContext): Promise<void> {
  const project = new ci.Project(context.project);

  core.info('start upload');

  await ci.upload({
    project,
    version: context.version,
    desc: context.description,
    setting: context.compileOptions,
    robot: context.robot,
    threads: context.threads,
    allowIgnoreUnusedFiles: context.allowIgnoreUnusedFiles,
    onProgressUpdate,
  });

  const tempImagePath = path.join(os.tmpdir(), 'sm.zip');

  await ci.getDevSourceMap({
    project,
    robot: context.robot,
    sourceMapSavePath: tempImagePath
  });

  core.setOutput('sourcemap_path', tempImagePath);
}

export default upload;
