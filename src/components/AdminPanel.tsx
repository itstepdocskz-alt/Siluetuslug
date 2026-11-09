import React, { useState } from 'react';
import { 
  X, Plus, Trash2, Edit2, ArrowUp, ArrowDown, Settings, FolderKanban, 
  MessageSquare, Database, RefreshCw, Download, Upload, Check, LogOut, 
  ShieldCheck, AlertCircle, Film, Sparkles, ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, SiteConfig, ProjectInquiry, AspectRatio, AuthUser } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  projects: Project[];
  config: SiteConfig;
  inquiries: ProjectInquiry[];
  onSaveProjects: (projects: Project[]) => void;
  onSaveConfig: (config: SiteConfig) => void;
  onSaveInquiries: (inquiries: ProjectInquiry[]) => void;
  onResetData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  projects,
  config,
  inquiries,
  onSaveProjects,
  onSaveConfig,
  onSaveInquiries,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'settings' | 'inquiries' | 'storage'>('projects');
  
  // Project editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states for project
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState('YouTube / 16:9');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [role, setRole] = useState('Монтаж, саунд-дизайн, цветокоррекция');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [toolsStr, setToolsStr] = useState('Premiere Pro, DaVinci Resolve');
  const [year, setYear] = useState('2026');
  const [duration, setDuration] = useState('10:00');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [client, setClient] = useState('');

  // Site Config state
  const [telegramUrl, setTelegramUrl] = useState(config.telegramUrl);
  const [email, setEmail] = useState(config.email);
  const [status, setStatus] = useState(config.status);
  const [demoMode, setDemoMode] = useState(config.demoMode);
  const [heroVideoEnabled, setHeroVideoEnabled] = useState(config.heroVideo.enabled);
  const [heroVideoUrl, setHeroVideoUrl] = useState(config.heroVideo.videoUrl);

  // Animated Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const startEditProject = (p: Project) => {
    setEditingProject(p);
    setIsCreating(false);
    setTitle(p.title);
    setFormat(p.format);
    setAspectRatio(p.aspectRatio);
    setRole(p.role);
    setDescription(p.description);
    setCoverUrl(p.coverUrl);
    setVideoUrl(p.videoUrl || '');
    setToolsStr(p.tools.join(', '));
    setYear(p.year);
    setDuration(p.duration);
    setFeatured(p.featured);
    setPublished(p.published);
    setClient(p.client || '');
  };

  const startCreateProject = () => {
    setEditingProject(null);
    setIsCreating(true);
    setTitle('');
    setFormat('YouTube / 16:9');
    setAspectRatio('16:9');
    setRole('Монтаж, саунд-дизайн, цветокоррекция');
    setDescription('');
    setCoverUrl('/src/assets/images/siluet_doc_cover_1793524681413.jpg');
    setVideoUrl('');
    setToolsStr('Premiere Pro, DaVinci Resolve');
    setYear('2026');
    setDuration('08:30');
    setFeatured(false);
    setPublished(true);
    setClient('');
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tools = toolsStr.split(',').map((t) => t.trim()).filter(Boolean);

    if (isCreating) {
      const newProj: Project = {
        id: 'p-' + Date.now(),
        title: title.trim(),
        format: format.trim(),
        aspectRatio,
        role: role.trim(),
        description: description.trim(),
        coverUrl: coverUrl.trim() || '/src/assets/images/siluet_doc_cover_1793524681413.jpg',
        videoUrl: videoUrl.trim() || undefined,
        tools: tools.length > 0 ? tools : ['Premiere Pro'],
        year: year.trim() || '2026',
        duration: duration.trim() || '05:00',
        featured,
        published,
        client: client.trim() || undefined,
        order: projects.length + 1,
      };

      let updated = [...projects];
      if (featured) {
        updated = updated.map((p) => ({ ...p, featured: false }));
      }
      updated.push(newProj);
      onSaveProjects(updated);
      showToast('Новый проект успешно опубликован в портфолио!');
    } else if (editingProject) {
      const updated = projects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: title.trim(),
            format: format.trim(),
            aspectRatio,
            role: role.trim(),
            description: description.trim(),
            coverUrl: coverUrl.trim() || p.coverUrl,
            videoUrl: videoUrl.trim() || undefined,
            tools: tools.length > 0 ? tools : p.tools,
            year: year.trim() || p.year,
            duration: duration.trim() || p.duration,
            featured,
            published,
            client: client.trim() || undefined,
          };
        }
        if (featured && p.id !== editingProject.id) {
          return { ...p, featured: false };
        }
        return p;
      });
      onSaveProjects(updated);
      showToast('Изменения проекта сохранены!');
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Удалить проект из портфолио?')) {
      const updated = projects.filter((p) => p.id !== id);
      onSaveProjects(updated);
      showToast('Проект удален');
    }
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const list = [...projects];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    onSaveProjects(updated);
  };

  const handleSaveConfigSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      ...config,
      telegramUrl: telegramUrl.trim(),
      email: email.trim(),
      status: status.trim(),
      demoMode,
      heroVideo: {
        enabled: heroVideoEnabled,
        videoUrl: heroVideoUrl.trim(),
      },
    };
    onSaveConfig(updated);
    showToast('Настройки сайта и Hero сохранены!');
  };

  const handleExportJSON = () => {
    const data = {
      projects,
      config,
      inquiries,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siluet_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Бэкап успешно скачан в формате JSON');
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed && Array.isArray(parsed.projects)) {
        onSaveProjects(parsed.projects);
        if (parsed.config) onSaveConfig(parsed.config);
        if (Array.isArray(parsed.inquiries)) onSaveInquiries(parsed.inquiries);
        showToast('Данные успешно импортированы!');
        setImportStatus(null);
      } else {
        setImportStatus('Ошибка: неверный формат структуры JSON');
      }
    } catch {
      setImportStatus('Ошибка парсинга JSON');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#0a0c0b]/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative w-full max-w-6xl h-[92vh] flex flex-col bg-[#141615] border border-[#2e332d] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 bg-[#D5F45B] text-[#141615] font-bold text-xs uppercase tracking-wider shadow-2xl"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e332d] bg-[#0f1110]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#D5F45B] rotate-45" />
            <h2 className="font-display font-black text-lg text-[#F2F1E9] tracking-tight uppercase">
              Панель управления Siluet Studio
            </h2>
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#D5F45B] bg-[#D5F45B]/10 border border-[#D5F45B]/30 px-2 py-0.5">
              Secure v2.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#B0B5AD] border border-[#2e332d] px-3 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D5F45B]" />
                <span className="text-[#F2F1E9]">{currentUser.email}</span>
              </div>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 text-[#B0B5AD] hover:text-red-400 hover:bg-[#1a1d1b] border border-[#2e332d] transition-colors"
                title="Выйти из аккаунта"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1a1d1b] border border-[#2e332d] transition-colors"
              aria-label="Закрыть панель управления"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Dashboard Layout (Sidebar + Content Pane) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-[#111312] border-b md:border-b-0 md:border-r border-[#2e332d] flex md:flex-col justify-between shrink-0 p-3 md:p-4 overflow-x-auto">
            <nav className="flex md:flex-col gap-1.5 w-full">
              {[
                { id: 'projects', label: 'Проекты', icon: FolderKanban, badge: projects.length },
                { id: 'settings', label: 'Настройки & Hero', icon: Settings },
                { id: 'inquiries', label: 'Заявки клиентов', icon: MessageSquare, badge: inquiries.length },
                { id: 'storage', label: 'Хранилище & Бэкап', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setIsCreating(false);
                      setEditingProject(null);
                    }}
                    className={`flex items-center justify-between px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-all rounded-none ${
                      isActive
                        ? 'bg-[#191c1a] text-[#D5F45B] border-l-2 border-[#D5F45B] shadow-sm'
                        : 'text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#151716]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#D5F45B]' : 'text-[#B0B5AD]'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {typeof tab.badge !== 'undefined' && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 ${
                        isActive ? 'bg-[#D5F45B]/20 text-[#D5F45B]' : 'bg-[#1e211f] text-[#B0B5AD]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="hidden md:block pt-6 border-t border-[#222623] text-[10px] font-mono text-[#B0B5AD]/60 px-2 space-y-1">
              <div>SILUET CMS // ONLINE</div>
              <div>Режим: {config.demoMode ? 'Демо (5 слотов)' : 'Боевой (Live)'}</div>
            </div>
          </aside>

          {/* Content Pane */}
          <main className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#141615]">
            
            {/* TAB 1: PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                {(isCreating || editingProject) ? (
                  /* Form to Create or Edit Project */
                  <div className="bg-[#121413] border border-[#2e332d] p-6 sm:p-8 space-y-6 max-w-3xl">
                    <div className="flex items-center justify-between pb-4 border-b border-[#2e332d]">
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#F2F1E9]">
                          {isCreating ? 'Добавить новый проект' : `Редактирование: ${editingProject?.title}`}
                        </h3>
                        <p className="text-xs text-[#B0B5AD] mt-0.5">
                          Заполните метаданные, постер и видеоматериал для портфолио
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsCreating(false);
                          setEditingProject(null);
                        }}
                        className="text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#2e332d] px-3 py-1"
                      >
                        Отмена
                      </button>
                    </div>

                    <form onSubmit={handleSaveProjectForm} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Название проекта *
                          </label>
                          <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Формат (например: YouTube / 16:9 или Reels / 9:16)
                          </label>
                          <input
                            type="text"
                            required
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Пропорции видео (Aspect Ratio)
                          </label>
                          <select
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          >
                            <option value="16:9">Горизонтальное 16:9 (YouTube / Commercial)</option>
                            <option value="9:16">Вертикальное 9:16 (Reels / Shorts / TikTok)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Моя роль в проекте
                          </label>
                          <input
                            type="text"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Монтаж, саунд-дизайн, грейдинг"
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Хронометраж (например: 18:42 или 0:34)
                          </label>
                          <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Год релиза
                          </label>
                          <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                          URL обложки (постер)
                        </label>
                        <input
                          type="text"
                          required
                          value={coverUrl}
                          onChange={(e) => setCoverUrl(e.target.value)}
                          placeholder="/src/assets/images/... или https://..."
                          className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                        {/* Quick Cover Presets */}
                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          <span className="text-[#B0B5AD] py-1 text-[11px] font-mono">Выбрать кадр:</span>
                          <button
                            type="button"
                            onClick={() => setCoverUrl('/src/assets/images/siluet_doc_cover_1793524681413.jpg')}
                            className="px-2.5 py-1 bg-[#1a1d1b] border border-[#2e332d] text-xs hover:border-[#D5F45B]"
                          >
                            Документалка (16:9)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverUrl('/src/assets/images/siluet_reels_cover_1793524681278.jpg')}
                            className="px-2.5 py-1 bg-[#1a1d1b] border border-[#2e332d] text-xs hover:border-[#D5F45B]"
                          >
                            Streetwear (9:16)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverUrl('/src/assets/images/siluet_commercial_cover_1793524681616.jpg')}
                            className="px-2.5 py-1 bg-[#1a1d1b] border border-[#2e332d] text-xs hover:border-[#D5F45B]"
                          >
                            Реклама (16:9)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverUrl('/src/assets/images/siluet_podcast_cover_1793524683623.jpg')}
                            className="px-2.5 py-1 bg-[#1a1d1b] border border-[#2e332d] text-xs hover:border-[#D5F45B]"
                          >
                            Подкаст (16:9)
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                          Ссылка на видео (YouTube / Vimeo / mp4)
                        </label>
                        <input
                          type="text"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                          Описание кейса и особенности монтажа
                        </label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Опишите драматургию, темп, работу со звуком и графикой..."
                          className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Инструменты (через запятую)
                          </label>
                          <input
                            type="text"
                            value={toolsStr}
                            onChange={(e) => setToolsStr(e.target.value)}
                            placeholder="Premiere Pro, DaVinci Resolve, After Effects"
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                            Клиент / Канал
                          </label>
                          <input
                            type="text"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            placeholder="Название канала или бренда"
                            className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-2">
                        <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#F2F1E9]">
                          <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="w-4 h-4 accent-[#D5F45B]"
                          />
                          <span>Сделать главным кейсом (Featured на всю ширину)</span>
                        </label>

                        <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#F2F1E9]">
                          <input
                            type="checkbox"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="w-4 h-4 accent-[#D5F45B]"
                          />
                          <span>Опубликован на сайте</span>
                        </label>
                      </div>

                      <div className="pt-4 flex justify-end gap-3 border-t border-[#2e332d]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreating(false);
                            setEditingProject(null);
                          }}
                          className="px-5 py-2.5 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#2e332d]"
                        >
                          Отмена
                        </button>
                        <button
                          type="submit"
                          className="px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] shadow-lg"
                        >
                          Сохранить проект
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* Project List */
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#F2F1E9]">
                          Управление проектами портфолио
                        </h3>
                        <p className="text-xs text-[#B0B5AD] mt-0.5">
                          Меняйте порядок, редактируйте кейсы и настраивайте главный ролик
                        </p>
                      </div>
                      <button
                        onClick={startCreateProject}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] shadow-[0_0_20px_rgba(213,244,91,0.25)]"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Добавить проект</span>
                      </button>
                    </div>

                    <div className="divide-y divide-[#2e332d] border border-[#2e332d] bg-[#111312]">
                      {projects.map((proj, idx) => (
                        <div 
                          key={proj.id} 
                          className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#161917] transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            {/* Thumbnail */}
                            <div className="w-20 h-12 bg-[#0d0f0e] border border-[#2e332d] overflow-hidden shrink-0 relative">
                              <img
                                src={proj.coverUrl}
                                alt={proj.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-display font-bold text-sm text-[#F2F1E9]">
                                  {proj.title}
                                </h4>
                                {proj.featured && (
                                  <span className="text-[10px] font-mono text-[#D5F45B] bg-[#D5F45B]/10 border border-[#D5F45B]/30 px-1.5 py-0.2">
                                    FEATURED
                                  </span>
                                )}
                                {!proj.published && (
                                  <span className="text-[10px] font-mono text-[#B0B5AD] bg-[#171a18] border border-[#2e332d] px-1.5 py-0.2">
                                    ЧЕРНОВИК
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#B0B5AD] mt-1 font-mono">
                                {proj.format} · {proj.role} · {proj.duration}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleMoveProject(idx, 'up')}
                              disabled={idx === 0}
                              className="p-2 text-[#B0B5AD] hover:text-[#F2F1E9] disabled:opacity-30 border border-[#2e332d] hover:border-[#D5F45B]"
                              title="Поднять выше"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveProject(idx, 'down')}
                              disabled={idx === projects.length - 1}
                              className="p-2 text-[#B0B5AD] hover:text-[#F2F1E9] disabled:opacity-30 border border-[#2e332d] hover:border-[#D5F45B]"
                              title="Опустить ниже"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => startEditProject(proj)}
                              className="p-2 text-[#B0B5AD] hover:text-[#D5F45B] border border-[#2e332d] hover:border-[#D5F45B]"
                              title="Редактировать"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 text-[#B0B5AD] hover:text-red-400 border border-[#2e332d] hover:border-red-500"
                              title="Удалить"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SETTINGS & HERO */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveConfigSettings} className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F2F1E9] mb-1">
                    Настройки студии и первого экрана
                  </h3>
                  <p className="text-xs text-[#B0B5AD]">
                    Управление демонстрационным режимом, видеоблоком Hero и контактными данными
                  </p>
                </div>

                {/* Demo Mode Toggle */}
                <div className="p-5 bg-[#111312] border border-[#2e332d] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-[#F2F1E9]">
                        Демонстрационный режим
                      </div>
                      <div className="text-xs text-[#B0B5AD] mt-0.5">
                        Отображение 5 зарезервированных мест под будущие проекты
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={demoMode}
                      onChange={(e) => setDemoMode(e.target.checked)}
                      className="w-5 h-5 accent-[#D5F45B] cursor-pointer"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-[#D5F45B]">
                    Текущий статус: {demoMode ? 'Демо-режим активен (5 слотов включены)' : 'Боевой сайт (только реальные работы)'}
                  </div>
                </div>

                {/* Hero Video Block */}
                <div className="p-5 bg-[#111312] border border-[#2e332d] space-y-4">
                  <div className="font-display font-bold text-sm text-[#F2F1E9]">
                    Правый блок Hero (16:9)
                  </div>
                  <p className="text-xs text-[#B0B5AD] leading-relaxed">
                    По умолчанию показывается фирменная кинематографичная шкала монтажа «История / Ритм / Эмоция». Вы можете подключить реальный шоурил.
                  </p>

                  <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#F2F1E9]">
                    <input
                      type="checkbox"
                      checked={heroVideoEnabled}
                      onChange={(e) => setHeroVideoEnabled(e.target.checked)}
                      className="accent-[#D5F45B]"
                    />
                    <span>Показывать реальное видео вместо фирменной шкалы таймлайна</span>
                  </label>

                  {heroVideoEnabled && (
                    <div>
                      <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                        URL видеоролика (YouTube embed / ссылка)
                      </label>
                      <input
                        type="text"
                        value={heroVideoUrl}
                        onChange={(e) => setHeroVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                        className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Telegram & Email */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                      Ссылка на Telegram *
                    </label>
                    <input
                      type="text"
                      required
                      value={telegramUrl}
                      onChange={(e) => setTelegramUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#111312] border border-[#2e332d] text-sm text-[#F2F1E9] font-mono focus:border-[#D5F45B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                      Email студии *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#111312] border border-[#2e332d] text-sm text-[#F2F1E9] font-mono focus:border-[#D5F45B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                      Статус занятости (первый экран)
                    </label>
                    <input
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      placeholder="Открыт к проектам на текущий месяц"
                      className="w-full px-3.5 py-2.5 bg-[#111312] border border-[#2e332d] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2e332d]">
                  <button
                    type="submit"
                    className="px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] shadow-lg"
                  >
                    Сохранить настройки
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F2F1E9]">
                    Входящие экспресс-брифы ({inquiries.length})
                  </h3>
                  <p className="text-xs text-[#B0B5AD] mt-0.5">
                    Заявки от блогеров и брендов, отправленные через сайт
                  </p>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 text-center bg-[#111312] border border-[#2e332d]">
                    <MessageSquare className="w-10 h-10 text-[#B0B5AD] mx-auto mb-3 opacity-40" />
                    <p className="text-sm text-[#F2F1E9]">Новых заявок пока нет</p>
                    <p className="text-xs text-[#B0B5AD] mt-1">
                      Форма экспресс-брифа на сайте автоматически сохраняет заявки в этот список
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#2e332d] border border-[#2e332d] bg-[#111312]">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-display font-bold text-base text-[#F2F1E9]">
                              {inq.clientName}
                            </span>
                            <span className="text-xs font-mono text-[#D5F45B] bg-[#D5F45B]/10 border border-[#D5F45B]/30 px-2.5 py-0.5">
                              {inq.projectType}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-[#B0B5AD]">
                            {inq.createdAt}
                          </span>
                        </div>

                        <div className="text-xs text-[#B0B5AD] flex items-center gap-2">
                          <span className="text-[#F2F1E9] font-medium">Контакт:</span>
                          <span className="font-mono text-[#D5F45B]">{inq.contact}</span>
                        </div>

                        {inq.materialLink && (
                          <div className="text-xs text-[#B0B5AD] flex items-center gap-2">
                            <span className="text-[#F2F1E9] font-medium">Исходники:</span>
                            <a
                              href={inq.materialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#4FF4D2] hover:underline flex items-center gap-1 font-mono"
                            >
                              <span>{inq.materialLink}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        {inq.notes && (
                          <div className="text-xs text-[#F2F1E9] bg-[#171a18] p-3 border border-[#2e332d] leading-relaxed">
                            {inq.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: STORAGE & BACKUP */}
            {activeTab === 'storage' && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F2F1E9] mb-1">
                    Резервные копии и хранилище
                  </h3>
                  <p className="text-xs text-[#B0B5AD]">
                    Экспортируйте, восстанавливайте данные или сбрасывайте состояние к эталону
                  </p>
                </div>

                {/* Export */}
                <div className="p-6 bg-[#111312] border border-[#2e332d] space-y-3">
                  <div className="font-display font-bold text-sm text-[#F2F1E9]">
                    Экспорт базы данных (JSON)
                  </div>
                  <p className="text-xs text-[#B0B5AD] leading-relaxed">
                    Скачивает полный бэкап проектов, настроек, заявок и контактной информации.
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать бэкап JSON</span>
                  </button>
                </div>

                {/* Import */}
                <div className="p-6 bg-[#111312] border border-[#2e332d] space-y-3">
                  <div className="font-display font-bold text-sm text-[#F2F1E9]">
                    Импорт данных из JSON
                  </div>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='{"projects": [...], "config": {...}}'
                    className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] font-mono text-xs text-[#F2F1E9] focus:outline-none focus:border-[#D5F45B]"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleImportJSON}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F2F1E9] bg-[#1a1d1b] border border-[#2e332d] hover:border-[#D5F45B]"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Импортировать JSON</span>
                    </button>
                    {importStatus && (
                      <span className="text-xs font-mono text-red-400">{importStatus}</span>
                    )}
                  </div>
                </div>

                {/* Reset to Default */}
                <div className="p-6 bg-[#111312] border border-red-950/60 space-y-3">
                  <div className="font-display font-bold text-sm text-red-400">
                    Сброс к исходным проектам Siluet
                  </div>
                  <p className="text-xs text-[#B0B5AD]">
                    Восстанавливает 4 эталонных проекта Siluet с настроенными контактами.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Сбросить базу данных к эталонным проектам Siluet?')) {
                        onResetData();
                        showToast('База данных сброшена к эталону');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-300 border border-red-950/80 bg-red-950/20 hover:bg-red-950/40"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Сбросить данные</span>
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      </motion.div>
    </div>
  );
};
