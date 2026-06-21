import { useState } from 'react';
import { Trophy, RefreshCw, ChevronRight } from 'lucide-react';
import { GROUPS, FLAGS } from '../data/matches';
import { useState } from 'react';
import { Trophy, RefreshCw, ChevronRight } from 'lucide-react';
import { GROUPS, FLAGS } from '../data/matches';
import Flag from '../components/Flag';


const INITIAL_SEMIS = [
  { id: 'sf1', home: 'Brasil',     away: 'Argentina', label: 'Semifinal 1' },
  { id: 'sf2', home: 'Francia',    away: 'España',    label: 'Semifinal 2' },
  { id: 'sf3', home: 'Inglaterra', away: 'Alemania',  label: 'Semifinal 3' },
  { id: 'sf4', home: 'Portugal',   away: 'Colombia',  label: 'Semifinal 4' },
];

function ScoreInput({ value, onChange }) {
  return (
    <input
      type="number" min="0" max="20"
      value={value}
      onChange={e => onChange(parseInt(e.target.value) || 0)}
      style={{
        width: 52, height: 40, textAlign: 'center',
        fontSize: 20, fontWeight: 700,
        background: 'var(--bg)', border: '1px solid var(--border2)',
        borderRadius: 6, color: 'var(--gold-light)',
      }}
    />
  );
}

export default function Simulador() {
  const allTeams = Object.values(GROUPS).flatMap(g => g.teams);
  const [tab, setTab] = useState('semis');
  const [scores, setScores] = useState({});
  const [winners, setWinners] = useState({});
  const [champion, setChampion] = useState(null);
  const [customMatches, setCustomMatches] = useState([
    { id: 'c1', home: '', away: '', homeScore: 0, awayScore: 0, label: 'Partido 1' },
    { id: 'c2', home: '', away: '', homeScore: 0, awayScore: 0, label: 'Partido 2' },
  ]);

  const setScore = (key, val) => setScores(prev => ({ ...prev, [key]: val }));

  const calcSemis = () => {
    const w = {};
    ['sf1','sf2','sf3','sf4'].forEach((id, i) => {
      const m = INITIAL_SEMIS[i];
      const h = scores[`${id}-h`] ?? 0;
      const a = scores[`${id}-a`] ?? 0;
      w[id] = h > a ? m.home : a > h ? m.away : `${m.home} (pen)`;
    });
    const finH = w['sf1'];
    const finA = w['sf2'];
    const fh = scores['fin-h'] ?? 0;
    const fa = scores['fin-a'] ?? 0;
    const camp = fh > fa ? finH : fa > fh ? finA : `${finH} (pen)`;
    setWinners({ ...w, finalHome: finH, finalAway: finA });
    setChampion(camp);
  };

  const resetSim = () => { setScores({}); setWinners({}); setChampion(null); };

  const addCustomMatch = () => {
    const id = 'c' + Date.now();
    setCustomMatches(prev => [...prev, { id, home: '', away: '', homeScore: 0, awayScore: 0, label: `Partido ${prev.length + 1}` }]);
  };

  const updateCustom = (id, field, val) =>
    setCustomMatches(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));

  const removeCustom = (id) => setCustomMatches(prev => prev.filter(m => m.id !== id));

  return (
    <div>
      <div className="page-header">
        <h2>🏆 Simulador de Predicciones</h2>
        <p>Predice los resultados y descubre tu campeón del Mundial 2026</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button className={`btn ${tab === 'semis' ? 'btn-green' : 'btn-ghost'}`} onClick={() => setTab('semis')}>Semifinales y Final</button>
        <button className={`btn ${tab === 'custom' ? 'btn-green' : 'btn-ghost'}`} onClick={() => setTab('custom')}>Partidos personalizados</button>
      </div>

      {tab === 'semis' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {INITIAL_SEMIS.map((m) => {
              const hScore = scores[`${m.id}-h`] ?? 0;
              const aScore = scores[`${m.id}-a`] ?? 0;
              const w = winners[m.id];
              return (
                <div key={m.id} className="card" style={{ borderTop: '2px solid var(--green)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                    {m.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}><Flag code={FLAGS[m.home]} size={28} /></div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{m.home}</div>
                      <ScoreInput value={hScore} onChange={val => setScore(`${m.id}-h`, val)} />
                    </div>
                    <div style={{ fontSize: 18, color: 'var(--text3)' }}>—</div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}><Flag code={FLAGS[m.away]} size={28} /></div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{m.away}</div>
                      <ScoreInput value={aScore} onChange={val => setScore(`${m.id}-a`, val)} />
                    </div>
                  </div>
                  {w && (
                    <div style={{ marginTop: 10, padding: '6px 10px', background: 'var(--green-dark)', borderRadius: 6, fontSize: 12, color: '#4ADE80', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ChevronRight size={12} /> Avanza: <strong>{w}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="card" style={{ borderTop: '2px solid var(--gold)' }}>
            <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
              🏆 Gran Final — 19 Jul 2026 · MetLife Stadium
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 8 }}>{winners.finalHome || 'Ganador SF1'}</div>
                <ScoreInput value={scores['fin-h'] ?? 0} onChange={val => setScore('fin-h', val)} />
              </div>
              <div style={{ fontSize: 18, color: 'var(--text3)' }}>—</div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 8 }}>{winners.finalAway || 'Ganador SF2'}</div>
                <ScoreInput value={scores['fin-a'] ?? 0} onChange={val => setScore('fin-a', val)} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-gold" onClick={calcSemis}><Trophy size={15} /> Calcular campeón</button>
            <button className="btn btn-ghost" onClick={resetSim}><RefreshCw size={14} /> Reiniciar</button>
          </div>

          {champion && (
            <div style={{
              background: 'linear-gradient(135deg, #1a1000 0%, #2A1F00 100%)',
              border: '2px solid var(--gold)', borderRadius: 12,
              padding: 24, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
              <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Campeón Mundial 2026 — Tu predicción
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold-light)', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
                <Flag code={FLAGS[champion.split(' (')[0]]} size={36} /> {champion}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'custom' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {customMatches.map((m) => {
              const result = m.homeScore > m.awayScore ? m.home : m.awayScore > m.homeScore ? m.away : 'Empate';
              return (
                <div key={m.id} className="card">
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <input value={m.label} onChange={e => updateCustom(m.id, 'label', e.target.value)} style={{ width: 120, fontSize: 12 }} placeholder="Nombre partido" />
                    <select value={m.home} onChange={e => updateCustom(m.id, 'home', e.target.value)} style={{ flex: 1, minWidth: 140 }}>
                      <option value="">Local</option>
                      {allTeams.map(t => <option key={t} value={t}>{FLAGS[t] || ''} {t}</option>)}
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input type="number" min="0" max="20" value={m.homeScore} onChange={e => updateCustom(m.id, 'homeScore', parseInt(e.target.value)||0)} style={{ width: 52, textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--gold-light)' }} />
                      <span style={{ color: 'var(--text3)', fontSize: 16 }}>—</span>
                      <input type="number" min="0" max="20" value={m.awayScore} onChange={e => updateCustom(m.id, 'awayScore', parseInt(e.target.value)||0)} style={{ width: 52, textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--gold-light)' }} />
                    </div>
                    <select value={m.away} onChange={e => updateCustom(m.id, 'away', e.target.value)} style={{ flex: 1, minWidth: 140 }}>
                      <option value="">Visitante</option>
                      {allTeams.map(t => <option key={t} value={t}>{FLAGS[t] || ''} {t}</option>)}
                    </select>
                    <button className="btn btn-danger btn-sm" onClick={() => removeCustom(m.id)}>✕</button>
                  </div>
                  {m.home && m.away && (
                    <div style={{ marginTop: 8, fontSize: 12, color: result === 'Empate' ? 'var(--gold)' : '#4ADE80' }}>
                      {result === 'Empate' ? '🤝 Empate' : `✅ Gana: $<Flag code={FLAGS[result]} size={28} />
`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button className="btn btn-green" style={{ marginTop: 12 }} onClick={addCustomMatch}>+ Agregar partido</button>
        </div>
      )}
    </div>
  );
}