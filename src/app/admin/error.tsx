'use client';
export default function AdminError({ reset }: { reset: () => void }) {
  return <div className="ad-content"><h1>No se pudo cargar la administración</h1><p>Comprueba la conexión a la base de datos y que la migración del panel esté aplicada.</p><button className="ad-button" onClick={reset}>Reintentar</button></div>;
}
