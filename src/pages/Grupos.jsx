import { useMemo } from 'react';
import { GROUPS, FLAGS } from '../data/matches';
import { useApp } from '../context/AppContext';

const GROUP_COLORS = {
  A:'#C9A84C', B:'#4ADE80', C:'#60A5FA', D:'#F87171',
  E:'#A78BFA', F:'#FB923C', G:'#34D399', H:'#F472B6',
  I:'#FACC15', J:'#38BDF8', K:'#E879F9', L:'#4ADE80',
};

export default function Grupos() {
  const { calcStandings } = useApp();
  const groups = Object.keys(GROUPS);

  // Calcular tabla de todos los terceros
  const bestThirds = useMemo(() => {
    return groups.map(g => {
      const standings = calcStandings(g);
      const third = standings[2];
      if (!third) return null;
      return { ...third, group: g };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const dgA = a.gf - a.gc, dgB = b.gf - b.gc;
      if (dgB !== dgA) return dgB - dgA;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return 0;
    });
  }, [calcStandings]);

  return (
    <div>
      <div className="page-header">
        <h2>🌍 Grupos Oficiales</h2>
        <p>48 selecciones · 12 grupos · Clasifican 2 primeros + 8 mejores terceros</p>
      </div>

      {/* Grupos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 32 }}>
        {groups.map(g => {
          const standings = calcStandings(g);
          const hasResults = standings.some(t => t.pj > 0);

          return (
            <div key={g} className="card" style={{ borderTop: `3px solid ${GROUP_COLORS[g]}`, padding: 0, overflow: 'hidden' }}>
              {/* Header grupo */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: GROUP_COLORS[g],
                  color: '#000', fontWeight: 800, fontSize: 15,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{g}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Grupo {g}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                    {hasResults ? `${standings.reduce((s,t) => s + t.pj, 0) / 2} partidos jugados` : 'Sin resultados aun'}
                  </div>
                </div>
              </div>

              {/* Tabla */}
              {hasResults ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase' }}>
                      <th style={{ padding: '6px 16px', textAlign: 'left' }}>#</th>
                      <th style={{ padding: '6px 8px', textAlign: 'left' }}>Equipo</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>PJ</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>PG</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>PE</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>PP</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>DG</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center', color: 'var(--gold)' }}>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t, i) => (
                      <tr key={t.team} style={{
                        borderTop: '1px solid var(--border)',
                        background: i < 2 ? 'rgba(13,122,62,0.08)' : i === 2 ? 'rgba(201,168,76,0.04)' : 'transparent',
                      }}>
                        <td style={{ padding: '8px 16px', fontWeight: 700, color: i < 2 ? '#4ADE80' : i === 2 ? 'var(--gold)' : 'var(--text3)' }}>{i + 1}</td>
                        <td style={{ padding: '8px 8px', fontWeight: 500, fontSize: 12 }}>
                          <span style={{ marginRight: 5 }}>{FLAGS[t.team] || '🏳'}</span>{t.team}
                        </td>
                        <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.pj}</td>
                        <td style={{ padding: '8px 8px', textAlign: 'center', color: '#4ADE80' }}>{t.pg}</td>
                        <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.pe}</td>
                        <td style={{ padding: '8px 8px', textAlign: 'center', color: '#F87171' }}>{t.pp}</td>
                        <td style={{ padding: '8px 8px', textAlign: 'center', color: 'var(--text2)' }}>{t.gf - t.gc >= 0 ? '+' : ''}{t.gf - t.gc}</td>
                        <td style={{ padding: '8px 8px', textAlign: 'center', fontWeight: 800, color: 'var(--gold-light)' }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: 16 }}>
                  {GROUPS[g].teams.map((team, i) => (
                    <div key={team} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '7px 0',
                      borderBottom: i < GROUPS[g].teams.length - 1 ? '1px solid var(--border)' : 'none',
                      fontSize: 13,
                    }}>
                      <span style={{ fontSize: 20 }}>{FLAGS[team] || '🏳'}</span>
                      <span style={{ fontWeight: 500 }}>{team}</span>
                      {i === 0 && <span className="badge badge-gold" style={{ marginLeft: 'auto', fontSize: 10 }}>Cabeza</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tabla mejores terceros */}
      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>🥉 Tabla de Mejores Terceros</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
          Los 8 mejores terceros de los 12 grupos clasifican a la eliminatoria
        </div>

        {bestThirds.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--text3)' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
            <div>Ingresa resultados para ver la tabla de terceros</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ color: 'var(--text3)', fontSize: 10, textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Grupo</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Equipo</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>PJ</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>PG</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>PE</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>PP</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>GF</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>GC</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>DG</th>
                <th style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--gold)' }}>PTS</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {bestThirds.map((t, i) => (
                <tr key={t.team} style={{
                  borderTop: '1px solid var(--border)',
                  background: i < 8 ? 'rgba(13,122,62,0.08)' : 'rgba(248,113,113,0.05)',
                }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: i < 8 ? '#4ADE80' : '#F87171' }}>{i + 1}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 24, height: 24, borderRadius: '50%',
                      background: GROUP_COLORS[t.group], color: '#000',
                      fontWeight: 800, fontSize: 11,
                    }}>{t.group}</span>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>
                    <span style={{ marginRight: 6 }}>{FLAGS[t.team] || '🏳'}</span>{t.team}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--text2)' }}>{t.pj}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: '#4ADE80' }}>{t.pg}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--text2)' }}>{t.pe}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: '#F87171' }}>{t.pp}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--text2)' }}>{t.gf}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--text2)' }}>{t.gc}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--text2)' }}>{t.gf - t.gc >= 0 ? '+' : ''}{t.gf - t.gc}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: 'var(--gold-light)' }}>{t.pts}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {i < 8
                      ? <span className="badge badge-green">Clasifica</span>
                      : <span className="badge badge-red">Eliminado</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}