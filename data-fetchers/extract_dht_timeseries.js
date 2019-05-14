// All DHT transactions with small subset of keys
db.dht.aggregate([{
    $match: {  }
}, {
    $project: {
        _id: 0,
        TIMESTAMP: 1,
        VANTAGE: 1,
        Operation: 1,
        Duration: 1,
    }
}, {
    $out: 'dht_timeseries'
}])