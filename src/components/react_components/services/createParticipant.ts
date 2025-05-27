import axios from "axios"

export const createParticipant = async (data: FormData) => {
    return await axios.post(`${import.meta.env.PUBLIC_BACKEND_URL}/participants`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}