import React, { useState, useEffect } from "react";
import { PlayerStyle } from "./Player.style";
import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { getChannels, getCountries } from "../../api";
import { ChannelList } from "../ChannelList";
import { CountryList } from "../CountryList";
import { selector, useRecoilValue, useRecoilState } from "recoil";
import { channelItemState, countryItemState, selectedChannelState } from "../../recoilContext";
// @ts-ignore
import { M3uChannel } from "@iptv/playlist";
import { get as getStorage } from "../../storage/local";

interface Player {
  width?: string;
  style?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
}

const defaultProps: Player = {
  width: "100%",
  style: "",
  controls: true,
  autoplay: true,
  muted: true,
}


export const Player: React.FunctionComponent<Player> = (props) => {
  const [channel, setChannel] = useState([]);
  const [country, setCountry] = useState([]);
  const [activeIndex, setActiveIndex] = useRecoilState(selectedChannelState);
  const [recoilChannelItem, setChannelItem] = useRecoilState(channelItemState);
  const [recoilCountryItem, setCountryItem] = useRecoilState(countryItemState);

  const getChannelList = async () => {
    const channel: M3uChannel = await getChannels();
    setChannel(channel);
  };

  const getCountryList = async () => {
    const countryList: Country = await getCountries();
    // @ts-ignore
    setCountry(countryList);
    const storageCountry = recoilChannelItem.groupTitle;
    const selectCountry = (countryList as any).find((item: any) => item.name === storageCountry);
    if (selectCountry) {
      setCountryItem(selectCountry);
    }
  };

  useEffect(() => {
    getChannelList();
    getCountryList();
    const storageChannel = getStorage("CHANNEL");
    if (storageChannel) {
      const parseStorageChannel = JSON.parse(storageChannel);
      setChannelItem(parseStorageChannel);
      const channelStorageIndex = Number(getStorage("CHANNEL_INDEX"));
      setActiveIndex(channelStorageIndex || 0);
    }
  }, []);

  const channelItemSelected = selector({
    key: "channelItemSelected",
    get: ({ get }) => {
      const channel = get(channelItemState);
      return channel;
    }
  });

  const countryItemSelected = selector({
    key: "countryItemSelected",
    get: ({ get }) => {
      setActiveIndex(0);
      const country = get(countryItemState);
      return recoilCountryItem?.name || country.name;
    }
  });

  const channelItem = useRecoilValue(channelItemSelected);
  const selectedCountry = useRecoilValue(countryItemSelected);
  const selectedChannel = channel.filter((item: M3uChannel) => item.groupTitle === selectedCountry);
  const selectedUrl = (selectedChannel as M3uChannel).find((item: M3uChannel) => item.tvgId === channelItem.tvgId)?.url || (selectedChannel as M3uChannel)[0]?.url;
  return (
    // <Spinner size="xl">
    <>
      <CountryList list={country} />
      <PlayerStyle />
      <Box aspectRatio={"16/9"} width={"100%"}>
        <ReactPlayer
          url={selectedUrl}
          width={props.width}
          height={"auto"}
          playing={props.autoplay}
          muted={props.muted}
          controls={props.controls}
        />
      </Box>
      <ChannelList list={selectedChannel} activeIndex={activeIndex} />
      {/* </Spinner> */}
    </>
  );
};

Player.defaultProps = defaultProps;
