import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Dar El Meamar | Luxury Architectural Design & Construction';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div 
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '2px solid rgba(13, 148, 136, 0.3)',
            borderRadius: '20px',
          }} 
        />
        
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: 60, height: 2, background: '#0d9488' }} />
            <span style={{ color: '#0d9488', fontSize: 24, fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Architectural Excellence
            </span>
            <div style={{ width: 60, height: 2, background: '#0d9488' }} />
          </div>

          <h1 
            style={{ 
              fontSize: 84, 
              color: 'white', 
              margin: 0, 
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            Dar El Meamar
          </h1>
          
          <h2 
            style={{ 
              fontSize: 72, 
              color: '#0d9488', 
              margin: 0, 
              fontWeight: 'bold',
            }}
          >
            دار المعمار
          </h2>

          <p 
            style={{ 
              fontSize: 36, 
              color: '#e5e7eb', 
              marginTop: 40,
              fontWeight: 'medium',
              fontStyle: 'italic',
            }}
          >
            نبني أحلامك لتصبح حقيقة
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
