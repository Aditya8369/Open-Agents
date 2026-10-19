import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Github,
  Mail,
  Globe,
  Code,
  Laptop,
  BarChart3,
  ShieldCheck,
  Zap,
  Terminal,
} from 'lucide-react'

export default function PortfolioPage() {
  useDocumentTitle('Portfolio')

  const projects = [
    {
      title: 'OpenAgents Platform',
      description:
        'Open-source platform for building, deploying, and managing AI agent workflows. Modular architecture with Supabase backend, React frontend, and extensible plugin system.',
      tags: ['React', 'Vite', 'Supabase', 'Tailwind'],
      link: 'https://github.com/DivyashreeR008/Open-Agents',
      icon: Code,
    },
    {
      title: 'Battle Mode Arena',
      description:
        'Head-to-head AI agent comparison arena. Pit two agents against the same prompt, vote for the best output, and track win rates over time.',
      tags: ['React', 'WebSockets', 'Real-time'],
      link: '/battle',
      icon: Zap,
    },
    {
      title: 'Workflow Builder',
      description:
        'Visual pipeline designer for chaining multiple AI agents into automated workflows. Drag-and-drop canvas with execution trace viewer.',
      tags: ['React Flow', 'State Machines'],
      link: '/workflows/build',
      icon: Laptop,
    },
    {
      title: 'Analytics Dashboard',
      description:
        'Agent usage analytics and cost tracking. Real-time metrics, spend breakdowns, and performance insights across all agent runs.',
      tags: ['Charts', 'Data Viz', 'Metrics'],
      link: '/analytics',
      icon: BarChart3,
    },
    {
      title: 'Agent Marketplace',
      description:
        'Curated marketplace of 300+ AI agents organized by category. Search, filter, one-click install, and community ratings.',
      tags: ['Discovery', 'Search', 'Community'],
      link: '/marketplace',
      icon: Globe,
    },
    {
      title: 'Automations Suite',
      description:
        'Scheduled agent runs and batch automation. Cron-based triggers, retry policies, and failure alerts for production agent workflows.',
      tags: ['Scheduling', 'Batching', 'DevOps'],
      link: '/automations',
      icon: Terminal,
    },
  ]

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Vite', level: 88 },
    { name: 'Supabase', level: 85 },
    { name: 'Node.js', level: 80 },
  ]
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
        Skip to content
      </a>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="font-bold text-xl tracking-tight">OpenAgents</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="#work" className="hover:text-white transition-colors">Work</Link>
            <Link to="#skills" className="hover:text-white transition-colors">Skills</Link>
            <Link to="#about" className="hover:text-white transition-colors">About</Link>
            <Link to="#contact" className="hover:text-white transition-colors">Contact</Link>
            <Link
              to="/"
              className="px-4 py-1.5 rounded-md border border-white/30 hover:bg-white/10 hover:text-white transition-colors text-[12px] font-semibold tracking-wide uppercase"
            >
              Back to App
            </Link>
          </div>
        </div>
      </nav>

      <main id="content" className="relative">
        <section
          id="hero"
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -top-[200px]" />
            <div className="absolute bottom-0 right-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -bottom-[150px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[11px] font-mono uppercase tracking-widest mb-6">
              <span className="relative flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Open Source · Production Ready
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              AI Agent<span className="text-white"> Workflows</span>
              <br />
              <span className="text-white">That Actually Ship</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              OpenAgents is an open-source platform for building, deploying,
              and managing AI agent workflows. Modular, extensible, and
              built for teams that ship AI features fast.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/agents"
                className="px-8 py-3 bg-white text-black font-bold rounded-md hover:bg-white/80 transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight size={18} />
                Enter Agent Workspace
              </Link>
              <Link
                to="/workflows/build"
                className="px-8 py-3 border border-white/20 text-white hover:bg-white/5 rounded-md transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight size={18} />
                Start Building
              </Link>
              <Link
                to="#work"
                className="px-8 py-3 border border-white/20 text-white hover:bg-white/5 rounded-md transition-all duration-300 flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Work
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-left">
              <div>
                <span className="text-2xl font-bold text-white block">300+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Agents</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white block">10k+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Monthly Runs</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white block">MIT</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Licensed</span>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="relative py-24 bg-black">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Selected Work</h2>
                <p className="text-gray-400">Projects built with and for OpenAgents.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                    <project.icon className="text-white w-6 h-6 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded border border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white transition-colors">Open Project <ArrowRight size={14} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Technical Skills</h2>
                <p className="text-gray-400">The tools that power OpenAgents.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-sm font-mono text-white">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 bg-white/5 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">About OpenAgents</h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              OpenAgents started as a mission to make AI agent development accessible to every team. Instead of black-box SaaS platforms, we believe in open-source, self-hostable, extensible agent infrastructure that teams truly own.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">MIT</div>
                <div className="text-sm text-gray-500">Open Source License</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">100+</div>
                <div className="text-sm text-gray-500">Agent Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Community</div>
                <div className="text-sm text-gray-500">Driven Development</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-black">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-10">Questions, contributions, or just want to say hi?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:hello@openagents.dev" className="px-8 py-3 border border-white/20 rounded-md text-white hover:bg-white/5 hover:border-white transition-colors text-sm font-medium">
                <Mail size={16} className="mr-2" /> hello@openagents.dev
              </a>
              <a href="https://github.com/DivyashreeR008/Open-Agents" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-white/30 rounded-md bg-white/10 text-white hover:bg-white hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                <Github size={16} /> GitHub Repo
              </a>
            </div>
            <div className="mt-12 flex justify-center gap-6 text-gray-500">
              <a href="https://github.com/DivyashreeR008/Open-Agents" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
            <p className="mt-8 text-xs text-gray-600 font-mono uppercase tracking-widest">© {new Date().getFullYear()} OpenAgents. MIT Licensed.</p>
          </div>
        </section>
      </main>
    </div>
  )
}