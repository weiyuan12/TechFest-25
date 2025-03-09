import axios from "axios"

export const sendSearchTextRequest = async (text, user) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/query/a", 
            {
                "text" : text,
                "username" : user
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


export const sendSearchImageRequest = async (file, user) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/query/image", 
            {
                "image" : file,
                "username" : user
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