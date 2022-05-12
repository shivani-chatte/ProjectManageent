import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { history } from "src/Entity/history.entity";
import { Repository } from "typeorm";

@Injectable()
export class HistoryService {


    constructor(
        @InjectRepository(history)
        private historyrepository: Repository<history>
    ) { }

    async createdata(post: history) {
        return this.historyrepository.save(post);
    }
    async findAllPosts() {
        const project=await this.historyrepository.find()
        return project;
    }

    updateuser(id: number, post: history) {

        return (this.historyrepository.update(id, post))
    }
    



   

}
