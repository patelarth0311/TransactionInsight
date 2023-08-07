

import express from 'express'
import cors from 'cors'
import { Configuration, PlaidApi, Products, PlaidEnvironments} from 'plaid'
const app = express();
// handling CORS


const corsOptions = {
  origin: ['https://localhost:3001'],
};

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
     
  
    },
  },
});
const plaidClient = new PlaidApi(configuration);


app.use(cors(corsOptions));
app.use('/',(req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

// route for handling requests from the Angular client
app.post('/create_link_token', async (
  request,
  response,
  next,
) => {

    const req  = {
      user: {
        client_user_id: '63fbab3502d2d300129a4273',
      },
      client_name: 'Plaid Test App',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      redirect_uri: 'https://arthpatel.dev',
      account_filters: {
        depository: {
          account_subtypes: ["checking", "savings"],
        },
      },
    };
    try {
      const resCreation = await plaidClient.linkTokenCreate(req);
      const linkToken = resCreation.data.link_token;

      response.send({link_token: linkToken})


    } catch (error) {
      console.log(error)
    }
});

app.post('/get_transactions', async (
    request,
    response,
    next,
  ) => {


    const req  = {
      access_token: request.body.accessToken,
      options: {include_personal_finance_category: true},
    };
    const res = await plaidClient.transactionsSync(req);
    const data = res.data;
    
    response.send({data: data})
  })

  app.post('/get_accesstoken', async (request, response, next) => {
    const req  = {
        public_token: request.body.public_token,
      };
     
      
      try {
        const res = await plaidClient.itemPublicTokenExchange(req);
        const accessToken = res.data.access_token;
        const itemId = res.data.item_id;
        console.log(accessToken)
        
        response.send({accessToken: accessToken})
      } catch (err) {
       
      }
  })





app.listen(3002, () => {
    console.log('Server listening on port 3002');
});