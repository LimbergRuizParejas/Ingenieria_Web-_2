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
exports.GenresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genre_entity_1 = require("./entities/genre.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
let GenresService = class GenresService {
    constructor(genreRepository, artistRepository) {
        this.genreRepository = genreRepository;
        this.artistRepository = artistRepository;
    }
    create(createGenreDto) {
        const genre = this.genreRepository.create(createGenreDto);
        console.log('Genre entity being saved:', genre); // Verifica los datos antes de guardar
        return this.genreRepository.save(genre);
    }
    findAll() {
        return this.genreRepository.find();
    }
    async findOne(id) {
        const genre = await this.genreRepository.findOne({ where: { id }, relations: ['artists'] });
        if (!genre) {
            throw new common_1.NotFoundException(`Genre with ID ${id} not found`);
        }
        return genre;
    }
    async findArtistsByGenreId(id) {
        const genre = await this.genreRepository.findOne({
            where: { id },
            relations: ['artists']
        });
        if (!genre) {
            throw new common_1.NotFoundException(`Genre with ID ${id} not found`);
        }
        return genre.artists;
    }
    async update(id, updateGenreDto) {
        await this.genreRepository.update(id, updateGenreDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.genreRepository.delete(id);
    }
};
GenresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __param(1, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GenresService);
exports.GenresService = GenresService;
