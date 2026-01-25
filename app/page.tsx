'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════
// TRADUCCIONES
// ═══════════════════════════════════════════════════════════════

const TRANSLATIONS = {
  es: {
    title: 'KIN',
    subtitle: 'Tu Guía Maya Diaria',
    discover: 'Descubre tu energía según el calendario sagrado Tzolkin de 260 días.',
    birthQuestion: '¿Cuándo naciste?',
    discoverBtn: 'Descubrir mi Kin ✨',
    today: 'Hoy',
    myKin: 'Mi Kin',
    explore: 'Explorar',
    oracleOfDay: 'Oráculo del Día',
    yourConnection: 'Tu Conexión Hoy',
    yourEnergy: 'Tu energía',
    meetsToday: 'se encuentra hoy con',
    askInterpretation: '✨ Pedir interpretación personalizada',
    consulting: '🌀 Consultando oráculo...',
    closeInterpretation: '✕ Cerrar interpretación',
    yourSignature: 'Tu Firma Galáctica',
    birthOracle: 'Tu Oráculo de Nacimiento',
    changeBirth: '🔄 Cambiar mi fecha de nacimiento',
    compatibility: '💕 Compatibilidad de Kins',
    otherPerson: 'Fecha de nacimiento de otra persona:',
    seeCompatibility: 'Ver compatibilidad',
    calculating: '🌀 Calculando...',
    newQuery: '✕ Nueva consulta',
    seals20: 'Los 20 Sellos Solares',
    tones13: 'Los 13 Tonos Galácticos',
    power: 'Poder',
    action: 'Acción',
    essence: 'Esencia',
    tone: 'Tono',
    guide: 'Guía',
    destiny: 'Destino',
    support: 'Soporte',
    challenge: 'Desafío',
    hidden: 'Oculto',
    wave: 'Onda',
    castle: 'Castillo',
    galacticPortal: '✨ Portal Galáctico de Activación',
    madeWith: 'Hecho con 🧡 por duendes.app 2026',
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    reset: 'Reiniciar',
    born: 'Nacido el',
  },
  en: {
    title: 'KIN',
    subtitle: 'Your Daily Maya Guide',
    discover: 'Discover your energy according to the sacred 260-day Tzolkin calendar.',
    birthQuestion: 'When were you born?',
    discoverBtn: 'Discover my Kin ✨',
    today: 'Today',
    myKin: 'My Kin',
    explore: 'Explore',
    oracleOfDay: 'Oracle of the Day',
    yourConnection: 'Your Connection Today',
    yourEnergy: 'Your energy',
    meetsToday: 'meets today with',
    askInterpretation: '✨ Ask for interpretation',
    consulting: '🌀 Consulting oracle...',
    closeInterpretation: '✕ Close interpretation',
    yourSignature: 'Your Galactic Signature',
    birthOracle: 'Your Birth Oracle',
    changeBirth: '🔄 Change my birth date',
    compatibility: '💕 Kin Compatibility',
    otherPerson: 'Other person\'s birth date:',
    seeCompatibility: 'See compatibility',
    calculating: '🌀 Calculating...',
    newQuery: '✕ New query',
    seals20: 'The 20 Solar Seals',
    tones13: 'The 13 Galactic Tones',
    power: 'Power',
    action: 'Action',
    essence: 'Essence',
    tone: 'Tone',
    guide: 'Guide',
    destiny: 'Destiny',
    support: 'Support',
    challenge: 'Challenge',
    hidden: 'Hidden',
    wave: 'Wave',
    castle: 'Castle',
    galacticPortal: '✨ Galactic Activation Portal',
    madeWith: 'Made with 🧡 by duendes.app 2026',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    reset: 'Reset',
    born: 'Born on',
  }
};

// ═══════════════════════════════════════════════════════════════
// DATOS MAYAS CON ICONOS
// ═══════════════════════════════════════════════════════════════

const SELLOS = {
  es: [
    { nombre: 'Dragón', icon: 'dragon', color: 'red', poder: 'Nacimiento', accion: 'Nutrir', esencia: 'Ser' },
    { nombre: 'Viento', icon: 'wind', color: 'white', poder: 'Espíritu', accion: 'Comunicar', esencia: 'Aliento' },
    { nombre: 'Noche', icon: 'night', color: 'blue', poder: 'Abundancia', accion: 'Soñar', esencia: 'Intuición' },
    { nombre: 'Semilla', icon: 'seed', color: 'yellow', poder: 'Florecimiento', accion: 'Apuntar', esencia: 'Conciencia' },
    { nombre: 'Serpiente', icon: 'serpent', color: 'red', poder: 'Fuerza Vital', accion: 'Sobrevivir', esencia: 'Instinto' },
    { nombre: 'Enlazador', icon: 'worldbridger', color: 'white', poder: 'Muerte', accion: 'Igualar', esencia: 'Oportunidad' },
    { nombre: 'Mano', icon: 'hand', color: 'blue', poder: 'Realización', accion: 'Conocer', esencia: 'Sanación' },
    { nombre: 'Estrella', icon: 'star', color: 'yellow', poder: 'Elegancia', accion: 'Embellecer', esencia: 'Arte' },
    { nombre: 'Luna', icon: 'moon', color: 'red', poder: 'Agua Universal', accion: 'Purificar', esencia: 'Flujo' },
    { nombre: 'Perro', icon: 'dog', color: 'white', poder: 'Corazón', accion: 'Amar', esencia: 'Lealtad' },
    { nombre: 'Mono', icon: 'monkey', color: 'blue', poder: 'Magia', accion: 'Jugar', esencia: 'Ilusión' },
    { nombre: 'Humano', icon: 'human', color: 'yellow', poder: 'Libre Albedrío', accion: 'Influenciar', esencia: 'Sabiduría' },
    { nombre: 'Caminante', icon: 'skywalker', color: 'red', poder: 'Espacio', accion: 'Explorar', esencia: 'Vigilia' },
    { nombre: 'Mago', icon: 'wizard', color: 'white', poder: 'Atemporalidad', accion: 'Encantar', esencia: 'Receptividad' },
    { nombre: 'Águila', icon: 'eagle', color: 'blue', poder: 'Visión', accion: 'Crear', esencia: 'Mente' },
    { nombre: 'Guerrero', icon: 'warrior', color: 'yellow', poder: 'Inteligencia', accion: 'Cuestionar', esencia: 'Intrepidez' },
    { nombre: 'Tierra', icon: 'earth', color: 'red', poder: 'Navegación', accion: 'Evolucionar', esencia: 'Sincronicidad' },
    { nombre: 'Espejo', icon: 'mirror', color: 'white', poder: 'Sin Fin', accion: 'Reflejar', esencia: 'Orden' },
    { nombre: 'Tormenta', icon: 'storm', color: 'blue', poder: 'Autogeneración', accion: 'Catalizar', esencia: 'Energía' },
    { nombre: 'Sol', icon: 'sun', color: 'yellow', poder: 'Fuego Universal', accion: 'Iluminar', esencia: 'Vida' },
  ],
  en: [
    { nombre: 'Dragon', icon: 'dragon', color: 'red', poder: 'Birth', accion: 'Nurture', esencia: 'Being' },
    { nombre: 'Wind', icon: 'wind', color: 'white', poder: 'Spirit', accion: 'Communicate', esencia: 'Breath' },
    { nombre: 'Night', icon: 'night', color: 'blue', poder: 'Abundance', accion: 'Dream', esencia: 'Intuition' },
    { nombre: 'Seed', icon: 'seed', color: 'yellow', poder: 'Flowering', accion: 'Target', esencia: 'Awareness' },
    { nombre: 'Serpent', icon: 'serpent', color: 'red', poder: 'Life Force', accion: 'Survive', esencia: 'Instinct' },
    { nombre: 'Worldbridger', icon: 'worldbridger', color: 'white', poder: 'Death', accion: 'Equalize', esencia: 'Opportunity' },
    { nombre: 'Hand', icon: 'hand', color: 'blue', poder: 'Accomplishment', accion: 'Know', esencia: 'Healing' },
    { nombre: 'Star', icon: 'star', color: 'yellow', poder: 'Elegance', accion: 'Beautify', esencia: 'Art' },
    { nombre: 'Moon', icon: 'moon', color: 'red', poder: 'Universal Water', accion: 'Purify', esencia: 'Flow' },
    { nombre: 'Dog', icon: 'dog', color: 'white', poder: 'Heart', accion: 'Love', esencia: 'Loyalty' },
    { nombre: 'Monkey', icon: 'monkey', color: 'blue', poder: 'Magic', accion: 'Play', esencia: 'Illusion' },
    { nombre: 'Human', icon: 'human', color: 'yellow', poder: 'Free Will', accion: 'Influence', esencia: 'Wisdom' },
    { nombre: 'Skywalker', icon: 'skywalker', color: 'red', poder: 'Space', accion: 'Explore', esencia: 'Wakefulness' },
    { nombre: 'Wizard', icon: 'wizard', color: 'white', poder: 'Timelessness', accion: 'Enchant', esencia: 'Receptivity' },
    { nombre: 'Eagle', icon: 'eagle', color: 'blue', poder: 'Vision', accion: 'Create', esencia: 'Mind' },
    { nombre: 'Warrior', icon: 'warrior', color: 'yellow', poder: 'Intelligence', accion: 'Question', esencia: 'Fearlessness' },
    { nombre: 'Earth', icon: 'earth', color: 'red', poder: 'Navigation', accion: 'Evolve', esencia: 'Synchronicity' },
    { nombre: 'Mirror', icon: 'mirror', color: 'white', poder: 'Endlessness', accion: 'Reflect', esencia: 'Order' },
    { nombre: 'Storm', icon: 'storm', color: 'blue', poder: 'Self-Generation', accion: 'Catalyze', esencia: 'Energy' },
    { nombre: 'Sun', icon: 'sun', color: 'yellow', poder: 'Universal Fire', accion: 'Enlighten', esencia: 'Life' },
  ]
};

const TONOS = {
  es: [
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
  ],
  en: [
    { num: 1, nombre: 'Magnetic', poder: 'Unify', accion: 'Attract', esencia: 'Purpose' },
    { num: 2, nombre: 'Lunar', poder: 'Polarize', accion: 'Stabilize', esencia: 'Challenge' },
    { num: 3, nombre: 'Electric', poder: 'Activate', accion: 'Bond', esencia: 'Service' },
    { num: 4, nombre: 'Self-Existing', poder: 'Define', accion: 'Measure', esencia: 'Form' },
    { num: 5, nombre: 'Overtone', poder: 'Empower', accion: 'Command', esencia: 'Radiance' },
    { num: 6, nombre: 'Rhythmic', poder: 'Organize', accion: 'Balance', esencia: 'Equality' },
    { num: 7, nombre: 'Resonant', poder: 'Channel', accion: 'Inspire', esencia: 'Attunement' },
    { num: 8, nombre: 'Galactic', poder: 'Harmonize', accion: 'Model', esencia: 'Integrity' },
    { num: 9, nombre: 'Solar', poder: 'Pulse', accion: 'Realize', esencia: 'Intention' },
    { num: 10, nombre: 'Planetary', poder: 'Perfect', accion: 'Produce', esencia: 'Manifestation' },
    { num: 11, nombre: 'Spectral', poder: 'Dissolve', accion: 'Release', esencia: 'Liberation' },
    { num: 12, nombre: 'Crystal', poder: 'Dedicate', accion: 'Universalize', esencia: 'Cooperation' },
    { num: 13, nombre: 'Cosmic', poder: 'Endure', accion: 'Transcend', esencia: 'Presence' },
  ]
};

const COLORES_DARK = {
  red: { bg: 'bg-red-900/50', border: 'border-red-500', text: 'text-red-400' },
  white: { bg: 'bg-gray-100/10', border: 'border-gray-300', text: 'text-gray-200' },
  blue: { bg: 'bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-400' },
  yellow: { bg: 'bg-yellow-900/50', border: 'border-yellow-500', text: 'text-yellow-400' },
};

const COLORES_LIGHT = {
  red: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700' },
  white: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' },
  blue: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700' },
};

const GAP_DAYS = [1,20,22,39,43,50,51,58,64,69,72,77,85,88,93,96,106,107,108,109,110,111,112,113,148,149,150,151,152,153,154,155,165,168,173,176,184,189,192,197,203,210,211,218,222,239,241,260];

const CASTILLOS = {
  es: ['Rojo del Este', 'Blanco del Norte', 'Azul del Oeste', 'Amarillo del Sur', 'Verde Central'],
  en: ['Red Eastern', 'White Northern', 'Blue Western', 'Yellow Southern', 'Green Central']
};

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i);

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

function calcularOraculo(kin: number, sellos: typeof SELLOS.es, tonos: typeof TONOS.es) {
  const selloIdx = obtenerSello(kin);
  const tonoIdx = obtenerTono(kin);
  const analogoIdx = (selloIdx + 19) % 20;
  const antipodaIdx = (selloIdx + 10) % 20;
  const ocultoIdx = (19 - selloIdx + 20) % 20;
  const guiaOffsets = [0, 12, 4, 16, 8, 0, 12, 4, 16, 8, 0, 12, 4];
  const guiaIdx = (selloIdx + guiaOffsets[tonoIdx]) % 20;
  const tonoOcultoIdx = (13 - tonoIdx) % 13;
  
  return {
    destino: { sello: sellos[selloIdx], tono: tonos[tonoIdx] },
    guia: { sello: sellos[guiaIdx], tono: tonos[tonoIdx] },
    analogo: { sello: sellos[analogoIdx], tono: tonos[tonoIdx] },
    antipoda: { sello: sellos[antipodaIdx], tono: tonos[tonoIdx] },
    oculto: { sello: sellos[ocultoIdx], tono: tonos[tonoOcultoIdx] },
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

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE DE ICONO
// ═══════════════════════════════════════════════════════════════

const SealIcon = ({ icon, size = 64, className = '' }: { icon: string; size?: number; className?: string }) => (
  <Image
    src={`/icons/${icon}.png`}
    alt={icon}
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState<'hoy' | 'mikin' | 'explorar'>('hoy');
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [darkMode, setDarkMode] = useState(true);
  
  const [selectedYear, setSelectedYear] = useState(1990);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);
  
  const [dailyInterpretation, setDailyInterpretation] = useState<string | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(false);
  
  const [compatYear, setCompatYear] = useState(1990);
  const [compatMonth, setCompatMonth] = useState(0);
  const [compatDay, setCompatDay] = useState(1);
  const [compatResult, setCompatResult] = useState<any>(null);
  const [loadingCompat, setLoadingCompat] = useState(false);

  const t = TRANSLATIONS[lang];
  const sellos = SELLOS[lang];
  const tonos = TONOS[lang];
  const castillos = CASTILLOS[lang];
  const COLORES = darkMode ? COLORES_DARK : COLORES_LIGHT;

  useEffect(() => {
    const saved = localStorage.getItem('kin-birthdate');
    const savedLang = localStorage.getItem('kin-lang') as 'es' | 'en';
    const savedDark = localStorage.getItem('kin-dark');
    if (saved) { setBirthDate(saved); setShowOnboarding(false);
    setActiveTab('mikin'); }
    if (savedLang) setLang(savedLang);
    if (savedDark !== null) setDarkMode(savedDark === 'true');
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('kin-lang', newLang);
  };

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem('kin-dark', String(newDark));
  };

  const handleReset = () => {
    localStorage.removeItem('kin-birthdate');
    setShowOnboarding(true);
    setBirthDate(null);
    setActiveTab('hoy');
  };

  const handleSaveBirthDate = () => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    console.log('Saving birthdate:', dateStr, 'Year:', selectedYear, 'Month:', selectedMonth, 'Day:', selectedDay);
    localStorage.setItem('kin-birthdate', dateStr);
    setBirthDate(dateStr);
    setShowOnboarding(false);
    setActiveTab('mikin');
  };

  const today = new Date();
  const todayKin = calcularKin(today);
  const todayOraculo = calcularOraculo(todayKin, sellos, tonos);
  const todaySello = todayOraculo.destino.sello;
  const todayTono = todayOraculo.destino.tono;
  const todayColor = COLORES[todaySello.color as keyof typeof COLORES];
  const esPortal = esPortalGalactico(todayKin);
  const wavespell = obtenerWavespell(todayKin);
  const castillo = obtenerCastillo(todayKin);

  let myKin = 0, myOraculo: any = null, mySello: any = null, myTono: any = null;
  if (birthDate) {
    const bdate = new Date(birthDate + 'T12:00:00'); // Add time to avoid timezone issues
    myKin = calcularKin(bdate);
    myOraculo = calcularOraculo(myKin, sellos, tonos);
    mySello = myOraculo.destino.sello;
    myTono = myOraculo.destino.tono;
    console.log('Birth date:', birthDate, 'Parsed:', bdate, 'Kin:', myKin);
  }

  const fetchDailyInterpretation = async () => {
    if (!myKin || loadingDaily) return;
    setLoadingDaily(true);
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'daily', lang,
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
      setDailyInterpretation(lang === 'es' ? 'No se pudo conectar con el oráculo.' : 'Could not connect to the oracle.');
    }
    setLoadingDaily(false);
  };

  const fetchCompatibility = async () => {
    if (!myKin || loadingCompat) return;
    setLoadingCompat(true);
    const compatDate = new Date(compatYear, compatMonth, compatDay);
    const otherKin = calcularKin(compatDate);
    const otherOraculo = calcularOraculo(otherKin, sellos, tonos);
    const kinCombinado = calcularKinCombinado(myKin, otherKin);
    const selloCombinado = sellos[obtenerSello(kinCombinado)];
    
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'compatibility', lang,
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
      setCompatResult({ error: lang === 'es' ? 'No se pudo conectar.' : 'Could not connect.' });
    }
    setLoadingCompat(false);
  };

  const clearInterpretation = () => setDailyInterpretation(null);
  const clearCompatibility = () => setCompatResult(null);

  // Theme classes
  const textMain = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'maya-card' : 'bg-white/90 border border-gray-200 rounded-xl shadow-sm backdrop-blur';
  const borderColor = darkMode ? 'border-maya-gold/20' : 'border-gray-200';

  // Format birth date for display
  const formatBirthDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const monthName = t.months[month - 1];
    return `${day} ${monthName} ${year}`;
  };

  // ─────────────────────────────────────────────────────────────
  // SELECTOR DE FECHA
  // ─────────────────────────────────────────────────────────────
  const DateSelector = ({ year, setYear, month, setMonth, day, setDay, label }: any) => {
    const daysInMonth = getDaysInMonth(year, month);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    useEffect(() => {
      if (day > daysInMonth) setDay(daysInMonth);
    }, [month, year, daysInMonth, day, setDay]);

    const selectClass = darkMode 
      ? 'p-3 rounded-lg bg-maya-dark/80 border border-maya-gold/30 text-white focus:border-maya-gold focus:outline-none'
      : 'p-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-maya-gold focus:outline-none';

    return (
      <div className="mb-4">
        {label && <label className={`block text-maya-gold mb-2 text-sm`}>{label}</label>}
        <div className="grid grid-cols-3 gap-2">
          <select value={day} onChange={(e) => setDay(Number(e.target.value))} className={selectClass}>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className={`${selectClass} text-sm`}>
            {t.months.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className={selectClass}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // SETTINGS TOGGLES
  // ─────────────────────────────────────────────────────────────
  const SettingsBar = () => (
    <div className="fixed top-2 right-2 flex gap-2 z-50">
      <button onClick={toggleLang} className={`px-2 py-1 rounded text-xs font-bold ${darkMode ? 'bg-maya-gold/20 text-maya-gold' : 'bg-maya-gold text-white'}`}>
        {lang.toUpperCase()}
      </button>
      <button onClick={toggleDark} className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      {!showOnboarding && (
        <button onClick={handleReset} className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-600'}`}>
          🔄
        </button>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ONBOARDING
  // ─────────────────────────────────────────────────────────────
  if (showOnboarding) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${darkMode ? 'bg-maya-dark' : 'bg-gray-100'}`} style={darkMode ? { backgroundImage: 'url(/icons/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        <SettingsBar />
        <div className={`${cardBg} p-8 max-w-md w-full animate-fade-in`}>
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <SealIcon icon="sun" size={80} className="glyph-glow" />
            </div>
            <h1 className="text-3xl font-bold text-maya-gold mb-2">{t.title}</h1>
            <p className={textMuted}>{t.subtitle}</p>
          </div>
          <div className="maya-greca mb-6"></div>
          <p className={`text-center ${textMuted} mb-6`}>{t.discover}</p>
          <DateSelector year={selectedYear} setYear={setSelectedYear} month={selectedMonth} setMonth={setSelectedMonth} day={selectedDay} setDay={setSelectedDay} label={t.birthQuestion} />
          <button onClick={handleSaveBirthDate} className="w-full py-3 rounded-lg bg-gradient-to-r from-maya-red to-maya-gold text-white font-bold hover:opacity-90 transition">
            {t.discoverBtn}
          </button>
        </div>
        <p className={`${textMuted} text-xs mt-8`}>{t.madeWith}</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // COMPONENTE ORÁCULO
  // ─────────────────────────────────────────────────────────────
  const OracleCard = ({ position, data, size = 'normal' }: any) => {
    const color = COLORES[data.sello.color as keyof typeof COLORES];
    const isLarge = size === 'large';
    const iconSize = isLarge ? 56 : 40;
    return (
      <div className={`${color.bg} ${color.border} border rounded-lg p-2 text-center ${isLarge ? 'p-4' : ''}`}>
        <div className={`flex justify-center ${isLarge ? 'glyph-glow' : ''}`}>
          <SealIcon icon={data.sello.icon} size={iconSize} />
        </div>
        <div className={`${color.text} ${isLarge ? 'text-sm' : 'text-xs'} font-medium mt-1`}>{data.tono.num} {data.sello.nombre}</div>
        <div className={`${textMuted} text-xs`}>{position}</div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // APP PRINCIPAL
  // ─────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen pb-20 ${textMain}`} style={darkMode ? { backgroundImage: 'url(/icons/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } : { backgroundColor: '#f3f4f6' }}>
      <SettingsBar />
      
      {/* Header */}
      <header className={`p-4 text-center border-b ${borderColor} ${darkMode ? 'bg-maya-dark/80 backdrop-blur' : 'bg-white/80 backdrop-blur'}`}>
        <div className={`${textMuted} text-sm`}>
          {today.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="text-maya-gold text-xl font-bold">{todayTono.nombre} {todaySello.nombre} • Kin {todayKin}</div>
        {esPortal && <div className="text-maya-jade text-sm mt-1">{t.galacticPortal}</div>}
      </header>

      <main className="p-4 max-w-lg mx-auto">
        
        {activeTab === 'hoy' && (
          <div className="space-y-6 animate-fade-in">
            <div className={`${cardBg} p-6 text-center`}>
              <div className="flex justify-center mb-4">
                <SealIcon icon={todaySello.icon} size={96} className="glyph-glow" />
              </div>
              <h2 className={`text-2xl font-bold ${todayColor.text}`}>{todayTono.nombre} {todaySello.nombre}</h2>
              <p className={`${textMuted} mt-1`}>Kin {todayKin} • {t.wave} {wavespell} • {t.castle} {castillos[castillo - 1]}</p>
              <div className="maya-greca my-4"></div>
              <div className="text-left space-y-2 text-sm">
                <p><span className="text-maya-gold">{t.power}:</span> {todaySello.poder}</p>
                <p><span className="text-maya-gold">{t.action}:</span> {todaySello.accion}</p>
                <p><span className="text-maya-gold">{t.essence}:</span> {todaySello.esencia}</p>
              </div>
            </div>

            <div className={`${cardBg} p-4`}>
              <h3 className="text-maya-gold font-bold mb-4 text-center">{t.oracleOfDay}</h3>
              <div className="oracle-cross">
                <div className="oracle-guia"><OracleCard position={t.guide} data={todayOraculo.guia} /></div>
                <div className="oracle-antipoda"><OracleCard position={t.challenge} data={todayOraculo.antipoda} /></div>
                <div className="oracle-destino"><OracleCard position={t.destiny} data={todayOraculo.destino} size="large" /></div>
                <div className="oracle-analogo"><OracleCard position={t.support} data={todayOraculo.analogo} /></div>
                <div className="oracle-oculto"><OracleCard position={t.hidden} data={todayOraculo.oculto} /></div>
              </div>
            </div>

            {myKin && mySello && (
              <div className={`${cardBg} p-4`}>
                <h3 className="text-maya-gold font-bold mb-2">{t.yourConnection}</h3>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={textMuted}>{t.yourEnergy}</span>
                  <SealIcon icon={mySello.icon} size={24} />
                  <span className="text-maya-jade">{mySello.nombre}</span>
                  <span className={textMuted}>(Kin {myKin}) {t.meetsToday}</span>
                  <SealIcon icon={todaySello.icon} size={24} />
                  <span className={todayColor.text}>{todaySello.nombre}</span>
                </div>
                {dailyInterpretation ? (
                  <div className="mt-4">
                    <div className={`p-3 ${darkMode ? 'bg-maya-jade/10 border-maya-jade/30' : 'bg-green-50 border-green-200'} border rounded-lg`}>
                      <p className={`${textMain} text-sm leading-relaxed`}>{dailyInterpretation}</p>
                    </div>
                    <button onClick={clearInterpretation} className={`mt-3 w-full py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-400 hover:border-maya-gold hover:text-maya-gold' : 'border-gray-300 text-gray-600 hover:border-maya-gold'} text-sm transition`}>
                      {t.closeInterpretation}
                    </button>
                  </div>
                ) : (
                  <button onClick={fetchDailyInterpretation} disabled={loadingDaily} className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-maya-jade/80 to-maya-blue/80 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50">
                    {loadingDaily ? t.consulting : t.askInterpretation}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'mikin' && myOraculo && mySello && myTono && (
          <div className="space-y-6 animate-fade-in">
            <div className={`${cardBg} p-6 text-center`}>
              <div className="flex justify-center mb-4">
                <SealIcon icon={mySello.icon} size={96} className="glyph-glow" />
              </div>
              <h2 className={`text-2xl font-bold ${COLORES[mySello.color as keyof typeof COLORES].text}`}>{myTono.nombre} {mySello.nombre}</h2>
              <p className={`${textMuted} mt-1`}>Kin {myKin} • {t.yourSignature}</p>
              {birthDate && <p className={`${textMuted} text-xs mt-1`}>{t.born}: {formatBirthDate(birthDate)}</p>}
              <div className="maya-greca my-4"></div>
              <div className="text-left space-y-2 text-sm">
                <p><span className="text-maya-gold">{t.power}:</span> {mySello.poder}</p>
                <p><span className="text-maya-gold">{t.action}:</span> {mySello.accion}</p>
                <p><span className="text-maya-gold">{t.essence}:</span> {mySello.esencia}</p>
                <p><span className="text-maya-gold">{t.tone}:</span> {myTono.nombre} - {myTono.poder}</p>
              </div>
            </div>
            <div className={`${cardBg} p-4`}>
              <h3 className="text-maya-gold font-bold mb-4 text-center">{t.birthOracle}</h3>
              <div className="oracle-cross">
                <div className="oracle-guia"><OracleCard position={t.guide} data={myOraculo.guia} /></div>
                <div className="oracle-antipoda"><OracleCard position={t.challenge} data={myOraculo.antipoda} /></div>
                <div className="oracle-destino"><OracleCard position={t.destiny} data={myOraculo.destino} size="large" /></div>
                <div className="oracle-analogo"><OracleCard position={t.support} data={myOraculo.analogo} /></div>
                <div className="oracle-oculto"><OracleCard position={t.hidden} data={myOraculo.oculto} /></div>
              </div>
            </div>
            <button onClick={handleReset} className={`w-full py-3 rounded-lg border-2 border-maya-red/50 text-maya-red hover:bg-maya-red/10 transition font-medium`}>
              {t.changeBirth}
            </button>
          </div>
        )}

        {activeTab === 'explorar' && (
          <div className="space-y-6 animate-fade-in">
            <div className={`${cardBg} p-4`}>
              <h3 className="text-maya-gold font-bold mb-4">{t.compatibility}</h3>
              {compatResult && !compatResult.error ? (
                <div>
                  <div className={`p-4 ${darkMode ? 'bg-maya-dark/50' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="text-center">
                        <SealIcon icon={mySello?.icon} size={40} />
                        <div className={`text-xs ${textMuted}`}>{lang === 'es' ? 'Tú' : 'You'}</div>
                      </div>
                      <div className="text-maya-gold text-2xl">💕</div>
                      <div className="text-center">
                        <SealIcon icon={compatResult.otherSello.icon} size={40} />
                        <div className={`text-xs ${textMuted}`}>Kin {compatResult.otherKin}</div>
                      </div>
                      <div className={textMuted}>=</div>
                      <div className="text-center">
                        <SealIcon icon={compatResult.selloCombinado.icon} size={40} className="glyph-glow" />
                        <div className="text-xs text-maya-jade">Kin {compatResult.kinCombinado}</div>
                      </div>
                    </div>
                    <p className={`${textMain} text-sm leading-relaxed`}>{compatResult.interpretation}</p>
                  </div>
                  <button onClick={clearCompatibility} className={`mt-3 w-full py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-400 hover:border-maya-gold' : 'border-gray-300 text-gray-600'} text-sm transition`}>
                    {t.newQuery}
                  </button>
                </div>
              ) : (
                <>
                  <p className={`${textMuted} text-sm mb-4`}>{t.otherPerson}</p>
                  <DateSelector year={compatYear} setYear={setCompatYear} month={compatMonth} setMonth={setCompatMonth} day={compatDay} setDay={setCompatDay} label="" />
                  <button onClick={fetchCompatibility} disabled={loadingCompat} className="w-full py-2 rounded-lg bg-gradient-to-r from-maya-red to-maya-gold text-white font-medium hover:opacity-90 transition disabled:opacity-50">
                    {loadingCompat ? t.calculating : t.seeCompatibility}
                  </button>
                </>
              )}
            </div>
            <div className={`${cardBg} p-4`}>
              <h3 className="text-maya-gold font-bold mb-4">{t.seals20}</h3>
              <div className="grid grid-cols-4 gap-2">
                {sellos.map((sello, i) => (
                  <div key={i} className={`${COLORES[sello.color as keyof typeof COLORES].bg} p-2 rounded text-center`}>
                    <SealIcon icon={sello.icon} size={32} />
                    <div className={`text-xs ${textMain} mt-1`}>{sello.nombre}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${cardBg} p-4`}>
              <h3 className="text-maya-gold font-bold mb-4">{t.tones13}</h3>
              <div className="space-y-2">
                {tonos.map((tono) => (
                  <div key={tono.num} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-maya-gold/20 flex items-center justify-center text-maya-gold font-bold">{tono.num}</span>
                    <span className={textMain}>{tono.nombre}</span>
                    <span className={`${textMuted} text-xs`}>• {tono.poder}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-maya-dark/95' : 'bg-white/95'} backdrop-blur border-t ${borderColor}`}>
        <div className="flex justify-around max-w-lg mx-auto">
          {[
            { id: 'hoy', icon: 'sun', label: t.today },
            { id: 'mikin', icon: mySello?.icon || 'human', label: t.myKin },
            { id: 'explorar', icon: 'wizard', label: t.explore },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 py-3 text-center transition ${activeTab === tab.id ? 'text-maya-gold' : `${textMuted} hover:text-maya-gold`}`}>
              <div className="flex justify-center">
                <SealIcon icon={tab.icon} size={24} className={activeTab === tab.id ? 'opacity-100' : 'opacity-60'} />
              </div>
              <div className="text-xs mt-1">{tab.label}</div>
            </button>
          ))}
        </div>
      </nav>

      <div className={`fixed bottom-16 left-0 right-0 text-center ${textMuted} text-xs py-1`}>{t.madeWith}</div>
    </div>
  );
}
