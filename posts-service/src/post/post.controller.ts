import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { GrpcMethod, GrpcStreamCall } from '@nestjs/microservices';
import { PostById } from './interfaces/post-by-id.interface';
import { Post } from './interfaces/post.interface';
import grpc from '@grpc/grpc-js';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @GrpcStreamCall('PostService', 'GetAllPosts')
  async getAllPosts(call: any) {
    const posts = await this.postService.getAllPosts();
    posts.forEach((post) => call.write(post));
  }

  @GrpcMethod('PostService')
  async getPostById(data: PostById): Promise<Post> {
    const post = await this.postService.getPostById(data.id);
    return post;
  }

  @GrpcStreamCall('PostService')
  getMultiplePosts(call: any) {
    call.on('data', async (data: PostById) => {
      const post = await this.postService.getPostById(data.id);
      call.write(post);
    });

    call.on('end', () => call.end());
  }

  @GrpcMethod('PostService')
  async createPost(data: Post): Promise<PostById> {
    const result = await this.postService.createPost(data);
    return { id: result.id };
  }

  @GrpcStreamCall('PostService')
  createMultiplePosts(call: any, callback: any) {
    const posts = [];
    call.on('data', async (data: Post) => {
      const result = await this.postService.createPost(data);
      console.log(result);
      posts.push({ id: result.id, title: result.title });
      console.log(posts);
    });

    call.on('end', () => {
      callback(null, { posts });
    });
  }

  @GrpcMethod('PostService')
  async updatePost(data: Post, callback: any): Promise<void> {
    try {
      await this.postService.updatePost(data);
    } catch {
      console.log('TUT???');
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'No post with such id',
      });
    }
  }

  @GrpcMethod('PostService')
  async deletePost(data: PostById): Promise<void> {
    await this.postService.deletePost(data.id);
  }
}
