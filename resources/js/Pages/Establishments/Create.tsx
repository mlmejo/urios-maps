import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image as ChakraImage,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

type NewEstablishment = {
  name: string;
  description: string;
  location: string;
  image: File | null;
};

export default function Create({ auth }: PageProps) {
  const { data, setData, post, errors } = useForm<NewEstablishment>({
    name: "",
    description: "",
    location: "",
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

    post(route("establishments.store"));
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Add Establishment" />

      <Box
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        mx={{ base: 4, md: "auto" }}
        p={8}
        width={{ base: "100%", md: "50%" }}
        maxWidth={{ base: "none", md: "600px" }}
      >
        <Heading as="h1" size="lg" mb={6}>
          Add Establishment
        </Heading>

        <form onSubmit={submit}>
          <Stack spacing={6}>
            <FormControl id="name">
              <FormLabel>Establishment Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                value={data.location}
                onChange={(e) => setData("location", e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="image">
              {data.image ? (
                <Center>
                  <ChakraImage
                    src={`${URL.createObjectURL(data.image as File)}`}
                    alt="Establishment Image"
                    borderRadius="lg"
                    width="100%"
                    marginBottom={6}
                  />
                </Center>
              ) : (
                <></>
              )}
              <InputGroup>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  required
                />
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  alignItems={{ base: "stretch", sm: "center" }}
                  width="100%"
                >
                  <Button
                    as="label"
                    cursor="pointer"
                    htmlFor="image-upload"
                    colorScheme="teal"
                    size="sm"
                    paddingX={4}
                    onClick={() => fileInputRef.current?.click()}
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
                </Stack>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="teal" size="md">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Navbar>
  );
}
