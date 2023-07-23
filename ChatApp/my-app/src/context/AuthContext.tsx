// import React, { Provider, createContext, useCallback, useState } from "react";
// import Register from "../pages/Register";


// // type AuthProps = {
// //   children: any;
// // };

// // export const AuthContext = createContext({} as AuthContextType  );
// // export const AuthContextProvider = (  children : any) => {
// //   const [user, setUser] = useState(null);
// //   const [register, setRegister] = useState({

// //     name: "zac",
// //     email: "",
// //     password: "",
// //   },
// //   );

// //   const UpdateRegister = useCallback((data: RegisterData) => {
// //     setRegister(data);
// //   }, []);
// // //   const UpdateRegister = useCallback((...params: any[]) => {
// // //     console.log("im hereee");

// // //     console.log("regsiter info ==> ", register);
// // //     setRegister(info);
// // //   }, []);

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         setRegister,
// //         user,
// //         register,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // import React, { createContext, useState, useContext, FC } from "react";

// // Define the type for the register state

// // Create a new context
// interface RegisterData {
//     name: string;
//     email: string;
//     password: string;
//   }
//   interface user {
//     name: string;
//   }
  
//   interface AuthContextType {
//     user: user // Replace 'any' with the appropriate type for 'user'
//     register: RegisterData;
//     updateRegister:  (state: RegisterData) => void;
//   }
  
// export const RegisterContext = createContext<AuthContextType>({} as AuthContextType);

// // Create a custom hook to access and update the state
// const useRegisterContext = (
//   children: any
// ) => {
//   const [user, setUser] = useState<user>(null!);
//   const [register, setRegister] = useState<RegisterData>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const updateRegister = useCallback((state: RegisterData) => {
//     setRegister(state);
//   }, []);

//   return (
//     <RegisterContext.Provider
//       value={{
//         user,  
//         updateRegister,
//         register,
//       }}
//     >
//       {children}
//     </RegisterContext.Provider>
//   );
//   //   return [register, updateRegister];
// };

// export default RegisterContext;
// // export { useRegisterContext, RegisterContext };


import React, { createContext, useContext, useState } from "react";

// Define the type for the input data state
interface InputData {
  name: string;
  email: string;
  password: string;
}

// Create a new context
const InputContext = createContext<{
  inputData: InputData;
  setInputData: React.Dispatch<React.SetStateAction<InputData>>;
}>({
  inputData: {
    name: "",
    email: "",
    password: "",
  },
  setInputData: () => {},
}

);

// Create a custom hook to access and update the input data
const useInputContext = () => useContext(InputContext);

export { InputContext, useInputContext };
