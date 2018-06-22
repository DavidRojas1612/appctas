import { Injectable } from "@angular/core";
import * as AWS from "aws-sdk";
import { 
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCES_KEY 
} from '../app.const';


// Configure the region
AWS.config.update({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID, 
	  secretAccessKey: SECRET_ACCES_KEY
  }
});

@Injectable()
export class SactasService {
  dinamo = new AWS.DynamoDB.DocumentClient();

  constructor() {}

  lista: any;
  param = {
    TableName: "Apptas"
  };

  prelistar() {
   
    return this.dinamo.scan(this.param, (err, data) => {
      if (err) {
        console.log(err);
      }else{
        console.log(data);
        
      }
    });
  }

  listarbien(){
    return this.dinamo.scan(this.param).promise();
  }
  

  actualizarData(id,actas){
    console.log(id);
    
    let acta = actas.find(result=>{
      return result.ID === id;
    });    
   
    let paramtwo = {
      TableName: "Apptas",
      Key: {"ID":id },
      UpdateExpression: "set students = :a",
      ExpressionAttributeValues:{
        ":a":acta.students
      }
    };
    this.dinamo.update(paramtwo,(err)=>{
      if(err){
        console.log(err);
        
      }
    });

  }

  Insertar(id, acta){
    
    let paramtwo = {
      TableName: "Apptas",
      Key: {"ID":id },
      UpdateExpression: "set students = :a",
      ExpressionAttributeValues:{
        ":a":acta.students
      }
    };
    this.dinamo.update(paramtwo,(err)=>{
      if(err){
        console.log(err);
        
      }
    });
  }

  InsertarMateria(mate){
   let params = {
      TableName:"Apptas",
      Item:mate
      }
      this.dinamo.put(params,(err)=>{
        if(err){
          console.log(err);
          
        }
      });
  }

  DeleteMate(id){
    let params = {
      TableName:"Apptas",
      Key: {"ID":id }
      }
      this.dinamo.delete(params,(err)=>{
        if(err){
          console.log(err);
          
        }
      });
  }
}




export interface studen {
  cedula: string;
  nombre: string;
  notas: number[];
}

export interface Acta {
  ID: string;
  grupo: string;
  codigo: string;
  nombre: string;
  profesor: string;
  nivel: string;
  students: studen[];
}
