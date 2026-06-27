import api from "./api";

export const generateEmail = async (emailData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(

        "/email/generate",

        emailData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};