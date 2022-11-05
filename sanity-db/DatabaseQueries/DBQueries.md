# Database Queries

API URL : `https://g6dxmope.api.sanity.io/v2021-10-21/data/query/production?query={YOUR_QUERY}`
MUTATE URL : `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`

## Queries

### User

- To fetch the user from wallet address

```
*[_type == "user" && _id == "{WalletAddressAsParam}"]
```

- To add the user on connect wallet

```js
client -> sanity client

const userDoc = {
  _type: "users",
  _id: "<UserAddress>",
  name: "<YOUR_NAME>",
  walletAddress: "<UserAddress>",
  admin: false,
  registered : false
};

// Create and not if already exists
await client.createIfNotExists(userDoc)
```

- Set Registered

```js
const mutations = [
  {
    patch: {
      _id: "USER_ID",
      set: {
        registered: true,
      },
    },
  },
];

fetch(
  `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`,
  {
    method: "post",
    body: JSON.stringify({ mutations }),
  }
)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

- Add/Get Tokens

```js
// Get data from blockchain functions
```

- Add/Get Subscription

```js
// Get data from blockchain functions
```

### Bounty

- Get Bounties

```
*[_type == "bounty"]
```

- Add Bounty

```js

// First interact with blockchain
// ------------------------------

client -> sanity client

const bountyDoc = {
  _type: "bounty",
  _id: `${currentAccount}_${Date.now()}`,
  name: "<BOUNTY_NAME>",
  description: "<BOUNTY_DESC>",
  prize : 2000,
  author : {
    _key : `${currentAccount}_${Date.now()}`,
    _ref : currentAccount,
    _type : "reference"
  },
  comments : {
    type : "array",
    of : [_type : "reference", to : [{type : "comments"}]]
  }
};

await client.createIfNotExists(bountyDoc)
```

- Add Comment

```js
client -> sanity client

const commentDoc = {
    _type : 'comments',
    content : "<COMMENT_CONTENT>",
    upvote : 0,
    downvote : 0,
    author : {
        _ref : currentAccount,
        _type : "reference"
    },
    bounty : {
        _ref : "BOUNTY_DOC_ID",
        _type : "reference"
    }
}

await client.createIfNotExists(commentDoc)
```

- Upvote Comment

```js

```

- Downvote Comment

```js

```

- Close Bounty

```js
// First interact with blockchain
// ------------------------------

const mutations = [
  {
    patch: {
      _id: "BOUNTY_ID",
      set: {
        status: true,
        closedBy: "ID_OF_WINNER",
      },
    },
  },
];

// Check If Bounty Author === userAccount before sending the request

fetch(
  `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`,
  {
    method: "post",
    body: JSON.stringify({ mutations }),
  }
)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```
