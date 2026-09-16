import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Instagram, Linkedin, Menu, Moon, Music2, Pause, Play, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import amandaEvent from "@/assets/amanda-event.jpeg.asset.json";
import amandaHackathon from "@/assets/amanda-hackathon.jpeg.asset.json";
import amandaLaptop from "@/assets/amanda-laptop.jpeg.asset.json";
import amandaPortrait from "@/assets/amanda-portrait.jpeg.asset.json";
import amandaSpeaking from "@/assets/amanda-speaking.jpeg.asset.json";
import climaquiProjectHome from "@/assets/climaqui-project-home.png";
import pixelComputer from "@/assets/pixel-computer.png.asset.json";
import pixelDino from "@/assets/pixel-dino-transparent.png.asset.json";
import pixelFolder from "@/assets/pixel-folder-transparent.png";
import safrascoreProject from "@/assets/safrascore-project.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amanda Weiler — Desenvolvedora Criativa" },
      {
        name: "description",
        content:
          "Portfólio de Amanda Weiler, desenvolvedora criativa focada em experiências digitais, interfaces e tecnologia com propósito.",
      },
      { property: "og:title", content: "Amanda Weiler — Desenvolvedora Criativa" },
      {
        property: "og:description",
        content: "Projetos digitais que unem código, clareza e decisões visuais com intenção.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amandaweiler/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/interludeebloom", icon: Github },
  { label: "TikTok", href: "https://www.tiktok.com/@itsamanda.dev", icon: ArrowUpRight },
  {
    label: "Instagram",
    href: "https://www.instagram.com/itsamanda.dev",
    icon: Instagram,
  },
];

const aboutPhotos = [
  {
    src: amandaSpeaking.url,
    alt: "Amanda apresentando um projeto com um microfone em um evento",
    label: "Apresentação de projeto",
  },
  {
    src: amandaHackathon.url,
    alt: "Amanda com sua equipe e os troféus conquistados em um hackathon",
    label: "Hackathon · equipe premiada",
  },
  {
    src: amandaEvent.url,
    alt: "Amanda participando de um evento sobre tecnologia e clima",
    label: "Tecnologia · ciência · eventos",
  },
  {
    src: amandaLaptop.url,
    alt: "Amanda ao lado de seu notebook personalizado com adesivos",
    label: "Criatividade em código",
  },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("amanda-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    if (carouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setCurrentPhoto((photo) => (photo + 1) % aboutPhotos.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.classList.toggle("dark", nextDarkMode);
    window.localStorage.setItem("amanda-theme", nextDarkMode ? "dark" : "light");
  };

  return (
    <div className="blueprint-grid min-h-screen font-jakarta text-ink antialiased transition-colors duration-300">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#inicio" className="font-syne text-lg font-extrabold">
            Amanda Weiler<span className="text-butter">.</span>
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 font-mono text-[11px] uppercase text-ink/70 sm:flex">
            <a href="#projetos" className="transition-colors hover:text-deep">Projetos</a>
            <a href="#sobre" className="transition-colors hover:text-deep">Sobre</a>
            <a href="#conteudo" className="transition-colors hover:text-deep">Conteúdo</a>
            <a href="#habilidades" className="transition-colors hover:text-deep">Habilidades</a>
            <a href="#contato" className="transition-colors hover:text-deep">Contato</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              aria-pressed={darkMode}
              title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              onClick={toggleTheme}
              className="group flex h-9 items-center gap-2 border border-ink/25 bg-paper/70 px-2.5 font-mono text-[10px] uppercase text-ink transition-colors hover:border-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-deep"
            >
              <span className="hidden md:inline">{darkMode ? "Claro" : "Escuro"}</span>
              <span className="grid size-5 place-items-center border border-ink/25 bg-sky" aria-hidden="true">
                {darkMode ? <Sun size={13} /> : <Moon size={13} />}
              </span>
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-9 place-items-center border border-ink/25 text-ink transition-colors hover:bg-ink hover:text-paper sm:hidden"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
            <a href="#contato" className="hidden rounded-full border border-ink/25 px-3.5 py-1.5 font-mono text-[11px] uppercase transition-colors hover:bg-ink hover:text-butter sm:inline-flex">
              Contato
            </a>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Navegação móvel" className="grid border-t border-ink/10 bg-paper px-5 py-3 font-mono text-xs uppercase sm:hidden">
            {[
              ["Projetos", "#projetos"],
              ["Sobre", "#sobre"],
              ["Conteúdo", "#conteudo"],
              ["Habilidades", "#habilidades"],
              ["Contato", "#contato"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu} className="border-b border-ink/10 py-3 last:border-0">{label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="relative scroll-mt-20 overflow-hidden border-b border-ink/10">
          <div className="pointer-events-none absolute -right-6 top-10 hidden lg:block" aria-hidden="true">
            <div className="deco-star"><i /></div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-14 md:grid-cols-12 md:py-20">
            <div className="hero-rise md:col-span-7">
              <p className="mb-5 font-mono text-[11px] uppercase text-deep">(a) — Portfólio · 2026</p>
              <div className="flex items-end gap-4 sm:gap-6">
                <h1 className="font-syne text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl md:text-7xl">Amanda<br />Weiler</h1>
                <img src={pixelDino.url} alt="Dinossauro pixelado" className="mb-1 h-20 w-auto shrink-0 dark:invert sm:h-28" />
              </div>
              <p className="mt-6 max-w-[46ch] text-pretty text-lg text-ink/75">
                Desenvolvedora criativa. Construo experiências que unem código, pesquisa e dados para gerar decisões com intenção e resolver problemas reais.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#projetos" className="rounded-full bg-butter px-6 py-3 font-syne text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">Ver projetos</a>
                <a href="#contato" className="rounded-full border border-ink/30 px-6 py-3 font-syne text-sm font-bold transition-colors hover:bg-ink hover:text-paper">Fale comigo</a>
              </div>
              <div className="mt-5 flex flex-wrap gap-3" aria-label="Redes profissionais">
                <a href="https://www.linkedin.com/in/amandaweiler/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-deep transition-colors hover:text-ink"><Linkedin size={15} />LinkedIn <ArrowUpRight size={13} /></a>
                <a href="https://github.com/interludeebloom" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-deep transition-colors hover:text-ink"><Github size={15} />GitHub <ArrowUpRight size={13} /></a>
              </div>
              <div className="retro-window mt-9 max-w-sm" aria-label="Status profissional">
                 <div className="retro-titlebar"><span>Portfólio Amanda</span><span>□ ×</span></div>
                <div className="flex items-center justify-between gap-4 p-3.5">
                  <div><p className="font-mono text-[10px] uppercase text-ink/55">status.exe</p><p className="mt-1 font-syne text-sm font-bold">Aberta a novas conexões</p></div>
                  <span className="pixel-cat" aria-hidden="true">▲•ᴥ•▲</span>
                </div>
              </div>
            </div>
            <div className="hero-rise-delay md:col-span-5">
              <div className="relative mr-3">
                <div className="absolute -inset-2 border border-linework/60" aria-hidden="true" />
                <img src={amandaPortrait.url} alt="Amanda Weiler sorrindo em um evento de tecnologia" className="relative aspect-[4/5] w-full object-cover object-[center_38%]" />
                <span className="absolute -left-3 top-4 -rotate-6 bg-butter px-2.5 py-1 font-mono text-[10px] uppercase text-accent-foreground">Olá!</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="scroll-mt-16 border-b border-ink/10 bg-paper/80">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <div className="mb-10 flex items-end justify-between gap-5">
              <div className="flex items-center gap-4">
                <h2 className="font-syne text-3xl font-extrabold sm:text-4xl"><span className="mr-4 font-mono text-base text-deep">(b)</span>Projetos</h2>
                <img src={pixelFolder} alt="Pasta pixelada" className="h-12 w-auto sm:h-16" />
              </div>
              <span className="hidden font-mono text-[11px] uppercase text-ink/50 sm:block">Seleção · projetos reais</span>
            </div>
            <div className="space-y-5">
              <Project
                index="01"
                title="SafraScore"
                description="Plataforma que cruza clima e preço de commodities para transformar risco de safra em score, alertas e recomendações mais claras."
                href="https://safrascore.vercel.app/"
                image={safrascoreProject.url}
                imageAlt="Página inicial do projeto SafraScore"
                tags={["Dados públicos", "Risco agrícola", "Produto web"]}
              />
              <Project
                index="02"
                title="ClimAqui Brasil"
                description="Plataforma de acompanhamento climático dos estados e municípios do Brasil, com notícias, relatos, educação e dados abertos."
                href="https://claricenunes.github.io/ClimatonTCU/"
                image={climaquiProjectHome}
                imageAlt="Página inicial do ClimAqui Brasil com a logo e o mapa do país"
                tags={["Clima", "Dados abertos", "Acessibilidade"]}
                reverse
              />
            </div>
          </div>
        </section>

        <section id="sobre" className="scroll-mt-16 border-b border-ink/10 bg-sky/35">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-12 md:py-20">
            <div className="md:col-span-5">
              <h2 className="mb-5 font-syne text-3xl font-extrabold sm:text-4xl"><span className="mr-4 font-mono text-base text-deep">(c)</span>Sobre</h2>
              <p className="max-w-[52ch] text-pretty text-lg text-ink/80">Sou estudante de Ciência da Computação e apaixonada por tecnologia. Também sou bolsista de Iniciação Científica PIBIC e criadora de conteúdo sobre tecnologia para as redes sociais.</p>
              <p className="mt-4 max-w-[52ch] text-pretty text-ink/70">Sou ganhadora de hackathon e representante do centro acadêmico da minha faculdade, onde ajudo a conectar estudantes, oportunidades e iniciativas. Entre pesquisa, comunidade e criação, busco tornar a tecnologia mais próxima e incentivar outras pessoas a se desenvolverem na área.</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase text-ink/60"><span>Brasil</span><span className="text-butter">✦</span><span>Disponível para conexões</span></div>
            </div>
            <div
              className="paint-window md:col-span-7"
              role="region"
              aria-roledescription="carrossel"
              aria-label="Momentos da trajetória de Amanda"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocusCapture={() => setCarouselPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setCarouselPaused(false);
              }}
            >
              <div className="paint-titlebar">
                <span className="flex items-center gap-2"><span aria-hidden="true">🎨</span> momentos.bmp — Amanda Weiler</span>
                <span aria-hidden="true">_ □ ×</span>
              </div>
              <div className="paint-menubar" aria-hidden="true"><span>Arquivo</span><span>Editar</span><span>Exibir</span><span>Imagem</span><span>Cores</span><span>Ajuda</span></div>
              <div className="paint-workspace">
                <div className="paint-tools" aria-hidden="true">
                  {['✦', '□', '⌁', '◈', '╱', '○', '⌕', 'A'].map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <div className="relative min-w-0 overflow-hidden border-2 border-ink/40 bg-paper">
                  {aboutPhotos.map((photo, index) => (
                    <img
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${index === currentPhoto ? "opacity-100" : "pointer-events-none opacity-0"}`}
                      aria-hidden={index !== currentPhoto}
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-paper/90 px-3 py-2 backdrop-blur-sm">
                    <p className="min-w-0 truncate font-mono text-[10px] uppercase text-ink" aria-live="polite">{aboutPhotos[currentPhoto]?.label ?? "Momento da trajetória"}</p>
                    <div className="flex shrink-0 items-center gap-1">
                      <button type="button" onClick={() => setCurrentPhoto((currentPhoto - 1 + aboutPhotos.length) % aboutPhotos.length)} aria-label="Foto anterior" title="Foto anterior" className="grid size-7 place-items-center border border-ink/35 bg-paper text-ink transition-colors hover:bg-butter"><ArrowLeft size={14} /></button>
                      <button type="button" onClick={() => setCarouselPaused((paused) => !paused)} aria-label={carouselPaused ? "Continuar troca automática" : "Pausar troca automática"} aria-pressed={carouselPaused} title={carouselPaused ? "Continuar" : "Pausar"} className="grid size-7 place-items-center border border-ink/35 bg-paper text-ink transition-colors hover:bg-butter">{carouselPaused ? <Play size={13} /> : <Pause size={13} />}</button>
                      <button type="button" onClick={() => setCurrentPhoto((currentPhoto + 1) % aboutPhotos.length)} aria-label="Próxima foto" title="Próxima foto" className="grid size-7 place-items-center border border-ink/35 bg-paper text-ink transition-colors hover:bg-butter"><ArrowRight size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="paint-palette">
                <div className="grid grid-cols-4 gap-0.5" aria-hidden="true"><i /><i /><i /><i /></div>
                <div className="flex items-center gap-1.5" aria-label={`Foto ${currentPhoto + 1} de ${aboutPhotos.length}`}>
                  {aboutPhotos.map((photo, index) => (
                    <button key={photo.src} type="button" onClick={() => setCurrentPhoto(index)} aria-label={`Mostrar foto ${index + 1}`} aria-current={index === currentPhoto ? "true" : undefined} className={`h-2.5 w-6 border border-ink/40 transition-colors ${index === currentPhoto ? "bg-deep" : "bg-paper hover:bg-butter"}`} />
                  ))}
                </div>
              </div>
              <div className="paint-statusbar"><span>@itsamanda.dev</span><span>{currentPhoto + 1} / {aboutPhotos.length}</span></div>
            </div>
            <div id="habilidades" className="scroll-mt-24 md:col-span-12">
              <img src={pixelComputer.url} alt="Computador pixelado" className="mb-5 h-20 w-auto mix-blend-multiply dark:invert dark:mix-blend-screen" />
              <h3 className="mb-4 font-mono text-[11px] uppercase text-deep">(d) — Habilidades</h3>
              <ul className="grid gap-x-8 md:grid-cols-2">
                {["Análise de dados e visualização", "Desenvolvimento back-end", "Desenvolvimento web", "Pesquisa científica"].map((skill, index) => (
                  <li key={skill} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3 first:pt-0 last:border-0"><span className="font-syne font-bold">{skill}</span><span className="font-mono text-[10px] text-ink/45">0{index + 1}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="conteudo" className="scroll-mt-16 border-b border-ink/10 bg-paper/80">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-syne text-3xl font-extrabold sm:text-4xl"><span className="mr-4 font-mono text-base text-deep">(e)</span>Conteúdo</h2>
              <span className="hidden font-mono text-[11px] uppercase text-ink/50 sm:block">@itsamanda.dev · TikTok + Instagram</span>
            </div>
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <p className="max-w-[52ch] text-pretty text-lg text-ink/80">Crio conteúdos para as redes sociais divulgando tecnologia, carreira e conteúdo acadêmico — para incentivar mais pessoas a começarem na área de tecnologia e se desenvolverem.</p>
                <p className="mt-4 max-w-[52ch] text-pretty text-ink/70">Gravo sobre hackathon, iniciação científica, rotina de estudos, eventos e tudo que roda no universo tech: do primeiro "olá, mundo" à vida de quem já está na estrada.</p>
                <div className="mt-7 grid max-w-md grid-cols-2 gap-4">
                  <div className="border border-ink/15 bg-sky/40 p-4">
                    <p className="font-syne text-3xl font-extrabold text-deep">+1 mi</p>
                    <p className="mt-1 font-mono text-[10px] uppercase text-ink/60">visualizações</p>
                  </div>
                  <div className="border border-ink/15 bg-sky/40 p-4">
                    <p className="font-syne text-3xl font-extrabold text-deep">+5 mil</p>
                    <p className="mt-1 font-mono text-[10px] uppercase text-ink/60">seguidores · TikTok + Instagram</p>
                  </div>
                </div>
              </div>
              <div className="retro-window md:col-span-5" aria-label="Links de conteúdo">
                <div className="retro-titlebar"><span>itsamanda.dev</span><span>□ ×</span></div>
                <div className="grid gap-3 p-4">
                  <a href="https://www.tiktok.com/@itsamanda.dev" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 border border-ink/20 bg-paper px-4 py-3 transition-colors hover:border-butter hover:bg-butter/25">
                    <span className="inline-flex items-center gap-2 font-syne text-sm font-bold"><Music2 size={16} className="text-deep" />TikTok — @itsamanda.dev</span>
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a href="https://www.instagram.com/itsamanda.dev" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 border border-ink/20 bg-paper px-4 py-3 transition-colors hover:border-butter hover:bg-butter/25">
                    <span className="inline-flex items-center gap-2 font-syne text-sm font-bold"><Instagram size={16} className="text-deep" />Instagram — @itsamanda.dev</span>
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <div className="flex flex-wrap gap-2 px-1 pt-1">
                    {["Hackathon", "Iniciação científica", "Rotina", "Eventos", "Carreira"].map((tag) => (
                      <span key={tag} className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase text-ink/70">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="scroll-mt-16 bg-contact text-contact-foreground">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
               <div><p className="mb-4 font-mono text-[11px] uppercase text-butter">(f) — Contato</p><h2 className="font-syne text-4xl font-extrabold leading-none text-balance sm:text-5xl">Vamos<br />construir algo?</h2></div>
              <a href="https://www.linkedin.com/in/amandaweiler/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-syne text-2xl font-bold text-butter transition-colors hover:text-contact-foreground sm:text-3xl">Me chame no LinkedIn <ArrowUpRight size={25} /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 border-t border-contact-foreground/15 pt-8">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-contact-foreground/25 px-5 py-2.5 font-mono text-[11px] uppercase transition-colors hover:border-butter hover:bg-butter hover:text-accent-foreground"><Icon size={14} />{label}</a>
              ))}
            </div>
          </div>
          <footer className="border-t border-contact-foreground/10"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-5 font-mono text-[10px] uppercase text-contact-foreground/45 sm:flex-row sm:items-center"><span>© 2026 Amanda Weiler</span><span>Feito com curiosidade · Brasil</span></div></footer>
        </section>
      </main>
    </div>
  );
}

function Project({ index, title, description, href, image, imageAlt, tags, reverse = false }: { index: string; title: string; description: string; href: string; image: string; imageAlt: string; tags: string[]; reverse?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="project-link group block border border-ink/15 bg-paper p-5 transition-colors hover:border-butter hover:bg-sky/40 sm:p-7">
      <div className={`grid gap-7 md:grid-cols-2 md:items-center ${reverse ? "" : ""}`}>
        <div className={reverse ? "md:order-2" : ""}><div className="project-image aspect-[16/10] overflow-hidden border border-ink/10 bg-sky"><img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]" /></div></div>
        <div className={reverse ? "md:order-1" : ""}>
          <div className="flex items-center justify-between gap-4"><h3 className="font-syne text-2xl font-extrabold">{title}</h3><span className="font-mono text-[11px] text-deep/60">{index}</span></div>
          <p className="mt-3 max-w-[44ch] text-pretty text-ink/70">{description}</p>
          <div className="mt-5 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase text-ink/70">{tag}</span>)}</div>
          <span className="mt-6 inline-flex items-center gap-2 font-syne text-sm font-bold text-deep transition-all group-hover:gap-3 group-hover:text-ink">Visitar projeto <ArrowUpRight size={15} /></span>
        </div>
      </div>
    </a>
  );
}