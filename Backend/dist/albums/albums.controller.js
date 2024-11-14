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
exports.AlbumsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const albums_service_1 = require("./albums.service");
const create_album_dto_1 = require("./dto/create-album.dto");
const update_album_dto_1 = require("./dto/update-album.dto");
const multer_1 = require("multer");
const path_1 = require("path");
let AlbumsController = class AlbumsController {
    constructor(albumsService) {
        this.albumsService = albumsService;
    }
    async findAll() {
        const albums = await this.albumsService.findAll();
        return albums.map(album => {
            var _a, _b;
            return ({
                id: album.id,
                title: album.title,
                image: album.image,
                artist: {
                    id: album.artist.id,
                    name: album.artist.name,
                    image: album.artist.image,
                },
                songs: (_b = (_a = album.songs) === null || _a === void 0 ? void 0 : _a.map(song => ({
                    id: song.id,
                    title: song.title,
                    mp3: song.mp3,
                }))) !== null && _b !== void 0 ? _b : [],
            });
        });
    }
    async findOne(id) {
        var _a, _b;
        const album = await this.albumsService.findOne(+id);
        return {
            id: album.id,
            title: album.title,
            image: album.image,
            artist: {
                id: album.artist.id,
                name: album.artist.name,
                image: album.artist.image,
            },
            songs: (_b = (_a = album.songs) === null || _a === void 0 ? void 0 : _a.map(song => ({
                id: song.id,
                title: song.title,
                mp3: song.mp3,
            }))) !== null && _b !== void 0 ? _b : [],
        };
    }
    create(createAlbumDto, image) {
        console.log('Create Album DTO:', createAlbumDto); // Verificar los datos recibidos
        console.log('Uploaded File:', image); // Verificar el archivo subido
        createAlbumDto.image = image.filename; // Asignar el nombre del archivo al DTO
        return this.albumsService.create(createAlbumDto);
    }
    update(id, updateAlbumDto) {
        return this.albumsService.update(+id, updateAlbumDto);
    }
    remove(id) {
        return this.albumsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "findOne", null);
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
    __metadata("design:paramtypes", [create_album_dto_1.CreateAlbumDto, Object]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_album_dto_1.UpdateAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "remove", null);
AlbumsController = __decorate([
    (0, common_1.Controller)('albums'),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService])
], AlbumsController);
exports.AlbumsController = AlbumsController;
