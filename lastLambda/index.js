exports.handler = async (event) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify('last lambda is here...!')
    };

    return response;
};
