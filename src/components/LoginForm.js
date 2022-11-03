import { useState } from "react";
import * as React from "react";
import Form from "../utilities/Forms";
import { useNavigate } from "react-router";
import { loginUser } from "../utilities/loaders";
import {
  Button,
  FormControl,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

export default function LoginForm({ setUserTypeState, setIsLoggedInState }) {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = React.useRef();

  React.useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") navigate("/");
  }, []);

  const handleShowPassword = () => {
    setShow(!show);
  };

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin();

    if (validate) {
      sendUser();
    } else {
      toastIdRef.current = toast({
        title: "Error",
        description: "Por favor, complete los campos correctamente",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
      dni: {
        value: dni,
        minLength: 6,
        isRequired: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const sendUser = async () => {

    const formData = {};
    formData.dni = dni;
    formData.password = password;
    formData.email = "";
    try {
      const res = await login(formData);
      setLoading(false);
      if (res.status === 200) {
        console.log("Estado del logueo: " + localStorage.getItem("isLoggedIn"));
        navigate('/posts/')
      }

    } catch (error) {
      toastIdRef.current = toast({
        position: 'bottom-left',
        description: 'DNI o contraseña incorrectos.',
        status: 'error',
        isClosable: true,
      })
      setPassword("");
    }
  };
  const handleRegister = () => {
    navigate("/register", { replace: true });
  };
  
  return (
    <>
      <Stack
        minH={"100vh"}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Flex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
        >
          <Stack
            spacing={4}
            w={"full"}
            className={'glassEffect'}
            maxW={"md"}
            border={"1px solid #74747426"}
            borderRadius={"20px"}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
            padding={"5%"}
          >
            <Heading fontSize={"xl"} marginBottom={"10%"} marginTop={2} textAlign={'center'}>
              INGRESAR
            </Heading>
            <Flex zIndex={2}>
              <Text as="b">Documento &nbsp;</Text>
            </Flex>
            <NumberInput required marginBottom={7} onChange={(e) => setDni(e)} zIndex={2}>
              <NumberInputField />
            </NumberInput>
            <FormControl>
              <Flex>
                <Text as="b">Contraseña &nbsp;</Text>
              </Flex>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Ingresar contraseña"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                    {show ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
              </Stack>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                onClick={authenticate}
              >
                Ingresar
              </Button>

              <HStack spacing="1" justify="center">
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={handleRegister}
                >
                  Registrarme
                </Button>
              </HStack>
              <HStack spacing="1" justify="center">

              </HStack>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            maxHeight={{ base: "250px", md: "60%" }}
            margin={{ base: 'auto', md: 'none' }}
            marginTop={{ base: "5%", md: "20%" }}
            marginBottom={'-10em'}
            onClick={() => navigate("/")}
            cursor={"pointer"}
          />
        </Flex>
      </Stack>
    </>
  );
}
