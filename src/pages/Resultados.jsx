import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FLAGS } from '../data/matches';
import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FLAGS } from '../data/matches';
import Flag from '../components/Flag';

const GROUP_COLORS = {
  A:'#C9A84C', B:'#4ADE80', C:'#60A5FA', D:'#F87171',
  E:'#A78BFA', F:'#FB923C', G:'#34D399', H:'#F472B6',
  I:'#FACC15', J:'#38BDF8', K:'#E879F9', L:'#4ADE80',
};

function StandingsTable({ group, standings }) {
  return (
    <div style={{ marginTop: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ color: 'var(--text3)', textTransform: 'uppercase', fontSize: 10 }}>
            <th style={{ padding: '6px 8px', textAlign: 'left' }}>#</th>
            <th style={{ padding: '6px 8px', textAlign: 'left' }}>Equipo</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>PJ</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>PG</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>PE</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>PP</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>GF</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>GC</th>
            <th style={{ padding: '6px 8px', textAlign: 'center' }}>DG</th>
            <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 700, color: 'var(--gold)' }}>PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((t, i) => (
            <tr key={t.team} style={{
              borderTop: '1px solid var(--border)',
              background: i < 2 ? 'rgba(13,122,62,0.08)' : i === 2 ? 'rgba(201,168,76,0.06)' : 'transparent',
            }}>
              <td style={{ padding: '8px 8px', color: i < 2 ? '#4ADE80' : i === 2 ? 'var(--gold)' : 'var(--text3)', fontWeight: 700 }}>{i + 1}</td>
              <td style={{ padding: '8px 8px', fontWeight: 500 }}>
                <span style={{ marginRight: 6 }}><Flag code={FLAGS[t.team]} size={22} /></span>{t.team}
              </td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.pj}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: '#4ADE80' }}>{t.pg}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.pe}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: '#F87171' }}>{t.pp}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.gf}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.gc}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.gf - t.gc >= 0 ? '+' : ''}{t.gf - t.gc}</td>
              <td style={{ padding: '8px 8px', textAlign: 'center', fontWeight: 800, fontSize: 14, color: 'var(--gold-light)' }}>{t.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 11, color: 'var(--text3)' }}>
        <span><span style={{ color: '#4ADE80' }}>■</span> Clasificado directo</span>
        <span><span style={{ color: 'var(--gold)' }}>■</span> Posible mejor tercero</span>
      </div>
    </div>
  );
}

function MatchRow({ match, result, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [home, setHome] = useState(result?.homeGoals ?? '');
  const [away, setAway] = useState(result?.awayGoals ?? '');

  const handleSave = () => {
    if (home === '' || away === '') return;
    onSave(match.id, home, away);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(match.id);
    setHome('');
    setAway('');
    setEditing(false);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px',
      borderBottom: '1px solid var(--border)',
      background: result ? 'rgba(13,122,62,0.04)' : 'transparent',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <span><Flag code={FLAGS[match.home]} size={22} /></span>
        <span style={{ fontWeight: 500 }}>{match.home}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {editing ? (
          <>
            <input
              type="number" min="0" max="20" value={home}
              onChange={e => setHome(e.target.value)}
              style={{ width: 48, textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--gold-light)', padding: '4px' }}
            />
            <span style={{ color: 'var(--text3)', fontSize: 18 }}>-</span>
            <input
              type="number" min="0" max="20" value={away}
              onChange={e => setAway(e.target.value)}
              style={{ width: 48, textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--gold-light)', padding: '4px' }}
            />
          </>
        ) : result ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg3)', borderRadius: 8, padding: '4px 12px',
          }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold-light)' }}>{result.homeGoals}</span>
            <span style={{ color: 'var(--text3)', fontSize: 14 }}>-</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold-light)' }}>{result.awayGoals}</span>
          </div>
        ) : (
          <div style={{ padding: '4px 16px', color: 'var(--text3)', fontSize: 12, background: 'var(--bg3)', borderRadius: 8 }}>
            vs
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, justifyContent: 'flex-end' }}>
        <span style={{ fontWeight: 500 }}>{match.away}</span>
        <span><Flag code={FLAGS[match.away]} size={22} /></span>
      </div>

      <div style={{ display: 'flex', gap: 4, marginLeft: 8, flexShrink: 0 }}>
        {editing ? (
          <>
            <button className="btn btn-green btn-sm" onClick={handleSave}>✓</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>✕</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => { setHome(result?.homeGoals ?? ''); setAway(result?.awayGoals ?? ''); setEditing(true); }}>
              {result ? '✏️' : '+ Resultado'}
            </button>
            {result && <button className="btn btn-danger btn-sm" onClick={handleDelete}>🗑</button>}
          </>
        )}
      </div>

      <div style={{ fontSize: 11, color: 'var(--text3)', minWidth: 60, textAlign: 'right' }}>
        {match.time} Col
      </div>
    </div>
  );
}

export default function Resultados() {
  const { matches, results, saveResult, deleteResult, calcStandings } = useApp();
  const [filterGroup, setFilterGroup] = useState('A');
  const [tab, setTab] = useState('resultados');

  const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];

  const groupMatches = useMemo(() =>
    matches.filter(m => m.group === filterGroup).sort((a, b) => a.date.localeCompare(b.date)),
    [matches, filterGroup]
  );

  const standings = useMemo(() => calcStandings(filterGroup), [filterGroup, results, matches]);

  const totalPlayed = Object.keys(results).length;

  return (
    <div>
      <div className="page-header">
        <h2>📊 Resultados y Tabla</h2>
        <p>Ingresa los marcadores de cada partido · La tabla se actualiza automaticamente</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Partidos jugados</div>
          <div className="stat-value">{totalPlayed}</div>
          <div className="stat-sub">de 72 en fase de grupos</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Partidos pendientes</div>
          <div className="stat-value" style={{ color: 'var(--gold-light)' }}>{72 - totalPlayed}</div>
          <div className="stat-sub">por jugar</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Goles totales</div>
          <div className="stat-value" style={{ color: '#4ADE80' }}>
            {Object.values(results).reduce((s, r) => s + r.homeGoals + r.awayGoals, 0)}
          </div>
          <div className="stat-sub">en partidos jugados</div>
        </div>
      </div>

      {/* Selector de grupo */}
      <div className="filter-tabs" style={{ marginBottom: 0 }}>
        {groups.map(g => (
          <button
            key={g}
            className={`filter-tab ${filterGroup === g ? 'active' : ''}`}
            onClick={() => setFilterGroup(g)}
            style={filterGroup === g ? { background: GROUP_COLORS[g], borderColor: GROUP_COLORS[g], color: '#000' } : {}}
          >
            Grupo {g}
          </button>
        ))}
      </div>

      {/* Tabs resultados / tabla */}
      <div style={{ display: 'flex', gap: 8, margin: '16px 0', borderBottom: '1px solid var(--border)' }}>
        {[['resultados','⚽ Partidos'],['tabla','📋 Tabla de posiciones']].map(([key, lbl]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '8px 16px', fontSize: 13, fontWeight: 600,
            color: tab === key ? 'var(--text)' : 'var(--text3)',
            borderBottom: tab === key ? `2px solid ${GROUP_COLORS[filterGroup]}` : '2px solid transparent',
            marginBottom: -1,
          }}>{lbl}</button>
        ))}
      </div>

      {tab === 'resultados' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: GROUP_COLORS[filterGroup],
              color: '#000', fontWeight: 800, fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{filterGroup}</div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Grupo {filterGroup}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text3)' }}>
              {groupMatches.filter(m => results[m.id]).length}/{groupMatches.length} jugados
            </span>
          </div>
          {groupMatches.map(m => (
            <MatchRow
              key={m.id}
              match={m}
              result={results[m.id]}
              onSave={saveResult}
              onDelete={deleteResult}
            />
          ))}
        </div>
      )}

      {tab === 'tabla' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: GROUP_COLORS[filterGroup],
              color: '#000', fontWeight: 800, fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{filterGroup}</div>
            <span style={{ fontWeight: 600 }}>Tabla Grupo {filterGroup}</span>
          </div>
          <StandingsTable group={filterGroup} standings={standings} />
        </div>
      )}
    </div>
  );
}