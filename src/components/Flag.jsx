export default function Flag({ code, size = 24 }) {
  if (!code) return <span style={{ fontSize: size * 0.8 }}>🏳</span>;
  return (
    <img
      src={`https://flagcdn.com/w${size * 2}/${code}.png`}
      alt={code}
      style={{ width: size, height: size * 0.67, objectFit: 'cover', borderRadius: 2, display: 'inline-block', verticalAlign: 'middle' }}
      onError={e => { e.target.style.display = 'none'; }}
    />
  );
}
