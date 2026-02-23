#!/usr/bin/env node
/**
 * Validates src/contributors.json
 *
 * Rules:
 *  - Must be a non-empty JSON array
 *  - Each entry must have a non-empty "name" (string)
 *  - Optional fields: github (string), role (string), bio (string)
 *  - No duplicate github handles
 *  - No duplicate names
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = resolve(__dirname, '../src/contributors.json')

let raw
try {
  raw = readFileSync(filePath, 'utf-8')
} catch {
  console.error(`❌  Cannot read file: ${filePath}`)
  process.exit(1)
}

let data
try {
  data = JSON.parse(raw)
} catch (err) {
  console.error(`❌  Invalid JSON: ${err.message}`)
  process.exit(1)
}

const errors = []

if (!Array.isArray(data)) {
  errors.push('Root value must be a JSON array.')
}

if (Array.isArray(data)) {
  if (data.length === 0) {
    errors.push('contributors.json must not be empty.')
  }

  const seenGithub = new Set()
  const seenNames = new Set()

  data.forEach((entry, i) => {
    const label = `Entry [${i}]`

    if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
      errors.push(`${label}: must be an object.`)
      return
    }

    // Required: name
    if (!entry.name || typeof entry.name !== 'string' || entry.name.trim() === '') {
      errors.push(`${label}: "name" is required and must be a non-empty string.`)
    } else {
      const normalized = entry.name.trim().toLowerCase()
      if (seenNames.has(normalized)) {
        errors.push(`${label}: duplicate name "${entry.name}".`)
      }
      seenNames.add(normalized)
    }

    // Optional: github
    if (entry.github !== undefined) {
      if (typeof entry.github !== 'string' || entry.github.trim() === '') {
        errors.push(`${label}: "github" must be a non-empty string if provided.`)
      } else {
        const handle = entry.github.trim().toLowerCase()
        if (seenGithub.has(handle)) {
          errors.push(`${label}: duplicate github handle "${entry.github}".`)
        }
        seenGithub.add(handle)

        // Basic GitHub username rules: alphanumeric + hyphens, no leading/trailing hyphen
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(entry.github.trim())) {
          errors.push(`${label}: "github" value "${entry.github}" is not a valid GitHub username.`)
        }
      }
    }

    // Optional: role
    if (entry.role !== undefined && (typeof entry.role !== 'string' || entry.role.trim() === '')) {
      errors.push(`${label}: "role" must be a non-empty string if provided.`)
    }

    // Optional: bio
    if (entry.bio !== undefined && (typeof entry.bio !== 'string' || entry.bio.trim() === '')) {
      errors.push(`${label}: "bio" must be a non-empty string if provided.`)
    }

    // No unexpected keys
    const allowed = new Set(['name', 'github', 'role', 'bio'])
    for (const key of Object.keys(entry)) {
      if (!allowed.has(key)) {
        errors.push(`${label}: unexpected key "${key}". Allowed keys: name, github, role, bio.`)
      }
    }
  })
}

if (errors.length > 0) {
  console.error('❌  Validation failed:\n')
  errors.forEach((e) => console.error(`  • ${e}`))
  process.exit(1)
}

console.log(`✅  contributors.json is valid (${data.length} contributor${data.length === 1 ? '' : 's'}).`)
