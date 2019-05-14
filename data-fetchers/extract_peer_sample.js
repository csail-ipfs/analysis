db.knownpeers.aggregate([ 
	// Optional if you want to exclude certain hosts.	
	{
    $match: {
        'VANTAGE': {
            '$nin': ['nathaniel-mbp13.local', 'ipfs-big']
        }

    }
},
{
    $sample: {
        size: 30000
    }
}, {
    $out: 'peerlist'
}], {allowDiskUse: true})

db.peerlist.aggregate(
	// Grab a subset - here, we have US-only, but can be changed.
	[{
			"$match": {
				"VANTAGE": {
					"$in": ["fruchter-ipfs-probe-chs2.c.ipri-229620.internal", "fruchter-ipfs-probe-lax.c.ipri-229620.internal", "fruchter-ipfs-probe"]
				}
			}
		},
		{
			"$addFields": {
				"Addrs": {
					"$objectToArray": "$Addrs"
				}
			}
		},
		{
			"$unwind": "$Addrs"
		},
		{
			"$unwind": "$Addrs.v"
		},
		{
			"$facet": {
				"Hosts": [{
					"$group": {
						"_id": "$VANTAGE",
						"Hosts": {
							"$addToSet": "$Addrs.v"
						}
					}
				}],
				"Peers": [{
					"$group": {
						"_id": "$VANTAGE",
						"Peers": {
							"$addToSet": "$Addrs.k"
						}
					}
				}]
			}
		},
		{
			"$out": "host_peer_sets_US"
		}
	], {"allowDiskUse": true})