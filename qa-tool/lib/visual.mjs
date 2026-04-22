import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

async function exists(path) {
  try { await access(path); return true } catch { return false }
}

export async function compareOrSave({ pngBuffer, baselinePath, diffPath, updateBaseline }) {
  await mkdir(dirname(baselinePath), { recursive: true })

  if (updateBaseline || !(await exists(baselinePath))) {
    await writeFile(baselinePath, pngBuffer)
    return { status: updateBaseline ? 'updated' : 'baseline-created', diffPixels: 0, diffRatio: 0 }
  }

  const baselineBuf = await readFile(baselinePath)
  const baseline = PNG.sync.read(baselineBuf)
  const current = PNG.sync.read(pngBuffer)

  // If dimensions differ, force a diff sized to the current screenshot
  if (baseline.width !== current.width || baseline.height !== current.height) {
    return {
      status: 'size-changed',
      diffPixels: current.width * current.height,
      diffRatio: 1,
      baselineSize: { w: baseline.width, h: baseline.height },
      currentSize: { w: current.width, h: current.height },
    }
  }

  const diff = new PNG({ width: current.width, height: current.height })
  const diffPixels = pixelmatch(
    baseline.data, current.data, diff.data,
    current.width, current.height,
    { threshold: 0.15, includeAA: true }
  )
  const total = current.width * current.height
  const diffRatio = diffPixels / total

  if (diffPixels > 0) {
    await mkdir(dirname(diffPath), { recursive: true })
    await writeFile(diffPath, PNG.sync.write(diff))
  }

  return { status: diffPixels === 0 ? 'match' : 'diff', diffPixels, diffRatio }
}
