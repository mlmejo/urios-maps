import Navbar from "@/Components/Navbar";
import { Establishment, Image, PageProps } from "@/types";
import {
  Box,
  Container,
  Heading,
  Text,
  Image as ChakraImage,
  Flex,
  Divider,
  VStack,
  StackDivider,
  Icon,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { FiUser } from "react-icons/fi";

interface ShowPageProps extends PageProps {
  establishment: Establishment;
}

export default function Show({ auth, establishment }: ShowPageProps) {
  const image = establishment.image as Image;

  return (
    <Navbar user={auth.user}>
      <Head title={establishment.name} />

      <Box borderRadius="lg">
        <Container maxW="container.xl" py={8}>
          <Heading as="h1" size="2xl" mb={8}>
            {establishment.name}
          </Heading>
          <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
            <Box
              position="relative"
              w={{ base: "100%", md: "50%" }}
              h={{ base: "200px", md: "400px" }}
              overflow="hidden"
              borderTopLeftRadius="md"
              borderBottomLeftRadius={{ base: "md", md: 0 }}
            >
              <ChakraImage
                src={"/" + image.url}
                alt={establishment.name}
                w="100%"
                h="100%"
                objectFit="cover"
                top={0}
                left={0}
                zIndex={-1}
                borderRadius="lg"
              />
            </Box>
            <VStack
              align="stretch"
              w={{ base: "100%", md: "50%" }}
              borderBottomRightRadius="md"
              borderTopRightRadius={{ base: "md", md: 0 }}
              backgroundColor="white"
              p={4}
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading as="h2" size="md" mb={2}>
                About {establishment.name}
              </Heading>
              <Divider mb={4} />
              <Text mb={2}>{establishment.description}</Text>
              <Text mb={2}>{establishment.location}</Text>
              <Stack direction="row" spacing="4" alignItems="center">
                <Icon as={FiUser} />
                <Text fontWeight="semibold">{establishment.owner?.name}</Text>
              </Stack>
              <Divider mb={4} />
              <Button
                as="a"
                href={route("messages.create", establishment.owner?.id)}
                colorScheme="teal"
              >
                Inquire
              </Button>
            </VStack>
          </Flex>
          <Box
            backgroundColor="white"
            mt={4}
            p={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Heading as="h2" size="md" mb={2}>
              Reviews
            </Heading>
            <Divider mb={4} />
            <Text mb={2}>No reviews yet</Text>
          </Box>
        </Container>
      </Box>
    </Navbar>
  );
}
