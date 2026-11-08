/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { InquiryModal } from './components/InquiryModal';
import { AdminPanel } from './components/AdminPanel';
import { storage } from './services/storage';
import { DEMO_PLACEHOLDER_SLOTS } from './data/initialData';
import { Project, SiteConfig, ProjectInquiry } from './types';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<SiteConfig>(storage.getConfig());
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Initialize data from persistent local storage
  useEffect(() => {
    const loadedProjects = storage.getProjects();
    const loadedConfig = storage.getConfig();
    const loadedInquiries = storage.getInquiries();

    setProjects(loadedProjects);
    setConfig(loadedConfig);
    setInquiries(loadedInquiries);
  }, []);

  // Keyboard shortcut to toggle admin panel (Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    storage.saveProjects(newProjects);
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    storage.saveConfig(newConfig);
  };

  const handleSaveInquiries = (newInquiries: ProjectInquiry[]) => {
    setInquiries(newInquiries);
    storage.saveInquiries(newInquiries);
  };

  const handleResetData = () => {
    storage.resetAllData();
    setProjects(storage.getProjects());
    setConfig(storage.getConfig());
    setInquiries(storage.getInquiries());
  };

  return (
    <div className="min-h-screen bg-[#141615] text-[#F2F1E9] flex flex-col font-sans selection:bg-[#D5F45B] selection:text-[#141615]">
      {/* 1. Header (Sticky Top Bar Contract) */}
      <Header
        onOpenInquiry={() => setInquiryModalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        demoMode={config.demoMode}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          config={config}
          onOpenInquiry={() => setInquiryModalOpen(true)}
          onPlayHeroVideo={() => {
            if (config.heroVideo.videoUrl) {
              setActiveProject({
                id: 'hero-showreel',
                title: 'Siluet Showreel // Главная нарезка',
                format: 'Шоурил / 16:9',
                aspectRatio: '16:9',
                role: 'Монтаж, ритм, саунд-дизайн',
                description: 'Динамичный шоурил работ студии монтажа Siluet. Сочетание клипового темпа, эмоциональных остановок и плотной работы со звуком.',
                coverUrl: projects[0]?.coverUrl || '/src/assets/images/siluet_doc_cover_1793524681413.jpg',
                videoUrl: config.heroVideo.videoUrl,
                tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
                year: '2026',
                duration: '01:30',
                featured: false,
                published: true,
                order: 0,
              });
            }
          }}
        />

        {/* 3. Works Section (Main visual focus) */}
        <Portfolio
          projects={projects}
          demoPlaceholders={DEMO_PLACEHOLDER_SLOTS}
          demoMode={config.demoMode}
          onSelectProject={(project) => {
            if (!project.isPlaceholder) {
              setActiveProject(project);
            }
          }}
        />

        {/* 4. Services Section (Typographic rows with thin dividers) */}
        <Services onOpenInquiry={() => setInquiryModalOpen(true)} />

        {/* 5. Process Section (4 sequential steps) */}
        <Process />

        {/* 6. Contact Section (Large phrase & Telegram CTA) */}
        <ContactSection
          config={config}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        config={config}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        telegramUrl={config.telegramUrl}
      />

      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        projects={projects}
        config={config}
        inquiries={inquiries}
        onSaveProjects={handleSaveProjects}
        onSaveConfig={handleSaveConfig}
        onSaveInquiries={handleSaveInquiries}
        onResetData={handleResetData}
      />
    </div>
  );
}
