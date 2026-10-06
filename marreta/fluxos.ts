// Roteiros do Marreta para o portfólio: o que um recrutador faz no site, no computador e no celular.
// Rodar, desta pasta do projeto:
//   marreta                     quatro visitantes seguindo os fluxos abaixo
//   marreta --modo explorar     navegação sem roteiro
// O site testado é o de produção (npm run build + vite preview), servido só nesta máquina.
import type { Page } from 'playwright'
import type { Fluxo } from '../../marreta/src/tipos.ts'

/** Links externos já conferidos nesta rodada (cada endereço é consultado uma vez só). */
const conferidos = new Set<string>()

const entrarNoSite: Fluxo = async ({ page, alvo, persona, h }) => {
  h.passo(`abrir o site em ${persona.usuario}`)
  await page.goto(new URL(persona.usuario, alvo.urls.site).href)
  await page.locator('h1').first().waitFor()
}

/** Imagens visíveis que não carregaram (captura de tela de projeto com caminho errado, por exemplo). */
async function imagensQuebradas(page: Page): Promise<string[]> {
  await page.waitForLoadState('networkidle').catch(() => {})
  return page.evaluate(() =>
    [...document.querySelectorAll('img')].filter((img) => img.complete && img.naturalWidth === 0 && img.getBoundingClientRect().width > 0).map((img) => img.getAttribute('src') ?? '?'),
  )
}

const abrirEstudoDeCaso: Fluxo = async (ctx) => {
  const { page, h } = ctx
  await entrarNoSite(ctx)
  const estudos = page.locator('a[href*="/projects/"]')
  await estudos.first().waitFor()
  const total = await estudos.count()
  const escolhido = estudos.nth(h.inteiro(0, total - 1))
  const destino = await escolhido.getAttribute('href')
  h.passo('rolar até um projeto e abrir o estudo de caso')
  await escolhido.scrollIntoViewIfNeeded()
  await h.pausa(500, 1500)
  await escolhido.click()
  await page.waitForURL((url) => url.pathname === destino)
  await page.locator('h1').first().waitFor()
  await h.pausa(1500, 4000)
  h.passo('conferir as imagens do estudo de caso')
  await page.mouse.wheel(0, 4000)
  const quebradas = await imagensQuebradas(page)
  if (quebradas.length) throw new Error(`O estudo de caso ${destino} tem imagem que não carrega: ${quebradas.join(', ')}`)
  h.passo('clicar em voltar para os projetos')
  const slug = destino!.split('/').pop()
  await page.locator(`main a[href$="#${slug}"]`).first().click()
  await page.waitForURL((url) => !url.pathname.includes('/projects/'))
  // Volta para o cartão do mesmo projeto, não para o topo da página
  await page.waitForTimeout(1500)
  const topo = await page.evaluate((id) => Math.round(document.getElementById(id)?.getBoundingClientRect().top ?? NaN), slug)
  if (!(topo > -60 && topo < 700)) throw new Error(`Ao voltar do estudo de caso, a página não parou no projeto ${slug}: o cartão dele está a ${topo}px do topo da tela.`)
}

const trocarDeIdioma: Fluxo = async (ctx) => {
  const { page, h } = ctx
  await entrarNoSite(ctx)
  const antes = await page.evaluate(() => document.documentElement.lang)
  h.passo('clicar na troca de idioma')
  await page.getByRole('link', { name: /Ver em português|View in English/ }).first().click()
  await page.waitForFunction((idioma) => document.documentElement.lang !== idioma, antes)
  const emPortugues = (await page.evaluate(() => document.documentElement.lang)) === 'pt-BR'
  if (emPortugues !== new URL(page.url()).pathname.startsWith('/pt')) throw new Error(`Idioma da página (${emPortugues ? 'pt-BR' : 'en'}) não bate com o endereço ${page.url()}.`)
  await h.pausa()
}

const navegarPelasSecoes: Fluxo = async (ctx) => {
  const { page, persona, h } = ctx
  await entrarNoSite(ctx)
  if (persona.tela === 'celular') {
    h.passo('abrir o menu do celular')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('button', { name: 'Close menu' }).waitFor()
  }
  // No celular o menu não tem atalho para a seção de contato, só os contatos em si
  const secao = persona.tela === 'celular' ? 'about' : h.sorteio(['about', 'contact'])
  h.passo(`tocar em ${secao} no menu`)
  await page.locator(`header a[href$="#${secao}"]`).locator('visible=true').first().click()
  // O título da seção precisa parar perto do topo da tela (e ficar lá depois que o menu fecha)
  await page.waitForTimeout(2500)
  const onde = await page.evaluate((id) => ({ topo: Math.round(document.getElementById(id)?.getBoundingClientRect().top ?? NaN), rolagem: Math.round(window.scrollY), altura: window.innerHeight }), secao)
  if (!(onde.topo > -60 && onde.topo < onde.altura * 0.6))
    throw new Error(`Depois de tocar em "${secao}" no menu, a seção não ficou à vista: o topo dela está a ${onde.topo}px do topo da tela (rolagem da página: ${onde.rolagem}px, altura da tela: ${onde.altura}px).`)
  await h.pausa(1000, 2500)
}

const conferirLinksExternos: Fluxo = async (ctx) => {
  const { page, h } = ctx
  await entrarNoSite(ctx)
  const links = [...new Set(await page.locator('a[href^="http"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href)))].filter((url) => !url.startsWith(new URL(page.url()).origin) && !conferidos.has(url))
  if (!links.length) h.pular('links externos já conferidos nesta rodada')
  h.passo(`conferir ${links.length} links externos`)
  const mortos: string[] = []
  for (const url of links) {
    conferidos.add(url)
    const status = await page.request.get(url, { timeout: 15_000, maxRedirects: 5 }).then((r) => r.status(), () => 0)
    // 404 e 410 são link morto (repositório renomeado ou privado); outros códigos costumam ser bloqueio a robôs
    if (status === 404 || status === 410) mortos.push(`${url} (HTTP ${status})`)
    await h.pausa(200, 600)
  }
  if (mortos.length) throw new Error(`Links externos que não abrem para um visitante: ${mortos.join('; ')}`)
}

const baixarCurriculo: Fluxo = async (ctx) => {
  const { page, alvo, h } = ctx
  await entrarNoSite(ctx)
  const link = page.locator('a[href$="resume.pdf"]').first()
  await link.waitFor({ state: 'attached' })
  h.passo('baixar o currículo')
  const resposta = await page.request.get(new URL('/resume.pdf', alvo.urls.site).href)
  const tipo = resposta.headers()['content-type'] ?? ''
  if (resposta.status() !== 200 || !tipo.includes('pdf')) throw new Error(`O currículo não veio como PDF: HTTP ${resposta.status()}, tipo "${tipo}".`)
  await h.pausa()
}

const projetoInexistente: Fluxo = async (ctx) => {
  const { page, alvo, persona, h } = ctx
  const prefixo = persona.usuario === '/pt' ? '/pt' : ''
  h.passo('abrir o endereço de um projeto que não existe')
  await page.goto(new URL(`${prefixo}/projects/nao-existe`, alvo.urls.site).href)
  // O site manda o visitante de volta para a página inicial do idioma
  await page.waitForURL((url) => url.pathname === (prefixo || '/'))
  await page.locator('h1').first().waitFor()
}

const secaoAPartirDeUmEstudo: Fluxo = async (ctx) => {
  const { page, alvo, persona, h } = ctx
  const prefixo = persona.usuario === '/pt' ? '/pt' : ''
  h.passo('abrir um estudo de caso direto pelo endereço')
  await page.goto(new URL(`${prefixo}/projects/pulsehub`, alvo.urls.site).href)
  await page.locator('h1').first().waitFor()
  if (persona.tela === 'celular') {
    h.passo('abrir o menu do celular')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('button', { name: 'Close menu' }).waitFor()
  }
  h.passo('tocar em about no menu, estando fora da página inicial')
  await page.locator('header a[href$="#about"]').locator('visible=true').first().click()
  await page.waitForURL((url) => url.hash === '#about')
  await page.waitForTimeout(2500)
  const onde = await page.evaluate(() => ({ topo: Math.round(document.getElementById('about')?.getBoundingClientRect().top ?? NaN), altura: window.innerHeight }))
  if (!(onde.topo > -60 && onde.topo < onde.altura * 0.6)) throw new Error(`Vindo de um estudo de caso, tocar em "about" não levou à seção: o topo dela está a ${onde.topo}px do topo da tela.`)
}

export const entrar: Record<string, Fluxo> = { site: entrarNoSite }

export const fluxos: Record<string, Fluxo> = {
  'site: abrir um estudo de caso': abrirEstudoDeCaso,
  'site: trocar de idioma': trocarDeIdioma,
  'site: navegar pelas seções': navegarPelasSecoes,
  'site: ir para uma seção a partir de um estudo de caso': secaoAPartirDeUmEstudo,
  'site: conferir os links externos': conferirLinksExternos,
  'site: baixar o currículo': baixarCurriculo,
  'site: endereço de projeto que não existe': projetoInexistente,
}
