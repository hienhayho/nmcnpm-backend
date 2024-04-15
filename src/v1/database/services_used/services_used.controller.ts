import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesUsedService } from './services_used.service';
import { CreateServicesUsedDto } from './dto/create-services_used.dto';
import { UpdateServicesUsedDto } from './dto/update-services_used.dto';

@Controller('services-used')
export class ServicesUsedController {
  constructor(private readonly servicesUsedService: ServicesUsedService) {}

  @Post()
  create(@Body() createServicesUsedDto: CreateServicesUsedDto) {
    return this.servicesUsedService.create(createServicesUsedDto);
  }

  @Get()
  findAll() {
    return this.servicesUsedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesUsedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicesUsedDto: UpdateServicesUsedDto) {
    return this.servicesUsedService.update(+id, updateServicesUsedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesUsedService.remove(+id);
  }
}
