export const GROUPS = {
  A: { teams: ['México', 'Sudáfrica', 'Corea del Sur', 'República Checa'] },
  B: { teams: ['Canadá', 'Bosnia y Herzegovina', 'Catar', 'Suiza'] },
  C: { teams: ['Brasil', 'Marruecos', 'Haití', 'Escocia'] },
  D: { teams: ['Estados Unidos', 'Paraguay', 'Australia', 'Turquía'] },
  E: { teams: ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'] },
  F: { teams: ['Países Bajos', 'Japón', 'Suecia', 'Túnez'] },
  G: { teams: ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'] },
  H: { teams: ['España', 'Cabo Verde', 'Arabia Saudita', 'Uruguay'] },
  I: { teams: ['Francia', 'Senegal', 'Irak', 'Noruega'] },
  J: { teams: ['Argentina', 'Argelia', 'Austria', 'Jordania'] },
  K: { teams: ['Portugal', 'RD Congo', 'Uzbekistán', 'Colombia'] },
  L: { teams: ['Inglaterra', 'Croacia', 'Ghana', 'Panamá'] },
};

export const VENUES = [
  'Est. Ciudad de México (Azteca)',
  'Est. Guadalajara (Akron)',
  'Est. Monterrey (BBVA)',
  'Est. Toronto (BMO Field)',
  'BC Place Vancouver',
  'Est. Los Ángeles (SoFi Stadium)',
  'Est. Nueva York/NJ (MetLife)',
  'Est. Boston (Gillette Stadium)',
  'Est. Miami (Hard Rock)',
  'Est. Dallas (AT&T Stadium)',
  'Est. Atlanta (Mercedes-Benz)',
  'Est. Houston (NRG Stadium)',
  'Est. Filadelfia (Lincoln Financial)',
  'Est. Kansas City (Arrowhead)',
  'Est. Seattle (Lumen Field)',
  "Est. Bahía SF (Levi's Stadium)",
];

// Horas en Colombia (ET - 1h)
export const GROUP_MATCHES_DEFAULT = [
  // ── GRUPO A ──
  { id: 'A1', group: 'A', home: 'México',          away: 'Sudáfrica',           date: '2026-06-11', time: '14:00', venue: 'Est. Ciudad de México (Azteca)',  jornada: 1, note: 'Partido inaugural' },
  { id: 'A2', group: 'A', home: 'Corea del Sur',   away: 'República Checa',     date: '2026-06-11', time: '21:00', venue: 'Est. Guadalajara (Akron)',        jornada: 1, note: '' },
  { id: 'A3', group: 'A', home: 'México',          away: 'Corea del Sur',       date: '2026-06-18', time: '20:00', venue: 'Est. Guadalajara (Akron)',        jornada: 2, note: '' },
  { id: 'A4', group: 'A', home: 'República Checa', away: 'Sudáfrica',           date: '2026-06-18', time: '11:00', venue: 'Est. Atlanta (Mercedes-Benz)',    jornada: 2, note: '' },
  { id: 'A5', group: 'A', home: 'República Checa', away: 'México',              date: '2026-06-24', time: '20:00', venue: 'Est. Ciudad de México (Azteca)',  jornada: 3, note: '' },
  { id: 'A6', group: 'A', home: 'Sudáfrica',       away: 'Corea del Sur',       date: '2026-06-24', time: '20:00', venue: 'Est. Monterrey (BBVA)',           jornada: 3, note: '' },

  // ── GRUPO B ──
  { id: 'B1', group: 'B', home: 'Canadá',               away: 'Bosnia y Herzegovina', date: '2026-06-12', time: '14:00', venue: 'Est. Toronto (BMO Field)',       jornada: 1, note: '' },
  { id: 'B2', group: 'B', home: 'Catar',                away: 'Suiza',                date: '2026-06-13', time: '14:00', venue: "Est. Bahía SF (Levi's Stadium)",  jornada: 1, note: '' },
  { id: 'B3', group: 'B', home: 'Suiza',                away: 'Bosnia y Herzegovina', date: '2026-06-18', time: '14:00', venue: 'BC Place Vancouver',              jornada: 2, note: '' },
  { id: 'B4', group: 'B', home: 'Canadá',               away: 'Catar',                date: '2026-06-18', time: '20:00', venue: 'Est. Guadalajara (Akron)',        jornada: 2, note: '' },
  { id: 'B5', group: 'B', home: 'Suiza',                away: 'Canadá',               date: '2026-06-24', time: '14:00', venue: 'BC Place Vancouver',              jornada: 3, note: '' },
  { id: 'B6', group: 'B', home: 'Bosnia y Herzegovina', away: 'Catar',                date: '2026-06-24', time: '20:00', venue: 'Est. Seattle (Lumen Field)',      jornada: 3, note: '' },

  // ── GRUPO C ──
  { id: 'C1', group: 'C', home: 'Brasil',    away: 'Marruecos', date: '2026-06-13', time: '17:00', venue: 'Est. Nueva York/NJ (MetLife)',    jornada: 1, note: '' },
  { id: 'C2', group: 'C', home: 'Haití',     away: 'Escocia',   date: '2026-06-13', time: '20:00', venue: 'Est. Boston (Gillette Stadium)',  jornada: 1, note: '' },
  { id: 'C3', group: 'C', home: 'Escocia',   away: 'Marruecos', date: '2026-06-19', time: '17:00', venue: 'Est. Boston (Gillette Stadium)',  jornada: 2, note: '' },
  { id: 'C4', group: 'C', home: 'Brasil',    away: 'Haití',     date: '2026-06-19', time: '20:00', venue: 'Est. Filadelfia (Lincoln Financial)', jornada: 2, note: '' },
  { id: 'C5', group: 'C', home: 'Escocia',   away: 'Brasil',    date: '2026-06-24', time: '17:00', venue: 'Est. Miami (Hard Rock)',          jornada: 3, note: '' },
  { id: 'C6', group: 'C', home: 'Marruecos', away: 'Haití',     date: '2026-06-24', time: '17:00', venue: 'Est. Los Ángeles (SoFi Stadium)', jornada: 3, note: '' },

  // ── GRUPO D ──
  { id: 'D1', group: 'D', home: 'Estados Unidos', away: 'Paraguay',  date: '2026-06-12', time: '20:00', venue: 'Est. Los Ángeles (SoFi Stadium)', jornada: 1, note: '' },
  { id: 'D2', group: 'D', home: 'Australia',      away: 'Turquía',   date: '2026-06-13', time: '23:00', venue: 'Est. Bahía SF (Levi\'s Stadium)', jornada: 1, note: '' },
  { id: 'D3', group: 'D', home: 'Turquía',        away: 'Paraguay',  date: '2026-06-19', time: '20:00', venue: 'Est. Filadelfia (Lincoln Financial)', jornada: 2, note: '' },
  { id: 'D4', group: 'D', home: 'Estados Unidos', away: 'Australia', date: '2026-06-20', time: '15:00', venue: 'Est. Kansas City (Arrowhead)',     jornada: 2, note: '' },
  { id: 'D5', group: 'D', home: 'Turquía',        away: 'Estados Unidos', date: '2026-06-25', time: '21:00', venue: 'Est. Miami (Hard Rock)',      jornada: 3, note: '' },
  { id: 'D6', group: 'D', home: 'Paraguay',       away: 'Australia', date: '2026-06-25', time: '21:00', venue: 'Est. Nueva York/NJ (MetLife)',    jornada: 3, note: '' },

  // ── GRUPO E ──
  { id: 'E1', group: 'E', home: 'Alemania',        away: 'Curazao',         date: '2026-06-14', time: '12:00', venue: 'Est. Houston (NRG Stadium)',      jornada: 1, note: '' },
  { id: 'E2', group: 'E', home: 'Costa de Marfil', away: 'Ecuador',         date: '2026-06-14', time: '18:00', venue: 'Est. Monterrey (BBVA)',           jornada: 1, note: '' },
  { id: 'E3', group: 'E', home: 'Alemania',        away: 'Costa de Marfil', date: '2026-06-20', time: '15:00', venue: 'Est. Toronto (BMO Field)',        jornada: 2, note: '' },
  { id: 'E4', group: 'E', home: 'Ecuador',         away: 'Curazao',         date: '2026-06-20', time: '19:00', venue: 'Est. Kansas City (Arrowhead)',    jornada: 2, note: '' },
  { id: 'E5', group: 'E', home: 'Curazao',         away: 'Costa de Marfil', date: '2026-06-25', time: '15:00', venue: 'Est. Filadelfia (Lincoln Financial)', jornada: 3, note: '' },
  { id: 'E6', group: 'E', home: 'Ecuador',         away: 'Alemania',        date: '2026-06-25', time: '15:00', venue: 'Est. Nueva York/NJ (MetLife)',    jornada: 3, note: '' },

  // ── GRUPO F ──
  { id: 'F1', group: 'F', home: 'Países Bajos', away: 'Japón',   date: '2026-06-14', time: '15:00', venue: 'Est. Dallas (AT&T Stadium)',      jornada: 1, note: '' },
  { id: 'F2', group: 'F', home: 'Suecia',       away: 'Túnez',   date: '2026-06-14', time: '21:00', venue: 'Est. Monterrey (BBVA)',           jornada: 1, note: '' },
  { id: 'F3', group: 'F', home: 'Países Bajos', away: 'Suecia',  date: '2026-06-20', time: '12:00', venue: 'Est. Houston (NRG Stadium)',      jornada: 2, note: '' },
  { id: 'F4', group: 'F', home: 'Túnez',        away: 'Japón',   date: '2026-06-20', time: '23:00', venue: 'Est. Bahía SF (Levi\'s Stadium)', jornada: 2, note: '' },
  { id: 'F5', group: 'F', home: 'Túnez',        away: 'Países Bajos', date: '2026-06-25', time: '18:00', venue: 'Est. Kansas City (Arrowhead)', jornada: 3, note: '' },
  { id: 'F6', group: 'F', home: 'Japón',        away: 'Suecia',  date: '2026-06-25', time: '18:00', venue: 'Est. Dallas (AT&T Stadium)',      jornada: 3, note: '' },

  // ── GRUPO G ──
  { id: 'G1', group: 'G', home: 'Bélgica',      away: 'Egipto',        date: '2026-06-15', time: '14:00', venue: 'Est. Seattle (Lumen Field)',      jornada: 1, note: '' },
  { id: 'G2', group: 'G', home: 'Irán',         away: 'Nueva Zelanda', date: '2026-06-15', time: '20:00', venue: 'Est. Los Ángeles (SoFi Stadium)', jornada: 1, note: '' },
  { id: 'G3', group: 'G', home: 'Bélgica',      away: 'Irán',          date: '2026-06-21', time: '14:00', venue: 'Est. Los Ángeles (SoFi Stadium)', jornada: 2, note: '' },
  { id: 'G4', group: 'G', home: 'Nueva Zelanda',away: 'Egipto',        date: '2026-06-21', time: '17:00', venue: 'Est. Vancouver (BC Place)',       jornada: 2, note: '' },
  { id: 'G5', group: 'G', home: 'Egipto',       away: 'Irán',          date: '2026-06-26', time: '22:00', venue: 'Est. Seattle (Lumen Field)',      jornada: 3, note: '' },
  { id: 'G6', group: 'G', home: 'Nueva Zelanda',away: 'Bélgica',       date: '2026-06-26', time: '19:00', venue: 'Est. Houston (NRG Stadium)',      jornada: 3, note: '' },

  // ── GRUPO H ──
  { id: 'H1', group: 'H', home: 'España',        away: 'Cabo Verde',   date: '2026-06-15', time: '11:00', venue: 'Est. Atlanta (Mercedes-Benz)',    jornada: 1, note: '' },
  { id: 'H2', group: 'H', home: 'Arabia Saudita',away: 'Uruguay',      date: '2026-06-15', time: '17:00', venue: 'Est. Miami (Hard Rock)',          jornada: 1, note: '' },
  { id: 'H3', group: 'H', home: 'España',        away: 'Arabia Saudita',date: '2026-06-21', time: '11:00', venue: 'Est. Atlanta (Mercedes-Benz)',   jornada: 2, note: '' },
  { id: 'H4', group: 'H', home: 'Uruguay',       away: 'Cabo Verde',   date: '2026-06-21', time: '17:00', venue: 'Est. Miami (Hard Rock)',          jornada: 2, note: '' },
  { id: 'H5', group: 'H', home: 'Cabo Verde',    away: 'Arabia Saudita',date: '2026-06-26', time: '19:00', venue: 'Est. Houston (NRG Stadium)',     jornada: 3, note: '' },
  { id: 'H6', group: 'H', home: 'Uruguay',       away: 'España',       date: '2026-06-26', time: '22:00', venue: 'Est. Guadalajara (Akron)',        jornada: 3, note: '' },

  // ── GRUPO I ──
  { id: 'I1', group: 'I', home: 'Francia',  away: 'Senegal', date: '2026-06-16', time: '14:00', venue: 'Est. Nueva York/NJ (MetLife)',    jornada: 1, note: '' },
  { id: 'I2', group: 'I', home: 'Irak',     away: 'Noruega', date: '2026-06-16', time: '20:00', venue: 'Est. Kansas City (Arrowhead)',    jornada: 1, note: '' },
  { id: 'I3', group: 'I', home: 'Francia',  away: 'Irak',    date: '2026-06-22', time: '16:00', venue: 'Est. Filadelfia (Lincoln Financial)', jornada: 2, note: '' },
  { id: 'I4', group: 'I', home: 'Noruega',  away: 'Senegal', date: '2026-06-22', time: '19:00', venue: 'Est. Nueva York/NJ (MetLife)',    jornada: 2, note: '' },
  { id: 'I5', group: 'I', home: 'Noruega',  away: 'Francia', date: '2026-06-26', time: '14:00', venue: 'Est. Boston (Gillette Stadium)',  jornada: 3, note: '' },
  { id: 'I6', group: 'I', home: 'Senegal',  away: 'Irak',    date: '2026-06-27', time: '19:30', venue: 'Est. Miami (Hard Rock)',          jornada: 3, note: '' },

  // ── GRUPO J ──
  { id: 'J1', group: 'J', home: 'Argentina', away: 'Argelia',  date: '2026-06-16', time: '20:00', venue: 'Est. Dallas (AT&T Stadium)',      jornada: 1, note: '' },
  { id: 'J2', group: 'J', home: 'Austria',   away: 'Jordania', date: '2026-06-16', time: '23:00', venue: 'Est. Bahía SF (Levi\'s Stadium)', jornada: 1, note: '' },
  { id: 'J3', group: 'J', home: 'Argentina', away: 'Austria',  date: '2026-06-22', time: '12:00', venue: 'Est. Houston (NRG Stadium)',      jornada: 2, note: '' },
  { id: 'J4', group: 'J', home: 'Jordania',  away: 'Argelia',  date: '2026-06-22', time: '22:00', venue: 'Est. Bahía SF (Levi\'s Stadium)', jornada: 2, note: '' },
  { id: 'J5', group: 'J', home: 'Jordania',  away: 'Argentina',date: '2026-06-27', time: '21:00', venue: 'Est. Dallas (AT&T Stadium)',      jornada: 3, note: '' },
  { id: 'J6', group: 'J', home: 'Argelia',   away: 'Austria',  date: '2026-06-27', time: '19:30', venue: 'Est. Atlanta (Mercedes-Benz)',    jornada: 3, note: '' },

  // ── GRUPO K ──
  { id: 'K1', group: 'K', home: 'Portugal',    away: 'RD Congo',    date: '2026-06-17', time: '12:00', venue: 'Est. Houston (NRG Stadium)',      jornada: 1, note: '' },
  { id: 'K2', group: 'K', home: 'Uzbekistán',  away: 'Colombia',    date: '2026-06-17', time: '21:00', venue: 'Est. Ciudad de México (Azteca)',  jornada: 1, note: '' },
  { id: 'K3', group: 'K', home: 'Portugal',    away: 'Uzbekistán',  date: '2026-06-23', time: '12:00', venue: 'Est. Boston (Gillette Stadium)',  jornada: 2, note: '' },
  { id: 'K4', group: 'K', home: 'Colombia',    away: 'RD Congo',    date: '2026-06-23', time: '21:00', venue: 'Est. Guadalajara (Akron)',        jornada: 2, note: '' },
  { id: 'K5', group: 'K', home: 'Colombia',    away: 'Portugal',    date: '2026-06-27', time: '18:30', venue: 'Est. Nueva York/NJ (MetLife)',    jornada: 3, note: '' },
  { id: 'K6', group: 'K', home: 'RD Congo',    away: 'Uzbekistán',  date: '2026-06-27', time: '21:00', venue: 'Est. Dallas (AT&T Stadium)',      jornada: 3, note: '' },

  // ── GRUPO L ──
  { id: 'L1', group: 'L', home: 'Inglaterra', away: 'Croacia', date: '2026-06-17', time: '15:00', venue: 'Est. Dallas (AT&T Stadium)',      jornada: 1, note: '' },
  { id: 'L2', group: 'L', home: 'Ghana',      away: 'Panamá',  date: '2026-06-17', time: '18:00', venue: 'Est. Toronto (BMO Field)',        jornada: 1, note: '' },
  { id: 'L3', group: 'L', home: 'Inglaterra', away: 'Ghana',   date: '2026-06-23', time: '15:00', venue: 'Est. Boston (Gillette Stadium)',  jornada: 2, note: '' },
  { id: 'L4', group: 'L', home: 'Panamá',     away: 'Croacia', date: '2026-06-23', time: '18:00', venue: 'Est. Toronto (BMO Field)',        jornada: 2, note: '' },
  { id: 'L5', group: 'L', home: 'Panamá',     away: 'Inglaterra',date: '2026-06-27', time: '16:00', venue: 'Est. Filadelfia (Lincoln Financial)', jornada: 3, note: '' },
  { id: 'L6', group: 'L', home: 'Croacia',    away: 'Ghana',   date: '2026-06-27', time: '16:00', venue: 'Est. Atlanta (Mercedes-Benz)',    jornada: 3, note: '' },
];

export const KNOCKOUT_PHASES = [
  { stage: 'r32',   label: 'Dieciseisavos de Final', dateRange: '28 Jun – 3 Jul 2026' },
  { stage: 'r16',   label: 'Octavos de Final',       dateRange: '4 – 7 Jul 2026' },
  { stage: 'qf',    label: 'Cuartos de Final',       dateRange: '9 – 11 Jul 2026' },
  { stage: 'sf',    label: 'Semifinales',            dateRange: '14 – 15 Jul 2026' },
  { stage: '3rd',   label: 'Tercer Puesto',          dateRange: '18 Jul 2026' },
  { stage: 'final', label: 'Gran Final',             dateRange: '19 Jul 2026 — Est. Nueva York/NJ' },
];

export const FLAGS = {
  'México': 'mx', 'Sudáfrica': 'za', 'Corea del Sur': 'kr', 'República Checa': 'cz',
  'Canadá': 'ca', 'Bosnia y Herzegovina': 'ba', 'Catar': 'qa', 'Suiza': 'ch',
  'Brasil': 'br', 'Marruecos': 'ma', 'Haití': 'ht', 'Escocia': 'gb-sct',
  'Estados Unidos': 'us', 'Paraguay': 'py', 'Australia': 'au', 'Turquía': 'tr',
  'Alemania': 'de', 'Curazao': 'cw', 'Costa de Marfil': 'ci', 'Ecuador': 'ec',
  'Países Bajos': 'nl', 'Japón': 'jp', 'Suecia': 'se', 'Túnez': 'tn',
  'Bélgica': 'be', 'Egipto': 'eg', 'Irán': 'ir', 'Nueva Zelanda': 'nz',
  'España': 'es', 'Cabo Verde': 'cv', 'Arabia Saudita': 'sa', 'Uruguay': 'uy',
  'Francia': 'fr', 'Senegal': 'sn', 'Irak': 'iq', 'Noruega': 'no',
  'Argentina': 'ar', 'Argelia': 'dz', 'Austria': 'at', 'Jordania': 'jo',
  'Portugal': 'pt', 'RD Congo': 'cd', 'Uzbekistán': 'uz', 'Colombia': 'co',
  'Inglaterra': 'gb-eng', 'Croacia': 'hr', 'Ghana': 'gh', 'Panamá': 'pa',
};
