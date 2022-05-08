import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
    userObj: null,
    setUserobj: (obj) => set((state) => ({ userObj: obj })),
    arbTourney: '',
    setArbtourney: (tourney) => set((state) => ({ arbTourney: tourney })),
    gameplay: '',
    setGameplay: (gameData) => set((state) => ({ gameplay: gameData })),
    p1: '',
    setP1: (p) => set((state) => ({ p1: p })),
    p2: '',
    setP2: (p) => set((state) => ({ p2: p })),
    p1_agent: '',
    setP1_agent: (agent) => set((state) => ({ p1_agent: agent })),
    p2_agent: '',
    setP2_agent: (agent) => set((state) => ({ p2_agent: agent })),
    game: '',
    setGame: (g) => set((state) => ({ game: g }))
});

store = devtools(store);
store = persist(store, { name: 'user_data' });

const useStore = create(store);

export default useStore;