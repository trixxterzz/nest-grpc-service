import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { PostRepository } from './post.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}
  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.getAllPosts();
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.getPostById(id);
    if (!post) {
      throw new RpcException('No post with such id');
    }

    return post;
  }

  async createPost(data: Post): Promise<Post> {
    return await this.postRepository.createPost(data);
  }

  async updatePost(data: Post): Promise<void> {
    const result = await this.postRepository.updatePost(data);
    if (!result.affected) {
      throw new RpcException('No post with such id');
    }
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postRepository.deletePost(id);
    if (!result.affected) {
      throw new RpcException('No post with such id');
    }
  }
}
