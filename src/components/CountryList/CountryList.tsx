
import { Box, Flex } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { countryItemState, selectedChannelState, countryListState } from "../../recoilContext";
import React, { useEffect, useState, useRef } from "react";
import "./CountryList.style.css";
import { set as setStorage} from "../../storage/local";
// @ts-ignore
export const CountryList: React.FunctionComponent<Channel> = (props) => {

  const setCountryItem = useSetRecoilState(countryItemState);
  const [activeClass, setActiveClass] = useState(0);
  const setActiveIndex = useSetRecoilState(selectedChannelState);
  const countryRef = useRef(null);
  const setRecoilCountry = useSetRecoilState(countryListState);

  useEffect(() => {
    setActiveClass(props.activeIndex);
    setRecoilCountry(props.list);
    // @ts-ignore
    (countryRef?.current?.children[props.activeIndex])?.scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "center"
    });
  }, [props.activeIndex]);

  function onCountryPress(event: React.SyntheticEvent<EventTarget>) {
    const key = Number((event.currentTarget as HTMLInputElement).dataset.key);
    // @ts-ignore
    const item = props.list.find((_propItem: Channel, index: number) => index === key);
    setActiveClass(key);
    // Set first channel
    setActiveIndex(0);
    setStorage("COUNTRY", JSON.stringify(item));
    setCountryItem({
      name: item?.name,
      code: item?.code,
      flag: item?.flag,
    });
    (event?.currentTarget as HTMLInputElement)?.scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "center"
    });
  }
  
return (
<Flex ref={countryRef} className={"country-list"} overflowY={'scroll'} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
{/* @ts-ignore */ }
{props.list.map((item: Channel, index: number) => (
<Box boxShadow="dark-lg" key={index} onClick={onCountryPress} data-key={index} className={activeClass === index ? "item active" : "item"} width={"100%"} minWidth={"6rem"} padding={"0.2rem"} margin={"0.2rem"} backgroundColor={"#eee"} _hover={{
  border: {md: "1px solid #000"},
  boxShadow: {md: "0rem 0rem 0.4rem 0.2rem #000"}
}}>
        <Box fontSize={"1rem"}>{item?.flag}</Box>
        <Box whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} fontSize={"0.8rem"}>{item?.name}</Box>
      </Box>
      ))}
</Flex>
)
}