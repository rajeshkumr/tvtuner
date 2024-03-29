import { Box, Image, Flex } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { channelItemState, selectedChannelState, channelListState } from "../../recoilContext";
// @ts-ignore
import { M3uChannel } from "@iptv/playlist";
import React, { useEffect, useRef } from "react";
import "./ChannelList.style.css";
import { set as setStorage} from "../../storage/local";

export const ChannelList: React.FunctionComponent<M3uChannel> = (props) => {
  const [channelItem, setChannelItem] = useRecoilState(channelItemState);
  const [activeIndex, setActiveIndex] = useRecoilState(selectedChannelState);
  const channelRef = useRef(null);
  const setRecoilChannel = useSetRecoilState(channelListState);

  useEffect(() => {
    // @ts-ignore
    // NOTE: Time out for scroll into view as multiple scrollIntoView does not work. Might be bug persists to prevent animation of two dom elements at same time.
    channelRef?.current?.children?.length > 0 && channelRef.current.children[activeIndex] && setTimeout(() => {(channelRef.current.children[activeIndex]).scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "center"
    })}, 1000);
    setRecoilChannel(props.list);
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
      behavior: "smooth",
      block: "center"
    });
  }

  return (
    <Flex
      className={"channel-list"}
      overflowY={"scroll"}
      direction={{base: "column", md: "row"}}
      justifyContent={"start"}
      alignItems={"center"}
      ref={channelRef}
      height={{base: "44vh", md: "auto"}}
      position={{base: "absolute" , md: "relative"}}
      width={"100%"}
    >
      {props.list.map((item: M3uChannel, index: number) => (
        <Flex
          key={index}
          onClick={onChannelPress}
          data-key={index}
          className={activeIndex === index ? "item active" : "item"}
          width={{base: "98%", md: "100%"}}
          minWidth={"6rem"}
          maxWidth={{md: "6rem"}}
          padding={"0.2rem"}
          margin={"0.2rem"}
          backgroundColor={"#eee"}
          boxShadow={"0rem 0rem 0.2rem #000"}
          _hover={{
            border: {md: "1px solid #000"},
            boxShadow: {md: "0rem 0rem 0.4rem 0.2rem #000"}
          }}
          title={item?.name}
        >
          <Image
            loading="lazy"
            onError={onChannelImgError}
            src={item?.tvgLogo}
            alt={item?.name}
            width={{base: "15%" , md: "100%"}}
            height="100%"
            aspectRatio={"2/1"}
            minWidth={{md: "100%"}}
          />
          <Box
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            fontSize={"0.8rem"}
            width={{base: "85%" , md: "100%"}}
            lineHeight={{base: "2rem", md: "1rem"}}
          >
            {item?.name}
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
