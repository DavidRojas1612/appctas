import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { 
  REGION2,
  IDENTITY_POOLID,
  USER_POOL_WEB_CLIENT_ID,
  USER_POOLID 
} from './app/app.const';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  


  Amplify.configure({
    Auth: { 

      identityPoolId: IDENTITY_POOLID,
    // REQUIRED - Amazon Cognito Region
        region: REGION2, 
    // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: USER_POOLID,
    // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: USER_POOL_WEB_CLIENT_ID, 
    }
  
  });

  
 
  