import 'whatwg-fetch';

class photoHttpService {
    images = () =>{
        var promise = new Promise((resolve, reject) =>{
                                  fetch('http://localhost:3002/userdata').then(response => { 
                                  	console.log("Fetch responsne>..",response)
            resolve(response.json());
            })
        });
        return promise;
    }
}


export default photoHttpService;