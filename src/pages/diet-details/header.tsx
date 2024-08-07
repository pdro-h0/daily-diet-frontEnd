import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    sessionStorage.removeItem("test-token");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center mt-8 mb-8">
      <img src="/logo.png" alt="logo da daily diet" />
      <Menu isLazy>
        <MenuButton>
          <Avatar src="https://bit.ly/broken-link" size={"sm"} />
        </MenuButton>
        <MenuList w={2}>
          <MenuItem onClick={handleClose}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </header>
  );
};

export default Header;
