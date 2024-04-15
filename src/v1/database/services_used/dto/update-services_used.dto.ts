import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesUsedDto } from './create-services_used.dto';

export class UpdateServicesUsedDto extends PartialType(CreateServicesUsedDto) {}
