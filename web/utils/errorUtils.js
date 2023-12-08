const errorMessage = (type, messageApi) => {
    let messageContent = '';

    switch (type) {
        case 'solrError':
            messageContent = 'There was a problem with the request. Please go back and try again.';
            break;
        case 'createUrlError':
            messageContent = 'There was a problem generating the url. Please go back and try again.';
            break;
        default:
            messageContent = 'An error occurred.';
            break;
    }

    messageApi.open({
        type: "error",
        content: messageContent,
    });
};

module.exports = { errorMessage };