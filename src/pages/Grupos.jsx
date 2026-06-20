import { GROUPS, FLAGS } from '../data/matches';

const GROUP_COLORS = {
  A:'#C9A84C', B:'#4ADE80', C:'#60A5FA', D:'#F87171',
  E:'#A78BFA', F:'#FB923C', G:'#34D399', H:'#F472B6',
  I:'#FACC15', J:'#38BDF8', K:'#E879F9', L:'#4ADE80',
};

export default function Grupos() {
  return (
    <div>
      <div className="page-header">
        <h2>🌍 Grupos Oficiales</h2>
        <p>48 selecciones en 12 grupos · Clasifican 2 primeros de cada grupo + 8 mejores terceros = 32 equipos a eliminatoria</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {Object.entries(GROUPS).map(([g, data]) => (
          <div key={g} className="card" style={{ borderTop: `3px solid ${GROUP_COLORS[g] || 'var(--green)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: GROUP_COLORS[g] || 'var(--green)',
                color: '#000', fontWeight: 800, fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {g}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Grupo {g}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>4 selecciones</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {data.teams.map((team, i) => (
                <div key={team} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', background: 'var(--bg3)',
                  borderRadius: 6, fontSize: 13,
                }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{FLAGS[team] || '🏳'}</span>
                  <span style={{ fontWeight: 500 }}>{team}</span>
                  {i === 0 && (
                    <span className="badge badge-gold" style={{ marginLeft: 'auto', fontSize: 10 }}>Cabeza</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Formato de clasificación</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { color: '#4ADE80', label: '1° y 2° de cada grupo', desc: '24 equipos clasifican directamente a Dieciseisavos de Final' },
            { color: '#FACC15', label: '8 mejores terceros', desc: 'De los 12 grupos, los 8 mejores terceros clasificados también avanzan' },
            { color: '#F87171', label: 'Eliminados', desc: '4 equipos que terminan terceros (los 4 peores) y todos los últimos' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color, marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}