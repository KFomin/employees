import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tags.schema';
import { TagDto } from './tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {
  }

  @Get()
  @Get()
  async findAll(@Query('search') search?: string): Promise<Tag[]> {
    if (search) {
      return this.tagsService.search(search);
    }
    return this.tagsService.findAll();
  }

  @Post()
  async create(@Body() tag: Tag): Promise<Tag> {
    return this.tagsService.create(tag);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: TagDto): Promise<Tag | null> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tagsService.delete(id);
  }
}
