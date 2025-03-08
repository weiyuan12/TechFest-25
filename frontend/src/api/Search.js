import axios from "axios"

export const sendSearchRequest = async (text) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/query/a", 
            {
                "text" : text
            }, // Your request data
            {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }
        );
        return response
        // ... handle response
    } catch (error) {
        // ... handle error
    }
};