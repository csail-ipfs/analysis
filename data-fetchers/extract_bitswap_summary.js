db.bitswap.aggregate([{
    $project: {
        _id: 0,
        WantlistSize: {
            $size: "$Wantlist"
        },
        NPeers: {
            $size: "$Peers"
        },
        BlocksReceived: 1,
        DataReceived: 1,
        BlocksSent: 1,
        DataSent: 1,
        VANTAGE: 1,
        TIMESTAMP: 1,
        MessagesReceived: 1
    }
}, {
	// Optional if you want to exclude certain hosts.
    $match: {
        'VANTAGE': {
            '$nin': ['exclude-hostname-1', 'exclude-hostname-2'] 
        }
    }
}, {
    $out: 'bitswap_summary'
}])