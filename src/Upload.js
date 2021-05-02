import React from "react";
import { Grid, Button, Typography, Card, Box,GridList,GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Alert from '@material-ui/lab/Alert';
import Image1 from './images/img1.png';
import Image2 from './images/img2.jpg';
import Image3 from './images/img3.jpg';
import Image4 from './images/img4.jpg';




class App extends React.Component {
  state = {
    file: null,
    base64URL: "",
    message: "",
    tileData: [
      {
        img: Image1,
        title: 'Image1',
        author: 'author',
        cols: 2,
      },
      {
        img: Image2,
        title: 'Image1',
        author: 'author',
        cols: 1,
      },
      {
        img: Image4,
        title: 'Image1',
        author: 'author',
        cols: 1,
      },
      {
        img: Image3,
        title: 'Image1',
        author: 'author',
        cols: 2,
      },
    ],
    facecovervalue: false,
    hasfacemask: false,
    isoneperson: false,
    facecovervalue2: false,
    hasfacemask2: false,
    isoneperson2: false,
    
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

        baseURL = reader.result;
        
        resolve(baseURL);
      };
      
    });
  };

  handleFileInputChange = e => {
   
    this.setState({
      facecovervalue2: false,
      hasfacemask2: false,
      isoneperson2: false,
     })
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        
        this.setState({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        
      });

    this.setState({
      file: e.target.files[0]
    });
    this.fileUpload=this.fileUpload.bind(this)
    
  };

  
    async fileUpload(){
     
       const response= await fetch ('https://qphljk3c2j.execute-api.us-east-1.amazonaws.com/production/detectsecitem',{
           method :"POST",
           headers : {
               Accept : "application/json",
               "Content-type" :"application/json"
           },
           body :JSON.stringify({ photo: this.state.base64URL})
       })
       const Result= await response.json();
       

       const details = JSON.parse(Result.body)
       
       
       try {
         this.setState({
          facecovervalue: false,
          hasfacemask: false,
          isoneperson: false,
          facecovervalue2: true,
          hasfacemask2: true,
          isoneperson2: true,
         })
         if(details.FaceCoverRecon.length===0){
          this.setState({hasfacemask:false})
          this.setState({isoneperson2:false})
         }else if(details.FaceCoverRecon.length===1){
          this.setState({isoneperson:true})
          this.setState({hasfacemask:true})
          if (details.FaceCoverRecon[0].CoversBodyPartValue) {
            this.setState({facecovervalue:true})
          
          } else {
            this.setState({facecovervalue:false})
            
          }
         }else{
          this.setState({facecovervalue2:false})
          this.setState({hasfacemask2:false})
          this.setState({isoneperson:false})
         }
           
       } catch (error) {
         
       }
       
       
    }

    /* facemask = props => {
      this.state.facecovervalue = props.CoversBodyPartValue
      let value = this.state.facecovervalue
      if (value) {
        return (
          <li>
                  <span style={{ color: "black" }}>
                    Estás usando el tapabocas de manera correcta.
                  </span>
                </li>
                <br></br>
                <li className={useStyles.li_blue}>
                  <span style={{ color: "black" }}>
                    Se detecta un reconocimiento del tapabocas en una seguridad del {props.Confidence}.
                  </span>
                </li>
        )
      } else {
        return (
          <li>
                  <span style={{ color: "black" }}>
                    No estás usando el tapabocas de manera correcta. Por favor, acomodarselo de manera adecuada.
                  </span>
                </li>
                <br></br>
                <li className={useStyles.li_blue}>
                  <span style={{ color: "black" }}>
                    Se detecta un reconocimiento del tapabocas en una confidencialidad del {props.Confidence}.
                  </span>
                </li>
        )
      }
    }*/
 

  
  render() {
    return (
      <div  className ={useStyles.root}
      style={{ justifyContent: "center", alignItems: "center", margin: "8px" }}
    >
      <Grid m={4} container justify="center" direction="column">
        <Grid item alignItems="center" container direction="column">
         
              <Grid
            container
            xs={9}
            direction="column"
            justify="center"
            alignItems="flex-start"
            style={{ marginLeft: 20 }}
            spacing={0}
          >
             <Card className={useStyles.card} style={{ backgroundColor: "#2764E3" }}>
            <Grid
              container
              xs={12}
              direction="row"
              justify="center"
              alignItems="center"
              style={{ marginLeft: 20 }}
            >
              <Grid
                container
                xs={9}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
               
                <Grid
                  container
                  xs={12}
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  style={{ marginLeft: 20 }}
                  spacing={0}
                >
                  <Typography className={useStyles.text} spacing={0}>
                    <p>
                      <b style={{ fontSize: 24 , justify: "center"}}> Plataforma para disminuir los casos de covid-19 en las empresas a partir de la detección del buen uso del tapabocas</b>
                    </p>
                  </Typography>
                  <Box className={useStyles.circle} style={{ marginLeft: 20 }}>
                  <GridList cellHeight={160} className={useStyles.gridList} cols={3}>
                    {this.state.tileData.map((tile) => (
                      <GridListTile key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                      </GridListTile>
                    ))}
                  </GridList>
                  
                </Box>
                </Grid>
              </Grid>
              </Grid>
              </Card>
              <br></br>
              <br></br>
              <br></br>
            
            
          </Grid>
          <Typography variant="h4" alignCenter className={useStyles.text_blue}>
              <b>Ingresa tu foto de ingreso</b>
            </Typography>
            <br></br>
          <Button
                     containerElement='label' // <-- Just add me!
                      label='My Label' color="primary" variant="contained">
                      
                      <input type="file" name="file" onChange={this.handleFileInputChange} />
          </Button>
          <br></br>
          <div className= "col-6 offset-3">
        
              <img src={this.state.base64URL} width="50%"/>
              </div>
              <h2>{this.state.files}</h2>
              <Button color="primary"  variant="contained" onClick={this.fileUpload}>Verificar imagen</Button>
              <Typography variant="body1" style={{ paddingRight: 100 }} >
             
             
            </Typography>
            <br></br>
            <p>
                <b>Resultados:</b>{" "}
              </p>
            <div className={useStyles.alerts}>
             
              <Alert severity={this.state.hasfacemask ? "success": "error"}>{this.state.hasfacemask2 ? (this.state.hasfacemask ? "Estás usando el tapabocas." : "No estás haciendo uso de tapabocas, ponte uno para poder continuar con tus labores"):"" }</Alert> 
              <Alert severity={this.state.facecovervalue? "success": "warning"}>{this.state.facecovervalue2 ? (this.state.facecovervalue ? "Admitido, se detecta un uso correcto del tapabocas" : "No admitido, asegurate de usar correctamente tu tapabocas"):"" }</Alert> 
              <Alert severity="info">{this.state.isoneperson2 ? (this.state.isoneperson ? "Todo está bien, puedes seguir con tus labores":"Al parecer hay más de una persona en la imagen"):""}</Alert> 
            </div>
        </Grid>
      </Grid>
        
        </div>
    
       

    );
  }
}


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    flexGrow: 1,
  },
  grid: {
    height: "100%",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },

  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
    color: "white",
  },
  card: {
    margin: theme.spacing(1, 0),
    marginBottom: 20,
    width: "90%",
    height: "100%",
    justifyContent: "center",
    backgrounColor: "#2764E3",
    borderRadius: 20,
  },
  plus: {
    marginLeft: theme.spacing(4),
  },

  text: {
    fontFamily: "Tajawal",
    fontStyle: "normal",
    color: "white",
  },

  text_blue: {
    fontFamily: "Tajawal",
    fontStyle: "normal",
    color: "#2764E3",
  },

  buttonText: {
    fontFamily: "Tajawal",
    fontStyle: "normal",
    fontSize: 20,
    color: "white",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 150 / 2,
    overflow: "hidden",
    backgroundColor: "white",
    objectFit: "contain",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  ul: {
    color: "#2764E3",
  },

  maskImage: {
    overflow: "hidden",
    objectFit: "contain",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  btn: {
    margin: theme.spacing(1, 0),
    textTransform: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  alerts: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  typography: {
    flexGrow: 1,
        align: "center"
      },
}));

export default App;