import React from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import useUserInfo from '../../hooks/useUserInfo';
import { DEFAULT_GRADIENT } from '../../constants/colors';

export default function Profile() {
  const history = useHistory();
  const [userInfo] = useUserInfo();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function signOut() {
    localStorage.removeItem('userInfo');
    onClose();
    history.push('/sign-in');
  }

  return (
    <Box>
      <Center w="100%" bgGradient={DEFAULT_GRADIENT}>
        {userInfo !== null && (
          <VStack
            bgColor="white"
            px="10%"
            py="5%"
            m="5%"
            borderRadius={30}
            boxShadow="xl"
            spacing={5}
          >
            <Heading as="h3" fontWeight="light">
              Profile
            </Heading>
            <Text>
              <strong>Name:</strong> {userInfo.first_name} {userInfo.last_name}
            </Text>

            <Text>
              <strong>Email:</strong> {userInfo.email}
            </Text>

            <Button bgColor="pink.200" onClick={onOpen}>
              Sign out
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm sign out</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Are you sure you want to sign out?</Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    No, cancel
                  </Button>
                  <Button colorScheme="pink" onClick={signOut}>
                    Yes, sign out
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
        )}
      </Center>

      <Footer />
    </Box>
  );
}
