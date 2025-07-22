import Redis from 'ioredis';

const redis = new Redis({
  host:process.env.REDIS_HOST,
  port:Number(process.env.REDIS_PORT),
});

redis.on('error', (err) => {
  console.log('Redis connection error: ', err)
})

export default redis;
