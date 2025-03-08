import axios from "axios"

export const sendSearchRequest = async (text, file) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/query/image", 
            {
                "image" : file
            }, // Your request data
            {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            }
        );
        return response
        // ... handle response
    } catch (error) {
        // ... handle error
    }
};