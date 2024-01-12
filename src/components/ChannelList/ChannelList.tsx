import { Box, Image, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { channelItemState, selectedChannelState } from "../../recoilContext";
// @ts-ignore
import { M3uChannel } from "@iptv/playlist";
import React, { useEffect, useRef } from "react";
import "./ChannelList.style.css";
import { set as setStorage} from "../../storage/local";

export const ChannelList: React.FunctionComponent<M3uChannel> = (props) => {
  const [channelItem, setChannelItem] = useRecoilState(channelItemState);
  const [activeIndex, setActiveIndex] = useRecoilState(selectedChannelState);
  const channelRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    // NOTE: Time out for scroll into view as multiple scrollIntoView does not work. Might be bug persists to prevent animation of two dom elements at same time.
    channelRef?.current?.children[activeIndex] && setTimeout(() => {(channelRef.current.children[activeIndex]).scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest"
    })}, 1000);
  });

  function onChannelImgError(
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) {
    event.currentTarget.style.display = "none";
  }

  function onChannelPress(event: React.SyntheticEvent<EventTarget>) {
    const key = Number((event.currentTarget as HTMLInputElement).dataset.key);
    const item = props.list.find(
      (_propItem: M3uChannel, index: number) => index === key
    );
    setActiveIndex(key);
    // console.log("channel list", item);
    setStorage("CHANNEL", JSON.stringify(item));
    setStorage("CHANNEL_INDEX", JSON.stringify(key));
    setChannelItem({
      ...channelItem,
      name: item?.name,
      url: item?.url,
      groupTitle: item?.groupTitle,
      tvgLogo: item?.tvgLogo,
      tvgId: item?.tvgId,
    });
    (event?.currentTarget as HTMLInputElement)?.scrollIntoView({
      inline: "center",
      behavior: "smooth"
    });
  }

  return (
    <Flex
      className={"channel-list"}
      overflowY={"scroll"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      ref={channelRef}
    >
      {props.list.map((item: M3uChannel, index: number) => (
        <Box
          key={index}
          onClick={onChannelPress}
          data-key={index}
          className={activeIndex === index ? "item active" : "item"}
          width={"100%"}
          minWidth={"6rem"}
          padding={"0.2rem"}
          margin={"0.2rem"}
          backgroundColor={"#eee"}
          boxShadow={"0rem 0rem 0.2rem #000"}
          _hover={{
            border: "1px solid #000",
            boxShadow: "0rem 0rem 0.4rem 0.2rem #000",
          }}
        >
          <Image
            loading="lazy"
            onError={onChannelImgError}
            src={item?.tvgLogo}
            alt={item?.name}
            width="100%"
            height="100%"
            aspectRatio={"2/1"}
          />
          <Box
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            fontSize={"0.8rem"}
          >
            {item?.name}
          </Box>
        </Box>
      ))}
    </Flex>
  );
};
