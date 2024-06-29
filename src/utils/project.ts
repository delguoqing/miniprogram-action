import * as fs from 'fs'
import { readJSON } from './json';
import { getProjectConfigPath, getMiniProgramRootPath, getPackageConfigPath } from './path';
import type { Project, ProjectConfig } from '../types';

export function readProjectConfig(rootPath: string): ProjectConfig {
  const projectFilePath = getProjectConfigPath(rootPath);

  if (fs.existsSync(projectFilePath)) {
    const config = readJSON<ProjectConfig>(projectFilePath);

    if (config) {
      config.projectname = decodeURIComponent(config.projectname);

      return config;
    }

    throw new Error('project.config.json 文件解析失败');
  }

  throw new Error('未找到 project.config.json 文件');
}

export function createProject(rootPath: string, projectConfig: ProjectConfig): Project {
  let projectType: 'miniGame' | 'miniProgram' | 'miniProgramPlugin' | 'miniGamePlugin' = 'miniGame';
  if (projectConfig.compileType == 'miniprogram') {
    projectType = 'miniProgram';
  } else if (projectConfig.compileType == 'game') {
    projectType = 'miniGame';
  } else if (projectConfig.compileType == 'plugin') {
    projectType = 'miniProgramPlugin';
  } else if (projectConfig.compileType == 'gamePlugin') {
    projectType = 'miniGamePlugin';
  } else {
    throw new Error("不支持的projectType");
  }

  return {
    appid: projectConfig.appid,
    type: projectType,
    projectPath: getMiniProgramRootPath(rootPath, projectConfig.miniprogramRoot),
    privateKey: process.env.PRIVATE_KEY || '',
    ignores: ['node_modules/**/*'],
  };
}

export function hasPackageJSON(rootPath: string): boolean {
  return fs.existsSync(getPackageConfigPath(rootPath));
}
