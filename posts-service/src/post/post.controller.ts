import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { GrpcMethod, GrpcStreamCall, RpcException } from '@nestjs/microservices';
import { PostById } from './interfaces/post-by-id.interface';
import { Post } from './interfaces/post.interface';
import grpc, { ServerWritableStream } from '@grpc/grpc-js';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb.js';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @GrpcMethod('PostService', 'GetAllPosts')
  async getAllPosts(data: Empty, metadata: any, call: ServerWritableStream<Empty, Post>) {
    const posts = await this.postService.getAllPosts();
    await new Promise((resolve) => {
      for (let post of posts) {
        call.write(post);
      }
    });
    call.end();
  }

  @GrpcMethod('PostService')
  async getPostById(data: PostById): Promise<Post> {
    const post = await this.postService.getPostById(data.id);
    return post;
  }

  @GrpcStreamCall('PostService')
  getMultiplePosts(call: any) {
      call.on('data', async (data: PostById) => {
        try {
          const post = await this.postService.getPostById(data.id);
          call.write(post);
        } catch {
          call.write(new RpcException('No post with such id'));
        }
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
      posts.push(data);
    });

    call.on('end', async () => {
      const results = [];
      for (let post of posts) {
        const res = await this.postService.createPost(post);
        results.push({ id: res.id, title: res.title });
      }
      const response = { posts: results };
      callback(null, response);
    });
  }

  @GrpcMethod('PostService')
  async updatePost(data: Post, callback: any): Promise<void> {
    try {
      await this.postService.updatePost(data);
    } catch {
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
