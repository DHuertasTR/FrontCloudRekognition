import React, {Component} from 'react';
import {Button,Form,FormGroup} from 'react-bootstrap'
import FileBase64 from "react-file-input-previews-base64"

class Upload extends Component{
    constructor(props){
        super();

        this.state={
            files :[],
            Result :[]
         }

        this.fileUpload=this.fileUpload.bind(this)
    }

    getFiles(files){
        this.setState({files : files});
        console.log(files)
    }


    async fileUpload(){
        console.log({ photo: this.state.files["base64"]})
       const response= await fetch ('https://qphljk3c2j.execute-api.us-east-1.amazonaws.com/production/detectsecitem',{
           method :"POST",
           headers : {
               Accept : "application/json",
               "Content-type" :"application/json"
           },
           body :JSON.stringify({ photo: this.state.files['base64']})
       })
       const Result= await response.json();
       this.setState({Result:Result.body});
       console.log(this.state.Result);


    }

    render(){
        return( <div>

            <div className="row">
                <div className= "col-6 offset-3">
                    <h4>Verificador de equipos de seguridad</h4>
                </div>
            </div>
            <div className="row">
                <div className= "col-6 offset-3">
                    <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />
                </div>
            </div>
            <div className="row">
                <div className= "col-6 offset-3">
                    <img src={this.state.files.FileBase64} width="40%"/>
                </div>
            </div>
            <div className="row">
                <div className= "col-6 offset-3">
                    <Button className="btn btn-lg btn-danger btn-block" onClick={this.fileUpload}> Verificar imagen</Button>
                </div>
            </div>

        </div>);
    }
}

export default Upload