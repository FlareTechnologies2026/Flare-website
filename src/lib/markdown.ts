// Mini-markdown parser — port of the Python md() function in build.py

// These are imported at call-time to avoid circular deps
let _steps: [string, string][] | null = null
let _buildMd: string | null = null

function getSteps(): [string, string][] {
  if (!_steps) {
    // lazy import to avoid circular dependency
    _steps = [
      ['Discovery call', 'A 30-minute call to understand your offer, your best customers and your sales targets.'],
      ['ICP survey and interview', 'You fill a short form, then we interview you to define exactly who buys from you and why.'],
      ['Lead lists built', 'We build verified lists of the decision-makers who match that profile, by role, company size and country.'],
      ['LinkedIn optimised', 'Your company page and founder profile are rewritten so prospects trust what they find when they check you.'],
      ['Website fixed for SEO, AEO and GEO', 'We fix your site so Google, ChatGPT and other AI assistants can find you and recommend you.'],
      ['Outreach and ads go live', 'LinkedIn and email outreach start, and ads run on Google, Meta, LinkedIn or ChatGPT if your plan includes them.'],
      ['Our sales team books your meetings', 'Real people reply, follow up and call your prospects, then put qualified meetings in your calendar.'],
    ]
  }
  return _steps
}

function getBuildMd(): string {
  if (!_buildMd) {
    _buildMd = `1. **Scope:** a workshop to agree the problem, users, must-have features and budget.
2. **Design:** wireframes and clickable screens you approve before any code is written.
3. **Build:** two-week sprints with a working demo at the end of each one.
4. **Test:** functional, device and load testing before launch.
5. **Launch and support:** go-live, monitoring and a support plan after launch.`
  }
  return _buildMd
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function inline(text: string): string {
  let t = esc(text)
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    if (href.startsWith('slug:')) {
      const slug = href.slice(5)
      const url = slug === '' ? '/' : `/${slug}/`
      return `<a href="${url}">${label}</a>`
    }
    return `<a href="${href}">${label}</a>`
  })
  return t
}

function stepsHtml(): string {
  return (
    '<ol class="system-steps">' +
    getSteps().map(([t, d], i) =>
      `<li><span class="n" aria-hidden="true">${i + 1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`
    ).join('') +
    '</ol>'
  )
}

export function md(block: string): string {
  if (block === 'STEPS') return stepsHtml()
  if (block === 'BUILD_STEPS') return md(getBuildMd())

  const out: string[] = []
  const lines = block.replace(/^\n+/, '').split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trimEnd()
    if (!line.trim()) { i++; continue }

    if (line.startsWith('|')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()))
        i++
      }
      const head = rows[0]
      const body = rows.slice(1)
      const h = head.map(c => `<th scope="col">${inline(c)}</th>`).join('')
      const b = body.map(r =>
        '<tr>' + r.map((c, j) =>
          j === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`
        ).join('') + '</tr>'
      ).join('')
      out.push(`<div class="table-wrap" tabindex="0" role="region" aria-label="Table"><table><thead><tr>${h}</tr></thead><tbody>${b}</tbody></table></div>`)
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      out.push('<ul>' + items.map(x => `<li>${inline(x)}</li>`).join('') + '</ul>')
      continue
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      out.push('<ol class="steps-list">' + items.map(x => `<li>${inline(x)}</li>`).join('') + '</ol>')
      continue
    }

    if (line.startsWith('### ')) {
      out.push(`<h3>${inline(line.slice(4))}</h3>`)
      i++
      continue
    }

    const para = [line]
    i++
    while (i < lines.length && lines[i].trim() && !/^(\||- |\d+\. |### )/.test(lines[i])) {
      para.push(lines[i])
      i++
    }
    out.push(`<p>${inline(para.join(' '))}</p>`)
  }

  return out.join('\n')
}
