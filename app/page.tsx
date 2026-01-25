'use client';
import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// DATOS MAYAS
// ═══════════════════════════════════════════════════════════════

const SELLOS = [
  { nombre: 'Dragón', emoji: '🐉', color: 'red', poder: 'Nacimiento', accion: 'Nutrir', esencia: 'Ser' },
  { nombre: 'Viento', emoji: '🌬️', color: 'white', poder: 'Espíritu', accion: 'Comunicar', esencia: 'Aliento' },
  { nombre: 'Noche', emoji: '🌙', color: 'blue', poder: 'Abundancia', accion: 'Soñar', esencia: 'Intuición' },
  { nombre: 'Semilla', emoji: '🌱', color: 'yellow', poder: 'Florecimiento', accion: 'Apuntar', esencia: 'Conciencia' },
  { nombre: 'Serpiente', emoji: '🐍', color: 'red', poder: 'Fuerza Vital', accion: 'Sobrevivir', esencia: 'Instinto' },
  { nombre: 'Enlazador', emoji: '💀', color: 'white', poder: 'Muerte', accion: 'Igualar', esencia: 'Oportunidad' },
  { nombre: 'Mano', emoji: '✋', color: 'blue', poder: 'Realización', accion: 'Conocer', esencia: 'Sanación' },
  { nombre: 'Estrella', emoji: '⭐', color: 'yellow', poder: 'Elegancia', accion: 'Embellecer', esencia: 'Arte' },
  { nombre: 'Luna', emoji: '🌊', color: 'red', poder: 'Agua Universal', accion: 'Purificar', esencia: 'Flujo' },
  { nombre: 'Perro', emoji: '🐕', color: 'white', poder: 'Corazón', accion: 'Amar', esencia: 'Lealtad' },
  { nombre: 'Mono', emoji: '🐒', color: 'blue', poder: 'Magia', accion: 'Jugar', esencia: 'Ilusión' },
  { nombre: 'Humano', emoji: '🧑', color: 'yellow', poder: 'Libre Albedrío', accion: 'Influenciar', esencia: 'Sabiduría' },
  { nombre: 'Caminante', emoji: '🚶', color: 'red', poder: 'Espacio', accion: 'Explorar', esencia: 'Vigilia' },
  { nombre: 'Mago', emoji: '🧙', color: 'white', poder: 'Atemporalidad', accion: 'Encantar', esencia: 'Receptividad' },
  { nombre: 'Águila', emoji: '🦅', color: 'blue', poder: 'Visión', accion: 'Crear', esencia: 'Mente' },
  { nombre: 'Guerrero', emoji: '⚔️', color: 'yellow', poder: 'Inteligencia', accion: 'Cuestionar', esencia: 'Intrepidez' },
  { nombre: 'Tierra', emoji: '🌍', color: 'red', poder: 'Navegación', accion: 'Evolucionar', esencia: 'Sincronicidad' },
  { nombre: 'Espejo', emoji: '🪞', color: 'white', poder: 'Sin Fin', accion: 'Reflejar', esencia: 'Orden' },
  { nombre: 'Tormenta', emoji: '⛈️', color: 'blue', poder: 'Autogeneración', accion: 'Catalizar', esencia: 'Energía' },
  { nombre: 'Sol', emoji: '☀️', color: 'yellow', poder: 'Fuego Universal', accion: 'Iluminar', esencia: 'Vida' },
];

const TONOS = [
  { num: 1, nombre: 'Magnético', poder: 'Unificar', accion: 'Atraer', esencia: 'Propósito' },
  { num: 2, nombre: 'Lunar', poder: 'Polarizar', accion: 'Estabilizar', esencia: 'Desafío' },
  { num: 3, nombre: 'Eléctrico', poder: 'Activar', accion: 'Unir', esencia: 'Servicio' },
  { num: 4, nombre: 'Autoexistente', poder: 'Definir', accion: 'Medir', esencia: 'Forma' },
  { num: 5, nombre: 'Entonado', poder: 'Empoderar', accion: 'Comandar', esencia: 'Resplandor' },
  { num: 6, nombre: 'Rítmico', poder: 'Organizar', accion: 'Equilibrar', esencia: 'Igualdad' },
  { num: 7, nombre: 'Resonante', poder: 'Canalizar', accion: 'Inspirar', esencia: 'Armonización' },
  { num: 8, nombre: 'Galáctico', poder: 'Armonizar', accion: 'Modelar', esencia: 'Integridad' },
  { num: 9, nombre: 'Solar', poder: 'Pulsar', accion: 'Realizar', esencia: 'Intención' },
  { num: 10, nombre: 'Planetario', poder: 'Perfeccionar', accion: 'Producir', esencia: 'Manifestación' },
  { num: 11, nombre: 'Espectral', poder: 'Disolver', accion: 'Liberar', esencia: 'Liberación' },
  { num: 12, nombre: 'Cristal', poder: 'Dedicar', accion: 'Universalizar', esencia: 'Cooperación' },
  { num: 13, nombre: 'Cósmico', poder: 'Perdurar', accion: 'Trascender', esencia: 'Presencia' },
];

const COLORES = {
  red: { bg: 'bg-red-900/50', border: 'border-red-500', text: 'text-red-400', nombre: 'Rojo' },
  white: { bg: 'bg-gray-100/10', border: 'border-gray-300', text: 'text-gray-200', nombre: 'Blanco' },
  blue: { bg: 'bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-400', nombre: 'Azul' },
  yellow: { bg: 'bg-yellow-900/50', border: 'border-yellow-500', text: 'text-yellow-400', nombre: 'Amarillo' },
};

const GAP_DAYS = [1,20,22,39,43,50,51,58,64,69,72,77,85,88,93,96,
  106,107,108,109,110,111,112,113,148,149,150,151,152,153,154,155,
  165,168,173,176,184,189,192,197,203,210,211,218,222,239,241,260];

const CASTILLOS = ['Rojo del Este', 'Blanco del Norte', 'Azul del Oeste', 'Amarillo del Sur', 'Verde Central'];

// ═══════════════════════════════════════════════════════════════
// FUNCIONES DE CÁLCULO
// ═══════════════════════════════════════════════════════════════

const BASE_DATE = new Date(1987, 6, 26);

function calcularKin(fecha: Date): number {
  const diff = Math.floor((fecha.getTime() - BASE_DATE.getTime()) / 86400000);
  return ((diff % 260) + 260) % 260 + 1;
}

function obtenerSello(kin: number): number {
  return ((kin - 1) % 20);
}

function obtenerTono(kin: number): number {
  return ((kin - 1) % 13);
}

function calcularOraculo(kin: number) {
  const selloIdx = obtenerSello(kin);
  const tonoIdx = obtenerTono(kin);
  const analogoIdx = (selloIdx + 19) % 20;
  const antipodaIdx = (selloIdx + 10) % 20;
  const ocultoIdx = (19 - selloIdx + 20) % 20;
  const guiaOffsets = [0, 12, 4, 16, 8, 0, 12, 4, 16, 8, 0, 12, 4];
  const guiaIdx = (selloIdx + guiaOffsets[tonoIdx]) % 20;
  const tonoOcultoIdx = (13 - tonoIdx) % 13;
  
  return {
    destino: { sello: SELLOS[selloIdx], tono: TONOS[tonoIdx] },
    guia: { sello: SELLOS[guiaIdx], tono: TONOS[tonoIdx] },
    analogo: { sello: SELLOS[analogoIdx], tono: TONOS[tonoIdx] },
    antipoda: { sello: SELLOS[antipodaIdx], tono: TONOS[tonoIdx] },
    oculto: { sello: SELLOS[ocultoIdx], tono: TONOS[tonoOcultoIdx] },
  };
}

function esPortalGalactico(kin: number): boolean {
  return GAP_DAYS.includes(kin);
}

function obtenerWavespell(kin: number): number {
  return Math.ceil(kin / 13);
}

function obtenerCastillo(kin: number): number {
  return Math.ceil(kin / 52);
}

function calcularKinCombinado(kin1: number, kin2: number): number {
  return ((kin1 + kin2 - 2) % 260) + 1;
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [inputDate, setInputDate] = useState('');
  const [activeTab, setActiveTab] = useState<'hoy' | 'mikin' | 'explorar'>('hoy');
  
  // Estados para AI
  const [dailyInterpretation, setDailyInterpretation] = useState<string | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(false);
  
  // Estados para compatibilidad
  const [compatDate, setCompatDate] = useState('');
  const [compatResult, setCompatResult] = useState<any>(null);
  const [loadingCompat, setLoadingCompat] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kin-birthdate');
    if (saved) {
      setBirthDate(saved);
      setShowOnboarding(false);
    }
  }, []);

  const handleSaveBirthDate = () => {
    if (inputDate) {
      localStorage.setItem('kin-birthdate', inputDate);
      setBirthDate(inputDate);
      setShowOnboarding(false);
    }
  };

  const today = new Date();
  const todayKin = calcularKin(today);
  const todayOraculo = calcularOraculo(todayKin);
  const todaySello = todayOraculo.destino.sello;
  const todayTono = todayOraculo.destino.tono;
  const todayColor = COLORES[todaySello.color as keyof typeof COLORES];
  const esPortal = esPortalGalactico(todayKin);
  const wavespell = obtenerWavespell(todayKin);
  const castillo = obtenerCastillo(todayKin);

  let myKin = 0, myOraculo: any = null, mySello: any = null, myTono: any = null;
  if (birthDate) {
    myKin = calcularKin(new Date(birthDate));
    myOraculo = calcularOraculo(myKin);
    mySello = myOraculo.destino.sello;
    myTono = myOraculo.destino.tono;
  }

  // Función para pedir interpretación diaria
  const fetchDailyInterpretation = async () => {
    if (!myKin || loadingDaily) return;
    setLoadingDaily(true);
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'daily',
          myKin, mySello: mySello.nombre, myTono: myTono.nombre,
          todayKin, todaySello: todaySello.nombre, todayTono: todayTono.nombre,
          oraculo: {
            guia: todayOraculo.guia.sello.nombre,
            analogo: todayOraculo.analogo.sello.nombre,
            antipoda: todayOraculo.antipoda.sello.nombre,
            oculto: todayOraculo.oculto.sello.nombre,
          }
        }),
      });
      const data = await res.json();
      setDailyInterpretation(data.interpretation);
    } catch (e) {
      setDailyInterpretation('No se pudo conectar con el oráculo.');
    }
    setLoadingDaily(false);
  };

  // Función para calcular compatibilidad
  const fetchCompatibility = async () => {
    if (!myKin || !compatDate || loadingCompat) return;
    setLoadingCompat(true);
    const otherKin = calcularKin(new Date(compatDate));
    const otherOraculo = calcularOraculo(otherKin);
    const kinCombinado = calcularKinCombinado(myKin, otherKin);
    const selloCombinado = SELLOS[obtenerSello(kinCombinado)];
    
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'compatibility',
          myKin, mySello: mySello.nombre, myTono: myTono.nombre,
          todayKin: otherKin, 
          todaySello: otherOraculo.destino.sello.nombre, 
          todayTono: otherOraculo.destino.tono.nombre,
          oraculo: { kinCombinado, selloCombinado: selloCombinado.nombre }
        }),
      });
      const data = await res.json();
      setCompatResult({
        otherKin,
        otherSello: otherOraculo.destino.sello,
        otherTono: otherOraculo.destino.tono,
        kinCombinado,
        selloCombinado,
        interpretation: data.interpretation,
      });
    } catch (e) {
      setCompatResult({ error: 'No se pudo conectar con el oráculo.' });
    }
    setLoadingCompat(false);
  };

  // ─────────────────────────────────────────────────────────────
  // ONBOARDING
  // ─────────────────────────────────────────────────────────────
  if (showOnboarding) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="maya-card p-8 max-w-md w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 glyph-glow">🌀</div>
            <h1 className="text-3xl font-bold text-maya-gold mb-2">KIN</h1>
            <p className="text-gray-400">Tu Guía Maya Diaria</p>
          </div>
          <div className="maya-greca mb-6"></div>
          <p className="text-center text-gray-300 mb-6">
            Descubre tu energía según el calendario sagrado Tzolkin de 260 días.
          </p>
          <div className="mb-6">
            <label className="block text-maya-gold mb-2 text-sm">¿Cuándo naciste?</label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-maya-dark border border-maya-gold/30 text-white focus:border-maya-gold focus:outline-none"
            />
          </div>
          <button
            onClick={handleSaveBirthDate}
            disabled={!inputDate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-maya-red to-maya-gold text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            Descubrir mi Kin ✨
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-8">Hecho con 🧡 por duendes.app 2026</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // COMPONENTE ORÁCULO
  // ─────────────────────────────────────────────────────────────
  const OracleCard = ({ position, data, size = 'normal' }: { 
    position: string, 
    data: { sello: typeof SELLOS[0], tono: typeof TONOS[0] },
    size?: 'normal' | 'large'
  }) => {
    const color = COLORES[data.sello.color as keyof typeof COLORES];
    const isLarge = size === 'large';
    return (
      <div className={`${color.bg} ${color.border} border rounded-lg p-2 text-center ${isLarge ? 'p-4' : ''}`}>
        <div className={`${isLarge ? 'text-4xl' : 'text-2xl'} ${isLarge ? 'glyph-glow' : ''}`}>
          {data.sello.emoji}
        </div>
        <div className={`${color.text} ${isLarge ? 'text-sm' : 'text-xs'} font-medium`}>
          {data.tono.num} {data.sello.nombre}
        </div>
        <div className="text-gray-500 text-xs">{position}</div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // APP PRINCIPAL
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="p-4 text-center border-b border-maya-gold/20">
        <div className="text-gray-400 text-sm">
          {today.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="text-maya-gold text-xl font-bold">
          {todayTono.nombre} {todaySello.nombre} • Kin {todayKin}
        </div>
        {esPortal && (
          <div className="text-maya-jade text-sm mt-1">✨ Portal Galáctico de Activación</div>
        )}
      </header>

      <main className="p-4 max-w-lg mx-auto">
        
        {activeTab === 'hoy' && (
          <div className="space-y-6 animate-fade-in">
            {/* Card principal del día */}
            <div className="maya-card p-6 text-center">
              <div className="text-7xl glyph-glow mb-4">{todaySello.emoji}</div>
              <h2 className={`text-2xl font-bold ${todayColor.text}`}>
                {todayTono.nombre} {todaySello.nombre}
              </h2>
              <p className="text-gray-400 mt-1">Kin {todayKin} • Onda {wavespell} • Castillo {CASTILLOS[castillo - 1]}</p>
              
              <div className="maya-greca my-4"></div>
              
              <div className="text-left space-y-2 text-sm">
                <p><span className="text-maya-gold">Poder:</span> {todaySello.poder}</p>
                <p><span className="text-maya-gold">Acción:</span> {todaySello.accion}</p>
                <p><span className="text-maya-gold">Esencia:</span> {todaySello.esencia}</p>
              </div>
              
              <div className="mt-4 p-3 bg-maya-dark/50 rounded-lg">
                <p className="text-gray-300 italic text-sm">
                  "Hoy {todayTono.accion.toLowerCase()} con el propósito de {todaySello.accion.toLowerCase()}, 
                  sellando la entrada de {todaySello.esencia.toLowerCase()} con el tono {todayTono.nombre.toLowerCase()} de {todayTono.esencia.toLowerCase()}."
                </p>
              </div>
            </div>

            {/* Oráculo del día */}
            <div className="maya-card p-4">
              <h3 className="text-maya-gold font-bold mb-4 text-center">Oráculo del Día</h3>
              <div className="oracle-cross">
                <div className="oracle-guia"><OracleCard position="Guía" data={todayOraculo.guia} /></div>
                <div className="oracle-antipoda"><OracleCard position="Desafío" data={todayOraculo.antipoda} /></div>
                <div className="oracle-destino"><OracleCard position="Destino" data={todayOraculo.destino} size="large" /></div>
                <div className="oracle-analogo"><OracleCard position="Soporte" data={todayOraculo.analogo} /></div>
                <div className="oracle-oculto"><OracleCard position="Oculto" data={todayOraculo.oculto} /></div>
              </div>
            </div>

            {/* Tu conexión hoy + Interpretación AI */}
            {myKin && mySello && (
              <div className="maya-card p-4">
                <h3 className="text-maya-gold font-bold mb-2">Tu Conexión Hoy</h3>
                <p className="text-gray-300 text-sm">
                  Tu energía <span className="text-maya-jade">{mySello.emoji} {mySello.nombre}</span> (Kin {myKin}) 
                  se encuentra hoy con <span className={todayColor.text}>{todaySello.emoji} {todaySello.nombre}</span>.
                </p>
                
                {dailyInterpretation ? (
                  <div className="mt-4 p-3 bg-maya-jade/10 border border-maya-jade/30 rounded-lg">
                    <p className="text-gray-200 text-sm leading-relaxed">{dailyInterpretation}</p>
                  </div>
                ) : (
                  <button
                    onClick={fetchDailyInterpretation}
                    disabled={loadingDaily}
                    className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-maya-jade/80 to-maya-blue/80 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loadingDaily ? '🌀 Consultando oráculo...' : '✨ Pedir interpretación personalizada'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'mikin' && myOraculo && mySello && myTono && (
          <div className="space-y-6 animate-fade-in">
            <div className="maya-card p-6 text-center">
              <div className="text-7xl glyph-glow mb-4">{mySello.emoji}</div>
              <h2 className={`text-2xl font-bold ${COLORES[mySello.color as keyof typeof COLORES].text}`}>
                {myTono.nombre} {mySello.nombre}
              </h2>
              <p className="text-gray-400 mt-1">Kin {myKin} • Tu Firma Galáctica</p>
              <div className="maya-greca my-4"></div>
              <div className="text-left space-y-2 text-sm">
                <p><span className="text-maya-gold">Poder:</span> {mySello.poder}</p>
                <p><span className="text-maya-gold">Acción:</span> {mySello.accion}</p>
                <p><span className="text-maya-gold">Esencia:</span> {mySello.esencia}</p>
                <p><span className="text-maya-gold">Tono:</span> {myTono.nombre} - {myTono.poder}</p>
              </div>
            </div>

            <div className="maya-card p-4">
              <h3 className="text-maya-gold font-bold mb-4 text-center">Tu Oráculo de Nacimiento</h3>
              <div className="oracle-cross">
                <div className="oracle-guia"><OracleCard position="Guía" data={myOraculo.guia} /></div>
                <div className="oracle-antipoda"><OracleCard position="Desafío" data={myOraculo.antipoda} /></div>
                <div className="oracle-destino"><OracleCard position="Destino" data={myOraculo.destino} size="large" /></div>
                <div className="oracle-analogo"><OracleCard position="Soporte" data={myOraculo.analogo} /></div>
                <div className="oracle-oculto"><OracleCard position="Oculto" data={myOraculo.oculto} /></div>
              </div>
            </div>

            <button
              onClick={() => { localStorage.removeItem('kin-birthdate'); setShowOnboarding(true); setBirthDate(null); }}
              className="w-full py-2 text-gray-500 text-sm hover:text-maya-red transition"
            >
              Cambiar fecha de nacimiento
            </button>
          </div>
        )}

        {activeTab === 'explorar' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Compatibilidad */}
            <div className="maya-card p-4">
              <h3 className="text-maya-gold font-bold mb-4">💕 Compatibilidad de Kins</h3>
              <p className="text-gray-400 text-sm mb-4">Ingresa la fecha de nacimiento de otra persona:</p>
              <input
                type="date"
                value={compatDate}
                onChange={(e) => { setCompatDate(e.target.value); setCompatResult(null); }}
                className="w-full p-3 rounded-lg bg-maya-dark border border-maya-gold/30 text-white focus:border-maya-gold focus:outline-none mb-3"
              />
              <button
                onClick={fetchCompatibility}
                disabled={!compatDate || loadingCompat}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-maya-red to-maya-gold text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loadingCompat ? '🌀 Calculando...' : 'Ver compatibilidad'}
              </button>
              
              {compatResult && !compatResult.error && (
                <div className="mt-4 p-4 bg-maya-dark/50 rounded-lg">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-3xl">{mySello?.emoji}</div>
                      <div className="text-xs text-gray-400">Tú</div>
                    </div>
                    <div className="text-maya-gold text-2xl">💕</div>
                    <div className="text-center">
                      <div className="text-3xl">{compatResult.otherSello.emoji}</div>
                      <div className="text-xs text-gray-400">Kin {compatResult.otherKin}</div>
                    </div>
                    <div className="text-gray-500">=</div>
                    <div className="text-center">
                      <div className="text-3xl glyph-glow">{compatResult.selloCombinado.emoji}</div>
                      <div className="text-xs text-maya-jade">Kin {compatResult.kinCombinado}</div>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed">{compatResult.interpretation}</p>
                </div>
              )}
            </div>

            {/* Sellos */}
            <div className="maya-card p-4">
              <h3 className="text-maya-gold font-bold mb-4">Los 20 Sellos Solares</h3>
              <div className="grid grid-cols-4 gap-2">
                {SELLOS.map((sello, i) => (
                  <div key={i} className={`${COLORES[sello.color as keyof typeof COLORES].bg} p-2 rounded text-center`}>
                    <div className="text-2xl">{sello.emoji}</div>
                    <div className="text-xs text-gray-300">{sello.nombre}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tonos */}
            <div className="maya-card p-4">
              <h3 className="text-maya-gold font-bold mb-4">Los 13 Tonos Galácticos</h3>
              <div className="space-y-2">
                {TONOS.map((tono) => (
                  <div key={tono.num} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-maya-gold/20 flex items-center justify-center text-maya-gold font-bold">
                      {tono.num}
                    </span>
                    <span className="text-white">{tono.nombre}</span>
                    <span className="text-gray-500 text-xs">• {tono.poder}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-maya-dark/95 backdrop-blur border-t border-maya-gold/20">
        <div className="flex justify-around max-w-lg mx-auto">
          {[
            { id: 'hoy', icon: '🌀', label: 'Hoy' },
            { id: 'mikin', icon: '👤', label: 'Mi Kin' },
            { id: 'explorar', icon: '🔮', label: 'Explorar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-center transition ${
                activeTab === tab.id ? 'text-maya-gold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className="text-xl">{tab.icon}</div>
              <div className="text-xs">{tab.label}</div>
            </button>
          ))}
        </div>
      </nav>

      <div className="fixed bottom-16 left-0 right-0 text-center text-gray-600 text-xs py-1">
        Hecho con 🧡 por duendes.app 2026
      </div>
    </div>
  );
}
