import React, { useState, useEffect } from "react";
import { PlayerStyle } from "./Player.style";
import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { getChannels, getCountries } from "../../api";
import { ChannelList } from "../ChannelList";
import { CountryList } from "../CountryList";
import { selector, useRecoilValue, useRecoilState } from "recoil";
import { channelItemState, countryItemState, selectedChannelState} from "../../recoilContext";
// @ts-ignore
import { M3uChannel } from "@iptv/playlist";
import { set as setStorage} from "../../storage/local";
import { Search } from "../Search";

interface Player {
  width?: string;
  height?: string;
  style?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  playsinline?: boolean
}

const defaultProps: Player = {
  width: "100%",
  height: "100%",
  style: "",
  controls: true,
  autoplay: false,
  muted: false,
  playsinline: true
}


export const Player: React.FunctionComponent<Player> = (props) => {
  const [channel, setChannel] = useState([]);
  const [country, setCountry] = useState([]);
  const [recoilActiveIndex] = useRecoilState(selectedChannelState);
  const [recoilChannelItem, setRecoilChannelItem] = useRecoilState(channelItemState);
  const [autoplay, setAutoplay] = useState(props.autoplay);

  const getChannelList = async () => {
    const channel: M3uChannel = await getChannels();
    setChannel(channel);
  };

  const getCountryList = async () => {
    const countryList: Country = await getCountries();
    // @ts-ignore
    setCountry(countryList);
  };

  useEffect(() => {
    getChannelList();
    getCountryList();
  }, []);

  const countryItemSelected = selector({
    key: "countryItemSelected",
    get: ({ get }) => {
      const currentChannel = get(channelItemState);
      const country = get(countryItemState);
      const selectedChannel = channel.filter((item: M3uChannel) => item.groupTitle === country.name);
      const findChannelIndex = selectedChannel.findIndex((channelItem: M3uChannel) => channelItem.name === currentChannel.name);
      if (channel.length > 0 && recoilActiveIndex > 0 && findChannelIndex !== recoilActiveIndex) {
        const channelItemIndex = findChannelIndex === -1 ? 0 :findChannelIndex
        const selectedChannelItem = (selectedChannel as M3uChannel)[channelItemIndex];
        setRecoilChannelItem(selectedChannelItem);
        setStorage("CHANNEL", JSON.stringify(selectedChannelItem));
        setStorage("CHANNEL_INDEX", JSON.stringify(channelItemIndex));
      }
      setAutoplay(true);
      return country.name;
    }
  });

  const channelItem = recoilChannelItem;
  const selectedCountry = useRecoilValue(countryItemSelected);
  const selectedChannel = channel.filter((item: M3uChannel) => item.groupTitle === selectedCountry);
  const selectedUrl = (selectedChannel as M3uChannel).find((item: M3uChannel) => item.tvgId === channelItem.tvgId)?.url || (selectedChannel as M3uChannel)[0]?.url;
  const countryActiveIndex = country.findIndex((item: Country) => item.name === selectedCountry);
  return (
    // <Spinner size="xl">
    <>
      <CountryList list={country} activeIndex={countryActiveIndex}/>
      <PlayerStyle />
      <Search screen="md"/>
      <Box aspectRatio={"16/9"} width={"100%"}>
        <ReactPlayer
          url={selectedUrl}
          width={props.width}
          height={props.height}
          playing={autoplay}
          muted={props.muted}
          controls={props.controls}
          playsinline={props.playsinline}
        />
      </Box>
      <Search screen="base"/>
      <ChannelList list={selectedChannel} activeIndex={recoilActiveIndex} />
      {/* </Spinner> */}
    </>
  );
};

Player.defaultProps = defaultProps;
