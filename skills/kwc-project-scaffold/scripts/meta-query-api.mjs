#!/usr/bin/env node

/**
 * KWC 元数据查询 REST API 封装脚本
 * 支持命令: queryFormsByApp, getEntityFields
 * 零外部依赖，仅使用 Node.js 内置模块
 * 公共基础设施函数来自 ./_shared.mjs
 */

import {
  createFatal,
  parseArgs,
  loadEnvConfig,
  resolveToken,
  callGetApi,
  compact,
} from './_shared.mjs'

const fatal = createFatal('meta-query-api')

// ─── 命令实现 ────────────────────────────────────────────

const commands = {
  queryFormsByApp: {
    required: ['appNumber'],
    usage: 'queryFormsByApp --appNumber <app> [--keyword <keyword>] [--cloudNumber <cloud>] [--env <envName>]',
    run: (opts, env, token) =>
      callGetApi(env.url, '/kapi/v2/devportal/ai-meta/queryFormsByApp', token, compact({
        appNumber: opts.appNumber,
        keyword: opts.keyword,
        cloudNumber: opts.cloudNumber,
      })),
  },

  getEntityFields: {
    required: ['formNumber'],
    usage: 'getEntityFields --formNumber <formNumber> [--env <envName>]',
    run: (opts, env, token) =>
      callGetApi(env.url, `/kapi/v2/${env.isv}/mdl/meta-query/getEntityFields`, token, compact({
        formNumber: opts.formNumber,
      })),
  },
}

// ─── 主流程 ──────────────────────────────────────────────

async function main() {
  const [command, ...rest] = process.argv.slice(2)

  if (!command || !commands[command]) {
    console.error(`用法: node meta-query-api.mjs <command> [options]\n`)
    console.error('支持的命令:')
    for (const [name, cmd] of Object.entries(commands)) {
      console.error(`  ${cmd.usage}`)
    }
    process.exit(1)
  }

  const cmd = commands[command]
  const opts = parseArgs(rest)

  // 校验必填参数
  for (const key of cmd.required) {
    if (!opts[key]) {
      fatal(`缺少必填参数 --${key}\n用法: ${cmd.usage}`)
    }
  }

  // 加载环境配置并获取 token
  const env = loadEnvConfig(opts.env)
  const token = await resolveToken(env)

  // getEntityFields 需要 isv
  if (command === 'getEntityFields' && !env.isv) {
    fatal('当前环境未配置 isv（开发商标识），请检查环境配置')
  }

  // 执行命令并输出结果
  const result = await cmd.run(opts, env, token)
  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(`[meta-query-api] 未预期的错误: ${err.message}`)
  process.exit(1)
})
