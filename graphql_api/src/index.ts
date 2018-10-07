import { bootstrap } from 'vesper';
import { BookmarkController } from './controller/BookmarkController';
import { Bookmark } from './entity/Bookmark';
import { User } from './entity/User';
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import { UserController } from './controller/UserController';
import { Video } from './entity/Video';

bootstrap({
  port: 4000,
  controllers: [
    BookmarkController,
    UserController
  ],
  entities: [
    Bookmark,
    Video,
    User
  ],
   customResolvers: {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime
  },
  schemas: [
    __dirname + '/schema/**/*.graphql'
  ],
  cors: true
}).then(() => {
  console.log('Your app is up and running on http://localhost:4000. ' +
    'You can use playground in development mode on http://localhost:4000/playground');
}).catch(error => {
  console.error(error.stack ? error.stack : error);
});
