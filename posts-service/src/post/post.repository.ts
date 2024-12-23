import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Post as PostEntity } from './post.entity';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private datasource: DataSource) {
    super(PostEntity, datasource.createEntityManager());
  }

  async createPost(data: Post): Promise<Post> {
    const { title, content } = data;

    const post = this.create({
      title,
      content,
    });

    await this.save(post);
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const query = this.createQueryBuilder('post');
    return await query.getMany();
  }

  async getPostById(id: number): Promise<Post> {
    const query = this.createQueryBuilder('post');
    query.where({ id });

    return await query.getOne();
  }

  async updatePost(data: Post): Promise<UpdateResult> {
    const { id, title, content } = data;
    const result = await this.update({ id }, { title, content });
    return result;
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
