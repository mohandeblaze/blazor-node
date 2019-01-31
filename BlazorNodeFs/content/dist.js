var nodeFs = {
    requestFiles: async function (path) {
        console.log('Given path', path);
        const url = `http://localhost:3000/readFiles?path=${path}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const myJson = await response.json();

            return myJson;
        } catch (e) {
            return {
                files: ["Coundn't send request to server"]
            }
        }
        
    }
};