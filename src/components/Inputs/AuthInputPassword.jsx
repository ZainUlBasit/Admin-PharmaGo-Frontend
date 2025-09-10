import { useState } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri"; // Import eye icons from react-icons
import "./AuthInput.css";

const AuthInputPassword = ({
  label,
  placeholder,
  required,
  Value,
  setValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] z-10 font-bold InputLabel">
        {label}
      </p>
      <div className="relative font-[Quicksand]">
        <input
          type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
          required={required}
          // id={v4()}
          placeholder={placeholder}
          className="px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none InputText"
          value={Value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}{" "}
        </button>
      </div>
    </div>
  );
};

export default AuthInputPassword;
