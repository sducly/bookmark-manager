import { Controller, Query, Mutation } from "vesper";
import { EntityManager } from "typeorm";
import { User } from "../entity/User";
import * as crypto from "crypto";

@Controller()
export class UserController {
    constructor(private entityManager: EntityManager) {
    }

    @Query()
    users() {
        return this.entityManager.find(User);
    }

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

    @Mutation()
    addUser(args) {
        let user = this.entityManager.create(User, args);
        return this.entityManager.save(user);
    }
}