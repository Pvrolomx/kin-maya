import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { myKin, mySello, myTono, todayKin, todaySello, todayTono, oraculo, type, lang = 'es' } = await request.json();

    let prompt = '';
    const isSpanish = lang === 'es';
    
    if (type === 'daily') {
      prompt = isSpanish 
        ? `Eres un guía espiritual maya experto en el calendario Tzolkin. 
El usuario tiene Kin ${myKin} (${myTono} ${mySello}).
Hoy es Kin ${todayKin} (${todayTono} ${todaySello}).
El oráculo del día es: Centro: ${todaySello}, Guía: ${oraculo.guia}, Soporte: ${oraculo.analogo}, Desafío: ${oraculo.antipoda}, Oculto: ${oraculo.oculto}.
Da una interpretación personalizada de 3-4 oraciones sobre cómo la energía del día interactúa con la energía personal del usuario. Sé poético pero práctico. Incluye un consejo concreto para hoy. No uses listas ni bullets. Escribe en español fluido y cálido.
IMPORTANTE: No uses referencias de género (él/ella, querido/querida). Usa lenguaje neutro e inclusivo. No menciones días anteriores ni Kins pasados, enfócate SOLO en el día de hoy.`
        : `You are a Mayan spiritual guide expert in the Tzolkin calendar.
The user has Kin ${myKin} (${myTono} ${mySello}).
Today is Kin ${todayKin} (${todayTono} ${todaySello}).
The oracle of the day is: Center: ${todaySello}, Guide: ${oraculo.guia}, Support: ${oraculo.analogo}, Challenge: ${oraculo.antipoda}, Hidden: ${oraculo.oculto}.
Give a personalized interpretation of 3-4 sentences about how today's energy interacts with the user's personal energy. Be poetic but practical. Include concrete advice for today. Don't use lists or bullets. Write in warm, flowing English.
IMPORTANT: Do not use gendered language (he/she, dear sir/madam). Use neutral, inclusive language. Do not mention previous days or past Kins, focus ONLY on today.`;
    } else if (type === 'compatibility') {
      prompt = isSpanish
        ? `Eres un guía espiritual maya experto en el calendario Tzolkin y compatibilidad de Kins.
La persona A tiene Kin ${myKin} (${myTono} ${mySello}).
La persona B tiene Kin ${todayKin} (${todayTono} ${todaySello}).
Su Kin combinado es ${oraculo.kinCombinado} (${oraculo.selloCombinado}).
Explica en 4-5 oraciones qué tipo de energía tienen juntos, qué pueden crear, y qué desafíos podrían enfrentar. Sé poético pero práctico. No uses listas ni bullets. Escribe en español fluido y cálido.
IMPORTANTE: No uses referencias de género. Usa lenguaje neutro e inclusivo.`
        : `You are a Mayan spiritual guide expert in the Tzolkin calendar and Kin compatibility.
Person A has Kin ${myKin} (${myTono} ${mySello}).
Person B has Kin ${todayKin} (${todayTono} ${todaySello}).
Their combined Kin is ${oraculo.kinCombinado} (${oraculo.selloCombinado}).
Explain in 4-5 sentences what kind of energy they have together, what they can create, and what challenges they might face. Be poetic but practical. Don't use lists or bullets. Write in warm, flowing English.
IMPORTANT: Do not use gendered language. Use neutral, inclusive language.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const interpretation = data.choices?.[0]?.message?.content || (isSpanish ? 'No se pudo generar la interpretación.' : 'Could not generate interpretation.');

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ interpretation: 'Error connecting to oracle.' }, { status: 500 });
  }
}
