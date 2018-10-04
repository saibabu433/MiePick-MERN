
import React, { Component } from 'react';
//import './photoupload.css';  

//import httpservice
import photoHttpService from'./services/photohttp-service';
const photohttp = new photoHttpService(); 


 

class Location extends React.Component {
 constructor(props){
        super(props) 
        this.state={Photos:[]}; 
        this.loadphoto=this.loadphoto.bind(this); 
        this.loadphoto();
        
    }

  // write th uploadphoto service
  loadphoto = () => {
        var self= this;  
        photohttp.images().then(datas => {  
            self.setState({Photos: datas})   
        }, err =>{

        });
    } 
/*  state = {
    locations: [
      {
        "name": "Ojo",
        "zone": "Lagos State",
        "region": "South West"
      },
      {
        "name": "Ahiazu Mbaise",
        "zone": "Imo State",
        "region": "South East"
      },
      {
        "name": "Akoko-Edo",
        "zone": "Edo State",
        "region": "South South"
      },
      {
        "name": "Anka",
        "zone": "Zamfara State",
        "region": "North West"
      },
      {
        "name": "Akwanga",
        "zone": "Nasarawa State",
        "region": "North Central"
      }
    ]
  }*/
  render() {
    return (
      <div>
        <div>
          <div>
            <h2>MiePick Employee's Data</h2>
          </div>
        </div>
        <div> 
          {this.state.Photos
            .map(location =>  
              <LocationCard key={location._id} {...location} />
              
          )}
        </div>
      </div>
    )
  }
}

const LocationCard = (props) => {
    console.log("Props>>>>",props)
  return (
    <div>
      <hr />
     {/* <p><b>Name:</b> {props.path}</p>
      <p><b>Photo:</b> {props.photo}</p>
      <p><b>Phototitle:</b> {props.phototitle}</p> */} 
      <div><img  src={'http://localhost:3002/picture/'+props.paths} alt="props.originalname"/> </div>
      <hr />  
    </div>
  )
}



const Apps = () => (
  <div>
      <Location />
  </div>
)

export default Apps;


/*{this.props.userpics.map(img=>{ 
        <img src={img.originalname} /> })
      }*/