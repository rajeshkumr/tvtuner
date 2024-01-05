import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
interface Header {
  config: config;
}

export const Logo: React.FunctionComponent<Header> = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
      <Link to="/"><Image m="auto" w="200px" src={logo} /></Link>
    </Box>
  );
};
