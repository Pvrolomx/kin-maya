import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { myKin, mySello, myTono, todayKin, todaySello, todayTono, oraculo, type } = await request.json();

    let prompt = '';
    
    if (type === 'daily') {
      prompt = `Eres un guía espiritual maya experto en el calendario Tzolkin. 
      
El usuario tiene Kin ${myKin} (${myTono} ${mySello}).
Hoy es Kin ${todayKin} (${todayTono} ${todaySello}).

El oráculo del día es:
- Centro (Destino): ${todaySello}
- Guía: ${oraculo.guia}
- Soporte (Análogo): ${oraculo.analogo}
- Desafío (Antípoda): ${oraculo.antipoda}
- Poder Oculto: ${oraculo.oculto}

Da una interpretación personalizada de 3-4 oraciones sobre cómo la energía del día interactúa con la energía personal del usuario. 
Sé poético pero práctico. Incluye un consejo concreto para hoy.
No uses listas ni bullets. Escribe en español fluido y cálido.`;
    } else if (type === 'compatibility') {
      prompt = `Eres un guía espiritual maya experto en el calendario Tzolkin y compatibilidad de Kins.

La persona A tiene Kin ${myKin} (${myTono} ${mySello}).
La persona B tiene Kin ${todayKin} (${todayTono} ${todaySello}).
Su Kin combinado es ${oraculo.kinCombinado} (${oraculo.selloCombinado}).

Explica en 4-5 oraciones qué tipo de energía tienen juntos, qué pueden crear, y qué desafíos podrían enfrentar.
Sé poético pero práctico. No uses listas ni bullets. Escribe en español fluido y cálido.`;
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
    const interpretation = data.choices?.[0]?.message?.content || 'No se pudo generar la interpretación.';

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ interpretation: 'Error al conectar con el oráculo.' }, { status: 500 });
  }
}
