export abstract class BaseRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract findById(id: number): Promise<T>;

  abstract create(data: Partial<T>): Promise<T>;

  abstract update(id: number, data: Partial<T>): Promise<T>;

  abstract removeById(id: number): Promise<T>;
}
