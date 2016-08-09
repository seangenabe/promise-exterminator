const t = require('ava')
const FS = require('fs')
const ext = require('..')

t(async t => {
  let buf = []
  let s = FS.createReadStream(`${__dirname}/fixture1.js`)
    .pipe(ext())
  s.on('data', chunk => buf.push(chunk))
  let result = await new Promise((resolve, reject) => {
    s.on('error', reject)
    s.on('end', () => {
      resolve(buf.join(''))
    })
  })
  let expected = FS.readFileSync(`${__dirname}/expected1.js`, 'utf8')
  result = win32compat(result)
  expected = win32compat(expected)
  t.is(result, expected)
})

function win32compat(s) {
  if (Buffer.isBuffer(s)) {
    s = s.toString()
  }
  // For some reason, stream replacers that I find ignore \r.
  // Well, whatever. Let's just normalize our strings.
  return s.split('\r').join('')
}
