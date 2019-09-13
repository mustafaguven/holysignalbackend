exports.handler = async (event) => {
    console.log('hello world');

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };

    return response;
};
