import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Button,
  useDisclosure,
  VStack,
  Box
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";

interface Header {
  config: config;
}

export const Header: React.FunctionComponent<Header> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        background="#d4bbfc"
        pos="sticky"
        zIndex="9"
        top="0"
        left="0"
        w="100%"
        display="flex"
        boxShadow="dark-lg"
      >
        <Button
          colorScheme="#000"
          color="#000"
          p="0"
          m="1%"
          onClick={onOpen}
          zIndex="overlay"
          boxShadow="dark-lg"
          rounded="md"
          _hover={{
            borderColor: "#000",
            border: "2px solid #000",
          }}
        >
          <HamburgerIcon width="2rem" height="2rem" />
        </Button>
        <Logo />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        onOverlayClick={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textTransform="uppercase" textAlign={"center"}>
              {props.config.name}
            </DrawerHeader>
            <DrawerBody>
              <VStack alignItems="flex-start">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  colorScheme={props.config.colorScheme}
                >
                  <Link to="/tv">TV</Link>
                </Button>
              </VStack>
              <VStack
                pos="absolute"
                bottom={10}
                left={0}
                w="full"
                justifyContent="space-evenly"
              >
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
