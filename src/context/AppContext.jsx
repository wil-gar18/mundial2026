import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { GROUP_MATCHES_DEFAULT } from '../data/matches';

const AppContext = createContext();

export function AppProvider({ children, user }) {
  const [matches, setMatches] = useState(GROUP_MATCHES_DEFAULT);
  const [bets, setBets] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario desde Supabase
  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      setLoading(true);

      // Cargar apuestas
      const { data: betsData } = await supabase
        .from('bets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (betsData) setBets(betsData);

      // Cargar resultados
      const { data: resultsData } = await supabase
        .from('results')
        .select('*')
        .eq('user_id', user.id);
      if (resultsData) {
        const map = {};
        resultsData.forEach(r => {
          map[r.match_id] = { homeGoals: r.home_goals, awayGoals: r.away_goals, played: true, dbId: r.id };
        });
        setResults(map);
      }

      setLoading(false);
    };
    loadData();
  }, [user]);

  // ── Apuestas ──
  const addBet = async (bet) => {
    const newBet = {
      ...bet,
      user_id: user.id,
      potential: parseFloat((bet.stake * bet.odds).toFixed(2)),
      profit: bet.result === 'ganada'
        ? parseFloat((bet.stake * bet.odds - bet.stake).toFixed(2))
        : bet.result === 'perdida' ? -bet.stake : null,
    };
    const { data } = await supabase.from('bets').insert(newBet).select().single();
    if (data) setBets(prev => [data, ...prev]);
  };

  const updateBetResult = async (id, result) => {
    const bet = bets.find(b => b.id === id);
    if (!bet) return;
    const profit = result === 'ganada'
      ? parseFloat((bet.stake * bet.odds - bet.stake).toFixed(2))
      : result === 'perdida' ? -bet.stake : null;
    await supabase.from('bets').update({ result, profit }).eq('id', id);
    setBets(prev => prev.map(b => b.id === id ? { ...b, result, profit } : b));
  };

  const deleteBet = async (id) => {
    await supabase.from('bets').delete().eq('id', id);
    setBets(prev => prev.filter(b => b.id !== id));
  };

  // ── Resultados ──
  const saveResult = async (matchId, homeGoals, awayGoals) => {
    const existing = results[matchId];
    if (existing?.dbId) {
      await supabase.from('results').update({
        home_goals: parseInt(homeGoals),
        away_goals: parseInt(awayGoals),
      }).eq('id', existing.dbId);
    } else {
      const { data } = await supabase.from('results').insert({
        user_id: user.id,
        match_id: matchId,
        home_goals: parseInt(homeGoals),
        away_goals: parseInt(awayGoals),
      }).select().single();
      if (data) {
        setResults(prev => ({
          ...prev,
          [matchId]: { homeGoals: parseInt(homeGoals), awayGoals: parseInt(awayGoals), played: true, dbId: data.id }
        }));
        return;
      }
    }
    setResults(prev => ({
      ...prev,
      [matchId]: { homeGoals: parseInt(homeGoals), awayGoals: parseInt(awayGoals), played: true, dbId: existing?.dbId }
    }));
  };

  const deleteResult = async (matchId) => {
    const existing = results[matchId];
    if (existing?.dbId) await supabase.from('results').delete().eq('id', existing.dbId);
    setResults(prev => {
      const copy = { ...prev };
      delete copy[matchId];
      return copy;
    });
  };

  // ── Matches ──
  const updateMatch = (id, changes) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, ...changes } : m));
  };
  const resetMatches = () => setMatches(GROUP_MATCHES_DEFAULT);

  // ── Standings ──
  const calcStandings = (group) => {
    const groupMatches = matches.filter(m => m.group === group);
    const teams = {};
    groupMatches.forEach(m => {
      if (!teams[m.home]) teams[m.home] = { team: m.home, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
      if (!teams[m.away]) teams[m.away] = { team: m.away, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
      const res = results[m.id];
      if (!res) return;
      const { homeGoals: h, awayGoals: a } = res;
      teams[m.home].pj++; teams[m.away].pj++;
      teams[m.home].gf += h; teams[m.home].gc += a;
      teams[m.away].gf += a; teams[m.away].gc += h;
      if (h > a) { teams[m.home].pg++; teams[m.home].pts += 3; teams[m.away].pp++; }
      else if (h < a) { teams[m.away].pg++; teams[m.away].pts += 3; teams[m.home].pp++; }
      else { teams[m.home].pe++; teams[m.home].pts++; teams[m.away].pe++; teams[m.away].pts++; }
    });
    return Object.values(teams).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const dgA = a.gf - a.gc, dgB = b.gf - b.gc;
      if (dgB !== dgA) return dgB - dgA;
      return b.gf - a.gf;
    });
  };

  // ── Stats apuestas ──
  const betStats = {
    total: bets.length,
    totalStake: bets.reduce((s, b) => s + b.stake, 0),
    totalProfit: bets.reduce((s, b) => s + (b.profit || 0), 0),
    won: bets.filter(b => b.result === 'ganada').length,
    lost: bets.filter(b => b.result === 'perdida').length,
    pending: bets.filter(b => b.result === 'pendiente').length,
    avgOdds: bets.length ? (bets.reduce((s, b) => s + b.odds, 0) / bets.length) : 0,
    winRate: () => {
      const resolved = bets.filter(b => b.result !== 'pendiente').length;
      return resolved ? Math.round(bets.filter(b => b.result === 'ganada').length / resolved * 100) : 0;
    },
    roi: () => {
      const tot = bets.reduce((s, b) => s + b.stake, 0);
      const prof = bets.reduce((s, b) => s + (b.profit || 0), 0);
      return tot > 0 ? parseFloat(((prof / tot) * 100).toFixed(1)) : 0;
    },
  };

  return (
    <AppContext.Provider value={{
      matches, updateMatch, resetMatches,
      bets, addBet, updateBetResult, deleteBet, betStats,
      predictions, setPredictions,
      results, saveResult, deleteResult, calcStandings,
      loading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);