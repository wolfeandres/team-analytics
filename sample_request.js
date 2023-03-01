var axios = require('axios');
var data = JSON.stringify({
  'dataSource': 'FitnessLog',
  'database': 'FitnessLog',
  'collection': 'FitnessLogs' 
});
var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-nphof/endpoint/data/v1/action/find',
  headers: { 
    'Content-Type': 'application/json', 
    'api-key': 'e1G2HlcHaZPlJ2NOoFtP3ocZilWoQOoPIdZ8pndoFpECJhoNn7e5684PV0NTZSXg'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
