import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";

export default function Registor() {
  const [formRegistor, setFormRegistor] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  let navigate = useNavigate();
  const registor = async () => {
    AuthService.registor(
      formRegistor.fullName,
      formRegistor.email,
      formRegistor.password,
      formRegistor.address,
      formRegistor.phone
    )
      .then((res) => {
        alert(res.data.message);
        navigate("/home");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div class="h-screen bg-gradient-to-br from-pink-600 to-indigo-600 flex justify-center items-center w-full">
      <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
        <div class="space-y-4">
          <h1 class="text-center text-2xl font-semibold text-gray-600">
            Register
          </h1>
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              onChange={(e) =>
                setFormRegistor({ ...formRegistor, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label
              for="fullName"
              class="block mb-1 text-gray-600 font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              onChange={(e) =>
                setFormRegistor({ ...formRegistor, email: e.target.value })
              }
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-semibold">
              Password
            </label>
            <input
              type="password"
              class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              onChange={(e) =>
                setFormRegistor({ ...formRegistor, password: e.target.value })
              }
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-semibold">
              Phone
            </label>
            <input
              type="text"
              class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              onChange={(e) =>
                setFormRegistor({ ...formRegistor, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-semibold">
              Address
            </label>
            <input
              type="text"
              class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              onChange={(e) =>
                setFormRegistor({ ...formRegistor, address: e.target.value })
              }
            />
          </div>
        </div>
        <button
          class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
          onClick={registor}
        >
          Register
        </button>
      </div>
    </div>
  );
}
