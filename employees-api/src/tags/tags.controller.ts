import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tags.schema';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    async findAll(): Promise<Tag[]> {
        return this.tagsService.findAll();
    }

    @Post()
    async create(@Body() tag: Tag): Promise<Tag> {
        return this.tagsService.create(tag);
    }
}
