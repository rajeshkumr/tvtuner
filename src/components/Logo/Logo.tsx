import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const Logo: React.FunctionComponent = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
      <Link to="/"><Image margin={"auto"} width={"150px"} paddingTop={"1%"} src={logo} /></Link>
    </Box>
  );
};
