import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Bookmark } from '../entity/Bookmark';

@Controller()
export class BookmarkController {

  constructor(private entityManager: EntityManager) {
  }

  // serves "Bookmark: [Bookmark]" requests
  @Query()
  bookmarks({offset = 0, limit=1}) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b");
    return query.limit(limit).offset(offset).getMany();
  }

  // serves "BookmarkGet(id: Int): Bookmark" requests
  @Query()
  getBookmark({id}) {
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