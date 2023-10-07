
import { Box, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { countryItemState } from "../../recoilContext";
import React, { useState } from "react";
import "./CountryList.style.css";
// @ts-ignore
export const CountryList: React.FunctionComponent<Channel> = (props) => {

  const [countryItem, setCountryItem] = useRecoilState(countryItemState);
  const [activeClass, setActiveClass] = useState(0);

  function onCountryPress(event: React.SyntheticEvent<EventTarget>) {
    const key = Number((event.currentTarget as HTMLInputElement).dataset.key);
    // @ts-ignore
    const item = props.list.find((_propItem: Channel, index: number) => index === key);
    setActiveClass(key);
    setCountryItem({
      ...countryItem,
      name: item?.name,
      code: item?.code,
      flag: item?.flag,
    });
    (event?.currentTarget as HTMLInputElement)?.scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest"
    });
  }
  
return (
<Flex className={"country-list"} overflowY={'scroll'} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
{/* @ts-ignore */ }
{props.list.map((item: Channel, index: number) => (
<Box key={index} onClick={onCountryPress} data-key={index} className={activeClass === index ? "item active" : "item"} width={"100%"} minWidth={"6rem"} padding={"0.2rem"} margin={"0.2rem"} backgroundColor={"#eee"} boxShadow={"0rem 0rem 0.2rem #000"} _hover={{
  border: "1px solid #000",
  boxShadow: "0rem 0rem 0.4rem 0.2rem #000"
}}>
        {item?.flag}
        <Box whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} fontSize={"0.8rem"}>{item?.name}</Box>
      </Box>
      ))}
</Flex>
)
}