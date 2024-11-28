export function GeneralErrorHandler(error) {
    let customMessage;
 
    switch (true) {
        case error.message.includes("429"):
            customMessage = "The API Used To Much. Change The Key";
            break;
        case error.message.includes("500"):
            customMessage = "Internal server error: Please try again later.";
            break;
        // Add more cases for other error types if needed  
        default:
            customMessage = "An unexpected error occurred. Please try again.";
            break;
    }  

    // Log the original error for debugging purposes  
    console.error("Original error:", error);

    // Send or display the custom message to the user  
    alert(customMessage);
}