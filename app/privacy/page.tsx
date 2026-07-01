export default function Privacy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', color: '#fff', background: '#0a0a0a', minHeight: '100vh' }}>
      <h1>Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> Julio 2026</p>

      <h2>Resumen</h2>
      <p>Kin Maya respeta tu privacidad. No recopilamos, almacenamos ni compartimos datos personales.</p>

      <h2>Datos que NO recopilamos</h2>
      <ul>
        <li>No recopilamos nombres, emails ni información de contacto</li>
        <li>No rastreamos tu ubicación</li>
        <li>No usamos cookies de terceros</li>
        <li>No vendemos datos a nadie</li>
      </ul>

      <h2>Almacenamiento local</h2>
      <p>La app guarda tu fecha de nacimiento y preferencias únicamente en tu dispositivo (localStorage). Esta información nunca sale de tu dispositivo.</p>

      <h2>Servicios de IA</h2>
      <p>Las consultas al oráculo se procesan mediante servicios de IA. El texto de tu pregunta se envía de forma anónima y no se asocia con tu identidad.</p>
      <p>Para prevenir abuso, el servidor puede procesar temporalmente tu dirección IP; no se almacena de forma permanente ni se vincula a tu identidad.</p>

      <h2>Contacto</h2>
      <p>Preguntas sobre privacidad: <a href="mailto:privacy@duendes.app" style={{ color: '#d4af37' }}>privacy@duendes.app</a></p>

      <p style={{ marginTop: '2rem' }}><a href="/" style={{ color: '#d4af37' }}>← Volver a Kin Maya</a></p>
    </div>
  );
}
