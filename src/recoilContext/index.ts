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

const channelItem = storageChannel && storageChannel !==  "undefined" ? JSON.parse(storageChannel) : defaultObj.channel;
const countryItem = storageCountry && storageCountry !== "undefined" ? JSON.parse(storageCountry) : defaultObj.country;
const channelIndex= storageChanelIndex && storageChanelIndex !== "undefined" ? Number(storageChanelIndex) : 0;

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

export const countryListState = atom({
  key: "countryList",
  default: []
})

export const channelListState = atom({
  key: "channelList",
  default: []
})