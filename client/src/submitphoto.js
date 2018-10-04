import React from 'react';
import ImageCard from './ImageCard';
import Photopics from './Photo';

//submit photo
import Photoupload from './uploadphoto';


class Uploader extends React.Component {
  constructor() {
    super();

    this.state ={
      file: {name: null},
      images: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.getImageData();
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log("this.stateonFormSubmit.file>>>>>>>",this.state.file);
    this.fileUpload(this.state.file);
  }

  onChange(e) {
    console.log("e.targetonChange.file[0]>>>",e.target.files);
    this.setState({file:e.target.files[0]})
  }

  getImageData() {
    const url = 'http://localhost:3002/file';
    
    fetch(url)
    .then(response => { 
      console.log("response get image data ",response);
      if(response.ok) return response.json();
      // throw new Error('Request failed.');
      return [];
    }) 
    .then(data => { this.setState({images: data}); }); 
  }


  fileUpload(file){
    const url = 'http://localhost:3002/upload';
    const formData = new FormData();
    console.log("formdata file>>>>",file)
    formData.append('file',file)

    fetch(url, {
        mode: 'no-cors',
        method: "POST",
        body: formData
      })
    .then(res => { this.getImageData(); });
  }

  render() {
    let images;
    if(this.state.images.length > 0) {
      console.log("state.images>>>",this.state.images);
      images = this.state.images.map( i => {
        return (
          <ImageCard key={i._id} alt={i.metadata.originalname} src={'http://localhost:3002/file/'+i.filename} date={i.uploadDate} />
        );
      });
    } else {
      images = <h2 className="subtitle">No images :(</h2>;
    }

    return (
      <section className="section">
        <div className="container  is-fluid">
          <h1 className="title">Photo Gallery uploader compnet </h1>
          <div className="file is-info has-name is-fullwidth">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" onChange={this.onChange}  multiple/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                   Miepick uploader component Choose a file…
                </span>
              </span>
              <span className="file-name">
                {this.state.file.name}
              </span>
            </label>
          </div>
          <br/>
          <button className="button is-primary" onClick={this.onFormSubmit} type="submit">uploadercomponentonformsubmit</button>
        </div>
        <hr/>
        <div className="container is-fluid">
          <div className="columns is-multiline">
            {images}
          </div>
        </div>
        <Photopics/>
        <div>
         <Photoupload/>
        </div>
      </section>
    );
  }
 }

export default Uploader;
