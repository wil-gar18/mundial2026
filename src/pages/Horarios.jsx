import { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FLAGS } from '../data/matches';

const GROUP_COLORS = {
  A:'#C9A84C', B:'#4ADE80', C:'#60A5FA', D:'#F87171',
  E:'#A78BFA', F:'#FB923C', G:'#34D399', H:'#F472B6',
  I:'#FACC15', J:'#38BDF8', K:'#E879F9', L:'#4ADE80',
};

export default function Horarios() {
  const { matches } = useApp();
  const [filterGroup, setFilterGroup] = useState('todos');
  const [filterJornada, setFilterJornada] = useState('todas');
  const [search, setSearch] = useState('');

  const groups = ['todos','A','B','C','D','E','F','G','H','I','J','K','L'];
  const jornadas = ['todas','1','2','3'];

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const byGroup = filterGroup === 'todos' || m.group === filterGroup;
      const byJornada = filterJornada === 'todas' || String(m.jornada) === filterJornada;
      const bySearch = !search || m.home.toLowerCase().includes(search.toLowerCase()) || m.away.toLowerCase().includes(search.toLowerCase());
      return byGroup && byJornada && bySearch;
    });
  }, [matches, filterGroup, filterJornada, search]);

  const byDate = useMemo(() => {
    const map = {};
    filtered.forEach(m => {
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    });
    return Object.entries(map).sort(([a],[b]) => a.localeCompare(b));
  }, [filtered]);

  const formatDate = (d) => {
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div>
      <div className="page-header">
        <h2>⚽ Horarios — Fase de Grupos</h2>
        <p>72 partidos · 12 grupos · 11 Jun – 27 Jun 2026 · Horas en Colombia (UTC-5)</p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar selección..." style={{ paddingLeft: 30 }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {jornadas.map(j => (
              <button key={j} className={`filter-tab ${filterJornada === j ? 'active' : ''}`} onClick={() => setFilterJornada(j)}>
                {j === 'todas' ? 'Todas las jornadas' : `Jornada ${j}`}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {groups.map(g => (
            <button
              key={g}
              className={`filter-tab ${filterGroup === g ? 'active' : ''}`}
              onClick={() => setFilterGroup(g)}
              style={filterGroup === g && g !== 'todos' ? { background: GROUP_COLORS[g], borderColor: GROUP_COLORS[g], color: '#000' } : {}}
            >
              {g === 'todos' ? 'Todos' : `Grupo ${g}`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>
        Mostrando <strong style={{ color: 'var(--text2)' }}>{filtered.length}</strong> partidos
      </div>

      {byDate.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>
          No se encontraron partidos con esos filtros.
        </div>
      )}

      {byDate.map(([date, dayMatches]) => (
        <div key={date}>
          <div className="group-header" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={13} />
            {formatDate(date)}
            <span style={{ marginLeft: 'auto', fontSize: 11 }}>{dayMatches.length} partido{dayMatches.length > 1 ? 's' : ''}</span>
          </div>

          {dayMatches.map(m => (
            <div key={m.id} className="match-card">
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                background: GROUP_COLORS[m.group] || 'var(--bg3)',
                color: '#000', fontWeight: 700, fontSize: 12, flexShrink: 0,
              }}>
                {m.group}
              </span>

              <div className="match-teams">
                <span className="match-flag">
                  <Flag code={FLAGS[m.home]} size={20} />
                </span>
                <span>{m.home}</span>
                <span className="match-vs">vs</span>
                <span>{m.away}</span>
                <span className="match-flag"><Flag code={FLAGS[m.away]} size={20} /></span>
              </div>

              <div className="match-info">
                <div className="match-time" style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                  <Clock size={12} />{m.time} (Col)
                </div>
                <div className="match-venue" style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                  <MapPin size={10} />{m.venue}
                </div>
                {m.note && (
                  <div style={{ fontSize: 10, color: 'var(--gold)', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>
                )}
              </div>

              <span className="badge badge-group" style={{ flexShrink: 0 }}>J{m.jornada}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}