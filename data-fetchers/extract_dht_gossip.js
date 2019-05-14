// Extract DHT Peer Gossip
db.dht.aggregate([{
    $match: {
        $or: [{
            Operation: "findPeerSingle"
        }, {
            Operation: "handleFindPeer"
        }]
    }
}, {
    $project: {
        _id: 0,
        TIMESTAMP: 1,
        VANTAGE: 1,
        Operation: 1,
        Duration: 1,
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