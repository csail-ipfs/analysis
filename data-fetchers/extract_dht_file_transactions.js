// Extract DHT File Transactions
db.dht.aggregate([{
    $match: {
        $or: [{
            Operation: "handleAddProvider"
        }, {
            Operation: "handleGetProviders"
        }]
    }
}, {
    $project: {
        _id: 0,
        TIMESTAMP: 1,
        VANTAGE: 1,
        Operation: 1,
        Duration: 1,
		Key: '$Tags.key',
        Peer: {
            $substr: [{
                    $arrayElemAt: [{
                        $split: ['$Tags.peer', ' ']
                    }, 1]
                },
                0,
                9
            ]
        }
    }
}, {
    $out: 'dht_peer_txns'
}])