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
  HStack,
  Box,
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
        pos={"sticky"}
        zIndex={"9"}
        top={"1"}
        left={"1"}
        w={"100%"}
        display={"flex"}>
        <Button
          colorScheme={props.config.colorScheme}
          p={"0"}
          ms={"2%"}
          borderRadius={"full"}
          onClick={onOpen}
          zIndex={"overlay"}
        >
          <HamburgerIcon />
        </Button>
        <Logo config={props.config} />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement={"left"}
        onClose={onClose}
        onOverlayClick={onClose}
        size={"xs"}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textTransform={"uppercase"}>{props.config.name}</DrawerHeader>
            <DrawerBody>
              <VStack alignItems={"flex-start"}>
                <Button
                  onClick={onClose}
                  variant={"ghost"}
                  colorScheme={props.config.colorScheme}
                >
                  <Link to={"/"}>Home</Link>
                </Button>
                <Button
                  onClick={onClose}
                  variant={"ghost"}
                  colorScheme={props.config.colorScheme}
                >
                  <Link to={"/Videos"}>Videos</Link>
                </Button>
              </VStack>
              <HStack
                pos={"absolute"}
                bottom={10}
                left={0}
                w={"full"}
                justifyContent={"space-evenly"}
              >
                <Button
                  onClick={onClose}
                  colorScheme={props.config.colorScheme}
                >
                  <Link to={"/login"}>Login</Link>
                </Button>
                <Button
                  onClick={onClose}
                  colorScheme={props.config.colorScheme}
                  variant={"outline"}
                >
                  <Link to={"/signup"}>Signup</Link>
                </Button>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
