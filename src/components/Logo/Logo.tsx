import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
interface Header {
  config: config;
}

export const Logo: React.FunctionComponent<Header> = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
      <Image m="auto" w="200px" src={logo} />
    </Box>
  );
};
