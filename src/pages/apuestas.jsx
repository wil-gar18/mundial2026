import { useState, useMemo } from 'react';
import { Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const TIPOS_APUESTA = [
  'Victoria local', 'Victoria visitante', 'Empate',
  '+1.5 goles', '+2.5 goles', '+3.5 goles',
  '-1.5 goles', '-2.5 goles', '-3.5 goles',
  'Ambos equipos marcan (Sí)', 'Ambos equipos marcan (No)',
  'Hándicap', 'Resultado exacto', 'Primer goleador',
  'Doble oportunidad', 'Otro',
];

const EMPTY_FORM = {
  match: '', type: '', stake: '', odds: '',
  date: new Date().toISOString().split('T')[0],
  result: 'pendiente', note: '', bookmaker: '',
};

export default function Apuestas() {
  const { bets, addBet, updateBetResult, deleteBet, betStats } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tab, setTab] = useState('lista');
  const [filterResult, setFilterResult] = useState('todas');

  const handleChange = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = () => {
    if (!form.match.trim() || !form.stake || parseFloat(form.stake) <= 0) {
      alert('Completa al menos el partido y el monto.');
      return;
    }
    addBet({ ...form, stake: parseFloat(form.stake), odds: parseFloat(form.odds) || 1 });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const filtered = useMemo(() => {
    if (filterResult === 'todas') return bets;
    return bets.filter(b => b.result === filterResult);
  }, [bets, filterResult]);

 const balanceHistory = useMemo(() => {
    const sorted = [...bets].sort((a, z) => new Date(a.createdAt) - new Date(z.createdAt));
    let acum = 0;
    return sorted.map((b, i) => {
      acum += b.profit || 0;
      return { n: i + 1, balance: parseFloat(acum.toFixed(2)), match: b.match };
    });
  }, [bets]);

  const typeStats = useMemo(() => {
    const map = {};
    bets.forEach(b => {
      const t = b.type || 'Otro';
      if (!map[t]) map[t] = { type: t, ganadas: 0, perdidas: 0, total: 0 };
      map[t].total++;
      if (b.result === 'ganada') map[t].ganadas++;
      if (b.result === 'perdida') map[t].perdidas++;
    });
    return Object.values(map).sort((a, b) => b.total - a.total).slice(0, 8);
  }, [bets]);

  const winRate = betStats.winRate();
  const roi = betStats.roi();

  return (
    <div>
      <div className="page-header">
        <h2>💰 Rastreador de Apuestas</h2>
        <p>Controla tus apuestas, ganancias y estadísticas en tiempo real</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total apostado</div>
          <div className="stat-value">${betStats.totalStake.toFixed(2)}</div>
          <div className="stat-sub">{betStats.total} apuesta{betStats.total !== 1 ? 's' : ''}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Balance</div>
          <div className={`stat-value ${betStats.totalProfit >= 0 ? 'positive' : 'negative'}`}>
            {betStats.totalProfit >= 0 ? '+' : ''}${betStats.totalProfit.toFixed(2)}
          </div>
          <div className="stat-sub">ROI: {roi >= 0 ? '+' : ''}{roi}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">% Acierto</div>
          <div className={`stat-value ${winRate >= 50 ? 'positive' : 'negative'}`}>{winRate}%</div>
          <div className="stat-sub">{betStats.won}G · {betStats.lost}P · {betStats.pending}⏳</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cuota promedio</div>
          <div className="stat-value">{betStats.avgOdds.toFixed(2)}</div>
          <div className="stat-sub">Media de todas las cuotas</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {[['lista','Mis apuestas'],['stats','Estadísticas']].map(([key, lbl]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '8px 16px', fontSize: 13, fontWeight: 600,
            color: tab === key ? 'var(--text)' : 'var(--text3)',
            borderBottom: tab === key ? '2px solid var(--green-light)' : '2px solid transparent',
            marginBottom: -1,
          }}>{lbl}</button>
        ))}
      </div>

      {tab === 'lista' && (
        <>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-green" onClick={() => setShowForm(!showForm)}>
              <Plus size={15} /> {showForm ? 'Cancelar' : 'Nueva apuesta'}
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['todas','Todas'],['pendiente','Pendientes'],['ganada','Ganadas'],['perdida','Perdidas']].map(([v,l]) => (
                <button key={v} className={`filter-tab ${filterResult === v ? 'active' : ''}`} onClick={() => setFilterResult(v)}>{l}</button>
              ))}
            </div>
          </div>

          {showForm && (
            <div className="card" style={{ marginBottom: 20, borderLeft: '3px solid var(--green)' }}>
              <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14 }}>Registrar nueva apuesta</div>
              <div className="form-grid-2" style={{ marginBottom: 10 }}>
                <div className="form-group">
                  <label>Partido</label>
                  <input value={form.match} onChange={e => handleChange('match', e.target.value)} placeholder="Ej: Brasil vs Marruecos" />
                </div>
                <div className="form-group">
                  <label>Tipo de apuesta</label>
                  <select value={form.type} onChange={e => handleChange('type', e.target.value)}>
                    <option value="">Seleccionar tipo...</option>
                    {TIPOS_APUESTA.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Monto ($)</label>
                  <input type="number" min="0" step="0.01" value={form.stake} onChange={e => handleChange('stake', e.target.value)} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Cuota</label>
                  <input type="number" min="1.01" step="0.01" value={form.odds} onChange={e => handleChange('odds', e.target.value)} placeholder="1.80" />
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Resultado</label>
                  <select value={form.result} onChange={e => handleChange('result', e.target.value)}>
                    <option value="pendiente">Pendiente</option>
                    <option value="ganada">Ganada</option>
                    <option value="perdida">Perdida</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Casa de apuestas</label>
                  <input value={form.bookmaker} onChange={e => handleChange('bookmaker', e.target.value)} placeholder="Ej: Betplay, Codere..." />
                </div>
                <div className="form-group">
                  <label>Retorno potencial</label>
                  <input readOnly value={form.stake && form.odds ? `$${(parseFloat(form.stake) * parseFloat(form.odds)).toFixed(2)}` : '$0.00'} style={{ color: 'var(--gold-light)', fontWeight: 600 }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 12 }}>
                <label>Nota</label>
                <input value={form.note} onChange={e => handleChange('note', e.target.value)} placeholder="¿Por qué apostaste esto?" />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-green" onClick={handleSubmit}>Guardar</button>
                <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 48, color: 'var(--text3)' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎰</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Sin apuestas registradas</div>
              <div style={{ fontSize: 12 }}>Agrega tu primera apuesta para empezar</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filtered.map(b => (
                <div key={b.id} className="card" style={{ borderLeft: `3px solid ${b.result === 'ganada' ? '#4ADE80' : b.result === 'perdida' ? '#F87171' : 'var(--gold)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{b.match}</div>
                      {b.type && <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{b.type}</div>}
                    </div>
                    <span className={`badge ${b.result === 'ganada' ? 'badge-green' : b.result === 'perdida' ? 'badge-red' : 'badge-yellow'}`}>
                      {b.result === 'ganada' ? '✅ Ganada' : b.result === 'perdida' ? '❌ Perdida' : '⏳ Pendiente'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, fontSize: 12, flexWrap: 'wrap', color: 'var(--text2)', marginBottom: 8 }}>
                    <div><span style={{ color: 'var(--text3)' }}>Monto: </span><strong>${b.stake.toFixed(2)}</strong></div>
                    <div><span style={{ color: 'var(--text3)' }}>Cuota: </span><strong style={{ color: 'var(--gold-light)' }}>{b.odds.toFixed(2)}</strong></div>
                    <div><span style={{ color: 'var(--text3)' }}>Retorno: </span><strong>${b.potential.toFixed(2)}</strong></div>
                    {b.profit !== null && (
                      <div><span style={{ color: 'var(--text3)' }}>{b.result === 'ganada' ? 'Ganancia: ' : 'Pérdida: '}</span>
                        <strong style={{ color: b.profit >= 0 ? '#4ADE80' : '#F87171' }}>{b.profit >= 0 ? '+' : ''}${b.profit.toFixed(2)}</strong>
                      </div>
                    )}
                    {b.date && <div><span style={{ color: 'var(--text3)' }}>Fecha: </span>{b.date}</div>}
                    {b.bookmaker && <div><span style={{ color: 'var(--text3)' }}>Casa: </span>{b.bookmaker}</div>}
                  </div>
                  {b.note && <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic', marginBottom: 8 }}>📝 {b.note}</div>}
                  <div style={{ display: 'flex', gap: 6 }}>
                    {b.result !== 'ganada' && <button className="btn btn-sm" style={{ background: '#0A3320', color: '#4ADE80', border: '1px solid #0F6E56' }} onClick={() => updateBetResult(b.id, 'ganada')}><CheckCircle size={12} /> Ganada</button>}
                    {b.result !== 'perdida' && <button className="btn btn-sm" style={{ background: '#3B0A0A', color: '#F87171', border: '1px solid #A32D2D' }} onClick={() => updateBetResult(b.id, 'perdida')}><XCircle size={12} /> Perdida</button>}
                    {b.result !== 'pendiente' && <button className="btn btn-sm btn-ghost" onClick={() => updateBetResult(b.id, 'pendiente')}><Clock size={12} /> Pendiente</button>}
                    <button className="btn btn-sm btn-danger" style={{ marginLeft: 'auto' }} onClick={() => deleteBet(b.id)}><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {bets.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 48, color: 'var(--text3)' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>📊</div>
              <div>Agrega apuestas para ver estadísticas</div>
            </div>
          ) : (
            <>
              {balanceHistory.length > 1 && (
                <div className="card">
                  <div style={{ fontWeight: 600, marginBottom: 14 }}>Evolución del balance</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={balanceHistory}>
                      <XAxis dataKey="n" tick={{ fontSize: 11, fill: '#6B7494' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#6B7494' }} tickFormatter={v => `$${v}`} />
                      <Tooltip contentStyle={{ background: '#1E2330', border: '1px solid #2A2F3D', borderRadius: 8, fontSize: 12 }} formatter={v => [`$${v}`, 'Balance']} />
                      <Line type="monotone" dataKey="balance" stroke="#C9A84C" strokeWidth={2} dot={{ fill: '#C9A84C', r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              {typeStats.length > 0 && (
                <div className="card">
                  <div style={{ fontWeight: 600, marginBottom: 14 }}>Resultados por tipo</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={typeStats} layout="vertical">
                      <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7494' }} />
                      <YAxis dataKey="type" type="category" tick={{ fontSize: 11, fill: '#6B7494' }} width={130} />
                      <Tooltip contentStyle={{ background: '#1E2330', border: '1px solid #2A2F3D', borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="ganadas" fill="#4ADE80" name="Ganadas" radius={[0,3,3,0]} />
                      <Bar dataKey="perdidas" fill="#F87171" name="Perdidas" radius={[0,3,3,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}