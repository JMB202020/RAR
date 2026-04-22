import { createHash } from 'node:crypto'

export const SEVERITY = { ERROR: 'error', WARN: 'warn', INFO: 'info' }

export function finding(severity, code, message, extra = {}) {
  return { severity, code, message, ...extra }
}

export function slugifyUrl(urlString) {
  const u = new URL(urlString)
  const path = u.pathname === '/' ? 'root' : u.pathname.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-')
  const query = u.search ? '-' + createHash('sha1').update(u.search).digest('hex').slice(0, 6) : ''
  return (path || 'root') + query
}

export function hostSlug(urlString) {
  const u = new URL(urlString)
  return u.hostname.replace(/[^a-z0-9]+/gi, '-') + (u.port ? '-' + u.port : '')
}

export function sameOrigin(a, b) {
  try {
    const ua = new URL(a)
    const ub = new URL(b)
    return ua.origin === ub.origin
  } catch {
    return false
  }
}

export function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

export function fmtDuration(ms) {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`
  return `${Math.floor(ms / 60_000)}m ${((ms % 60_000) / 1000).toFixed(0)}s`
}

export function parseArgs(argv) {
  const args = { _: [], flags: {} }
  for (const raw of argv) {
    if (raw.startsWith('--')) {
      const [k, v] = raw.slice(2).split('=')
      args.flags[k] = v === undefined ? true : v
    } else {
      args._.push(raw)
    }
  }
  return args
}
