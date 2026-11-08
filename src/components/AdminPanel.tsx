import React, { useState } from 'react';
import { 
  X, Plus, Trash2, Edit2, ArrowUp, ArrowDown, Star, Eye, EyeOff, 
  Settings, FolderKanban, MessageSquare, Database, RefreshCw, Download, Upload, Check 
} from 'lucide-react';
import { Project, SiteConfig, ProjectInquiry, AspectRatio } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
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
  const [configSavedToast, setConfigSavedToast] = useState(false);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

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

      // if new project is featured, un-feature others if desired
      let updated = [...projects];
      if (featured) {
        updated = updated.map((p) => ({ ...p, featured: false }));
      }
      updated.push(newProj);
      onSaveProjects(updated);
    } else if (editingProject) {
      let updated = projects.map((p) => {
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
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Удалить проект из портфолио?')) {
      const updated = projects.filter((p) => p.id !== id);
      onSaveProjects(updated);
    }
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const list = [...projects];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // re-assign orders
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
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 2500);
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
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed && Array.isArray(parsed.projects)) {
        onSaveProjects(parsed.projects);
        if (parsed.config) onSaveConfig(parsed.config);
        if (Array.isArray(parsed.inquiries)) onSaveInquiries(parsed.inquiries);
        setImportStatus('Успешно импортировано!');
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Ошибка: неверный формат JSON');
      }
    } catch (e) {
      setImportStatus('Ошибка парсинга JSON');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#141615]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-[#1E211F] border border-[#363B35] rounded-[2px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#363B35] bg-[#141615]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#D5F45B] rounded-none" />
            <h2 className="font-display font-bold text-base sm:text-lg text-[#F2F1E9] tracking-tight uppercase">
              Панель управления Siluet
            </h2>
            <span className="text-xs font-mono text-[#B0B5AD] border border-[#363B35] px-2 py-0.5">
              Admin v1.2
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1E211F] border border-[#363B35] transition-colors"
            aria-label="Закрыть панель управления"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 bg-[#171918] border-b border-[#363B35] overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'projects'
                ? 'border-[#D5F45B] text-[#D5F45B]'
                : 'border-transparent text-[#B0B5AD] hover:text-[#F2F1E9]'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Проекты ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-[#D5F45B] text-[#D5F45B]'
                : 'border-transparent text-[#B0B5AD] hover:text-[#F2F1E9]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Настройки &amp; Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'inquiries'
                ? 'border-[#D5F45B] text-[#D5F45B]'
                : 'border-transparent text-[#B0B5AD] hover:text-[#F2F1E9]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Заявки ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'storage'
                ? 'border-[#D5F45B] text-[#D5F45B]'
                : 'border-transparent text-[#B0B5AD] hover:text-[#F2F1E9]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Хранилище &amp; Бэкап</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              {/* Form Modal / Overlay when creating or editing */}
              {(isCreating || editingProject) ? (
                <div className="bg-[#141615] border border-[#363B35] p-6 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#363B35]">
                    <h3 className="font-display font-bold text-lg text-[#F2F1E9]">
                      {isCreating ? 'Добавление нового проекта' : `Редактирование: ${editingProject?.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingProject(null);
                      }}
                      className="text-xs text-[#B0B5AD] hover:text-[#F2F1E9]"
                    >
                      Отмена
                    </button>
                  </div>

                  <form onSubmit={handleSaveProjectForm} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Название проекта *
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Формат (например: YouTube / 16:9 или Reels / 9:16)
                        </label>
                        <input
                          type="text"
                          required
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Пропорции видео (Aspect Ratio)
                        </label>
                        <select
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        >
                          <option value="16:9">Горизонтальное 16:9 (YouTube / Commercial)</option>
                          <option value="9:16">Вертикальное 9:16 (Reels / Shorts / TikTok)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Моя роль в проекте
                        </label>
                        <input
                          type="text"
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Монтаж, саунд-дизайн, грейдинг"
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Хронометраж (например: 18:42 или 0:34)
                        </label>
                        <input
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Год релиза
                        </label>
                        <input
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                        URL обложки (постер)
                      </label>
                      <input
                        type="text"
                        required
                        value={coverUrl}
                        onChange={(e) => setCoverUrl(e.target.value)}
                        placeholder="/src/assets/images/... или https://..."
                        className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                      />
                      {/* Presets */}
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="text-[#B0B5AD] py-1">Быстрый выбор:</span>
                        <button
                          type="button"
                          onClick={() => setCoverUrl('/src/assets/images/siluet_doc_cover_1793524681413.jpg')}
                          className="px-2 py-1 bg-[#1E211F] border border-[#363B35] text-xs hover:border-[#D5F45B]"
                        >
                          Документалка (16:9)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverUrl('/src/assets/images/siluet_reels_cover_1793524681278.jpg')}
                          className="px-2 py-1 bg-[#1E211F] border border-[#363B35] text-xs hover:border-[#D5F45B]"
                        >
                          Streetwear Reels (9:16)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverUrl('/src/assets/images/siluet_commercial_cover_1793524681616.jpg')}
                          className="px-2 py-1 bg-[#1E211F] border border-[#363B35] text-xs hover:border-[#D5F45B]"
                        >
                          Реклама Hypercar (16:9)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverUrl('/src/assets/images/siluet_podcast_cover_1793524683623.jpg')}
                          className="px-2 py-1 bg-[#1E211F] border border-[#363B35] text-xs hover:border-[#D5F45B]"
                        >
                          Студийный подкаст (16:9)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                        Ссылка на видео (YouTube / Vimeo / mp4)
                      </label>
                      <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                        Описание кейса и особенности монтажа
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Опишите структуру, приёмы монтажа, работу со звуком..."
                        className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Инструменты (через запятую)
                        </label>
                        <input
                          type="text"
                          value={toolsStr}
                          onChange={(e) => setToolsStr(e.target.value)}
                          placeholder="Premiere Pro, DaVinci Resolve, After Effects"
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                          Клиент / Канал
                        </label>
                        <input
                          type="text"
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          placeholder="Название канала или бренда"
                          className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-[#F2F1E9]">
                        <input
                          type="checkbox"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="accent-[#D5F45B]"
                        />
                        <span>Сделать главным кейсом (Featured на всю ширину)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-sm text-[#F2F1E9]">
                        <input
                          type="checkbox"
                          checked={published}
                          onChange={(e) => setPublished(e.target.checked)}
                          className="accent-[#D5F45B]"
                        />
                        <span>Опубликован на сайте</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-[#363B35]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-2 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#363B35]"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f]"
                      >
                        Сохранить проект
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#F2F1E9]">
                        Список опубликованных проектов
                      </h3>
                      <p className="text-xs text-[#B0B5AD]">
                        Первый проект или отмеченный как «Главный» отображается в портфолио крупным планом.
                      </p>
                    </div>
                    <button
                      onClick={startCreateProject}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Добавить проект</span>
                    </button>
                  </div>

                  <div className="divide-y divide-[#363B35] border border-[#363B35] bg-[#141615]">
                    {projects.map((proj, idx) => (
                      <div 
                        key={proj.id} 
                        className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#1E211F]/60 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {/* Thumbnail */}
                          <div className="w-16 h-10 bg-[#1E211F] border border-[#363B35] overflow-hidden shrink-0">
                            <img
                              src={proj.coverUrl}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-bold text-sm text-[#F2F1E9]">
                                {proj.title}
                              </h4>
                              {proj.featured && (
                                <span className="text-[10px] font-mono text-[#D5F45B] bg-[#141615] border border-[#D5F45B]/40 px-1.5 py-0.2">
                                  FEATURED
                                </span>
                              )}
                              {!proj.published && (
                                <span className="text-[10px] font-mono text-[#B0B5AD] bg-[#1E211F] border border-[#363B35] px-1.5 py-0.2">
                                  ЧЕРНОВИК
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#B0B5AD] mt-0.5">
                              {proj.format} · {proj.role} · {proj.duration}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {/* Reorder */}
                          <button
                            onClick={() => handleMoveProject(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] disabled:opacity-30 border border-[#363B35]"
                            title="Поднять выше"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveProject(idx, 'down')}
                            disabled={idx === projects.length - 1}
                            className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] disabled:opacity-30 border border-[#363B35]"
                            title="Опустить ниже"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => startEditProject(proj)}
                            className="p-1.5 text-[#B0B5AD] hover:text-[#D5F45B] border border-[#363B35]"
                            title="Редактировать"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 text-[#B0B5AD] hover:text-red-400 border border-[#363B35]"
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
                <h3 className="font-display font-bold text-lg text-[#F2F1E9] mb-1">
                  Настройки визуальной концепции и Hero
                </h3>
                <p className="text-xs text-[#B0B5AD]">
                  Управление режимами отображения, ссылками и видео в первом экране.
                </p>
              </div>

              {/* Demo Mode Toggle (Required by brief) */}
              <div className="p-4 bg-[#141615] border border-[#363B35] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-sm text-[#F2F1E9]">
                      Демонстрационный режим
                    </div>
                    <div className="text-xs text-[#B0B5AD] mt-0.5">
                      «Пять мест под будущие работы сохраняются только в демонстрационном режиме. На опубликованном сайте показывать реальные проекты или одно аккуратное пустое состояние.»
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
                  Статус: {demoMode ? 'Демо-режим ВКЛЮЧЕН (показываются 5 слотов)' : 'Боевой режим (только опубликованные проекты)'}
                </div>
              </div>

              {/* Hero Video Block Configuration */}
              <div className="p-4 bg-[#141615] border border-[#363B35] space-y-3">
                <div className="font-display font-bold text-sm text-[#F2F1E9]">
                  Правый видеоблок в Hero (16:9)
                </div>
                <p className="text-xs text-[#B0B5AD]">
                  По умолчанию в блоке отображается фирменная визуальная композиция Siluet: перекрывающиеся кадры, тонкая шкала монтажа и триада «История / Ритм / Эмоция» (без кнопки play).
                </p>

                <label className="flex items-center gap-2 cursor-pointer text-sm text-[#F2F1E9]">
                  <input
                    type="checkbox"
                    checked={heroVideoEnabled}
                    onChange={(e) => setHeroVideoEnabled(e.target.checked)}
                    className="accent-[#D5F45B]"
                  />
                  <span>Включить реальное видео в Hero вместо фирменной абстракции</span>
                </label>

                {heroVideoEnabled && (
                  <div>
                    <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                      URL видео для Hero (YouTube embed или видеофайл)
                    </label>
                    <input
                      type="text"
                      value={heroVideoUrl}
                      onChange={(e) => setHeroVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Telegram & Contacts */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                    Ссылка на Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    value={telegramUrl}
                    onChange={(e) => setTelegramUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141615] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                    Email для связи
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141615] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                    Статус занятости (отображается в Hero)
                  </label>
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Открыт к проектам на текущий месяц"
                    className="w-full px-3 py-2 bg-[#141615] border border-[#363B35] text-sm text-[#F2F1E9] focus:border-[#D5F45B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#363B35]">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f]"
                >
                  Применить настройки
                </button>
                {configSavedToast && (
                  <span className="text-xs font-mono text-[#D5F45B] flex items-center gap-1">
                    <Check className="w-4 h-4" /> Настройки сохранены!
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F2F1E9]">
                    Входящие экспресс-брифы
                  </h3>
                  <p className="text-xs text-[#B0B5AD]">
                    Заявки от клиентов, отправленные через сайт.
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center bg-[#141615] border border-[#363B35]">
                  <MessageSquare className="w-8 h-8 text-[#B0B5AD] mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-[#F2F1E9]">Новых заявок пока нет</p>
                  <p className="text-xs text-[#B0B5AD] mt-1">
                    Клиентские брифы будут сохраняться сюда автоматически.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#363B35] border border-[#363B35] bg-[#141615]">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-5 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-display font-bold text-sm text-[#F2F1E9]">
                            {inq.clientName}
                          </span>
                          <span className="text-xs font-mono text-[#D5F45B] border border-[#363B35] px-2 py-0.5">
                            {inq.projectType}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#B0B5AD]">
                          {inq.createdAt}
                        </span>
                      </div>

                      <div className="text-xs text-[#B0B5AD]">
                        <span className="text-[#F2F1E9] font-medium">Контакт:</span> {inq.contact}
                      </div>

                      {inq.materialLink && (
                        <div className="text-xs text-[#B0B5AD]">
                          <span className="text-[#F2F1E9] font-medium">Исходники:</span>{' '}
                          <a
                            href={inq.materialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D5F45B] underline"
                          >
                            {inq.materialLink}
                          </a>
                        </div>
                      )}

                      {inq.notes && (
                        <div className="text-xs text-[#B0B5AD] bg-[#1E211F] p-3 border border-[#363B35]">
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
                <h3 className="font-display font-bold text-lg text-[#F2F1E9] mb-1">
                  Управление постоянным хранилищем
                </h3>
                <p className="text-xs text-[#B0B5AD]">
                  Все проекты, настройки и брифы сохраняются в persistent LocalStorage браузера.
                </p>
              </div>

              {/* Export */}
              <div className="p-5 bg-[#141615] border border-[#363B35] space-y-3">
                <div className="font-display font-bold text-sm text-[#F2F1E9]">
                  Экспорт данных (Бэкап JSON)
                </div>
                <p className="text-xs text-[#B0B5AD]">
                  Скачайте полную копию проектов, настроек и заявок для переноса или резервной копии.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f]"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать JSON бэкап</span>
                </button>
              </div>

              {/* Import */}
              <div className="p-5 bg-[#141615] border border-[#363B35] space-y-3">
                <div className="font-display font-bold text-sm text-[#F2F1E9]">
                  Импорт данных из JSON
                </div>
                <p className="text-xs text-[#B0B5AD]">
                  Вставьте JSON структуру бэкапа для восстановления проектов.
                </p>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='{"projects": [...], "config": {...}}'
                  className="w-full px-3 py-2 bg-[#1E211F] border border-[#363B35] font-mono text-xs text-[#F2F1E9] focus:outline-none focus:border-[#D5F45B]"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleImportJSON}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F2F1E9] bg-transparent border border-[#363B35] hover:border-[#B0B5AD]"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Импортировать JSON</span>
                  </button>
                  {importStatus && (
                    <span className="text-xs font-mono text-[#D5F45B]">{importStatus}</span>
                  )}
                </div>
              </div>

              {/* Reset to Default */}
              <div className="p-5 bg-[#141615] border border-red-900/40 space-y-3">
                <div className="font-display font-bold text-sm text-red-400">
                  Сброс к исходным проектам Siluet
                </div>
                <p className="text-xs text-[#B0B5AD]">
                  Сбросит все изменения и восстановит 4 эталонных проекта Siluet и исходные настройки.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Сбросить базу данных к эталонным проектам Siluet?')) {
                      onResetData();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-300 border border-red-900/60 hover:bg-red-950/40"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Сбросить к исходным данным</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
