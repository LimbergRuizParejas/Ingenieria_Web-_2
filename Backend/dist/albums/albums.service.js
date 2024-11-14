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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./entities/album.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
let AlbumsService = class AlbumsService {
    constructor(albumRepository, artistRepository) {
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
    }
    async create(createAlbumDto) {
        const artist = await this.artistRepository.findOne({ where: { id: createAlbumDto.artistId } });
        if (!artist) {
            throw new common_1.NotFoundException(`Artist with ID ${createAlbumDto.artistId} not found`);
        }
        const album = this.albumRepository.create({ ...createAlbumDto, artist });
        return this.albumRepository.save(album);
    }
    findAll() {
        return this.albumRepository.find({ relations: ['artist', 'songs'] }); // Asegúrate de incluir 'songs' en las relaciones
    }
    async findOne(id) {
        const album = await this.albumRepository.findOne({
            where: { id },
            relations: ['artist', 'songs'] // Asegúrate de incluir 'songs' en las relaciones
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album with ID ${id} not found`);
        }
        return album;
    }
    async update(id, updateAlbumDto) {
        const album = await this.albumRepository.preload({
            id,
            ...updateAlbumDto,
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album with ID ${id} not found`);
        }
        return this.albumRepository.save(album);
    }
    async remove(id) {
        await this.albumRepository.delete(id);
    }
};
AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __param(1, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlbumsService);
exports.AlbumsService = AlbumsService;
