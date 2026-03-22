import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

/**
 * Helper to convert common image/document sharing links (Google Drive, etc.)
 * to direct-render image or preview URLs.
 */
const fixMediaUrl = (url, type = 'image') => {
  if (!url) return 'https://images.unsplash.com/photo-1590424753858-3b6b1f31b6df?w=800&q=80';
  
  // Google Drive Fixer
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (fileId && fileId[1]) {
      if (type === 'image') return `https://docs.google.com/uc?id=${fileId[1]}&export=view`;
      if (type === 'preview') return `https://drive.google.com/file/d/${fileId[1]}/preview`;
    }
  }
  
  // YouTube Fixer
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  
  return url;
};

const Education = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [courseForm, setCourseForm] = useState({
    name: '', description: '', category: '', thumbnail: '', 
    video_url: '', audio_url: '', slide_url: '', mindmap_url: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('capy_user'));
    setUser(storedUser);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    const url = courseForm.id ? 'http://localhost:5001/api/courses/update' : 'http://localhost:5001/api/courses';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm)
      });
      if (response.ok) {
        fetchCourses();
        setIsEditing(false);
        setCourseForm({ name: '', description: '', category: '', thumbnail: '', video_url: '', audio_url: '', slide_url: '', mindmap_url: '' });
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setCourseForm(course);
    setIsEditing(true);
  };

  const isAdmin = user?.role === 'admin';
  const isNotebookLM = (url) => url && url.includes('notebooklm.google.com');

  return (
    <Layout>
      <section className="px-12 py-12 max-w-[1600px] mx-auto w-full transition-all duration-500 ease-in-out">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="font-headline text-primary font-black leading-tight mb-4 tracking-tight text-5xl">
              Central do Aluno <br/>
              <span className="text-secondary opacity-80">CapyFinance Education</span>
            </h2>
          </div>
          {isAdmin && (
            <button 
              onClick={() => {
                setCourseForm({ name: '', description: '', category: '', thumbnail: '', video_url: '', audio_url: '', slide_url: '', mindmap_url: '' });
                setIsEditing(true);
              }}
              className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              Novo Módulo
            </button>
          )}
        </div>

        {/* Viewer */}
        {selectedCourse ? (
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-500 border border-primary/10 overflow-hidden relative">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-8 right-8 text-on-surface-variant/40 hover:text-primary transition-colors z-50 bg-white/10 p-2 rounded-full"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-8">
                {/* Visualizador de Documento / Vídeo / NotebookLM */}
                <div id="document-viewer" className="aspect-video bg-stone-900 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/5 flex items-center justify-center relative">
                  {/* Iframe que resolve o problema do #document nao renderizar */}
                  {selectedCourse.video_url ? (
                    <iframe 
                      src={fixMediaUrl(selectedCourse.video_url)} 
                      className="w-full h-full border-none"
                      allowFullScreen
                      title="Video Content"
                    />
                  ) : selectedCourse.slide_url && (isNotebookLM(selectedCourse.slide_url) || selectedCourse.slide_url.includes('drive.google.com')) ? (
                    <iframe 
                      src={fixMediaUrl(selectedCourse.slide_url, 'preview')} 
                      className="w-full h-full border-none"
                      title="Document Content"
                    />
                  ) : isNotebookLM(selectedCourse.thumbnail) ? (
                    <iframe src={selectedCourse.thumbnail} className="w-full h-full border-none" title="NotebookLM Content"/>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-white/20">
                       <span className="material-symbols-outlined text-8xl">description</span>
                       <p className="font-headline font-black uppercase text-xs tracking-widest">Nenhum documento para exibir no momento</p>
                    </div>
                  )}
                  
                  {/* Overlay de Carga (Opcional) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                     <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                </div>

                {/* Podcast Audio Player */}
                {selectedCourse.audio_url && (
                  <div className="bg-gradient-to-br from-tertiary/10 to-primary/5 p-8 rounded-[2rem] border border-tertiary/20 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                    <div className="w-24 h-24 bg-tertiary rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <span className="material-symbols-outlined text-5xl">headphones</span>
                    </div>
                    <div className="flex-1 space-y-4">
                       <h4 className="text-2xl font-black font-headline text-primary">Audio Overview Podcast</h4>
                       <audio controls className="w-full h-10">
                          <source src={selectedCourse.audio_url} type="audio/mpeg" />
                       </audio>
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <h3 className="text-3xl font-black font-headline text-primary mb-4">{selectedCourse.name}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg max-w-3xl">{selectedCourse.description}</p>
                </div>
              </div>

              {/* Sidebar Materials */}
              <div className="lg:col-span-4 bg-surface-container rounded-[2rem] p-8 space-y-6">
                <h4 className="font-headline font-bold text-xl mb-6">Kit do Aluno</h4>
                {[
                  { label: 'Vídeo da Aula', icon: 'smart_display', url: selectedCourse.video_url },
                  { label: 'Podcast Especial', icon: 'volume_up', url: selectedCourse.audio_url },
                  { label: 'Caderno NotebookLM', icon: 'auto_awesome', url: isNotebookLM(selectedCourse.slide_url) ? selectedCourse.slide_url : (isNotebookLM(selectedCourse.thumbnail) ? selectedCourse.thumbnail : '') },
                  { label: 'Material PDF / Slides', icon: 'description', url: selectedCourse.slide_url },
                  { label: 'Mapa Mental', icon: 'hub', url: selectedCourse.mindmap_url },
                ].map((item) => (
                  item.url && (
                    <a 
                      key={item.label}
                      href={item.url || '#'} 
                      target="_blank"
                      className="flex items-center justify-between p-5 rounded-2xl transition-all border bg-surface-container-lowest border-primary/10 hover:shadow-xl hover:border-primary/40 group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary">{item.icon}</span>
                        <span className="font-bold text-sm text-on-surface">{item.label}</span>
                      </div>
                      <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="group flex flex-col bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 hover:translate-y-[-8px]"
              >
                <div className="relative aspect-video overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setSelectedCourse(course)}>
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={course.name} 
                    src={fixMediaUrl(course.thumbnail)}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">{course.category}</span>
                    <h4 className="text-white font-headline text-2xl font-black leading-tight">{course.name}</h4>
                  </div>
                  {isAdmin && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEdit(course); }}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-primary transition-all shadow-lg z-20"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1 justify-between bg-white relative">
                  <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed mb-6 font-body">
                    {course.description}
                  </p>
                  <button onClick={() => setSelectedCourse(course)} className="w-full h-14 bg-primary/5 text-primary rounded-xl font-black uppercase text-xs tracking-widest border border-primary/10 hover:bg-primary hover:text-white transition-all">
                    Estudar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-6 transition-all">
            <div className="bg-surface-container-lowest w-full max-w-4xl rounded-[3rem] p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-primary/20">
              <h3 className="text-3xl font-black font-headline text-primary mb-10 border-b border-primary/10 pb-6">{courseForm.id ? 'Editar Módulo' : 'Novo Módulo'}</h3>
              <form onSubmit={handleSaveCourse} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-stone-400">Título</label>
                  <input className="w-full bg-surface-container border-none p-5 rounded-2xl font-bold focus:ring-2 ring-primary transition-all outline-none" value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})} required/>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-stone-400">Descrição</label>
                  <textarea className="w-full bg-surface-container border-none p-5 rounded-2xl font-body h-32 focus:ring-2 ring-primary transition-all outline-none" value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">image</span>
                      Link da Imagem (Miniatura)
                   </label>
                   <input className="w-full bg-surface-container border-none p-5 rounded-2xl text-xs font-bold focus:ring-2 ring-primary transition-all outline-none" value={courseForm.thumbnail} onChange={e => setCourseForm({...courseForm, thumbnail: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-stone-400">Categoria (Ex: Renda Fixa)</label>
                  <input className="w-full bg-surface-container border-none p-5 rounded-2xl font-bold focus:ring-2 ring-primary transition-all outline-none" value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})} />
                </div>
                
                <div className="md:col-span-2 mt-4 pt-6 border-t border-primary/10">
                   <h4 className="text-primary font-black uppercase text-xs tracking-widest mb-6">Links de Material</h4>
                </div>
                
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary">Link do Vídeo</label>
                   <input className="w-full bg-surface-container border-none p-5 rounded-2xl text-xs font-bold focus:ring-2 ring-primary transition-all outline-none" value={courseForm.video_url} onChange={e => setCourseForm({...courseForm, video_url: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-tertiary">Link do Áudio</label>
                   <input className="w-full bg-surface-container border-none p-5 rounded-2xl text-xs font-bold focus:ring-2 ring-tertiary transition-all outline-none" value={courseForm.audio_url} onChange={e => setCourseForm({...courseForm, audio_url: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">NotebookLM / Slides</label>
                   <input className="w-full bg-surface-container border-none p-5 rounded-2xl text-xs font-bold focus:ring-2 ring-primary transition-all outline-none" value={courseForm.slide_url} onChange={e => setCourseForm({...courseForm, slide_url: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Mapa Mental</label>
                   <input className="w-full bg-surface-container border-none p-5 rounded-2xl text-xs font-bold focus:ring-2 ring-primary transition-all outline-none" value={courseForm.mindmap_url} onChange={e => setCourseForm({...courseForm, mindmap_url: e.target.value})} />
                </div>
                
                <div className="md:col-span-2 flex justify-end gap-6 mt-12 pt-8 border-t border-primary/10">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-5 text-stone-400 font-bold uppercase text-xs">Cancelar</button>
                  <button type="submit" className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/30">
                    Salvar Mudanças
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Education;
