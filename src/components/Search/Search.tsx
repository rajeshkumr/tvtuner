
import { Box, Flex, Switch, Text, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export const Search: React.FunctionComponent = () => {
  const [isChecked, setIsChecked] = useState(true);

  const onSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const onSearchChange = (event: ChangeEvent<HTMLElement>) => {
    console.log(event);
  };


  return (
    <Flex>
      <Input padding={"0.2rem"} margin={"0.2rem"} type={"search"} placeholder={"Search channel or country..." } onChange={onSearchChange}/>
      <Flex align="center">
      <Box margin={"0 0.5rem"}>
        <Text fontSize="md" fontWeight="semibold">Channel</Text>
      </Box>
      <Switch
        isChecked={isChecked}
        onChange={onSwitchChange}
      />
      <Box margin={"0 0.5rem"}>
        <Text fontSize="md" fontWeight="semibold">Country</Text>
      </Box>
    </Flex>
    </Flex>
    
  );
};
