import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import moment from "moment";
import * as moment from "moment";
import { Projectinfo } from "src/Entity/project_info.entity";
//import moment = require('moment');
//import { start } from "repl";
import { ProjectinfoController } from "src/project/projectinfo.controller";
import { getRepository, Repository } from "typeorm";


@Injectable()
export class dashService {
    constructor(
        @InjectRepository(Projectinfo)
        private readonly projectinforepository: Repository<Projectinfo>

    ) { }

    
    async getToday() {
        var today1 = moment().format('YYYY-MM-DD');
       // let today = await this.projectinforepository.query(`SELECT cast( "CreatedAt" as date) from Projectinfo where id = 1 `);
       let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "CreatedAt" as date) = to_date('${today1}','yyyy-mm-dd') `);
        console.log('rawdata', rawData)
        return rawData;
     }

     
    async getPrevious() {
     var today1 = moment().subtract(1, 'days').format('YYYY-MM-DD');
       // let today = await this.projectinforepository.query(`SELECT cast( "CreatedAt" as date) from Projectinfo where id = 1 `);
       let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "CreatedAt" as date) = to_date('${today1}','yyyy-mm-dd') `);
        console.log('rawdata', rawData)
        return rawData;
        
    }

    async getWeek() {
        var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD ')
        // let today = await this.projectinforepository.query(`SELECT cast( "CreatedAt" as date) from Projectinfo where id = 1 `);
        let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "CreatedAt" as date)  BETWEEN to_date('${startDate}','yyyy-mm-dd') AND to_date('${endDate}','yyyy-mm-dd') `);
        return rawData;


    }



    async getMonth() {
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD')
        let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "CreatedAt" as date)  BETWEEN to_date('${startDate}','yyyy-mm-dd') AND to_date('${endDate}','yyyy-mm-dd') `);
        return rawData;


    }

    async getBetween(data) {
        var startDate = data.startDate;
        var endDate = data.endDate;
        let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "CreatedAt" as date)  BETWEEN to_date('${startDate}','YYYY-MM-DD') AND to_date('${endDate}','YYYY-MM-DD') `);
        return rawData;


    }


}