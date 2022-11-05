export default {
    name: 'user',
    type: 'document',
    title: 'User',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'walletAddress',
            type: 'string',
            title: 'Wallet Address'
        },
        {
            name: 'tokens',
            type: 'number',
            title: 'Tokens'
        },
        {
            name: 'admin',
            type: 'boolean',
            title: 'Admin'
        },
        {
            name: 'subscribedBounties',
            type: 'number',
            title: 'Subscribed Bounties'
        }
    ]
}