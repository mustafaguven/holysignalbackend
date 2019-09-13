exports.handler = async (event) => {
    console.log('getting all translations');

    const response = {
        statusCode: 200,
        body: JSON.stringify('getting all translations...!')
    };

    return response;
};
