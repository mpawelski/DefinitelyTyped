import * as QueryStream from 'pg-query-stream';
import * as pg from 'pg';

const options: QueryStream.Options = {
    highWaterMark: 1000,
    batchSize: 100
};

const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000], options);

pg.connect('', (err, client, done) => {
    const stream = client.query(query);
    stream.on('end', () => {
        client.end();
    });
    stream.on('data', (data: any) => {
        console.log(data);
    });
});
