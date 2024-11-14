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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artist_entity_1 = require("./entities/artist.entity");
const genre_entity_1 = require("../genres/entities/genre.entity"); // Importa la entidad Genre
const album_entity_1 = require("../albums/entities/album.entity"); // Importa la entidad Album
let ArtistsService = class ArtistsService {
    constructor(artistRepository, genreRepository, albumRepository) {
        this.artistRepository = artistRepository;
        this.genreRepository = genreRepository;
        this.albumRepository = albumRepository;
    }
    async create(createArtistDto) {
        // Verificar si el género existe
        const genre = await this.genreRepository.findOne({
            where: { id: createArtistDto.genreId }
        });
        if (!genre) {
            throw new common_1.NotFoundException(`Genre with ID ${createArtistDto.genreId} not found`);
        }
        // Crear el artista con el género asociado
        const artist = this.artistRepository.create({
            ...createArtistDto,
            genre // Asegúrate de que el género se asocia correctamente
        });
        return this.artistRepository.save(artist);
    }
    findAll() {
        return this.artistRepository.find({ relations: ['genre'] });
    }
    async findOne(id) {
        const artist = await this.artistRepository.findOne({
            where: { id },
            relations: ['albums', 'genre'] // Asegúrate de incluir 'genre' en las relaciones
        });
        if (!artist) {
            throw new common_1.NotFoundException(`Artist with ID ${id} not found`);
        }
        return artist;
    }
    async findAlbumsByArtistId(id) {
        const artist = await this.artistRepository.findOne({
            where: { id },
            relations: ['albums']
        });
        if (!artist) {
            throw new common_1.NotFoundException(`Artist with ID ${id} not found`);
        }
        return artist.albums || []; // Maneja el caso de undefined
    }
    async update(id, updateArtistDto) {
        const artist = await this.artistRepository.preload({
            id,
            ...updateArtistDto,
        });
        if (!artist) {
            throw new common_1.NotFoundException(`Artist with ID ${id} not found`);
        }
        return this.artistRepository.save(artist);
    }
    async remove(id) {
        await this.artistRepository.delete(id);
    }
};
ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(1, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __param(2, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistsService);
exports.ArtistsService = ArtistsService;
