"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const songs_service_1 = require("./songs.service");
const songs_controller_1 = require("./songs.controller");
const song_entity_1 = require("./entities/song.entity");
const albums_module_1 = require("../albums/albums.module"); // Importa AlbumsModule
const album_entity_1 = require("../albums/entities/album.entity"); // Importa Album
let SongsModule = class SongsModule {
};
SongsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([song_entity_1.Song, album_entity_1.Album]),
            albums_module_1.AlbumsModule, // Importa AlbumsModule
        ],
        controllers: [songs_controller_1.SongsController],
        providers: [songs_service_1.SongsService],
    })
], SongsModule);
exports.SongsModule = SongsModule;
