const BASE_URL=import.meta.env.VITE_BASE_URL;
import { parseM3U, M3uPlaylist, M3uChannel } from "@iptv/playlist";
const CHANNEL_URL=`${BASE_URL}/iptv/index.country.m3u`;
const COUNTRY_URL=`${BASE_URL}/api/countries.json`;

export async function getChannels(): M3uChannel {
  const result = await fetch(CHANNEL_URL);
  const m3uPlaylist: M3uPlaylist = await result.text();
  const channels: M3uChannel[] = parseM3U(m3uPlaylist).channels;
  return channels;
}

export async function getCountries(): Promise<Country> {
  const result = await fetch(COUNTRY_URL);
  const countries = await result.json();
  return countries;
}