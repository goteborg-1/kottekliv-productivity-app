import axios from "axios";

async function useAxiosApi(baseUrl: string) {
  return axios.create({
    baseURL: baseUrl,
    timeout: 10000
  })
}

export default useAxiosApi