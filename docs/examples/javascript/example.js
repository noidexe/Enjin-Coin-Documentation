require('es6-promise').polyfill();
require('isomorphic-fetch');

function queryTP(var_name) {
  var query = var_name;
  fetch('https://master.tp-enj.in/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : `Bearer 5@eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJlYWMzYWE4ZjY1YjNiY2IzZDU3NWY3Mzg0NWViMzBjZWI0YzQyY2FlMDNlOGU4MWQ2MjEyNmRiOGZjN2IzNmQ4MDFmMzZiZGUzZWZjMzJmIn0.eyJhdWQiOiIxIiwianRpIjoiMmVhYzNhYThmNjViM2JjYjNkNTc1ZjczODQ1ZWIzMGNlYjRjNDJjYWUwM2U4ZTgxZDYyMTI2ZGI4ZmM3YjM2ZDgwMWYzNmJkZTNlZmMzMmYiLCJpYXQiOjE1NDIxNDA5MDksIm5iZiI6MTU0MjE0MDkwOSwiZXhwIjoxNTczNjc2OTA5LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.JTl3Ad-7cs3pPe-11BHzyLCpqpJuqvtseLmVzvwq7h4Hrp28NPDpR0qjXFCfyXG6QMyzjynXXikNTAWIsoC82u6k_-H9AfRfKAPc9Q7Elis-dFnzuKYv7mVV7newZVdEyeRunyehGZMoQFljGF2v9J_G6WHXlngX3DHAyF8TZT5-bh_tJc7c6oGmoYigvzwLSIwLKaE3FPFlrdgmEVaPaj3fLD5eflEt1IIYNRc3CvpjA2VmJVmh0ZFjOBE7vrVku48_2MqS6EL2r7-cABcKlLdGZGPcCTf5UZ8ARhA_Fe5SzVQcbJFpStOtaXeTWt8n-otPqsuyj_yEumiwCB5p7C363zSCJueBzq6QjR0UCNpE8_pbkpLHaOoM3QjPMA_PKi81ekJYkCq9ZJwII_G7H8jfU86z5k5nWcjBsXA8bhxLIqs4H_UNStZmzQiVoIrfMoLqN76qMPcTPRU-ms3mTZPkMo2TERkeeQlAhxY9zO2lcUm9UCJV4y5z5HZezX1vGU6PbSc9cRpsvGNwhgEDN4CzycFF0G_p90U1hu1yRatqKzZB5zE7j1OImw-Ujtq_g8Ngfbvf0m2um7Zu0YCVn-30CHiIox2qDHpELayyePSwiw3OPDKFuv84m-ADdZx2gbn9cDNwzo7uEZ-z2vEOjKPRDKUe3blMfptYUaXES0M`
  },
  body: JSON.stringify({query})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
}

//
// Example Queries/Mutations
//

// List items
var list_items_query = `query {
  EnjinTokens {
    token_id
    name
    creator
    created_at
    blockHeight
    icon
    index
    totalSupply
  }
}`;

// Create a new user
var new_user_mutation = `mutation {
    CreateEnjinUser (
      name: "NAME",
      email: "EMAIL",
      password: "PASSWORD"
    ) {
      id
      name
      email
    }
  }`;

// Update an existing user
var update_user_mutation = `mutation {
    UpdateEnjinUser (
      id: 317
      name: "NEW NAME",
      email: "NEW EMAIL",
      password: "NEW PASSWORD"
    ) {
      id
      name
      email
    }
  }`;

// Getting your access token @// TODO: How do I get the token from the TP?

// Run query/mutation on the TP
queryTP(new_user_mutation);
