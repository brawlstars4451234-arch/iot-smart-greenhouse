window.GHStore = {
  load(key, fallback) {
    try { const raw = localStorage.getItem("verdant_"+key); return raw ? JSON.parse(raw) : structuredClone(fallback); }
    catch(e) { return structuredClone(fallback); }
  },
  save(key, value) { try { localStorage.setItem("verdant_"+key, JSON.stringify(value)); } catch(e) {} },
  reset() { ["zones","settings","alerts","events","history"].forEach(k=>localStorage.removeItem("verdant_"+k)); }
};
