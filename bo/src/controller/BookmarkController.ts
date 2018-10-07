import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Bookmark } from '../entity/Bookmark';
import { User } from '../entity/User';
import { Video } from '../entity/Video';
import { visit } from 'graphql';

@Controller()
export class BookmarkController {

  constructor(private entityManager: EntityManager) {
  }

  @Query()
  countBookmark({title, type, userId}) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b").innerJoin("b.user", "u").andWhere('u.id = :userId', { userId });
    
    if(title) {
      query.andWhere('b.title LIKE :title', {'title': "%"+title+"%"});
    }

    if(type) {
      query.andWhere('b.type = :type', {'type': type});
    }

    return query.getCount();
  }
  
  // serves "Bookmark: [Bookmark]" requests
  @Query()
  bookmarks({page = 1, limit=1, title, type, userId}) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b").innerJoin("b.user", "u").andWhere('u.id = :userId', { userId });

  
    if(title) {
      query.andWhere('b.title LIKE :title', {'title': "%"+title+"%"});
    }

    if(type) {
      query.andWhere('b.type = :type', {'type': type});
    }


    return query.limit(limit).offset((page-1) * limit).getMany();
  }

  // serves "BookmarkGet(id: Int): Bookmark" requests
  @Query()
  bookmark({id}) {
    return this.entityManager.findOne(Bookmark, id);
  }

  // serves "BookmarkSave(id: Int, date: Date, exercise: Int, diet: Int, alcohol: Int, notes: String): Bookmark" requests
  @Mutation()
  async updateBookmark(args) {
    const bookmark = this.entityManager.create(Bookmark, args);
  console.log(bookmark.type);
    if(bookmark.type === "video") {
      const {duration} = args;
      console.log(duration, bookmark.video);
        if(!bookmark.video) {
          bookmark.video = new Video();
        } 
        bookmark.video.duration = duration
    }

    const {userId} = args;
    if(userId) {
      const user = await this.entityManager.findOne(User, userId);
      bookmark.user = user;
    }
    
    return this.entityManager.save(Bookmark, bookmark);
  }

  // serves "BookmarkDelete(id: Int): Boolean" requests
  @Mutation()
  async deleteBookmark({id}) {
    await this.entityManager.remove(Bookmark, {id: id});
    return true;
  }
}