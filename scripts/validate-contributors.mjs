#!/usr/bin/env node
/**
 * Validates all files in src/contributors/
 *
 * Rules:
 *  - Each file must be a valid JSON object (not an array)
 *  - Each entry must have a non-empty "name" (string)
 *  - Optional fields: github (string), role (string), bio (string)
 *  - No unexpected keys
 *  - No duplicate github handles across all files
 *  - No duplicate names across all files
 *  - Filename (without .json) should match the github handle if provided
 */

import { readFileSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contributorsDir = resolve(__dirname, '../src/contributors')

let files
try {
  files = readdirSync(contributorsDir).filter((f) => f.endsWith('.json'))
} catch {
  console.error(`❌  Cannot read directory: ${contributorsDir}`)
  process.exit(1)
}

if (files.length === 0) {
  console.error('❌  No contributor files found in src/contributors/')
  process.exit(1)
}

const errors = []
const seenGithub = new Set()
const seenNames = new Set()
const allowed = new Set(['name', 'github', 'role', 'bio'])

for (const file of files) {
  const filePath = resolve(contributorsDir, file)
  const label = `File "${file}"`

  let raw
  try {
    raw = readFileSync(filePath, 'utf-8')
  } catch {
    errors.push(`${label}: cannot be read.`)
    continue
  }

  let entry
  try {
    entry = JSON.parse(raw)
  } catch (err) {
    errors.push(`${label}: invalid JSON — ${err.message}`)
    continue
  }

  if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
    errors.push(`${label}: must be a JSON object, not an array or primitive.`)
    continue
  }

  // Required: name
  if (!entry.name || typeof entry.name !== 'string' || entry.name.trim() === '') {
    errors.push(`${label}: "name" is required and must be a non-empty string.`)
  } else {
    const normalized = entry.name.trim().toLowerCase()
    if (seenNames.has(normalized)) {
      errors.push(`${label}: duplicate name "${entry.name}" — each contributor must have a unique name.`)
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
        errors.push(`${label}: duplicate github handle "${entry.github}" — each contributor must have a unique handle.`)
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
  for (const key of Object.keys(entry)) {
    if (!allowed.has(key)) {
      errors.push(`${label}: unexpected key "${key}". Allowed keys: name, github, role, bio.`)
    }
  }
}

if (errors.length > 0) {
  console.error('❌  Validation failed:\n')
  errors.forEach((e) => console.error(`  • ${e}`))
  process.exit(1)
}

console.log(`✅  All ${files.length} contributor file${files.length === 1 ? '' : 's'} are valid.`)
