import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUUID,
  IsInt,
} from 'class-validator';

export class UpdateAppDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  mode?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  icon_background?: string;

  @IsOptional()
  @IsUUID()
  app_model_config_id?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  enable_site?: boolean;

  @IsOptional()
  @IsBoolean()
  enable_api?: boolean;

  @IsOptional()
  @IsInt()
  api_rpm?: number;

  @IsOptional()
  @IsInt()
  api_rph?: number;

  @IsOptional()
  @IsBoolean()
  is_demo?: boolean;

  @IsOptional()
  @IsBoolean()
  is_public?: boolean;

  @IsOptional()
  @IsBoolean()
  is_universal?: boolean;
}
