import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { department } from 'src/Entity/department.entity';
import { holiday } from 'src/Entity/holiday.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HolidayService {
    
    constructor (
        @InjectRepository(holiday)
        private holidayrepository:Repository<holiday>
    ){}

    async save(leave){
        let holidays = leave.date
        holidays.forEach(element => {

            let Holidays = new holiday()

            Holidays['date'] = element
            Holidays['registrationsId'] = leave.userId
            
             this.holidayrepository.insert(Holidays)
          });
    }

    async findByRegistrationsId(id){
        let holidays = await this.holidayrepository.find({registrationsId:id})
        return holidays
    }

    async deleteHoliday(data){
        let holidays = await this.holidayrepository.delete({date: data.date, registrationsId: data.userId})
        return holidays
    }
}

