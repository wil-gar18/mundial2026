import { useState, useMemo } from 'react';
import { RotateCcw, Edit3, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VENUES, FLAGS } from '../data/matches';

export default function Configuracion() {
  const { matches, updateMatch, resetMatches } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filterGroup, setFilterGroup] = useState('todos');
  const [saved, setSaved] = useState(false);

  const groups = ['todos','A','B','C','D','E','F','G','H','I','J','K','L'];

  const filtered = useMemo(() => {
    if (filterGroup === 'todos') return matches;
    return matches.filter(m => m.group === filterGroup);
  }, [matches, filterGroup]);

  const startEdit = (m) => {
    setEditingId(m.id);
    setEditForm({ date: m.date, time: m.time, venue: m.venue, note: m.note || '' });
  };

  const saveEdit = (id) => {
    updateMatch(id, editForm);
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Restablecer todos los horarios y sedes?')) resetMatches();
  };

  const byGroup = useMemo(() => {
    const map = {};
    filtered.forEach(m => {
      if (!map[m.group]) map[m.group] = [];
      map[m.group].push(m);
    });
    return Object.entries(map).sort(([a],[b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <div className="page-header">
        <h2>Configuracion de Partidos</h2>
        <p>Edita fechas, horarios y sedes. Los cambios se guardan en tu navegador.</p>
      </div>

      <div className="card" style={{ marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Gestion de datos</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>Cambios guardados localmente.</div>
        </div>
        {saved && <span style={{ fontSize: 12, color: '#4ADE80' }}><Check size={14} /> Guardado</span>}
        <button className="btn btn-ghost" onClick={handleReset}><RotateCcw size={14} /> Restablecer</button>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 20 }}>
        {groups.map(g => (
          <button key={g} className={`filter-tab ${filterGroup === g ? 'active' : ''}`} onClick={() => setFilterGroup(g)}>
            {g === 'todos' ? 'Todos' : `Grupo ${g}`}
          </button>
        ))}
      </div>

      {byGroup.map(([group, groupMatches]) => (
        <div key={group} style={{ marginBottom: 24 }}>
          <div className="group-header">Grupo {group}</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg3)', fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase' }}>
                  {['Partido','J','Fecha','Hora','Sede','Nota',''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupMatches.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: i < groupMatches.length - 1 ? '1px solid var(--border)' : 'none', background: editingId === m.id ? 'rgba(13,122,62,0.08)' : 'transparent' }}>
                    <td style={{ padding: '10px 14px', fontSize: 13 }}>
                      <span style={{ fontWeight: 500 }}>{FLAGS[m.home] || ''} {m.home}</span>
                      <span style={{ color: 'var(--text3)', margin: '0 6px' }}>vs</span>
                      <span style={{ fontWeight: 500 }}>{FLAGS[m.away] || ''} {m.away}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="badge badge-group">J{m.jornada}</span>
                    </td>
                    {editingId === m.id ? (
                      <>
                        <td style={{ padding: '6px 14px' }}>
                          <input type="date" value={editForm.date} onChange={e => setEditForm(p => ({...p, date: e.target.value}))} style={{ width: 140, fontSize: 12 }} />
                        </td>
                        <td style={{ padding: '6px 14px' }}>
                          <input type="time" value={editForm.time} onChange={e => setEditForm(p => ({...p, time: e.target.value}))} style={{ width: 90, fontSize: 12 }} />
                        </td>
                        <td style={{ padding: '6px 14px' }}>
                          <select value={editForm.venue} onChange={e => setEditForm(p => ({...p, venue: e.target.value}))} style={{ fontSize: 12 }}>
                            {VENUES.map(v => <option key={v} value={v}>{v}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '6px 14px' }}>
                          <input value={editForm.note} onChange={e => setEditForm(p => ({...p, note: e.target.value}))} placeholder="Nota" style={{ fontSize: 12 }} />
                        </td>
                        <td style={{ padding: '6px 14px', whiteSpace: 'nowrap' }}>
                          <button className="btn btn-green btn-sm" onClick={() => saveEdit(m.id)} style={{ marginRight: 4 }}><Check size={12} /></button>
                          <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}><X size={12} /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text2)' }}>{m.date}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--gold-light)' }}>{m.time}</td>
                        <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text3)' }}>{m.venue}</td>
                        <td style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text3)', fontStyle: m.note ? 'italic' : 'normal' }}>{m.note || '—'}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => startEdit(m)}><Edit3 size={12} /> Editar</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}