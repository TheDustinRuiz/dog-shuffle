import { DOG_API_KEY } from "./env";

export const dogOptions = {
    method : "GET",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": DOG_API_KEY,
    },
};