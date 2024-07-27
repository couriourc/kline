import axios from "axios";

console.log(process.env.NUXT_PUBLIC_API_BASE);
export const requester = axios.create({
    baseURL: "http://adatalabel.30006124.xyz:7101/",
});

