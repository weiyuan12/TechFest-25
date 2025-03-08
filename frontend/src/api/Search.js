import axios from "axios"

export const sendSearchRequest = async (text) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/query/", 
            {
                "text" : text
            }, // Your request data
            {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }
        );
        // ... handle response
    } catch (error) {
        // ... handle error
    }
};