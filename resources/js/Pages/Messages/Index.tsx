import Navbar from "@/Components/Navbar";
import { PageProps, User } from "@/types";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Spacer,
  Button,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

interface Message {
  id: number
  content: string;
  receiver: User;
  sender: User;
}

interface MessagePageProps extends PageProps {
  t: User;
  messages: Message[];
}

export default function Index({ auth, t, messages }: MessagePageProps) {
  const { data, setData, post } = useForm({
    content: "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route("messages.store", t.id));
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Inquiries" />

      <Box h="100vh">
        <Flex h="100%" maxH="calc(100vh - 4rem)">
          <Box bg="white" w="18rem" boxShadow="xs" overflowY="scroll">
            <Box p={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Recent Conversations
              </Text>
              <Box
                mb={4}
                borderRadius="md"
                boxShadow="sm"
                p={2}
                _hover={{ bg: "gray.200" }}
              >
                <Flex alignItems="center">
                  <Avatar name="John Doe" size="sm" mr={2} />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">
                      John Doe
                    </Text>
                    <Text fontSize="xs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                borderRadius="md"
                boxShadow="sm"
                p={2}
                _hover={{ bg: "gray.200" }}
              >
                <Flex alignItems="center">
                  <Avatar name="Jane Doe" size="sm" mr={2} />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">
                      Jane Doe
                    </Text>
                    <Text fontSize="xs">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>

          {t ?
            <Flex direction="column" grow={1} height="100%">
              <Box bg="white" flex="1" boxShadow="md" overflowY="scroll">
                <Box bg="gray.200" py={2} px={4} borderBottomWidth="1px">
                  <Text fontWeight="bold">{t.name}</Text>
                </Box>
                <Box p={4}>
                  {messages.map((message) => {
                    if (message.sender.id === t.id) {
                      return (
                        <div key={message.id}>
                          <Flex key={message.id} mb={2}>
                            <Avatar
                              name="John Doe"
                              src={"/" + auth.user.image.url}
                              size="sm"
                              mr={2}
                            />
                            <Box bg="gray.100" borderRadius="md" p={2}>
                              <Text>{message.content}</Text>
                            </Box>
                          </Flex>
                        </div>
                      );
                    } else {
                      return (
                        <div key={message.id}>
                          <Flex justify="flex-end">
                            <Box
                              bg="teal.500"
                              borderRadius="md"
                              p={2}
                              color="white"
                            >
                              <Text>{message.content}</Text>
                            </Box>
                            <Avatar
                              name="Jane Doe"
                              src={"/" + message.receiver.image.url}
                              size="sm"
                              ml={2}
                            />
                          </Flex>
                        </div>
                      );
                    }
                  })}
                </Box>
              </Box>
              <form onSubmit={submit}>
                <Flex
                  bg="gray.100"
                  p={4}
                  borderTopRadius="0"
                  borderBottomEndRadius="lg"
                >
                  <Input
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    placeholder="Type a message..."
                    flex="1"
                    mr={4}
                  />
                  <Button type="submit" colorScheme="teal">
                    Send
                  </Button>
                </Flex>
              </form>
            </Flex>
            : <></>
          }
        </Flex>
      </Box>
    </Navbar >
  );
}
