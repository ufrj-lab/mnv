/* eslint-env node */
import { genConf, genNames } from '../../helpers/genRollupConfig'
import copy from 'rollup-plugin-copy'
const { mnv, name, dependencies } = require('./package.json')

const { slug, script } = genNames(name)

const { targets, clear, copy: cp } = mnv

const external = {
  node: Object.keys(dependencies),
  browser: [],
}

const prod = !process.env.ROLLUP_WATCH

const conf = targets.map(target => {
  const result = genConf(
    target.type,
    slug,
    script,
    clear,
    target.injectCss,
    '/',
    {},
    external[target.type]
  )
  result.plugins.push(prod && copy({ ...cp[target.type] }))
  return result
})

export default conf
