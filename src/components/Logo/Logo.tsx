import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export const Logo: React.FunctionComponent = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
      <Link to="/"><Image m="auto" w="200px" paddingTop={"0.2rem"} src={logo} /></Link>
    </Box>
  );
};
