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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genre_entity_1 = require("./entities/genre.entity");
let GenresService = class GenresService {
    constructor(genreRepository) {
        this.genreRepository = genreRepository;
    }
    create(createGenreDto) {
        const genre = this.genreRepository.create(createGenreDto);
        return this.genreRepository.save(genre);
    }
    findAll() {
        return this.genreRepository.find();
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this.genreRepository.findOne({ where: { id }, relations: ['artists'] });
            if (!genre) {
                throw new common_1.NotFoundException(`Genre with ID ${id} not found`);
            }
            return genre;
        });
    }
    update(id, updateGenreDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.genreRepository.update(id, updateGenreDto);
            return this.findOne(id);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.genreRepository.delete(id);
        });
    }
};
GenresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GenresService);
exports.GenresService = GenresService;
