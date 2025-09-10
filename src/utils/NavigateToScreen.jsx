import { useNavigate } from "react-router-dom";

const NavigateToScreen = (path) => {
  const navigate = useNavigate();
  navigate(path);
};

export default NavigateToScreen;
