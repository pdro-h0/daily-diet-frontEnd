import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await api
      .post("/sessions", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("test-token", response.data.token);
        navigate("/diet-details");
      })
      .catch((err) => {
        toast({
          description: err.response.data.error,
          status: "error",
          duration: 4500,
          isClosable: true,
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center flex-col gap-3"
    >
      <input
        placeholder="user2@email.com"
        className="border outline-gray-400 border-gray-300 rounded-md py-2 px-1 w-72 "
        type="email"
        name="email"
        id="email"
        required
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        className="outline-gray-400 border border-gray-300 rounded-md py-2 px-1 w-72"
        type="password"
        name="password"
        id="password"
        required
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <span className="text-sm text-gray-500/55 hover:text-gray-600">
        Senha: 12345
      </span>

      <button
        className="py-2 px-1 w-72 bg-gray-800 rounded-md text-white"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
};

export default Login;
