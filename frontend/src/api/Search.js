import axios from "axios"

export const sendSearchTextRequest = async (text) => {
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


export const sendSearchImageRequest = async (file) => {
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