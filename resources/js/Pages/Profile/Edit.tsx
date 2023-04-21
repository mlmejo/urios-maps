import Navbar from "@/Components/Navbar";
import type {
  Establishment,
  Image,
  Image as ImageType,
  PageProps,
} from "@/types";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Image as ChakraImage,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiImage } from "react-icons/fi";

interface ProfilePageProps extends PageProps {
  establishments: Establishment[];
}

export default function Edit({ auth, establishments }: ProfilePageProps) {
  type UpdateData = {
    name: string;
    email: string;
    image: File | null;
  };

  const { data, setData, post } = useForm<UpdateData>({
    name: auth.user.name,
    email: auth.user.email,
    image: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files[0])) return;

    const file = e.target.files[0];

    setFilename(file.name);
    setData("image", file);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route("profile.update"));
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Edit Profile" />

      <SimpleGrid columns={{ sm: 1, lg: 3 }} spacing={4}>
        <Box boxShadow="md" p={6} borderRadius="md">
          <Heading size="md">Update Profile</Heading>

          <form onSubmit={submit}>
            <Center>
              <ChakraImage
                src={
                  data.image
                    ? URL.createObjectURL(data.image as File)
                    : "/" + auth.user.image.url
                }
                alt="User Avatar"
                borderRadius={4}
                marginY={4}
              />
            </Center>

            <Stack spacing={4}>
              <Stack alignItems="center" direction="row">
                <Button
                  as="label"
                  cursor="pointer"
                  htmlFor="image-upload"
                  colorScheme="teal"
                  size="sm"
                  paddingX={4}
                >
                  Choose File
                </Button>
                <Text
                  fontSize="sm"
                  overflow="hidden"
                  textAlign={{ base: "left", sm: "right" }}
                  noOfLines={1}
                >
                  {filename || "No file chosen"}
                </Text>
                <input
                  type="file"
                  id="image-upload"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Stack>

              <Input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Name"
              />

              <Input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="Email address"
              />

              <Button type="submit" colorScheme="teal" size="md">
                Save
              </Button>
            </Stack>
          </form>
        </Box>

        <Box gridColumn={{ lg: "2 / span 2" }}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginBottom={4}
          >
            <Heading size="md">My Establishments</Heading>
            <Button
              as="a"
              href={route("establishments.create")}
              size="md"
              colorScheme="teal"
            >
              Add Establishment
            </Button>
          </Flex>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: "0", md: "8" }}
          >
            {establishments.map((establishment) => {
              const image = establishment.image as ImageType;

              return (
                <Link
                  href={route("establishments.edit", establishment.id)}
                  key={establishment.id}
                >
                  <Box
                    backgroundColor="white"
                    borderRadius="md"
                    boxShadow="sm"
                    overflow="hidden"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "md",
                    }}
                  >
                    <ChakraImage
                      src={image.url}
                      alt="Establishment Logo"
                      objectFit="cover"
                      w="100%"
                      h={{ base: "200px", md: "250px" }}
                    />

                    <Box p={4}>
                      <Text textDecoration="underline" mb={2}>
                        <Heading size="md">{establishment.name}</Heading>
                      </Text>

                      <Text color="gray.600" fontSize="sm" mb={2}>
                        {establishment.description}
                      </Text>

                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontWeight="bold" color="teal.500">
                          View Details
                        </Text>
                        <Box
                          bg="teal.500"
                          color="white"
                          fontWeight="bold"
                          borderRadius="md"
                          px={2}
                          py={1}
                          fontSize="sm"
                        >
                          No Reviews
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Navbar>
  );
}
