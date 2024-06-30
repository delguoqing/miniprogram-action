import * as ci from 'miniprogram-ci';
import * as fs from 'fs';
import * as core from '@actions/core';
import { onProgressUpdate } from '../utils/context';
import { getTemporaryPath } from '../utils/path'
import type { ActionContext } from '../types';

async function preview(context: ActionContext): Promise<void> {
  const project = new ci.Project(context.project);
  const pagePath = core.getInput('page_path');
  const pageQuery = core.getInput('page_query');
  const scene = Number(core.getInput('scene')) || 1011;
  const tempImagePath = getTemporaryPath(project.appid);

  core.info('start preview');

  await ci.preview({
    project,
    version: context.version,
    desc: context.description,
    setting: {
      useProjectConfig: true
    },
    robot: context.robot,
    threads: context.threads,
    qrcodeFormat: 'base64',
    qrcodeOutputDest: tempImagePath,
    pagePath,
    searchQuery: pageQuery,
    scene,
    allowIgnoreUnusedFiles: context.allowIgnoreUnusedFiles,
    onProgressUpdate,
    useCOS: false
  });

  core.info("done preview")

  core.info("reading qrcode")
  const base64 = await fs.promises.readFile(tempImagePath, 'utf-8');
  core.info("done reading qrcode")

  core.setOutput('preview_qrcode', base64);
  core.setOutput('preview_qrcode_path', tempImagePath);
  core.info("done setting output")
}

export default preview;
