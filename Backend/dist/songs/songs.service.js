"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const song_entity_1 = require("./entities/song.entity");
const album_entity_1 = require("../albums/entities/album.entity");
let SongsService = class SongsService {
    constructor(songRepository, albumRepository) {
        this.songRepository = songRepository;
        this.albumRepository = albumRepository;
    }
    async create(createSongDto) {
        const album = await this.albumRepository.findOne({ where: { id: createSongDto.albumId } }); // Ajusta la consulta
        if (!album) {
            throw new common_1.NotFoundException(`Album with ID ${createSongDto.albumId} not found`);
        }
        const song = this.songRepository.create({
            ...createSongDto,
            album,
        });
        return this.songRepository.save(song);
    }
    findAll() {
        return this.songRepository.find({ relations: ['album'] });
    }
    async findOne(id) {
        const song = await this.songRepository.findOne({
            where: { id },
            relations: ['album'],
        });
        if (!song) {
            throw new common_1.NotFoundException(`Song with ID ${id} not found`);
        }
        return song;
    }
    async update(id, updateSongDto) {
        const song = await this.songRepository.preload({
            id,
            ...updateSongDto,
        });
        if (!song) {
            throw new common_1.NotFoundException(`Song with ID ${id} not found`);
        }
        return this.songRepository.save(song);
    }
    async remove(id) {
        await this.songRepository.delete(id);
    }
};
SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(song_entity_1.Song)),
    __param(1, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SongsService);
exports.SongsService = SongsService;
