import axios from "axios";

const evEnergy = () => {
  const instance = axios.create({
    baseURL: "https://example.ev.energy",
  });
  instance.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  });
  return instance;
};

export default evEnergy();
