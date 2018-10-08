import { Controller, Query, Mutation } from "vesper";
import { EntityManager } from "typeorm";
import { User } from "../entity/User";
import * as crypto from "crypto";

@Controller()
export class UserController {
    constructor(private entityManager: EntityManager) {
    }

    /**
     * FinnAll Users
     */
    @Query()
    users() {
        return this.entityManager.find(User);
    }

    /**
     * Find one user by Id
     * @param param0 Object
     */
    @Query()
    user({ id }) {
        return this.entityManager.findOne(User, id);
    }


    /**
     * Find one user By Token
     * @param param0 Object
     */
    @Query()
    getUserByToken({ token }) {
        return this
            .entityManager
            .createQueryBuilder(User, 'u')
            .andWhere('u.token = :token')
            .setParameters({
                token: token
            })
            .limit(1)
            .getOne();
    }

    /**
     * Find one user by email and password
     * @param param0 Object
     */
    @Query()
    authenticateUser({ email, password }) {
        return this
            .entityManager
            .createQueryBuilder(User, 'u')
            .andWhere('u.email = :email')
            .andWhere('u.password = :password')
            .setParameters({
                email: email,
                password: password
            })
            .limit(1)
            .getOne();
    }

    /**
     * Update new or existing user
     * @param args Object
     */
    @Mutation()
    async updateUser(args) {

        let user = new User();

        if (args.id > 0) {
            user = await this.entityManager.findOne(User, args.id);
            user.firstName = args.firstName;
            user.lastName = args.lastName;
            user.email = args.email;
            user.password = args.password;
        } else {
            user = this.entityManager.create(User, args);
            user.token = crypto.randomBytes(32).toString("base64");
            user.salt = crypto.randomBytes(32).toString("base64");
        }

        return this.entityManager.save(user);
}
}