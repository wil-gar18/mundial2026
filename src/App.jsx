import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { AppProvider, useApp } from './context/AppContext';
import Horarios from './pages/Horarios';
import Grupos from './pages/Grupos';
import Simulador from './pages/Simulador';
import Apuestas from './pages/Apuestas';
import Configuracion from './pages/Configuracion';
import Resultados from './pages/Resultados';
import Login from './pages/Login';
import './index.css';

const PAGES = [
  { id: 'horarios',   label: 'Horarios',    icon: '📅', component: Horarios },
  { id: 'resultados', label: 'Resultados',  icon: '📊', component: Resultados },
  { id: 'grupos',     label: 'Grupos',      icon: '🌍', component: Grupos },
  { id: 'simulador',  label: 'Simulador',   icon: '🏆', component: Simulador },
  { id: 'apuestas',   label: 'Apuestas',    icon: '💰', component: Apuestas },
  { id: 'config',     label: 'Config',      icon: '⚙️', component: Configuracion },
];

function Shell({ user, onLogout }) {
  const [page, setPage] = useState('horarios');
  const { betStats } = useApp();
  const CurrentPage = PAGES.find(p => p.id === page)?.component || Horarios;

  return (
    <div className="app-shell">
      {/* Sidebar desktop */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>MUNDIAL<br />2026</h1>
          <span>Mexico · Canada · USA</span>
        </div>
        <nav className="sidebar-nav">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`nav-item ${page === p.id ? 'active' : ''}`}
              onClick={() => setPage(p.id)}
            >
              {p.icon} {p.label}
              {p.id === 'apuestas' && betStats.pending > 0 && (
                <span style={{
                  marginLeft: 'auto', background: 'var(--gold)',
                  color: '#1a1000', fontSize: 10, fontWeight: 700,
                  borderRadius: 10, padding: '1px 6px',
                }}>
                  {betStats.pending}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div style={{ marginBottom: 8, color: 'var(--text2)', fontSize: 11 }}>
            👤 {user.email}
          </div>
          <button
            className="btn btn-ghost btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={onLogout}
          >
            Cerrar sesion
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        <CurrentPage />
      </main>

      {/* Menú móvil */}
      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`mobile-nav-item ${page === p.id ? 'active' : ''}`}
              onClick={() => setPage(p.id)}
            >
              <span className="icon">{p.icon}</span>
              {p.label}
              {p.id === 'apuestas' && betStats.pending > 0 && (
                <span style={{
                  background: 'var(--gold)', color: '#1a1000',
                  fontSize: 9, fontWeight: 700, borderRadius: 10,
                  padding: '1px 5px', marginTop: -2,
                }}>
                  {betStats.pending}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ color: 'var(--gold)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2 }}>
        Cargando...
      </div>
    </div>
  );

  if (!user) return <Login onLogin={setUser} />;

  return (
    <AppProvider user={user}>
      <Shell user={user} onLogout={handleLogout} />
    </AppProvider>
  );
}