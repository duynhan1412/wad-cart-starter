import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const rootFiles = [
  'AGENTS.md',
  'AI-LOG.md',
  'BRIEF.md',
  'README.md',
  'SELF_ASSESSMENT_REPORT.md',
  'package.json',
]
const rootDirectories = ['.github', 'scripts', 'src', 'test']
const textExtensions = new Set(['.js', '.json', '.md', '.yaml', '.yml'])

function collectFiles(path) {
  if (!existsSync(path)) return []

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(path, entry.name)
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath]
  })
}

const files = [
  ...rootFiles.filter((file) => existsSync(file)),
  ...rootDirectories.flatMap(collectFiles),
]
  .filter((file) => textExtensions.has(extname(file)))
  .sort()

const issues = []

function containsCodeSemicolon(line, state) {
  let quote = state.quote
  let escaped = false
  let index = 0

  while (index < line.length) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (state.inBlockComment) {
      if (character === '*' && nextCharacter === '/') {
        state.inBlockComment = false
        index += 1
      }
      index += 1
      continue
    }

    if (quote) {
      if (escaped) {
        escaped = false
      } else if (character === '\\') {
        escaped = true
      } else if (character === quote) {
        quote = null
      }
      index += 1
      continue
    }

    if (character === '/' && nextCharacter === '/') break

    if (character === '/' && nextCharacter === '*') {
      state.inBlockComment = true
      index += 1
      index += 1
      continue
    }

    if (character === "'" || character === '"' || character === '`') {
      quote = character
      index += 1
      continue
    }

    if (character === ';') return true
    index += 1
  }

  state.quote = quote
  return false
}

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  const displayPath = relative('.', file).replaceAll('\\', '/')
  const extension = extname(file)
  const javascriptState = { inBlockComment: false, quote: null }

  if (content.length > 0 && !content.endsWith('\n')) {
    issues.push(`${displayPath}: missing newline at end of file`)
  }

  lines.forEach((line, index) => {
    const lineNumber = index + 1

    if (line.includes('\t')) {
      issues.push(`${displayPath}:${lineNumber}: tab character`)
    }

    if (/[ \t]+$/.test(line)) {
      issues.push(`${displayPath}:${lineNumber}: trailing whitespace`)
    }

    const indentation = line.match(/^ */)[0].length
    const checksTwoSpaceIndentation = ['.js', '.json', '.yaml', '.yml'].includes(
      extension,
    )
    if (checksTwoSpaceIndentation && line.trim() && indentation % 2 !== 0) {
      issues.push(`${displayPath}:${lineNumber}: indentation must use 2 spaces`)
    }

    if (extension === '.js' && containsCodeSemicolon(line, javascriptState)) {
      issues.push(`${displayPath}:${lineNumber}: unexpected semicolon`)
    }
  })
}

if (issues.length > 0) {
  console.error('Format check failed:')
  issues.forEach((issue) => console.error(`- ${issue}`))
  process.exitCode = 1
} else {
  console.log(`Format check passed (${files.length} files checked)`)
}
