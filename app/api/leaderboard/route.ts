import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');
  const version = searchParams.get('version') || '1.8';
  
  const API_URL = version === '1.8' 
    ? "https://bot.ttcm.it/api/leaderboard" 
    : "http://116.202.156.252:50432/api/leaderboard";
  
  try {
    const response = await fetch(
      mode && mode !== 'overall' 
        ? `${API_URL}/${encodeURIComponent(mode)}?limit=10000`
        : `${API_URL}?limit=10000`
    );
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
