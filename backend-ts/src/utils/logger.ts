import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = {
  write: (message) => {
    console.log(message.trim());
  },
};

const skip = () => {
  return process.env.NODE_ENV === 'test';
};

//  Formats:
//  dev:   GET /users 200 12ms - 500b
//  combined: [prod] Apache-style
export const morganMiddleware = morgan(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  { stream, skip }
);
