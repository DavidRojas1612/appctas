const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1', credentials: { 
	    accessKeyId: 'AKIAI2KEMTS2WD76ZAGQ', 
	    secretAccessKey: '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'}
		});
		
		// AWS.config.update({
		// 	endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
		// });


  let  dinamo = new AWS.DynamoDB.DocumentClient();

function listar() {

	    var param = {
		          TableName: "Apptas" 
		        };
	    dinamo.scan(param,(err,data)=>{
		          if(err){
				          console.log(err);
				          
				        }else{
						        console.log(data);
						        
						      }     
		          
		        });

	  }

listar();
