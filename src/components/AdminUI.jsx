import { useState, useEffect } from 'react';

// =========================================================
// فرم ورودی (مستقل برای جلوگیری از پریدن فوکوس)
// =========================================================
function FormFields({ pData, setPData, item, type, statusOptions }) {
  const inputStyle = { width: '100%', padding: '0.5rem', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '4px' };

  // تگ‌های سریع آپدیت شدند
  const quickTags = ['favorite', 'masterpiece', 'hidden-gem', 'Bullshit'];

  const handleAddTag = (tag) => {
    const currentTags = pData.tags ? pData.tags.split(',').map(t => t.trim()) : [];
    if (!currentTags.includes(tag)) {
      const newTags = currentTags.length > 0 ? `${pData.tags}, ${tag}` : tag;
      setPData('tags', newTags);
    }
  };

  // تابع کنترل نمره (جلوگیری از وارد کردن عدد بالای ۵ یا زیر ۰)
  const handleRatingChange = (field, value) => {
    let num = parseFloat(value);
    if (isNaN(num)) {
      setPData(field, '');
      return;
    }
    if (num > 5) num = 5;
    if (num < 0) num = 0;
    setPData(field, num.toString());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
      
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>عنوان:</label>
          <input type="text" value={item.title} onChange={e => { item.title = e.target.value; setPData('title', e.target.value); }} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: '100px' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>سال:</label>
          <input type="text" value={item.year} onChange={e => { item.year = e.target.value; setPData('year', e.target.value); }} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', background: '#1a1a1a', padding: '1rem', borderRadius: '8px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>تاریخ شروع (اختیاری):</label>
          <input type="date" value={pData.date_started} onChange={e => setPData('date_started', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>تاریخ پایان / تماشا:</label>
          <input type="date" value={pData.date_finished} onChange={e => setPData('date_finished', e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>نمره کلی (از ۵):</label>
          <input 
            type="number" step="0.1" min="0" max="5" 
            value={pData.rating} 
            onChange={e => handleRatingChange('rating', e.target.value)} 
            style={inputStyle} 
          />
        </div>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>وضعیت:</label>
          <select value={pData.status} onChange={e => setPData('status', e.target.value)} style={inputStyle}>
            {statusOptions[type].map(opt => <option key={opt.val} value={opt.val}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>ژانرها (با کاما جدا کنید):</label>
        <input type="text" value={pData.genres} onChange={e => setPData('genres', e.target.value)} style={inputStyle} placeholder="Action, Drama, Sci-Fi" />
      </div>

      {type === 'game' && (
        <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ margin: 0, color: '#8b5cf6' }}>نمرات جزئی (اختیاری - از ۵)</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '100px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>داستان:</label><input type="number" step="0.1" min="0" max="5" value={pData.story_rating} onChange={e => handleRatingChange('story_rating', e.target.value)} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '100px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>گیم‌پلی:</label><input type="number" step="0.1" min="0" max="5" value={pData.gameplay_rating} onChange={e => handleRatingChange('gameplay_rating', e.target.value)} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '100px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>موسیقی:</label><input type="number" step="0.1" min="0" max="5" value={pData.music_rating} onChange={e => handleRatingChange('music_rating', e.target.value)} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '100px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>گرافیک:</label><input type="number" step="0.1" min="0" max="5" value={pData.graphics_rating} onChange={e => handleRatingChange('graphics_rating', e.target.value)} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '100px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>فنی:</label><input type="number" step="0.1" min="0" max="5" value={pData.technical_rating} onChange={e => handleRatingChange('technical_rating', e.target.value)} style={inputStyle} /></div>
          </div>
          
          <h4 style={{ margin: 0, color: '#8b5cf6', marginTop: '1rem' }}>اطلاعات تکمیلی بازی</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>درصد تکمیل:</label><input type="number" min="0" max="100" value={pData.completion_percentage} onChange={e => { let val = parseInt(e.target.value); if(val>100)val=100; if(val<0)val=0; setPData('completion_percentage', isNaN(val)?'':val.toString()); }} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>اچیومنت باز شده:</label><input type="number" min="0" value={pData.achievements_unlocked} onChange={e => setPData('achievements_unlocked', e.target.value)} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>کل اچیومنت‌ها:</label><input type="number" min="0" value={pData.achievements_total} onChange={e => setPData('achievements_total', e.target.value)} style={inputStyle} /></div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>توسعه‌دهنده:</label><input type="text" value={pData.developer} onChange={e => setPData('developer', e.target.value)} style={inputStyle} /></div>
            <div style={{ flex: 1, minWidth: '150px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>ناشر:</label><input type="text" value={pData.publisher} onChange={e => setPData('publisher', e.target.value)} style={inputStyle} /></div>
          </div>
          <div><label style={{ display: 'block', marginBottom: '0.3rem' }}>پلتفرم‌ها (با کاما):</label><input type="text" value={pData.platforms} onChange={e => setPData('platforms', e.target.value)} style={inputStyle} /></div>
        </div>
      )}

      {type === 'movie' && (<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}><div style={{ flex: 1, minWidth: '150px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>کارگردان:</label><input type="text" value={pData.director} onChange={e => setPData('director', e.target.value)} style={inputStyle} /></div><div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>مدت (دقیقه):</label><input type="number" value={pData.runtime} onChange={e => setPData('runtime', e.target.value)} style={inputStyle} /></div></div>)}
      {type === 'series' && (<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}><div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>تعداد فصل:</label><input type="number" value={pData.seasons} onChange={e => setPData('seasons', e.target.value)} style={inputStyle} /></div><div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>تعداد قسمت:</label><input type="number" value={pData.episodes} onChange={e => setPData('episodes', e.target.value)} style={inputStyle} /></div></div>)}
      {type === 'book' && (<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}><div style={{ flex: 1, minWidth: '150px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>نویسنده:</label><input type="text" value={pData.author} onChange={e => setPData('author', e.target.value)} style={inputStyle} /></div><div style={{ flex: 1, minWidth: '120px' }}><label style={{ display: 'block', marginBottom: '0.3rem' }}>تعداد صفحات:</label><input type="number" value={pData.pages} onChange={e => setPData('pages', e.target.value)} style={inputStyle} /></div></div>)}
      {type === 'music' && (<div><label style={{ display: 'block', marginBottom: '0.3rem' }}>هنرمند:</label><input type="text" value={pData.artist} onChange={e => setPData('artist', e.target.value)} style={inputStyle} /></div>)}

      <div>
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>تگ‌ها (با کاما جدا کنید):</label>
        <input type="text" placeholder="مثال: favorite, masterpiece" value={pData.tags} onChange={e => setPData('tags', e.target.value)} style={inputStyle} />
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {quickTags.map(tag => (
            <button 
              key={tag} 
              type="button" 
              onClick={() => handleAddTag(tag)}
              style={{ background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '999px', padding: '0.2rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      <div><label style={{ display: 'block', marginBottom: '0.3rem' }}>نظر کوتاه:</label><textarea rows="3" value={pData.summary} onChange={e => setPData('summary', e.target.value)} style={inputStyle} /></div>
    </div>
  );
}

// =========================================================
// کامپوننت اصلی پنل ادمین
// =========================================================
export default function AdminUI({ tmdbKey, rawgKey }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const SECRET_PASSWORD = "baqi"; 

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('baqi_admin_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('baqi_admin_auth', 'true');
    } else {
      setAuthError('❌ رمز عبور اشتباه است!');
    }
  };

  const [mode, setMode] = useState('single');
  const [step, setStep] = useState('search'); 
  const [query, setQuery] = useState('');
  const [bulkQuery, setBulkQuery] = useState('');
  const [type, setType] = useState('movie');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const initialPersonalData = {
    rating: '0', status: '', summary: '', tags: '', genres: '',
    date_started: '', date_finished: '', 
    director: '', runtime: '', seasons: '', episodes: '', 
    platforms: '', developer: '', author: '', pages: '', artist: '',
    story_rating: '', gameplay_rating: '', music_rating: '', graphics_rating: '', technical_rating: '',
    publisher: '', completion_percentage: '', achievements_unlocked: '', achievements_total: ''
  };

  const [personalData, setPersonalData] = useState(initialPersonalData);
  const [generatedMD, setGeneratedMD] = useState('');
  const [bulkResults, setBulkResults] = useState([]);
  const [expandedBulkIndex, setExpandedBulkIndex] = useState(null);

  const statusOptions = {
    movie: [{ val: 'watched', label: 'تماشا شده' }, { val: 'watching', label: 'در حال تماشا' }, { val: 'planned', label: 'برنامه تماشا' }, { val: 'dropped', label: 'رها شده' }],
    series: [{ val: 'completed', label: 'تکمیل شده' }, { val: 'watching', label: 'در حال تماشا' }, { val: 'paused', label: 'متوقف شده' }, { val: 'planned', label: 'برنامه تماشا' }, { val: 'dropped', label: 'رها شده' }],
    game: [{ val: 'completed', label: 'تکمیل شده' }, { val: 'playing', label: 'در حال تجربه' }, { val: 'backlog', label: 'در صف' }, { val: 'paused', label: 'متوقف شده' }, { val: 'dropped', label: 'رها شده' }],
    book: [{ val: 'completed', label: 'خوانده شده' }, { val: 'reading', label: 'در حال مطالعه' }, { val: 'planned', label: 'برنامه مطالعه' }, { val: 'dropped', label: 'رها شده' }],
    music: [{ val: 'listened', label: 'شنیده شده' }, { val: 'listening', label: 'در حال شنیدن' }, { val: 'planned', label: 'برنامه' }]
  };

  const TypeOptions = () => (
    <>
      <option value="movie" style={{ background: '#222', color: '#fff' }}>فیلم</option>
      <option value="series" style={{ background: '#222', color: '#fff' }}>سریال</option>
      <option value="game" style={{ background: '#222', color: '#fff' }}>بازی</option>
      <option value="book" style={{ background: '#222', color: '#fff' }}>کتاب</option>
      <option value="music" style={{ background: '#222', color: '#fff' }}>موسیقی</option>
    </>
  );

  const generateSlug = (title, year) => {
    const safeTitle = title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase();
    return `${safeTitle}-${year || 'unknown'}`;
  };

  const createMarkdownText = (itemType, item, pData) => {
    const slug = generateSlug(item.title, item.year);
    const coverPath = `${itemType}s/${slug}.webp`;
    const tagsArray = pData.tags ? pData.tags.split(',').map(t => t.trim()).filter(t => t) : [];
    const genresArray = pData.genres ? pData.genres.split(',').map(g => g.trim()).filter(g => g) : [];

    let md = `---\n`;
    md += `title: "${item.title}"\n\n`;
    
    if (item.cover) md += `source_image: "${item.cover}"\n`;
    md += `cover: "${item.cover ? coverPath : ''}"\n`;
    md += `cover_type: "${itemType === 'music' ? 'square' : 'poster'}"\n\n`;

    md += `personal_rating: ${pData.rating || 0}\n`;

    if (itemType === 'game') {
      if (pData.story_rating) md += `\nstory_rating: ${pData.story_rating}`;
      if (pData.gameplay_rating) md += `\ngameplay_rating: ${pData.gameplay_rating}`;
      if (pData.music_rating) md += `\nmusic_rating: ${pData.music_rating}`;
      if (pData.graphics_rating) md += `\ngraphics_rating: ${pData.graphics_rating}`;
      if (pData.technical_rating) md += `\ntechnical_rating: ${pData.technical_rating}`;
      md += `\n`;
    }

    md += `\nstatus: "${pData.status}"\n`;
    md += `year: ${item.year || new Date().getFullYear()}\n\n`;

    if (pData.date_started) md += `date_started: ${pData.date_started}\n`;
    const finalDate = pData.date_finished || new Date().toISOString().split('T')[0];
    if (itemType === 'movie' || itemType === 'series') md += `date_watched: ${finalDate}\n\n`;
    else if (itemType === 'music') md += `date_listened: ${finalDate}\n\n`;
    else md += `date_finished: ${finalDate}\n\n`;

    if (itemType === 'game') {
      if (pData.platforms) {
        const plats = pData.platforms.split(',').map(p => p.trim()).filter(p => p);
        if (plats.length > 0) md += `platforms:\n${plats.map(p => `  - ${p}`).join('\n')}\n\n`;
      }
      if (genresArray.length > 0) md += `genres:\n${genresArray.map(g => `  - ${g}`).join('\n')}\n\n`;
      if (pData.developer) md += `developer: "${pData.developer}"\n`;
      if (pData.publisher) md += `publisher: "${pData.publisher}"\n\n`;
      if (pData.completion_percentage) md += `completion_percentage: ${pData.completion_percentage}\n\n`;
      if (pData.achievements_unlocked) md += `achievements_unlocked: ${pData.achievements_unlocked}\n`;
      if (pData.achievements_total) md += `achievements_total: ${pData.achievements_total}\n\n`;
    } else if (itemType === 'movie') {
      if (pData.director) md += `director: "${pData.director}"\n`;
      if (pData.runtime) md += `runtime: ${pData.runtime}\n\n`;
      if (genresArray.length > 0) md += `genres:\n${genresArray.map(g => `  - ${g}`).join('\n')}\n\n`;
    } else if (itemType === 'series') {
      if (pData.seasons) md += `seasons: ${pData.seasons}\n`;
      if (pData.episodes) md += `episodes: ${pData.episodes}\n\n`;
      if (genresArray.length > 0) md += `genres:\n${genresArray.map(g => `  - ${g}`).join('\n')}\n\n`;
    } else if (itemType === 'book') {
      if (pData.author) md += `author: "${pData.author}"\n`;
      if (pData.pages) md += `pages: ${pData.pages}\n\n`;
      if (genresArray.length > 0) md += `genres:\n${genresArray.map(g => `  - ${g}`).join('\n')}\n\n`;
    } else if (itemType === 'music') {
      if (pData.artist || item.desc) md += `artist: "${pData.artist || item.desc}"\n\n`;
      if (genresArray.length > 0) md += `genres:\n${genresArray.map(g => `  - ${g}`).join('\n')}\n\n`;
    }

    if (tagsArray.length > 0) md += `tags:\n${tagsArray.map(t => `  - ${t}`).join('\n')}\n\n`;
    if (pData.summary) md += `summary: "${pData.summary}"\n`;
    md += `---\n`;

    return { md, slug };
  };

  const fetchWithProxy = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Direct failed');
      return await res.json();
    } catch (e) {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);
      const data = await res.json();
      return JSON.parse(data.contents);
    }
  };

  const fetchFromAPI = async (searchQuery, searchType) => {
    let targetUrl = '';
    
    if (searchType === 'movie') targetUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(searchQuery)}&language=en-US`;
    else if (searchType === 'series') targetUrl = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbKey}&query=${encodeURIComponent(searchQuery)}&language=en-US`;
    else if (searchType === 'book') targetUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`;
    else if (searchType === 'music') targetUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=album&limit=5`;
    else if (searchType === 'game') {
      if (!rawgKey) throw new Error('RAWG_KEY_MISSING');
      targetUrl = `https://api.rawg.io/api/games?key=${rawgKey}&search=${encodeURIComponent(searchQuery)}`;
    }

    try {
      const data = await fetchWithProxy(targetUrl);
      let formattedResults = [];

      if (searchType === 'movie' || searchType === 'series') {
        formattedResults = (data.results || []).map(item => ({
          id: item.id,
          title: item.title || item.name,
          year: (item.release_date || item.first_air_date || '').split('-')[0],
          cover: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
          desc: item.overview,
        }));
      } else if (searchType === 'book') {
        formattedResults = (data.docs || []).slice(0, 10).map(item => ({
          id: item.key,
          title: item.title,
          year: item.first_publish_year ? item.first_publish_year.toString() : '',
          cover: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : null,
          desc: item.author_name ? item.author_name.join(', ') : 'نویسنده نامشخص',
          author: item.author_name ? item.author_name.join(', ') : '',
          pages: item.number_of_pages_median || '',
          genres: item.subject ? item.subject.slice(0, 3) : [] 
        }));
      } else if (searchType === 'music') {
        formattedResults = (data.results || []).map(item => ({
          id: item.collectionId,
          title: item.collectionName,
          year: (item.releaseDate || '').split('-')[0],
          cover: item.artworkUrl100?.replace('100x100', '600x600'),
          desc: item.artistName,
          artist: item.artistName || '',
          genres: item.primaryGenreName ? [item.primaryGenreName] : []
        }));
      } else if (searchType === 'game') {
        formattedResults = (data.results || []).map(item => ({
          id: item.id,
          title: item.name,
          year: (item.released || '').split('-')[0],
          cover: item.background_image,
          desc: item.platforms?.map(p => p.platform.name).join(', ')
        }));
      }
      return formattedResults;
    } catch (e) {
      if (e.message === 'RAWG_KEY_MISSING') throw e;
      return null; 
    }
  };

  const fetchItemDetails = async (item, itemType) => {
    let details = { ...item }; 
    try {
      if (itemType === 'movie') {
        const url = `https://api.themoviedb.org/3/movie/${item.id}?api_key=${tmdbKey}&append_to_response=credits&language=en-US`;
        const res = await fetchWithProxy(url);
        details.runtime = res.runtime || '';
        const director = res.credits?.crew?.find(c => c.job === 'Director');
        details.director = director ? director.name : '';
        details.genres = res.genres?.map(g => g.name) || [];
      } else if (itemType === 'series') {
        const url = `https://api.themoviedb.org/3/tv/${item.id}?api_key=${tmdbKey}&language=en-US`;
        const res = await fetchWithProxy(url);
        details.seasons = res.number_of_seasons || '';
        details.episodes = res.number_of_episodes || '';
        details.genres = res.genres?.map(g => g.name) || [];
      } else if (itemType === 'game') {
        const url = `https://api.rawg.io/api/games/${item.id}?key=${rawgKey}`;
        const res = await fetchWithProxy(url);
        details.developer = res.developers?.map(d => d.name).join(', ') || '';
        details.publisher = res.publishers?.map(p => p.name).join(', ') || '';
        details.achievements_total = res.achievements_count || '';
        details.genres = res.genres?.map(g => g.name) || [];
      }
    } catch (e) {
      console.error("Failed to fetch deep details", e);
    }
    return details;
  };

  const handleSingleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage('در حال جستجو...');
    
    try {
      const res = await fetchFromAPI(query, type);
      if (res === null) {
        setMessage('❌ خطا در ارتباط با سرور. لطفاً فیلترشکن خود را بررسی کنید.');
        setResults([]);
      } else if (res.length === 0) {
        setMessage('⚠️ هیچ نتیجه‌ای یافت نشد. می‌توانید از دکمه "افزودن دستی" استفاده کنید.');
        setResults([]);
      } else {
        setResults(res);
        setMessage('✅ جستجو با موفقیت انجام شد!');
      }
    } catch (e) {
      if (e.message === 'RAWG_KEY_MISSING') setMessage('❌ برای جستجوی بازی‌ها، باید کلید RAWG_API_KEY را در فایل .env قرار دهید.');
      else setMessage('❌ خطای ناشناخته رخ داد.');
      setResults([]);
    }
    setLoading(false);
  };

  const handleSelect = async (item) => {
    setLoading(true);
    setMessage('در حال دریافت اطلاعات تکمیلی...');
    
    const detailedItem = await fetchItemDetails(item, type);
    setSelectedItem(detailedItem);
    
    const today = new Date().toISOString().split('T')[0];
    setPersonalData({ 
      ...initialPersonalData, 
      status: statusOptions[type][0].val, 
      date_finished: today, 
      platforms: detailedItem.desc || '',
      director: detailedItem.director || '',
      runtime: detailedItem.runtime || '',
      seasons: detailedItem.seasons || '',
      episodes: detailedItem.episodes || '',
      developer: detailedItem.developer || '',
      publisher: detailedItem.publisher || '',
      achievements_total: detailedItem.achievements_total || '',
      author: detailedItem.author || '',
      pages: detailedItem.pages || '',
      artist: detailedItem.artist || '',
      genres: detailedItem.genres ? detailedItem.genres.join(', ') : ''
    });
    
    setStep('form');
    setLoading(false);
    setMessage('');
  };

  const handleManualAdd = () => {
    const newItem = { title: query || 'آیتم جدید', year: new Date().getFullYear().toString(), cover: null, desc: '', genres: [] };
    setSelectedItem(newItem);
    const today = new Date().toISOString().split('T')[0];
    setPersonalData({ ...initialPersonalData, status: statusOptions[type][0].val, date_finished: today });
    setStep('form');
  };

  const handleGenerateSingle = () => {
    const { md, slug } = createMarkdownText(type, selectedItem, personalData);
    setGeneratedMD(md);
    setSelectedItem({ ...selectedItem, slug });
    setStep('result');
  };

  const handleBulkImport = async () => {
    setLoading(true);
    const lines = bulkQuery.split('\n').map(l => l.trim()).filter(l => l);
    const generatedItems = [];
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < lines.length; i++) {
      setMessage(`در حال پردازش ${i + 1} از ${lines.length}: ${lines[i]}`);
      try {
        const res = await fetchFromAPI(lines[i], type);
        if (res && res.length > 0) {
          const basicItem = res[0];
          const detailedItem = await fetchItemDetails(basicItem, type);
          
          const pData = { 
            ...initialPersonalData, 
            status: statusOptions[type][0].val, 
            date_finished: today, 
            platforms: detailedItem.desc || '',
            director: detailedItem.director || '',
            runtime: detailedItem.runtime || '',
            seasons: detailedItem.seasons || '',
            episodes: detailedItem.episodes || '',
            developer: detailedItem.developer || '',
            publisher: detailedItem.publisher || '',
            achievements_total: detailedItem.achievements_total || '',
            author: detailedItem.author || '',
            pages: detailedItem.pages || '',
            artist: detailedItem.artist || '',
            genres: detailedItem.genres ? detailedItem.genres.join(', ') : ''
          };
          
          const { md, slug } = createMarkdownText(type, detailedItem, pData);
          generatedItems.push({ item: detailedItem, pData, md, slug });
        }
      } catch (e) {
        if (e.message === 'RAWG_KEY_MISSING') {
          setMessage('❌ برای جستجوی بازی‌ها، کلید RAWG_API_KEY نیاز است.');
          setLoading(false); return;
        }
      }
      await new Promise(r => setTimeout(r, 500)); 
    }
    
    setBulkResults(generatedItems);
    setMessage('✅ تمام آیتم‌ها پردازش شدند! حالا می‌توانید روی هر کدام کلیک کنید تا اطلاعاتش را کامل کنید.');
    setLoading(false);
  };

  const handleBulkDataChange = (index, field, value) => {
    const updatedResults = [...bulkResults];
    updatedResults[index].pData[field] = value;
    const { md } = createMarkdownText(type, updatedResults[index].item, updatedResults[index].pData);
    updatedResults[index].md = md;
    setBulkResults(updatedResults);
  };

  const downloadFile = (content, filename) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333', textAlign: 'center' }}>
        <h2>ورود به پنل مدیریت</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            placeholder="رمز عبور را وارد کنید..."
            style={{ padding: '0.8rem', borderRadius: '8px', background: '#111', color: 'white', border: '1px solid #444', textAlign: 'center' }}
          />
          <button type="submit" style={{ padding: '0.8rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>ورود</button>
        </form>
        {authError && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{authError}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333', color: 'white' }}>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
        <button onClick={() => {setMode('single'); setStep('search');}} style={{ background: mode === 'single' ? '#8b5cf6' : 'transparent', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>افزودن تکی</button>
        <button onClick={() => {setMode('bulk'); setBulkResults([]);}} style={{ background: mode === 'bulk' ? '#8b5cf6' : 'transparent', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>افزودن دسته‌جمعی (Bulk)</button>
      </div>

      {/* حالت دسته‌جمعی */}
      {mode === 'bulk' && (
        <div>
          <h2 style={{ marginTop: 0 }}>پنل مدیریت جستجو و افزودن محتوا</h2>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '30%', padding: '0.8rem', marginBottom: '1rem', background: '#111', color: 'white', border: '1px solid #444' }}>
            <TypeOptions />
          </select>
          <textarea rows="10" value={bulkQuery} onChange={(e) => setBulkQuery(e.target.value)} placeholder="Inception 2010&#10;Interstellar&#10;The Dark Knight" style={{ width: '100%', padding: '0.8rem', background: '#111', color: 'white', border: '1px solid #444', marginBottom: '1rem' }} />
          <button onClick={handleBulkImport} disabled={loading} style={{ padding: '1rem 2rem', background: loading ? '#555' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }}>
            {loading ? 'در حال پردازش...' : 'تولید کدهای مارک‌داون'}
          </button>
          
          {message && <div style={{ marginTop: '1rem', padding: '1rem', background: '#222', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>{message}</div>}

          {bulkResults.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <p>💡 <strong>راهنما:</strong> روی هر آیتم کلیک کنید تا فرم اطلاعات آن باز شود. پس از تکمیل، روی دکمه دانلود کلیک کنید.</p>
              </div>
              {bulkResults.map((res, idx) => (
                <div key={idx} style={{ background: '#111', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #333', overflow: 'hidden' }}>
                  
                  <div 
                    onClick={() => setExpandedBulkIndex(expandedBulkIndex === idx ? null : idx)}
                    style={{ display: 'flex', gap: '1rem', padding: '1rem', cursor: 'pointer', background: expandedBulkIndex === idx ? '#222' : 'transparent' }}
                  >
                    {res.item.cover ? (
                      <img src={res.item.cover} style={{ width: '120px', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '120px', height: '180px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>بدون عکس</div>
                    )}

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4 style={{ margin: 0, fontSize: '1.5rem' }}>
                        {res.item.title}
                        <span style={{ opacity: 0.5, fontSize: '1.1rem' }}>{' '}({res.item.year})</span>
                      </h4>
                      <span style={{ fontSize: '1.8rem' }}>{expandedBulkIndex === idx ? '▼' : '▶'}</span>
                    </div>
                  </div>
                  
                  {expandedBulkIndex === idx && (
                    <div style={{ padding: '1rem', borderTop: '1px solid #333' }}>
                      <FormFields 
                        pData={res.pData} 
                        item={res.item}
                        type={type}
                        statusOptions={statusOptions}
                        setPData={(field, value) => handleBulkDataChange(idx, field, value)} 
                      />
                      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => downloadFile(res.md, `${res.slug}.md`)} style={{ padding: '0.8rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>📥 دانلود این فایل</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* حالت تکی - جستجو */}
      {mode === 'single' && step === 'search' && (
        <>
          <h2 style={{ marginTop: 0 }}>پنل مدیریت جستجو و افزودن محتوا</h2>
          <p style={{ opacity: 0.7 }}>جستجو و افزودن خودکار آثار به آرشیو</p>

          <form onSubmit={handleSingleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '120px', padding: '0.8rem', borderRadius: '8px', background: '#111', color: 'white', border: '1px solid #444' }}>
              <TypeOptions />
            </select>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="نام اثر را وارد کنید..." style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', background: '#111', color: 'white', border: '1px solid #444' }} required />
            <button type="submit" disabled={loading} style={{ padding: '0 1.5rem', background: loading ? '#555' : '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>جستجو</button>
          </form>

          <button onClick={handleManualAdd} style={{ width: '100%', padding: '0.8rem', background: '#222', color: 'white', border: '1px dashed #555', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem' }}>
            + پیدا نشد؟ افزودن دستی "{query || 'آیتم جدید'}"
          </button>

          {message && <div style={{ padding: '1rem', background: '#222', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #8b5cf6' }}>{message}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
                {item.cover ? <img src={item.cover} alt={item.title} style={{ width: '80px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} /> : <div style={{ width: '80px', height: '120px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>بدون عکس</div>}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.title} ({item.year})</h3>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>{item.desc?.substring(0, 100)}...</p>
                  <button onClick={() => handleSelect(item)} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>تکمیل اطلاعات</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* حالت تکی - فرم */}
      {mode === 'single' && step === 'form' && (
        <>
          <h2>تکمیل اطلاعات: {selectedItem.title}</h2>
          <FormFields 
            pData={personalData} 
            item={selectedItem}
            type={type}
            statusOptions={statusOptions}
            setPData={(field, value) => setPersonalData({...personalData, [field]: value})} 
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={handleGenerateSingle} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>تولید فایل</button>
            <button onClick={() => setStep('search')} style={{ padding: '1rem 2rem', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>بازگشت</button>
          </div>
        </>
      )}

      {/* حالت تکی - نتیجه */}
      {mode === 'single' && step === 'result' && (
        <>
          <h2>🎉 فایل شما آماده است!</h2>
          <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p>💡 <strong>راهنما:</strong> فایل زیر را دانلود کنید و در پوشه <code>src/content/{type}s/</code> قرار دهید. سپس در ترمینال دستور <code>npm run process-images</code> را اجرا کنید تا عکس به صورت خودکار دانلود و بهینه شود.</p>
          </div>
          
          <textarea readOnly value={generatedMD} rows="15" style={{ width: '100%', background: '#000', color: '#0f0', padding: '1rem', fontFamily: 'monospace', border: '1px solid #333', borderRadius: '8px' }} />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => downloadFile(generatedMD, `${selectedItem.slug}.md`)} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📥 دانلود فایل .md</button>
            <button onClick={() => {setStep('search'); setQuery(''); setResults([]);}} style={{ padding: '1rem 2rem', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>➕ افزودن آیتم جدید</button>
          </div>
        </>
      )}

    </div>
  );
}