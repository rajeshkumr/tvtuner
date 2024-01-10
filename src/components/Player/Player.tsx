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
  const [activeIndex] = useRecoilState(selectedChannelState);

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
      const country = get(countryItemState);
      return country.name;
    }
  });

  const channelItem = useRecoilValue(channelItemSelected);
  const selectedCountry = useRecoilValue(countryItemSelected);
  const selectedChannel = channel.filter((item: M3uChannel) => item.groupTitle === selectedCountry);
  const selectedUrl = (selectedChannel as M3uChannel).find((item: M3uChannel) => item.tvgId === channelItem.tvgId)?.url || (selectedChannel as M3uChannel)[0]?.url;
  const countryActiveIndex = country.findIndex((item: Country) => item.name === selectedCountry);
  return (
    // <Spinner size="xl">
    <>
      <CountryList list={country} activeIndex={countryActiveIndex}/>
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
