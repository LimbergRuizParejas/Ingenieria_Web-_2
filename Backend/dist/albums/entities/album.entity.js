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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const typeorm_1 = require("typeorm");
const artist_entity_1 = require("../../artists/entities/artist.entity");
const song_entity_1 = require("../../songs/entities/song.entity");
let Album = class Album {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Album.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.Artist, artist => artist.albums, { eager: true }),
    __metadata("design:type", artist_entity_1.Artist)
], Album.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => song_entity_1.Song, song => song.album, { eager: true }) // { eager: true } para cargar la relación automáticamente
    ,
    __metadata("design:type", Array)
], Album.prototype, "songs", void 0);
Album = __decorate([
    (0, typeorm_1.Entity)()
], Album);
exports.Album = Album;
