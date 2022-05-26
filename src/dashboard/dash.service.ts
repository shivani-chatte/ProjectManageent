import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import moment from "moment";
import * as moment from "moment";
import { Projectinfo } from "src/Entity/project_info.entity";
//import moment = require('moment');
//import { start } from "repl";

import { ProjectinfoController } from "src/project/projectinfo.controller";
import {  getRepository, Repository } from "typeorm";



@Injectable()
export class dashService {
    constructor(
        @InjectRepository(Projectinfo)
        private readonly projectinforepository: Repository<Projectinfo>

    ) { }

    async getToday() {
        var today1 = moment().format('YYYY/MM/DD, 00:00:00 a');
        var today2 = moment().format('YYYY/MM/DD, 23:59:59 a');
        
        let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "createdAt" as date)  BETWEEN to_date('${today1}','yyyy-mm-dd') AND to_date('${today2}','yyyy-mm-dd') `);
        return rawData;
      
    }
    async getPrevious() {

        var yesterday = moment().subtract(1, 'days').format('MMMM Do YYYY, h:mm:ss a');
        const project_info = await getRepository(Projectinfo)
            .createQueryBuilder("Projectinfo")
            
            .getMany();
        return [yesterday, project_info];
    }

    async getWeek() {
        var startDate = moment().subtract(7, 'days').format('YYYY/MM/DD hh:mm:ss');
        var endDate =  moment().format('YYYY/MM/DD hh:mm:ss')
       let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "createdAt" as date)  BETWEEN to_date('${startDate}','yyyy-mm-dd') AND to_date('${endDate}','yyyy-mm-dd') `);
        return rawData;

     }

    

    async getMonth() {
        var startDate = moment().subtract(30, 'days').format('YYYY/MM/DD hh:mm:ss');
        var endDate =  moment().format('YYYY/MM/DD hh:mm:ss')
       let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "createdAt" as date)  BETWEEN to_date('${startDate}','yyyy-mm-dd') AND to_date('${endDate}','yyyy-mm-dd') `);
        return rawData;
        
        
    }

    async getBetween(data) {
        var startDate = data.startDate;
        var endDate =  data.endDate;
       let rawData = await this.projectinforepository.query(`SELECT * from Projectinfo where cast( "createdAt" as date)  BETWEEN to_date('${startDate}','yyyy-mm-dd') AND to_date('${endDate}','yyyy-mm-dd') `);
        return rawData;
        
        
    }



}