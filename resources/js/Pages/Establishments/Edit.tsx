import Navbar from "@/Components/Navbar";
import { Establishment, Image, PageProps } from "@/types";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Image as ChakraImage,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiImage } from "react-icons/fi";

interface EditPageProps extends PageProps {
  establishment: Establishment;
}

export default function Edit({ auth, establishment }: EditPageProps) {
  const { data, setData, post, errors } = useForm<Establishment>({
    name: establishment.name,
    description: establishment.description,
    location: establishment.location,
    image: null,
  });

  const image = establishment.image as Image;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files[0])) return;

    const file = e.target.files[0];

    setFilename(file.name);
    setData("image", file);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route("establishments.update", establishment.id));
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Edit Establishment" />

      <Box
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        mx={{ base: 4, md: "auto" }}
        p={8}
        width={{ base: "100%", md: "50%" }}
        maxWidth={{ base: "none", md: "600px" }}
      >
        <Heading size="md" marginBottom={4}>
          Edit Establishment
        </Heading>

        <form onSubmit={submit}>
          <FormControl id="image" mb={6}>
            <Center>
              <ChakraImage
                src={`${
                  data.image
                    ? URL.createObjectURL(data.image as File)
                    : "/" + image.url
                }`}
                alt="Establishment Image"
                borderRadius="lg"
                width="100%"
                marginBottom={6}
              />
            </Center>

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
          </FormControl>

          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Establishment Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
            </FormControl>

            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
            </FormControl>

            <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                value={data.location}
                onChange={(e) => setData("location", e.target.value)}
              />
            </FormControl>
          </Stack>

          <Button type="submit" colorScheme="teal" marginTop={6} size="md">
            Save
          </Button>
        </form>
      </Box>
    </Navbar>
  );
}
