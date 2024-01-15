import {
  Box,
  Flex,
  Switch,
  Text,
  Input,
  List,
  ListItem
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { countryListState, channelListState, channelItemState, countryItemState, selectedChannelState } from "../../recoilContext";
// @ts-ignore
import { M3uChannel } from "@iptv/playlist";
import config from "../../constants/initial";
import { set as setStorage} from "../../storage/local";
import "./Search.style.css";

export const Search: React.FunctionComponent<{screen: string}> = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");
  const country = useRecoilValue(countryListState);
  const channel = useRecoilValue(channelListState);
  const setChannelItem = useSetRecoilState(channelItemState);
  const setCountryItem = useSetRecoilState(countryItemState);
  const  setActiveChannelIndex = useSetRecoilState(selectedChannelState);

  const onSwitchChange = () => {
    setIsChecked(!isChecked);
    setSuggestionList([]);
    setSearchBarValue("");
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event?.target?.value.toLowerCase();
    setSearchBarValue(event?.target?.value);
    if (searchValue) {
      const list = isChecked
        ? country.filter((item: Country) => item?.name?.toLowerCase().includes(searchValue))
        : channel.filter((item: M3uChannel) => item?.name?.toLowerCase().includes(searchValue));
      setSuggestionList(list);
    } else {
      setSuggestionList([]);
    }
  };

  const onPressSearchText = (event: any) => {
    const name = event.target?.dataset?.name?.toLowerCase();
    const searchListItemIndex = isChecked ?  country.findIndex((item: Country) => item?.name?.toLowerCase() === name) : channel.findIndex((item: M3uChannel) => item?.name?.toLowerCase() === name);
    const searchListItem = isChecked ? country.find((item: Country) => item?.name?.toLowerCase() === name) : channel.find((item: M3uChannel) => item?.name?.toLowerCase() === name);
    if(isChecked) {
      setCountryItem(searchListItem);
      setActiveChannelIndex(0);
      setStorage("COUNTRY", JSON.stringify(searchListItem));
    } else {
      setChannelItem(searchListItem);
      setActiveChannelIndex(searchListItemIndex);
      setStorage("CHANNEL", JSON.stringify(searchListItem));
      setStorage("CHANNEL_INDEX", JSON.stringify(searchListItemIndex));
    }
    setSuggestionList([]);
    setSearchBarValue("");
  };


  const searchPlaceholder = isChecked ? "country" : "channel";

  return (
    <Box display={{
      "base": "none",
      "md": "none",
      [props.screen]: "block"
    }}>
    <Flex position={"relative"} boxShadow={"dark-lg"}>
        <Input
          padding={"0.4rem"}
          margin={"0.3rem 0.2rem"}
          type={"search"}
          placeholder={`Search ${searchPlaceholder}...`}
          onChange={onSearchChange}
          value={searchBarValue}
          borderRadius={"2rem"}
          border={`1px solid ${config.colorScheme}`}
          _hover={{
            border: `1px solid ${config.colorScheme}`
          }}
          _focus={{
            border: `1px solid ${config.colorScheme}`
          }}
        />
        {suggestionList.length > 0 && (
          <List
            overflowY={"auto"}
            boxShadow={"dark-lg"}
            paddingLeft={"0.5rem"}
            marginLeft={"0.5rem"}
            position={"absolute"}
            background={"#eee"}
            zIndex={1}
            height={"auto"}
            top={"2.9rem"}
            width={"82%"}
            maxHeight={{base: "50vh", md: "80vh"}}
            textAlign={"left"}
            fontSize={"md"}
          >
            {suggestionList.map((suggestion, index) => (
              <ListItem
                key={index}
                padding={"0.2rem"}
                _hover={
                  { background: {md: `${config.colorScheme}.100`}, cursor: "pointer" }
                }
                _active={
                  { background: {base: `${config.colorScheme}.100`}, cursor: "pointer" }
                }
              >
                {/* @ts-ignore */}
                <Text onClick={onPressSearchText} data-name={suggestion.name}>{suggestion.name}</Text>
              </ListItem>
            ))}
          </List>
        )}
      <Flex align="center">
        <Box margin={"0 0.2rem"}>
          <Text fontSize="md" fontWeight="semibold">
            Channel
          </Text>
        </Box>
        <Switch isChecked={isChecked} onChange={onSwitchChange} colorScheme={config.colorScheme} isInvalid={true} className="search-toggle"/>
        <Box margin={"0 0.2rem"}>
          <Text fontSize="md" fontWeight="semibold">
            Country
          </Text>
        </Box>
      </Flex>
    </Flex>
    </Box>
  );
};
