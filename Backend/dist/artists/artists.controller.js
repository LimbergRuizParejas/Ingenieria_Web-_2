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
exports.ArtistsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const artists_service_1 = require("./artists.service");
const create_artist_dto_1 = require("./dto/create-artist.dto");
const update_artist_dto_1 = require("./dto/update-artist.dto");
const multer_1 = require("multer");
const path_1 = require("path");
let ArtistsController = class ArtistsController {
    constructor(artistsService) {
        this.artistsService = artistsService;
    }
    findAll() {
        return this.artistsService.findAll();
    }
    findOne(id) {
        return this.artistsService.findOne(+id);
    }
    async findAlbums(id) {
        const albums = await this.artistsService.findAlbumsByArtistId(+id);
        console.log(albums); // Verificar los datos
        return albums;
    }
    create(createArtistDto, image) {
        console.log('Create Artist DTO:', createArtistDto); // Verifica los datos recibidos
        console.log('Uploaded File:', image); // Verifica el archivo subido
        createArtistDto.image = image.filename; // Asigna el nombre del archivo al DTO
        return this.artistsService.create(createArtistDto);
    }
    update(id, updateArtistDto) {
        return this.artistsService.update(+id, updateArtistDto);
    }
    remove(id) {
        return this.artistsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/albums'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistsController.prototype, "findAlbums", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_artist_dto_1.CreateArtistDto, Object]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_artist_dto_1.UpdateArtistDto]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArtistsController.prototype, "remove", null);
ArtistsController = __decorate([
    (0, common_1.Controller)('artists'),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService])
], ArtistsController);
exports.ArtistsController = ArtistsController;
