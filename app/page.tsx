'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('whoami');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typingText, setTypingText] = useState('');

  useEffect(() => {
    const text = 'whoami';
    let i = 0;
    const timer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (i <= text.length) {
          setTypingText(text.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 90);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30% 0px' }
    );

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const sections = [
    { id: 'whoami', label: 'whoami', category: 'personal' },
    { id: 'projects', label: 'list projects', category: 'portfolio' },
    { id: 'experience', label: 'experience', category: 'work' },
    { id: 'education', label: 'education', category: 'work' },
    { id: 'skills', label: 'skills', category: 'work' },
    { id: 'contact', label: 'get contact', category: 'connect' },
  ];

  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Mobile Menu Button */}
      <button
        className={`fixed top-3.5 left-3.5 z-50 bg-zinc-950 border border-zinc-800 p-2 flex flex-col gap-1.5 md:hidden ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className={`block w-5 h-0.5 bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-gray-100 transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 border-r border-zinc-800 py-7 h-screen overflow-y-auto transition-all duration-300 z-50 bg-black
        md:sticky md:top-0 md:bg-transparent
        fixed ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="inline-flex items-center gap-2 px-6 mb-6 bg-green-500/10 border border-green-500/30 rounded-full py-1.5 mx-6 text-xs text-green-400 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          open to work
        </div>

        {['personal', 'portfolio', 'work', 'connect'].map(category => (
          <div key={category} className="mb-6">
            <div className="text-gray-500 px-6 mb-1.5 text-xs"># {category}</div>
            {sections.filter(s => s.category === category).map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block px-6 py-1.5 text-sm transition-colors ${
                  activeSection === section.id 
                    ? 'text-gray-100 bg-zinc-900 border-l-2 border-orange-500 pl-5' 
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {section.label}
              </a>
            ))}
          </div>
        ))}

        <div className="px-6">
          <a 
            href="https://blog.heypratham.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sm text-gray-400 hover:text-gray-100 transition-colors"
          >
            blog ↗
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 md:p-16 w-full">
        {/* WHOAMI Section */}
        <section id="whoami" className="mb-22 border border-zinc-800 rounded-md p-5 bg-white/[0.01]">
          <div className="flex items-center mb-1.5 text-base font-bold">
            <span className="text-sky-500 font-normal mr-1">cat </span>
            {typingText}
            <span className="inline-block w-2 h-3.5 bg-orange-500 ml-1 animate-pulse"></span>
          </div>
          <div className="text-gray-500 mb-7 text-xs">get the current user's profile.</div>
          <div className="space-y-3">
            {[
              ['name', 'Pratham Dupare'],
              ['alias', '@prathamdupare'],
              ['location', 'India'],
              ['about', 'Building open-source tools, mobile apps, and web experiences. Math grad who writes code.'],
              ['editor', 'Vim btw'],
              ['env', 'NixOS · Hyprland · tmux']
            ].map(([key, val]) => (
              <div key={key} className="flex gap-4">
                <span className="w-35 flex-shrink-0 text-gray-400">{key}</span>
                <span className="text-gray-100">{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS Section */}
        <section id="projects" className="mb-22 border border-zinc-800 rounded-md p-5 bg-white/[0.01]">
          <div className="flex items-center mb-1.5 text-base font-bold">
            <span className="text-sky-500 font-normal mr-1">cat </span>
            projects
          </div>
          <div className="text-gray-500 mb-7 text-xs">featured open-source work.</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kintsu */}
            <div className="border border-zinc-800 rounded-md overflow-hidden hover:border-zinc-600 transition-colors">
              <div className="relative h-75 bg-zinc-950 group cursor-pointer">
                <Image
                  src="/kintsu.png"
                  alt="Kintsu app screenshot"
                  fill
                  className="object-cover group-hover:brightness-50 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="https://play.google.com/store/apps/details?id=com.prathamdupare.kintsu" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs border border-white/25 bg-black/60 rounded text-gray-100 hover:bg-white/10 transition-colors">
                    ▶ Play Store
                  </a>
                  <a href="https://kintsu.heypratham.in" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs border border-white/25 bg-black/60 rounded text-gray-100 hover:bg-white/10 transition-colors">
                    ↗ website
                  </a>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <a href="https://kintsu.heypratham.in" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    kintsu
                  </a>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-green-400 border-green-500/30">▶ Play Store</span>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-gray-400">Android</span>
                </div>
                <div className="text-sm text-gray-100 mb-1.5 opacity-85">The habit tracker that rewards your comeback.</div>
                <div className="text-sm text-gray-400 leading-relaxed mb-3">Every other habit app punishes you for missing a day. Kintsu repairs the crack with gold. Offline-first with urge surfing and two-second check-ins.</div>
                <div className="flex gap-1.5 flex-wrap">
                  {['React Native', 'Expo', 'Android', 'offline-first'].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-gray-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hati */}
            <div className="border border-zinc-800 rounded-md overflow-hidden hover:border-zinc-600 transition-colors">
              <div className="relative h-75 bg-zinc-950 group cursor-pointer">
                <Image
                  src="/hati.png"
                  alt="Hati dashboard screenshot"
                  fill
                  className="object-cover group-hover:brightness-50 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="https://github.com/prathamdupare/hati" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs border border-white/25 bg-black/60 rounded text-gray-100 hover:bg-white/10 transition-colors">
                    ↗ github
                  </a>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <a href="https://github.com/prathamdupare/hati" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    hati
                  </a>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-gray-400">MIT</span>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-gray-400">open source</span>
                </div>
                <div className="text-sm text-gray-100 mb-1.5 opacity-85">All your feeds in one place.</div>
                <div className="text-sm text-gray-400 leading-relaxed mb-3">A self-hosted dashboard that fetches and normalizes content from various sources into a unified widget-based interface.</div>
                <div className="flex gap-1.5 flex-wrap">
                  {['Next.js', 'TypeScript', 'Tailwind', 'self-hosted'].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-gray-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Graph */}
            <div className="border border-zinc-800 rounded-md overflow-hidden hover:border-zinc-600 transition-colors">
              <div className="relative h-75 bg-zinc-950 group cursor-pointer">
                <Image
                  src="/resume-graph.jpg"
                  alt="Resume Graph screenshot"
                  fill
                  className="object-cover group-hover:brightness-50 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="https://github.com/prathamdupare" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs border border-white/25 bg-black/60 rounded text-gray-100 hover:bg-white/10 transition-colors">
                    ↗ github
                  </a>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-bold text-gray-100">resume-graph</span>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-amber-500 border-amber-500/30">WIP</span>
                </div>
                <div className="text-sm text-gray-100 mb-1.5 opacity-85">Treat your resume like a Git repo.</div>
                <div className="text-sm text-gray-400 leading-relaxed mb-3">One base resume, branch per role. Visual canvas to see which version went where. AI helper rewrites sections in place — no more "Resume-Final-v7-actual.pdf".</div>
                <div className="flex gap-1.5 flex-wrap">
                  {['LaTeX', 'TypeScript', 'Canvas', 'AI'].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-gray-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CEO Hype Tracker */}
            <div className="border border-zinc-800 rounded-md overflow-hidden hover:border-zinc-600 transition-colors">
              <div className="relative h-75 bg-zinc-950 group cursor-pointer">
                <Image
                  src="/ai-claim.png"
                  alt="CEO Hype Tracker screenshot"
                  fill
                  className="object-cover group-hover:brightness-50 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="https://monthssincelastaiclaim.fun" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs border border-white/25 bg-black/60 rounded text-gray-100 hover:bg-white/10 transition-colors">
                    ↗ live site
                  </a>
                  <a href="https://github.com/prathamdupare/ceo-hype-tracker" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs border border-white/25 bg-black/60 rounded text-gray-100 hover:bg-white/10 transition-colors">
                    ↗ github
                  </a>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <a href="https://monthssincelastaiclaim.fun" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    ceo-hype-tracker
                  </a>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-amber-400 border-amber-400/25">★ 18</span>
                  <span className="text-xs px-2 py-0.5 border border-zinc-800 rounded text-gray-400">MIT</span>
                </div>
                <div className="text-sm text-gray-100 mb-1.5 opacity-85">Receipts for the AI hype machine.</div>
                <div className="text-sm text-gray-400 leading-relaxed mb-3">Tracks every time a CEO claims "AI will replace programmers." Active countdowns, a graveyard of expired predictions, and fully documented sources.</div>
                <div className="flex gap-1.5 flex-wrap">
                  {['Next.js', 'TypeScript', 'fun'].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-gray-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE Section */}
        <section id="experience" className="mb-22 border border-zinc-800 rounded-md p-5 bg-white/[0.01]">
          <div className="flex items-center mb-1.5 text-base font-bold">
            <span className="text-sky-500 font-normal mr-1">cat </span>
            experience
          </div>
          <div className="text-gray-500 mb-7 text-xs">work history, most recent first.</div>
          
          <div className="space-y-6">
            {[
              {
                role: 'Software Development Intern',
                company: 'FoCDoT Technologies',
                type: 'Internship · Hybrid',
                period: 'Oct 2024 – Sep 2025 · 1 yr · Bhopal, MP',
                stack: 'React.js · Python · TypeScript'
              },
              {
                role: 'Freelance Web Developer',
                company: 'Upwork',
                type: 'Freelance · Remote',
                period: 'Feb 2023 – Mar 2025 · 2 yrs 2 mos',
                stack: 'React.js · TypeScript'
              },
              {
                role: 'Founder',
                company: 'Fosspage',
                type: 'Self-employed · India',
                period: 'Jan 2022 – Mar 2025 · 3 yrs 3 mos',
                desc: 'Web portal focused on Linux, Android and open-source — making FOSS accessible and practical for everyone.',
                stack: null
              }
            ].map((exp, i) => (
              <div key={i} className={`pb-5 ${i < 2 ? 'border-b border-zinc-800' : ''}`}>
                <div className="text-sm font-bold text-gray-100 mb-1">{exp.role}</div>
                <div className="flex gap-2.5 items-baseline mb-1">
                  <span className="text-orange-500">{exp.company}</span>
                  <span className="text-gray-400 text-xs">{exp.type}</span>
                </div>
                <div className="text-gray-500 text-xs mb-1">{exp.period}</div>
                {exp.stack && <div className="text-sky-500 text-xs">{exp.stack}</div>}
                {exp.desc && <div className="text-gray-400 mt-1 text-sm leading-relaxed">{exp.desc}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION Section */}
        <section id="education" className="mb-22 border border-zinc-800 rounded-md p-5 bg-white/[0.01]">
          <div className="flex items-center mb-1.5 text-base font-bold">
            <span className="text-sky-500 font-normal mr-1">cat </span>
            education
          </div>
          <div className="text-gray-500 mb-7 text-xs">academic background.</div>
          
          <div>
            <div className="text-sm font-bold text-gray-100 mb-1">BS Mathematics</div>
            <div className="flex gap-2.5 items-baseline flex-wrap mb-1">
              <span className="text-orange-500">IISER Bhopal</span>
              <span className="text-gray-400 text-xs">Indian Institute of Science Education and Research</span>
            </div>
            <div className="text-gray-500 text-xs">2020 – 2025 · Bhopal, MP</div>
          </div>
        </section>

        {/* SKILLS Section */}
        <section id="skills" className="mb-22 border border-zinc-800 rounded-md p-5 bg-white/[0.01]">
          <div className="flex items-center mb-1.5 text-base font-bold">
            <span className="text-sky-500 font-normal mr-1">cat </span>
            skills
          </div>
          <div className="text-gray-500 mb-7 text-xs">languages, tools, and environment.</div>
          
          <div className="space-y-3">
            {[
              ['languages', 'TypeScript · JavaScript · Go · Python · Dart'],
              ['frontend', 'React · Next.js · Tailwind CSS'],
              ['mobile', 'Flutter · Android'],
              ['cs', 'DSA · Graphs · Algorithms'],
              ['tooling', 'Neovim · Git · tmux · Nix Flakes'],
              ['environment', 'NixOS · Wayland · Hyprland']
            ].map(([key, val]) => (
              <div key={key} className="flex gap-4">
                <span className="w-35 flex-shrink-0 text-gray-400">{key}</span>
                <span className="text-gray-100">{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT Section */}
        <section id="contact" className="mb-22 border border-zinc-800 rounded-md p-5 bg-white/[0.01]">
          <div className="flex items-center mb-1.5 text-base font-bold">
            <span className="text-sky-500 font-normal mr-1">cat </span>
            contact
          </div>
          <div className="text-gray-500 mb-7 text-xs">retrieve contact links and social profiles.</div>
          
          <div className="space-y-3">
            {[
              ['email', 'prathmeshdupare@gmail.com', 'mailto:prathmeshdupare@gmail.com'],
              ['github', 'github.com/prathamdupare', 'https://github.com/prathamdupare'],
              ['linkedin', 'linkedin.com/in/pratham-dupare', 'https://linkedin.com/in/pratham-dupare-a99b97247'],
              ['x (twitter)', 'x.com/prathammdupare', 'https://x.com/prathammdupare'],
              ['instagram', 'instagram.com/prathammdupare', 'https://www.instagram.com/prathammdupare/']
            ].map(([key, val, href]) => (
              <div key={key} className="flex gap-4">
                <span className="w-35 flex-shrink-0 text-gray-400">{key}</span>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 border-b border-zinc-800 hover:text-gray-100 hover:border-gray-400 transition-colors">
                  {val}
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-5 border-t border-zinc-800">
            <a href="#whoami" className="text-gray-400 text-sm hover:text-gray-100 transition-colors">
              ↑ cd ~
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
