import { atom } from "recoil";

export const channelItemState = atom({
  key: "channelItem",
  default: {
    name: "ATN International (240p)",
    url: "https://d10rltuy0iweup.cloudfront.net/ATNINT/myStream/playlist.m3u8",
    groupTitle: "Afghanistan",
    tvgLogo: "https://i.ibb.co/zfdbVSm/logo-1.png",
    tvgId: "AfghanNobelMovies.ca"
  }
});