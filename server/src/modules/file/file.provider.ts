import { Chunk } from "./entities/chunk.entity";
import { File } from "./entities/file.entity";

export const fileProviders = [
    { provide: 'FileRepository', useValue: File },
    { provide: 'ChunkRepository', useValue: Chunk}
];