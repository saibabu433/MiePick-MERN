import 'whatwg-fetch';

class uploadHttpService {
    images = () =>{
        var promise = new Promise((resolve, reject) =>{
                                  fetch('http://localhost:3002/Photouploadfiles').then(response => { 
                                  	console.log("Photouploadfiles Fetch responsne>..",response)
            resolve(response.json());
            })
        });
        return promise;
    }
}


export default uploadHttpService;