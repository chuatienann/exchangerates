// src/Hooks/useGet.jsx
const BASE_URL =
  import.meta.env.VITE_SERVER || "https://api.frankfurter.app";

const normalizeBase = (base) => {
  return base.endsWith("/") ? base.slice(0, -1) : base;
};

const joinUrl = (base, endpoint) => {
  if (!endpoint) return base;
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  return `${normalizeBase(base)}/${endpoint.replace(/^\/+/, "")}`;
};

const useGet = () => {
  const getData = async (endpoint = "") => {
    const url = joinUrl(BASE_URL, endpoint);
    console.log("Fetching:", url); // 🔍 debug
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fetch error ${res.status} ${res.statusText} for ${url}`);
    }
    return await res.json();
  };

  return getData;
};

export default useGet;
