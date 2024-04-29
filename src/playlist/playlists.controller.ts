import { Body, Controller, Post } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlayListsService } from './playlists.service';
import { CreatePlayListDto } from './DTO/create-playlist.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}