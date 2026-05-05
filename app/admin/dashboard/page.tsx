'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, 
  Trash2, 
  LogOut, 
  X,
  PlusSquare,
  ImageIcon,
  DoorOpen,
  FileText,
  Loader2,
  CheckCircle2,
  Edit3,
  MapPin,
  Upload,
  CloudUpload,
  Images,
  Calendar,
  PlusCircle,
  Users,
  Settings,
  UserPlus,
  Shield,
  Key,
  Globe,
  Mail,
  Phone,
  Link,
  Activity,
  BarChart3,
  Clock,
  Sun,
  Moon,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/lib/assets/assetFacade';
import { 
  getProjects, 
  upsertProject, 
  deleteProject as repositoryDeleteProject, 
  type Project, 
  type ProjectSection 
} from '@/lib/gallery/projectRepository';
import { translateText } from '@/lib/translationService';
import { 
  getAdminUsers, 
  createAdminUser, 
  deleteAdminUser as repositoryDeleteUser, 
  updateAdminProfile,
  updateAdminPassword,
  type AdminUser 
} from '@/lib/gallery/userRepository';
import { getLogs, createLog, type ActivityLog } from '@/lib/gallery/logRepository';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [translating, setTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'users' | 'activity'>('projects');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'created_at'>>({
    title: '',
    title_ar: '',
    description: '',
    description_ar: '',
    category: 'Residential',
    location: '',
    location_ar: '',
    year: new Date().getFullYear().toString(),
    hero_image: '',
    sections: [
      { title: 'Project Visuals', title_ar: 'مرئيات المشروع', images: [] },
      { title: 'Entrance', title_ar: 'المدخل', images: [] },
      { title: 'Sales Plan', title_ar: 'خطة المبيعات', images: [] }
    ]
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const isUiMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-project-url';

  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard_theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);

    async function init() {
      if (isUiMode) {
        setUser({ id: '1', email: 'admin@demo.com' });
      } else {
        await checkUser();
      }
      const [projData, userData, logData] = await Promise.all([
        getProjects(),
        getAdminUsers(),
        getLogs()
      ]);
      setProjects(projData);
      setAdminUsers(userData);
      setLogs(logData);
      
      // Pre-fill profile name
      if (userData.length > 0) {
        const currentUser = userData.find((u: AdminUser) => u.email === (isUiMode ? 'admin@demo.com' : user?.email));
        if (currentUser?.username) setProfileName(currentUser.username);
      }
      
      setLoading(false);
    }
    init();
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('dashboard_theme', next);
  };

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.push('/admin/login');
    else setUser(user);
  }

  async function handleAutoTranslate() {
    if (!formData.title && !formData.description && !formData.location) return;
    setTranslating(true);
    try {
      const [titleAr, descAr, locAr] = await Promise.all([
        translateText(formData.title || ''),
        translateText(formData.description || ''),
        translateText(formData.location || '')
      ]);
      setFormData(prev => ({
        ...prev,
        title_ar: titleAr,
        description_ar: descAr,
        location_ar: locAr
      }));
      setSuccess('Translated successfully!');
      await createLog({
        user_email: user?.email || 'admin@demo.com',
        action: 'Auto-Translated Project',
        target: formData.title || 'Draft',
        type: 'update'
      });
      getLogs().then(setLogs);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Translation failed.');
    } finally {
      setTranslating(false);
    }
  }

  async function fetchProjects() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(type === 'hero' ? 'hero' : `section-${type}`);

    const uploadTasks = Array.from(files).map(async (file) => {
      if (isUiMode) {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800; // Resize to max 800px width
              const scaleSize = MAX_WIDTH / img.width;
              canvas.width = MAX_WIDTH;
              canvas.height = img.height * scaleSize;

              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Compress as JPEG with 0.6 quality
              const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
              resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);
        
        return publicUrl;
      }
    });

    try {
      const urls = await Promise.all(uploadTasks);
      
      if (type === 'hero') {
        setFormData(prev => ({ ...prev, hero_image: urls[0] }));
      } else {
        const next = [...formData.sections];
        const newImages = urls.map(url => ({ src: url, alt: '' }));
        next[type].images = [...next[type].images, ...newImages];
        setFormData(prev => ({ ...prev, sections: next }));
      }
    } catch (err: any) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const projectData = editingProject 
      ? { ...formData, id: editingProject.id } 
      : formData;

    const result = await upsertProject(projectData);

    if (result) {
      setSuccess(editingProject ? 'Updated!' : 'Published!');
      fetchProjects();
      setTimeout(() => {
        setShowAddModal(false);
        setEditingProject(null);
        resetForm();
        setSuccess(null);
      }, 1500);
    } else {
      setError('Operation failed. Check console for details.');
    }
    setSubmitting(false);
  };

  function resetForm() {
    setFormData({
      title: '',
      title_ar: '',
      description: '',
      description_ar: '',
      category: 'Residential',
      location: '',
      location_ar: '',
      year: new Date().getFullYear().toString(),
      hero_image: '',
      sections: [
        { title: 'Project Visuals', title_ar: 'مرئيات المشروع', images: [] },
        { title: 'Entrance', title_ar: 'المدخل', images: [] },
        { title: 'Sales Plan', title_ar: 'خطة المبيعات', images: [] }
      ]
    });
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure?')) return;
    const proj = projects.find(p => p.id === id);
    const success = await repositoryDeleteProject(id);
    if (success) {
      fetchProjects();
      await createLog({
        user_email: user?.email || 'admin@demo.com',
        action: 'Deleted Project',
        target: proj?.title || id,
        type: 'delete'
      });
      setLogs(await getLogs());
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newUserEmail) return;
    setSubmitting(true);
    const result = await createAdminUser(newUserEmail, newUserUsername, newUserPassword);
    if (result) {
      setAdminUsers([result, ...adminUsers]);
      setNewUserEmail('');
      setNewUserUsername('');
      setNewUserPassword('');
      setShowUserModal(false);
      setSuccess('User created successfully!');
      
      await createLog({
        user_email: user?.email || 'admin@demo.com',
        action: 'Added Team Member',
        target: newUserEmail,
        type: 'create'
      });
      setLogs(await getLogs());

      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError('Failed to create user.');
    }
    setSubmitting(false);
  }

  async function handleDeleteUser(id: string) {
    if (!confirm('Are you sure you want to remove this admin?')) return;
    const u = adminUsers.find(x => x.id === id);
    const success = await repositoryDeleteUser(id);
    if (success) {
      setAdminUsers(adminUsers.filter(u => u.id !== id));
      setSuccess('User removed.');
      
      await createLog({
        user_email: user?.email || 'admin@demo.com',
        action: 'Removed Team Member',
        target: u?.email || id,
        type: 'delete'
      });
      setLogs(await getLogs());

      setTimeout(() => setSuccess(null), 3000);
    }
  }

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    let successCount = 0;
    const currentId = user?.id || '1';
    
    if (profileName) {
      const ok = await updateAdminProfile(currentId, { username: profileName });
      if (ok) {
        successCount++;
        // Refresh local admin list to show new name
        setAdminUsers(adminUsers.map(u => u.id === currentId ? { ...u, username: profileName } : u));
      }
    }
    
    if (profilePassword) {
      const ok = await updateAdminPassword(profilePassword);
      if (ok) successCount++;
    }
    
    if (successCount > 0) {
      setSuccess('Profile updated successfully!');
      await createLog({
        user_email: user?.email || 'admin@demo.com',
        action: 'Updated Own Profile',
        target: profileName || user?.email || 'Self',
        type: 'update'
      });
      getLogs().then(setLogs);
      setTimeout(() => {
        setSuccess(null);
        setShowProfileModal(false);
        setProfilePassword('');
      }, 2000);
    } else {
      setError('Update failed or no changes.');
    }
    setSubmitting(false);
  }

  if (!user) return null;

  return (
    <div className={`min-h-screen transition-all duration-700 overflow-hidden font-sans ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]`} />
      
      <nav className="relative z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <CloudUpload className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold dark:text-white">Admin Dashboard</h1>
                <p className="text-[10px] text-teal-600 uppercase font-bold tracking-widest">Global Management</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'projects' ? 'bg-white dark:bg-teal-600 text-teal-600 dark:text-white shadow-lg' : 'text-gray-500 hover:text-teal-600'}`}
              >
                <Images size={16} />
                Gallery
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-white dark:bg-teal-600 text-teal-600 dark:text-white shadow-lg' : 'text-gray-500 hover:text-teal-600'}`}
              >
                <Users size={16} />
                Team
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'activity' ? 'bg-white dark:bg-teal-600 text-teal-600 dark:text-white shadow-lg' : 'text-gray-500 hover:text-teal-600'}`}
              >
                <Activity size={16} />
                Activity
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-teal-600 transition-colors"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setShowProfileModal(true)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-teal-600 transition-colors"
              title="Profile Settings"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={() => {
                if(confirm('Clear all local data and reset?')) {
                  localStorage.removeItem('mock_projects');
                  localStorage.removeItem('mock_admin_users');
                  window.location.reload();
                }
              }}
              className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-500 transition-colors tracking-widest"
            >
              Reset Local DB
            </button>
            <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="text-sm font-medium text-red-500">Sign Out</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto py-20 px-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Total Projects', value: projects.length, icon: Images, color: 'text-teal-600', bg: 'bg-teal-600/10 dark:bg-teal-600/5' },
            { label: 'Team Members', value: adminUsers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-600/10 dark:bg-blue-600/5' },
            { label: 'Total Assets', value: projects.reduce((acc, p) => acc + (p.sections?.reduce((a, s: any) => a + (s.images?.length || 0), 0) || 0), 0), icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-600/10 dark:bg-purple-600/5' },
            { label: 'System Status', value: 'Active', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-600/10 dark:bg-emerald-600/5' },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none flex items-center gap-6"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-widest">{stat.label}</div>
                <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >

        {activeTab === 'projects' ? (
          <>
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-5xl font-light dark:text-white">Gallery <span className="font-bold">Folders</span></h2>
                <p className="text-gray-500 mt-2">Create folders and upload multiple images per section.</p>
              </div>
              <button onClick={() => { setEditingProject(null); resetForm(); setShowAddModal(true); }} className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold shadow-xl shadow-teal-600/20">Add New Folder</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project: Project, index: number) => (
                <div key={project.id} className="group relative">
                  <div className="absolute -top-3 left-6 w-28 h-8 bg-gray-100 dark:bg-[#1a1a1a] rounded-t-xl border-t border-x border-gray-200 dark:border-white/5" />
                  <div className="relative z-10 bg-white dark:bg-[#121212] rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-white/5">
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                        {project.hero_image ? (
                          <Image 
                            src={assets.resolveUrl(project.hero_image)} 
                            alt={project.title} 
                            fill 
                            priority={index < 3}
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">No Cover Image</div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button onClick={() => { 
                              setEditingProject(project); 
                              const { id, created_at, ...data } = project;
                              setFormData(data as any); 
                              setShowAddModal(true); 
                            }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600"><Edit3 size={18} /></button>
                          <button onClick={() => deleteProject(project.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500"><Trash2 size={18} /></button>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold dark:text-white leading-tight">{project.title}</h3>
                          <span className="text-[10px] bg-teal-600/10 text-teal-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{project.category}</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 mb-6">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-teal-600" />
                            <span className="text-xs">{project.location || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-teal-600" />
                            <span className="text-xs">{project.year || '2024'}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-8 italic">
                          {project.description || 'No description provided.'}
                        </p>

                        <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                              <Images size={16} className="text-teal-600" />
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-tighter text-gray-400">
                              {project.sections?.reduce((acc: number, s: any) => acc + (s.images?.length || 0), 0)} Total Assets
                            </div>
                          </div>
                          <div className="text-[10px] uppercase font-bold tracking-tighter text-gray-400">
                            {project.sections?.length || 0} Sections
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : activeTab === 'users' ? (
          <div className="space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-light dark:text-white">Our <span className="font-bold">Team</span></h2>
                <p className="text-gray-500 mt-2">Manage administrative access and roles.</p>
              </div>
              <button 
                onClick={() => setShowUserModal(true)}
                className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold shadow-xl shadow-teal-600/20 flex items-center gap-2"
              >
                <UserPlus size={20} />
                Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {adminUsers.map((u, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={u.id} 
                  className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/10 dark:shadow-none flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-teal-600">
                      <Shield size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold dark:text-white">{u.username || 'Admin User'}</h3>
                        <span className={`text-[8px] uppercase font-bold px-2 py-0.5 rounded-full tracking-widest ${u.role === 'superadmin' ? 'bg-amber-500/10 text-amber-600' : 'bg-teal-500/10 text-teal-600'}`}>
                          {u.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium">{u.email}</p>
                    </div>
                  </div>
                  <button 
                    disabled={u.role === 'superadmin' || u.email === user?.email}
                    onClick={() => handleDeleteUser(u.id)}
                    className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all opacity-0 group-hover:opacity-100 disabled:hidden"
                    title="Remove Access"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-light dark:text-white">Activity <span className="font-bold">Log</span></h2>
                <p className="text-gray-500 mt-2">Historical audit trail of all platform changes.</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-2xl text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                <Clock size={14} />
                Real-time Syncing
              </div>
            </div>

            <div className="space-y-4">
              {logs.length > 0 ? logs.map((log, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  key={log.id} 
                  className="bg-white dark:bg-[#121212] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg shadow-gray-200/10 dark:shadow-none flex items-center justify-between group hover:border-teal-500/30 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      log.type === 'create' ? 'bg-teal-500/10 text-teal-600' : 
                      log.type === 'delete' ? 'bg-red-500/10 text-red-600' :
                      log.type === 'auth' ? 'bg-blue-500/10 text-blue-600' :
                      log.type === 'view' ? 'bg-amber-500/10 text-amber-600' :
                      'bg-purple-500/10 text-purple-600'
                    }`}>
                      {log.type === 'create' ? <PlusCircle size={20} /> : 
                       log.type === 'delete' ? <Trash2 size={20} /> :
                       log.type === 'auth' ? <Shield size={20} /> :
                       log.type === 'view' ? <Eye size={20} /> :
                       <Edit3 size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold dark:text-white">{log.action}</p>
                        <span className="text-[10px] text-gray-400 font-medium">— {log.target}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-medium">{log.user_email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{new Date(log.created_at).toLocaleDateString()}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </motion.div>
              )) : (
                <div className="p-20 text-center text-gray-500 italic">No activity recorded yet.</div>
              )}
            </div>
          </div>
        )}
        </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pt-24 overflow-y-auto scrollbar-hide">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl bg-white dark:bg-[#121212] rounded-[40px] shadow-2xl border border-white/10 flex flex-col max-h-[85vh]">
              <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-2xl font-bold dark:text-white">{editingProject ? 'Edit' : 'Create'} Project Folder</h3>
                <button onClick={() => setShowAddModal(false)}><X className="text-gray-500" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-12">
                  {/* Translation Hub */}
                  <div className="p-6 bg-teal-600/5 rounded-3xl border border-teal-600/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white">
                        <Images size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold dark:text-white">Arabic Localization</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Auto-translate project details</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      disabled={translating || !formData.title}
                      onClick={handleAutoTranslate}
                      className="px-6 py-2 bg-teal-600 text-white rounded-full text-xs font-bold hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {translating ? <Loader2 className="animate-spin" size={14} /> : <FileText size={14} />}
                      {translating ? 'Translating...' : 'Translate to Arabic'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <input value={formData.title} onChange={e => setFormData(prev => ({...prev, title: e.target.value}))} placeholder="Project Name (English)" className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light dark:text-white outline-none focus:border-teal-500" />
                      <input value={formData.title_ar || ''} onChange={e => setFormData(prev => ({...prev, title_ar: e.target.value}))} placeholder="اسم المشروع (العربية)" dir="rtl" className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light dark:text-white outline-none focus:border-teal-500 text-right" />
                    </div>
                    <select value={formData.category} onChange={e => setFormData(prev => ({...prev, category: e.target.value}))} className="bg-transparent border-b border-white/10 py-4 dark:text-white outline-none h-fit self-start">
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <textarea value={formData.description} onChange={e => setFormData(prev => ({...prev, description: e.target.value}))} placeholder="Description (English)" className="w-full bg-white/5 rounded-2xl p-6 h-32 dark:text-white outline-none" />
                    <textarea value={formData.description_ar || ''} onChange={e => setFormData(prev => ({...prev, description_ar: e.target.value}))} placeholder="الوصف (العربية)" dir="rtl" className="w-full bg-white/5 rounded-2xl p-6 h-32 dark:text-white outline-none text-right" />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest px-1">Location (EN)</label>
                        <input value={formData.location} onChange={e => setFormData(prev => ({...prev, location: e.target.value}))} placeholder="e.g. Cairo, Egypt" className="w-full bg-transparent border-b border-white/10 py-4 dark:text-white outline-none focus:border-teal-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest px-1 text-right block">الموقع (AR)</label>
                        <input value={formData.location_ar || ''} onChange={e => setFormData(prev => ({...prev, location_ar: e.target.value}))} placeholder="مثال: القاهرة، مصر" dir="rtl" className="w-full bg-transparent border-b border-white/10 py-4 dark:text-white outline-none focus:border-teal-500 text-right" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest px-1">Year</label>
                      <input value={formData.year} onChange={e => setFormData(prev => ({...prev, year: e.target.value}))} placeholder="e.g. 2024" className="w-full bg-transparent border-b border-white/10 py-4 dark:text-white outline-none focus:border-teal-500" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest">Hero Cover Image</label>
                    <div className="relative h-64 rounded-3xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center group">
                      {formData.hero_image ? (
                        <>
                          <Image src={assets.resolveUrl(formData.hero_image)} alt="Hero" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white px-6 py-3 rounded-full text-sm font-bold text-black flex items-center gap-2">
                              <Upload size={16} /> Change Image
                              <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'hero')} />
                            </label>
                          </div>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-teal-600/10 rounded-full flex items-center justify-center text-teal-600">
                             {uploading === 'hero' ? <Loader2 className="animate-spin" /> : <Upload size={32} />}
                          </div>
                          <span className="text-gray-500 font-medium">Click to upload hero image</span>
                          <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'hero')} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="space-y-16">
                    {formData.sections.map((section: ProjectSection, sIdx: number) => (
                      <div key={sIdx} className="space-y-8">
                         <div className="flex items-center justify-between">
                            <h4 className="text-xl font-bold dark:text-white flex items-center gap-4"><span className="w-8 h-1 bg-teal-600" /> {section.title}</h4>
                            <label className="cursor-pointer flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-widest hover:text-teal-500 transition-colors">
                              {uploading === `section-${sIdx}` ? <Loader2 className="animate-spin" size={16} /> : <PlusCircle size={16} />}
                              Upload Multiple Images
                              <input type="file" className="hidden" accept="image/*" multiple onChange={e => handleFileUpload(e, sIdx)} />
                            </label>
                         </div>
                         
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {section.images.map((img: { src: string; alt?: string }, iIdx: number) => (
                              <div key={iIdx} className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center group">
                                {img.src ? (
                                  <Image src={assets.resolveUrl(img.src)} alt={img.alt || 'Image'} fill className="object-cover" />
                                ) : (
                                  <div className="text-xs text-gray-500">No Image</div>
                                )}
                                <button type="button" onClick={() => {
                                  const next = [...formData.sections];
                                  next[sIdx].images.splice(iIdx, 1);
                                  setFormData(prev => ({...prev, sections: next}));
                                }} className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                              </div>
                            ))}
                         </div>
                         {section.images.length === 0 && (
                            <div className="h-32 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center text-gray-600 text-sm italic">
                               No images uploaded yet.
                            </div>
                         )}
                      </div>
                    ))}
                  </div>

                  <button type="submit" disabled={submitting} className="w-full py-6 bg-teal-600 text-white rounded-full font-bold shadow-2xl flex items-center justify-center gap-4">
                    {submitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={24} /> {editingProject ? 'Save Changes' : 'Create Folder'}</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        {/* Profile Settings Modal */}
        <AnimatePresence>
          {showProfileModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProfileModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white dark:bg-[#121212] rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">Profile Settings</h3>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Manage your identity & security</p>
                  </div>
                  <button onClick={() => setShowProfileModal(false)}><X className="text-gray-500" /></button>
                </div>

                <form onSubmit={handleUpdateProfile} className="p-12 space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest">Display Name</label>
                    <div className="relative">
                      <Shield className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        value={profileName}
                        onChange={e => setProfileName(e.target.value)}
                        placeholder="Your full name" 
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 dark:text-white outline-none focus:border-teal-500 transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest">Update Password</label>
                    <div className="relative">
                      <Key className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="password" 
                        value={profilePassword}
                        onChange={e => setProfilePassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 dark:text-white outline-none focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <p className="text-[10px] text-gray-500">Leave blank to keep your current password.</p>
                  </div>

                  <button type="submit" disabled={submitting} className="w-full py-6 bg-teal-600 text-white rounded-full font-bold shadow-2xl flex items-center justify-center gap-4">
                    {submitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={24} /> Update Profile</>}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Invite User Modal */}
        <AnimatePresence>
          {showUserModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUserModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white dark:bg-[#121212] rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-2xl font-bold dark:text-white">Invite Admin</h3>
                  <button onClick={() => setShowUserModal(false)}><X className="text-gray-500" /></button>
                </div>

                <form onSubmit={handleAddUser} className="p-12 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest">Full Name / Username</label>
                      <div className="relative">
                        <Shield className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          required
                          value={newUserUsername}
                          onChange={e => setNewUserUsername(e.target.value)}
                          placeholder="John Doe" 
                          className="w-full bg-transparent border-b border-white/10 py-3 pl-8 dark:text-white outline-none focus:border-teal-500 transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest">Admin Email</label>
                      <div className="relative">
                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="email" 
                          required
                          value={newUserEmail}
                          onChange={e => setNewUserEmail(e.target.value)}
                          placeholder="email@darelmeamar.com" 
                          className="w-full bg-transparent border-b border-white/10 py-3 pl-8 dark:text-white outline-none focus:border-teal-500 transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold text-teal-600 tracking-widest">Initial Password</label>
                      <div className="relative">
                        <Key className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="password" 
                          required
                          value={newUserPassword}
                          onChange={e => setNewUserPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full bg-transparent border-b border-white/10 py-3 pl-8 dark:text-white outline-none focus:border-teal-500 transition-colors" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10 text-[10px] text-amber-500/80 uppercase font-bold tracking-widest leading-relaxed">
                    Note: For local storage mode, these credentials will be saved immediately. For Supabase, only the profile will be created.
                  </div>

                  <button type="submit" disabled={submitting} className="w-full py-6 bg-teal-600 text-white rounded-full font-bold shadow-2xl flex items-center justify-center gap-4">
                    {submitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={24} /> Send Invitation</>}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Status Toasts */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-teal-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold flex items-center gap-3">
              <CheckCircle2 size={20} /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-red-500 text-white px-8 py-4 rounded-full shadow-2xl font-bold flex items-center gap-3">
              <X size={20} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.2); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
