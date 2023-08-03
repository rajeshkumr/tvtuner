
import { Box, Image, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { channelItemState } from "../../recoilContext";
import { M3uChannel } from "@iptv/playlist";
import React, { useState } from "react";
import "./Carousel.style.css";

export const Carousel: React.FunctionComponent<M3uChannel> = (props) => {

  const [channelItem, setChannelItem] = useRecoilState(channelItemState);
  const [activeClass, setActiveClass] = useState(0);

  function onChannelImgError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    event.currentTarget.style.display="none";
  }

  function onChannelPress(event: React.SyntheticEvent<EventTarget>) {
    const key = Number((event.currentTarget as HTMLInputElement).dataset.key);
    const item = props.channel.find((_propItem: M3uChannel, index: number) => index === key);
    setActiveClass(key);
    console.log("channel list", item);
    setChannelItem({
      ...channelItem,
      name: item?.name,
      url: item?.url,
      groupTitle: item?.groupTitle,
      tvgLogo: item?.tvgLogo,
      tvgId: item?.tvgId,
    })
  }
  
return (
<Flex className={"channel-list"} overflowY={'scroll'} direction={"row"} justifyContent={"space-between"} alignItems={"center"} scrollSnapType={"x mandatory"}>
{props.channel.toSpliced(100).map((item: M3uChannel, index: number) => (
<Box key={index} onClick={onChannelPress} data-item={JSON.stringify(item)} data-key={index} className={activeClass === index ? "item active" : "item"} width={"100%"} minWidth={"6rem"} padding={"0.2rem"} margin={"0.2rem"} backgroundColor={"#eee"} boxShadow={"0rem 0rem 0.2rem #000"} scrollSnapAlign={"center"} _hover={{
  border: "1px solid #000",
  boxShadow: "0rem 0rem 0.4rem 0.2rem #000"
}}>
        <Image loading="lazy" onError={onChannelImgError} src={item?.tvgLogo} alt={item?.name} width="100%" height="100%" aspectRatio={"2/1"}/>
        <Box whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} fontSize={"0.8rem"}>{item?.name}</Box>
      </Box>
      ))}
</Flex>
)
}