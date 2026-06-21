import ReactCountryFlag from 'react-world-flags';

const CODES = {
  'mx': 'MEX', 'za': 'ZAF', 'kr': 'KOR', 'cz': 'CZE',
  'ca': 'CAN', 'ba': 'BIH', 'qa': 'QAT', 'ch': 'CHE',
  'br': 'BRA', 'ma': 'MAR', 'ht': 'HTI', 'gb-sct': 'SCO',
  'us': 'USA', 'py': 'PRY', 'au': 'AUS', 'tr': 'TUR',
  'de': 'DEU', 'cw': 'CUW', 'ci': 'CIV', 'ec': 'ECU',
  'nl': 'NLD', 'jp': 'JPN', 'se': 'SWE', 'tn': 'TUN',
  'be': 'BEL', 'eg': 'EGY', 'ir': 'IRN', 'nz': 'NZL',
  'es': 'ESP', 'cv': 'CPV', 'sa': 'SAU', 'uy': 'URY',
  'fr': 'FRA', 'sn': 'SEN', 'iq': 'IRQ', 'no': 'NOR',
  'ar': 'ARG', 'dz': 'DZA', 'at': 'AUT', 'jo': 'JOR',
  'pt': 'PRT', 'cd': 'COD', 'uz': 'UZB', 'co': 'COL',
  'gb-eng': 'ENG', 'hr': 'HRV', 'gh': 'GHA', 'pa': 'PAN',
};

export default function Flag({ code, size = 24 }) {
  if (!code) return <span>🏳</span>;
  const iso = CODES[code];
  if (!iso) return <span>🏳</span>;
  return (
    <ReactCountryFlag
      code={iso}
      style={{ width: size, height: size * 0.67, objectFit: 'cover', borderRadius: 2 }}
    />
  );
}