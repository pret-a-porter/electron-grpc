# Electron gRPC

## Quick start

1. `npm install`
2. `npm run start:server`
3. `npm run start`

## Comparsion

11 columns. 1 nested object. Server emits batch every 10 milliseconds.
Render only current count of batches. Log in devtools only size of received batch.
Therefore almost no additional tasks, only handling data from server stream.
Time of handling 100 batches in milliseconds. CPU usage in brackets.

| Batch size | gRPC | WebSocket |
|------------|------|-----------|
| 1000 | 1119.699 (30%) | 1097.100 (34%) |
| 10000 | 1588 (96%) | 3257.399 (97%) |
| 30000 | 4970 (98%) | 9794.599 (100%) |
| 50000 | 8189.600 (98%) | 16256 (100%) |
| 100000 | 15919.900 (98%) | 35930.100 (100%) |
