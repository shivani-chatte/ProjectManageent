import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import moment from "moment";
import * as moment from "moment";
import { Projectinfo } from "src/Entity/project_info.entity";
//import moment = require('moment');
//import { start } from "repl";
import { ProjectinfoController } from "src/project/projectinfo.controller";
import { RegistrationService } from "src/registration/registration.service";
import { getRepository, Repository } from "typeorm";


@Injectable()
export class dashService {
    constructor(
        @InjectRepository(Projectinfo)
        private readonly projectinforepository: Repository<Projectinfo>,
        private readonly registrationService : RegistrationService

    ) { }

    
    async getToday(user_id) {
        var today1 = moment().format('YYYY-MM-DD');

        const user = await this.registrationService.findOneUser(user_id);
        if(user.user_type == 2 || user.user_type == 3){
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.user_id = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') =:today",{today : today1})
            .getMany();
        }
        else if(user.user_type == 4)
        {
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.teamleadername = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') =:today",{today : today1})
            .leftJoinAndSelect('st.registrations','r')
            
            .getMany();
            
        }
        else{
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .leftJoinAndSelect('st.registrations','r')
            .where("to_date(p.CreatedAt,'YYYY-MM-DD') =:today",{today : today1})
            .getMany();
        }
      
     }

     
    async getPrevious(user_id) {
     var today1 = moment().subtract(1, 'days').format('YYYY-MM-DD');

     const user = await this.registrationService.findOneUser(user_id);
     if(user.user_type == 2 || user.user_type == 3){
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .where('st.user_id = :user_id', { user_id } )
        .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') =:today",{today : today1})
        .getMany();
    }
    else if(user.user_type == 4)
    {
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .where('st.teamleadername = :user_id', { user_id } )
        .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') =:today",{today : today1})
        .leftJoinAndSelect('st.registrations','r')
        .getMany();
        
    }
    else{
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .leftJoinAndSelect('st.registrations','r')
        .where("to_date(p.CreatedAt,'YYYY-MM-DD') =:today",{today : today1})
        .getMany();
    }
       
        
    }

    async getWeek(user_id) {
        var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD ')

        const user = await this.registrationService.findOneUser(user_id);
        if(user.user_type == 2 || user.user_type == 3){
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.user_id = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY/MM/DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY/MM/DD')<= :endDate ",{endDate : endDate})
            .getMany();
        }
        else if(user.user_type == 4)
    {
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .where('st.teamleadername = :user_id', { user_id } )
        .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
        .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') <= :endDate ",{endDate : endDate})
        .leftJoinAndSelect('st.registrations','r')
        .getMany();
        
    }
    else{
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .leftJoinAndSelect('st.registrations','r')
        .where("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
        .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') <= :endDate ",{endDate : endDate})
        .getMany();
    }

    }



    async getMonth(user_id) {
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD')
        const user = await this.registrationService.findOneUser(user_id);
        if(user.user_type == 2 || user.user_type == 3){
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.user_id = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') <= :endDate ",{endDate : endDate})
            .getMany();
        }
        else if(user.user_type == 4)
        {
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.teamleadername = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD')<= :endDate ",{endDate : endDate})
            .leftJoinAndSelect('st.registrations','r')
            .getMany();
            
        }
        else{
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .leftJoinAndSelect('st.registrations','r')
            .where("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') <= :endDate ",{endDate : endDate})
            .getMany();
        }


    }

    async getBetween(data,user_id) {
        var startDate = data.startDate;
        var endDate = data.endDate;
        const user = await this.registrationService.findOneUser(user_id);
        if(user.user_type == 2 || user.user_type == 3){
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.user_id = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD')<= :endDate ",{endDate : endDate})
            .getMany();
        }
        else if(user.user_type == 4)
        {
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .where('st.teamleadername = :user_id', { user_id } )
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD')<= :endDate ",{endDate : endDate})
            .leftJoinAndSelect('st.registrations','r')
            .getMany();
            
        }
        else{
            return await this.projectinforepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tasks','t')
            .leftJoinAndSelect('t.sub_tasks','st')
            .leftJoinAndSelect('st.registrations','r')
            .where("to_date(p.CreatedAt,'YYYY-MM-DD') >:startDate",{startDate : startDate})
            .andWhere("to_date(p.CreatedAt,'YYYY-MM-DD')<= :endDate ",{endDate : endDate})
            .getMany();
        }
    }

}