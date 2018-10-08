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

  /**
   * CountBookmarks filtered by title, type and userId
   * @param param0 
   */
  @Query()
  countBookmark({ title, type, userId }) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b").innerJoin("b.user", "u").andWhere('u.id = :userId', { userId });

    if (title) {
      query.andWhere('b.title LIKE :title', { 'title': "%" + title + "%" });
    }

    if (type) {
      query.andWhere('b.type = :type', { 'type': type });
    }

    return query.getCount();
  }

  /**
   * Find bookmarks by filter by title, type and userId. Limited results and offset
   * @param param0 
   */
  @Query()
  bookmarks({ page = 1, limit = 1, title, type, userId }) {
    const query = this.entityManager.createQueryBuilder(Bookmark, "b").innerJoin("b.user", "u").andWhere('u.id = :userId', { userId });


    if (title) {
      query.andWhere('b.title LIKE :title', { 'title': "%" + title + "%" });
    }

    if (type) {
      query.andWhere('b.type = :type', { 'type': type });
    }


    return query.limit(limit).offset((page - 1) * limit).getMany();
  }

  /**
   * Find bookmark by Id
   * @param param0 Object
   */
  @Query()
  bookmark({ id }) {
    return this.entityManager.findOne(Bookmark, id);
  }

  /**
   * Update new or existing bookmark
   * @param args Object
   */
  @Mutation()
  async updateBookmark(args) {
    const bookmark = this.entityManager.create(Bookmark, args);

    if (bookmark.type === "video") {
      const { duration } = args;

      if (!bookmark.video) {
        bookmark.video = new Video();
      }

      bookmark.video.duration = duration
    }

    const { userId } = args;

    if (userId) {
      const user = await this.entityManager.findOne(User, userId);
      bookmark.user = user;
    }

    return this.entityManager.save(Bookmark, bookmark);
  }

  /**
   * Remove bookmark by Id
   * @param param0 Object
   */
  @Mutation()
  async deleteBookmark({ id }) {
    await this.entityManager.remove(Bookmark, { id: id });
    return true;
  }
}