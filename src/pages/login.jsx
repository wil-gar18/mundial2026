import { useState } from 'react';
import { supabase } from '../supabase';

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    setLoading(true); setError(''); setSuccess('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else onLogin(data.user);
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true); setError(''); setSuccess('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess('Revisa tu correo para confirmar tu cuenta!');
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg)',
    }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 24 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 48, letterSpacing: 4,
            color: 'var(--gold)', lineHeight: 1,
          }}>MUNDIAL<br />2026</h1>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginTop: 8 }}>
            🇲🇽 Mexico · 🇨🇦 Canada · 🇺🇸 USA
          </p>
        </div>

        {/* Card */}
        <div className="card">
          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
            {[['login','Iniciar sesion'],['register','Registrarse']].map(([key, lbl]) => (
              <button key={key} onClick={() => { setTab(key); setError(''); setSuccess(''); }} style={{
                flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '10px 0', fontSize: 14, fontWeight: 600,
                color: tab === key ? 'var(--text)' : 'var(--text3)',
                borderBottom: tab === key ? '2px solid var(--green-light)' : '2px solid transparent',
                marginBottom: -1,
              }}>{lbl}</button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label>Correo electronico</label>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                onKeyDown={e => e.key === 'Enter' && (tab === 'login' ? handleLogin() : handleRegister())}
              />
            </div>
            <div className="form-group">
              <label>Contrasena</label>
              <input
                type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && (tab === 'login' ? handleLogin() : handleRegister())}
              />
            </div>

            {error && (
              <div style={{ background: '#3B0A0A', border: '1px solid #A32D2D', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#F87171' }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{ background: '#0A3320', border: '1px solid #0F6E56', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#4ADE80' }}>
                {success}
              </div>
            )}

            <button
              className="btn btn-green"
              onClick={tab === 'login' ? handleLogin : handleRegister}
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14 }}
            >
              {loading ? 'Cargando...' : tab === 'login' ? 'Iniciar sesion' : 'Crear cuenta'}
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', marginTop: 16 }}>
          Tus apuestas y resultados se guardan en la nube
        </p>
      </div>
    </div>
  );
}