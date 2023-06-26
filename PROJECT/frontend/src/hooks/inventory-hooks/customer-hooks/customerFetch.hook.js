import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../../../components/customer-components/helper";
axios.defaults.baseURL = "http://localhost:4000";

// custom hooks
export default function useFetch(query) {
  const [getData, setData] = useState({
    isloading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isloading: true }));

        const { username } = !query ? await getUsername() : "";
        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        if (status == 201) {
          setData((prev) => ({ ...prev, isloading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isloading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}
