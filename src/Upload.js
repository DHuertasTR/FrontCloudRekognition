import React from "react";
import {Button,Form,FormGroup} from 'react-bootstrap'



class App extends React.Component {
  state = {
    file: null,
    base64URL: ""
    
  };

  

  getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  handleFileInputChange = e => {
    console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        this.setState({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0]
    });
    this.fileUpload=this.fileUpload.bind(this)
  };

  
    async fileUpload(){
        console.log({ photo: this.state.file})
       const response= await fetch ('https://qphljk3c2j.execute-api.us-east-1.amazonaws.com/production/detectsecitem',{
           method :"POST",
           headers : {
               Accept : "application/json",
               "Content-type" :"application/json"
           },
           body :JSON.stringify({ photo: this.state.base64URL})
       })
       const Result= await response.json();
       console.log(Result)
       
      
    }

  render() {
    return (
      <div>
           
        <div className="row">
                <div className= "col-6 offset-3">
                    <h4>Verificador de equipos de seguridad</h4>
                </div>
            </div>
            <div className="row">
                <div className= "col-6 offset-3">
                     <input type="file" name="file" onChange={this.handleFileInputChange} />
                </div>
            </div>
            <div className="row">
                <div className= "col-6 offset-3">
                    <img src={this.state.base64URL} width="40%"/>
                    
                </div>
            </div>
        <div className="row">
                <div className= "col-6 offset-3">
                <h2>{this.state.files}</h2>
                    <Button className="btn btn-lg btn-danger btn-block" onClick={this.fileUpload}>Verificar Imagén</Button>
                </div>
            </div>
      </div>
                 
    );
  }
}

export default App;