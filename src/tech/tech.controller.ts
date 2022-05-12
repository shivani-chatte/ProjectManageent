import { Body, Controller, Post } from "@nestjs/common";
import { TechService } from "./tech.service";


@Controller('tech')
export class TechController{
    constructor(
        private readonly techservice:TechService
    ){}
    
    @Post()
    async save(@Body() technique)
    {
        return await this.techservice.allocatetechnology(technique)
    }
    

}