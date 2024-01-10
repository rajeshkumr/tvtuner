import { atom } from "recoil";
import { get as getStorage } from "../storage/local";

const storageChannel = getStorage("CHANNEL");
const storageCountry = getStorage("COUNTRY");
const storageChanelIndex = getStorage("CHANNEL_INDEX");
const defaultObj = {
  channel: {
    name: "ATN International (240p)",
    url: "https://d10rltuy0iweup.cloudfront.net/ATNINT/myStream/playlist.m3u8",
    groupTitle: "Afghanistan",
    tvgLogo: "https://i.ibb.co/zfdbVSm/logo-1.png",
    tvgId: "AfghanNobelMovies.ca"
  },
  country: {
    name: "Afghanistan",
    code: "AF",
    flag: "🇦🇫"
  },
  channelIndex: 0
};

const channelItem = storageChannel ? JSON.parse(storageChannel) : defaultObj.channel;
const countryItem = storageCountry ? JSON.parse(storageCountry) : defaultObj.country;
const channelIndex= storageChanelIndex ? Number(storageChanelIndex) : 0;

export const channelItemState = atom({
  key: "channelItem",
  default: channelItem
});

export const countryItemState = atom({
  key: "countryItem",
  default: countryItem
});

export const selectedChannelState = atom({
  key: "selectedChannel",
  default: channelIndex
});