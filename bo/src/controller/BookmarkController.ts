import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Bookmark } from '../entity/Bookmark';

@Controller()
export class BookmarkController {

  constructor(private entityManager: EntityManager) {
  }

  @Query()
  countBookmark({title, type}) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b");
    
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
  bookmarks({page = 1, limit=1, title, type}) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b");

  
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
  updateBookmark(args) {
    const bookmark = this.entityManager.create(Bookmark, args);
    return this.entityManager.save(Bookmark, bookmark);
  }

  // serves "BookmarkDelete(id: Int): Boolean" requests
  @Mutation()
  async deleteBookmark({id}) {
    await this.entityManager.remove(Bookmark, {id: id});
    return true;
  }
}