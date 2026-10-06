import { useState } from 'react';

const plates = [
  { bg: '#1C1917', fg: '#F3E6D0', line: '#C4A574' },
  { bg: '#F4EBE1', fg: '#2C241F', line: '#8C6239' },
  { bg: '#5C2E36', fg: '#F6EFE6', line: '#E4C99A' },
  { bg: '#E7D7C1', fg: '#2A2420', line: '#6E2E38' },
  { bg: '#2A2420', fg: '#F7F1E8', line: '#C4A574' },
  { bg: '#F7F3EC', fg: '#1C1917', line: '#8A6A45' },
  { bg: '#3E2C29', fg: '#F3E6D4', line: '#D4B483' },
  { bg: '#EFE4D6', fg: '#4A2030', line: '#8C7355' },
  { bg: '#14221C', fg: '#E7DCC8', line: '#C6A15B' },
  { bg: '#FBF7F1', fg: '#3A2A24', line: '#6E2E38' },
];

function hash(value) {
  const text = String(value || 'aabhaara');
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 33 + text.charCodeAt(i)) >>> 0;
  return h;
}

function Motif({ category, color }) {
  const common = { fill: 'none', stroke: color, strokeWidth: 1.2 };
  if (category === 'earrings') {
    return (
      <g {...common}>
        <circle cx="70" cy="48" r="10" />
        <path d="M70 58c8 10 14 18 14 30 0 10-6 16-14 16s-14-6-14-16c0-12 6-20 14-30z" />
        <circle cx="130" cy="48" r="10" />
        <path d="M130 58c8 10 14 18 14 30 0 10-6 16-14 16s-14-6-14-16c0-12 6-20 14-30z" />
      </g>
    );
  }
  if (category === 'necklaces' || category === 'necklace-sets') {
    return (
      <g {...common}>
        <path d="M40 70c30 10 40 40 60 70 20-30 30-60 60-70" />
        <path d="M55 78c22 8 30 28 45 50 15-22 23-42 45-50" />
        <circle cx="100" cy="148" r="8" />
      </g>
    );
  }
  if (category === 'bracelets' || category === 'bangles') {
    return (
      <g {...common}>
        <ellipse cx="100" cy="110" rx="46" ry="58" />
        <ellipse cx="100" cy="110" rx="34" ry="44" />
      </g>
    );
  }
  if (category === 'nose-pins') {
    return (
      <g {...common}>
        <path d="M78 120c8-28 20-48 44-58" />
        <circle cx="126" cy="58" r="8" />
        <path d="M126 66c6 16 4 28-2 40" />
      </g>
    );
  }
  if (category === 'men') {
    return (
      <g {...common}>
        <rect x="62" y="88" width="76" height="18" rx="9" />
        <path d="M70 106v18M130 106v18M86 124h28" />
      </g>
    );
  }
  if (category === 'bridal') {
    return (
      <g {...common}>
        <path d="M100 42l8 18 20 2-15 13 5 19-18-10-18 10 5-19-15-13 20-2z" />
        <path d="M70 110h60M78 122h44" />
      </g>
    );
  }
  if (category === 'diamond') {
    return (
      <g {...common}>
        <path d="M70 78h60l-10 16H80z" />
        <path d="M80 94l20 36 20-36" />
      </g>
    );
  }
  return (
    <g {...common}>
      <circle cx="100" cy="108" r="28" />
      <circle cx="100" cy="108" r="8" />
      <path d="M100 136v22" />
    </g>
  );
}

const JewelleryImage = ({
  src,
  alt,
  seed,
  category = 'rings',
  label,
  ratio = 'portrait',
  tone,
  className = '',
}) => {
  const [status, setStatus] = useState(src ? 'loading' : 'error');
  const value = hash(seed || src || alt);
  const plate = plates[typeof tone === 'number' ? tone % plates.length : value % plates.length];
  const shift = (value % 40) - 10;

  return (
    <div className={`jewel-frame jewel-frame--${ratio} ${className}`} style={{ background: plate.bg, color: plate.fg }}>
      {src && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          className={`jewel-frame__img ${status === 'ok' ? 'is-ready' : ''}`}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
        />
      )}
      {status !== 'ok' && (
        <div className="jewel-ph" role="img" aria-label={alt}>
          <span className="jewel-ph__rule" style={{ background: plate.line, transform: `translateX(${shift}%)` }} />
          <svg viewBox="0 0 200 220" className="jewel-ph__motif" aria-hidden="true">
            <Motif category={category} color={plate.line} />
          </svg>
          {label && <span className="jewel-ph__label">{label}</span>}
        </div>
      )}
    </div>
  );
};

export default JewelleryImage;
